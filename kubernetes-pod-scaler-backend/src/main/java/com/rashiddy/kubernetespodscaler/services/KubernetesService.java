package com.rashiddy.kubernetespodscaler.services;

import com.rashiddy.kubernetespodscaler.data.DeploymentInfo;
import io.fabric8.kubernetes.api.model.*;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentList;

import java.util.List;

public interface KubernetesService {

    NamespaceList getAllNamepsaces();

    DeploymentList getTotalDeploymentsForNamespace(String namespace);

    PodList getTotalPodsForNamespace(String namespace);

    Integer getTotalPodsRunningForNamespace(String namespace);

    Integer getTotalPodsNotRunningForNamespace(String namespace);

    Deployment getDeploymentInfo(String namespace, String deploymentName);

    List<DeploymentInfo> getAllDeploymentsForNamespace(String namespace);

    String restartDeployment(String namespace, String deploymentName);

    ServiceAccountList getServiceAccountsForNs(String namespace);

    ServiceAccount getSpecificServiceAccountForNs(String namespace, String serviceAccount);

    void watchEvents();
}
