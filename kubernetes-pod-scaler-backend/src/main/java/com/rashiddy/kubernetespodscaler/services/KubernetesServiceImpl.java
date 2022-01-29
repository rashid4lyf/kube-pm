package com.rashiddy.kubernetespodscaler.services;


import com.rashiddy.kubernetespodscaler.data.DeploymentInfo;
import com.rashiddy.kubernetespodscaler.data.Label;
import io.fabric8.kubernetes.api.model.NamespaceList;
import io.fabric8.kubernetes.api.model.PodList;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentList;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class KubernetesServiceImpl implements KubernetesService {

    private KubernetesClient kubernetesClient;

    public KubernetesServiceImpl(KubernetesClient kubernetesClient) {
        this.kubernetesClient = kubernetesClient;
    }

    public NamespaceList getAllNamepsaces() {
        NamespaceList namespaceList = kubernetesClient.namespaces().list();
        return namespaceList;
    }

    public DeploymentList getTotalDeploymentsForNamespace(String namespace) {
        return kubernetesClient.apps().deployments().inNamespace(namespace).list();
    }

    @Override
    public PodList getTotalPodsForNamespace(String namespace) {
        return kubernetesClient.pods().inNamespace(namespace).list();
    }

    @Override
    public Integer getTotalPodsRunningForNamespace(String namespace) {
        AtomicInteger count = getCountPodStatus(namespace, true);
        return count.get();
    }

    @Override
    public Integer getTotalPodsNotRunningForNamespace(String namespace) {
        AtomicInteger count = getCountPodStatus(namespace, false);
        return count.get();
    }

    @Override
    public List<DeploymentInfo> getAllDeploymentsForNamespace(String namespace) {
        DeploymentList deploymentList = kubernetesClient.apps().deployments().inNamespace(namespace).list();
        List<DeploymentInfo> deploymentInfoList = new ArrayList<>();
        AtomicReference<Integer> id = new AtomicReference<>(0);
        deploymentList.getItems().forEach(deployment -> {
            id.getAndSet(id.get() + 1);
            deploymentInfoList.add(new DeploymentInfo(id.get().longValue(), deployment.getMetadata().getName(), deployment.getSpec().getReplicas().toString(), deployment.getMetadata().getLabels()));
        });
        return deploymentInfoList;
    }

    public Deployment getDeploymentInfo(String namespace, String deploymentName) {
        List<Deployment> deploymentList =  kubernetesClient.apps().deployments().inNamespace(namespace).list().getItems();
        deploymentList = deploymentList.stream().filter(deployment -> deployment.getMetadata().getName().equals(deploymentName)).toList();
        return deploymentList.get(0);
    }

    private AtomicInteger getCountPodStatus(String namespace, Boolean running) {
        PodList podList = kubernetesClient.pods().inNamespace(namespace).list();
        AtomicInteger count = new AtomicInteger();

        podList.getItems().forEach(item -> {
            Boolean isPhaseRunning = item
                    .getStatus()
                    .getPhase()
                    .equalsIgnoreCase("running");
            if (running && isPhaseRunning) {
                count.getAndIncrement();
            } else if (!running && !isPhaseRunning) {
                count.getAndIncrement();
            }
        });
        return count;
    }
}
