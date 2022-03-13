package com.rashiddy.kubernetespodscaler.services;


import com.rashiddy.kubernetespodscaler.data.DeploymentInfo;
import com.rashiddy.kubernetespodscaler.data.Event;
import com.rashiddy.kubernetespodscaler.data.Label;
import io.fabric8.kubernetes.api.model.NamespaceList;
import io.fabric8.kubernetes.api.model.PodList;
import io.fabric8.kubernetes.api.model.ServiceAccount;
import io.fabric8.kubernetes.api.model.ServiceAccountList;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentList;

import io.fabric8.kubernetes.client.KubernetesClient;
import io.fabric8.kubernetes.client.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class KubernetesServiceImpl implements KubernetesService {

    private static Logger logger = LogManager.getLogger(KubernetesServiceImpl.class);

    private KubernetesClient kubernetesClient;
    private EventUnicastService eventUnicastService;

    public KubernetesServiceImpl(KubernetesClient kubernetesClient, EventUnicastService eventUnicastService) {
        this.kubernetesClient = kubernetesClient;
        this.eventUnicastService = eventUnicastService;
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
        Instant instantNow = Instant.now();
        DeploymentList deploymentList = kubernetesClient.apps().deployments().inNamespace(namespace).list();
        List<DeploymentInfo> deploymentInfoList = new ArrayList<>();
        AtomicReference<Integer> id = new AtomicReference<>(0);
        deploymentList.getItems().forEach(deployment -> {
            id.getAndSet(id.get() + 1);
            String status = String.format("%s/%s", deployment.getStatus().getReadyReplicas(), deployment.getStatus().getReplicas());
            Instant instantCreation = Instant.parse(deployment.getMetadata().getCreationTimestamp());
            deploymentInfoList.add(new DeploymentInfo(id.get().longValue(),
                    deployment.getMetadata().getName(),
                    status,
                    getBetween(instantNow, instantCreation),
                    deployment.getMetadata().getLabels()));
        });
        return deploymentInfoList;
    }

    @Override
    public String restartDeployment(String namespace, String deploymentName) {
        kubernetesClient.apps().deployments().inNamespace(namespace).withName(deploymentName).rolling().restart();
        return "success";
    }

    @Override
    public ServiceAccountList getServiceAccountsForNs(String namespace) {
        ServiceAccountList serviceAccountList = kubernetesClient.serviceAccounts().inNamespace(namespace).list();
        return serviceAccountList;
    }

    @Override
    public ServiceAccount getSpecificServiceAccountForNs(String namespace, String serviceAccount) {
        ServiceAccount serviceAccountResource = kubernetesClient.serviceAccounts().inNamespace(namespace).withName(serviceAccount).get();
        return serviceAccountResource;
    }

    private String getBetween(Instant instantNow, Instant instantCreation) {
        long days =  ChronoUnit.DAYS.between(instantCreation, instantNow);
        if (days > 0l) {
            return String.format("%s days", days);
        } else {
            long minutes = ChronoUnit.MINUTES.between(instantCreation, instantNow);
            return String.format("%s minutes", minutes);
        }
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

    @Override
    public void watchEvents() {
        Watch watch = kubernetesClient.events().v1().events().watch(new Watcher() {
            @Override
            public boolean reconnecting() {
                return Watcher.super.reconnecting();
            }

            @Override
            public void eventReceived(Action action, Object o) {
                logger.info("{}: {}", action, o.toString());
                Event event = new Event("kube", 1);
                eventUnicastService.onNext(event);
            }


            @Override
            public void onClose() {
                Watcher.super.onClose();
            }

            @Override
            public void onClose(WatcherException e) {
                e.printStackTrace();
            }
        });

    }
}
