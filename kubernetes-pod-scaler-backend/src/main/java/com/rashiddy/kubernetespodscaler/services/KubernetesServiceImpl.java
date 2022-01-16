package com.rashiddy.kubernetespodscaler.services;


import io.fabric8.kubernetes.api.model.NamespaceList;
import io.fabric8.kubernetes.api.model.PodList;
import io.fabric8.kubernetes.api.model.apps.DeploymentList;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicInteger;

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
