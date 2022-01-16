package com.rashiddy.kubernetespodscaler.services;

import io.fabric8.kubernetes.api.model.BaseKubernetesListFluent;
import io.fabric8.kubernetes.api.model.NamespaceList;
import io.fabric8.kubernetes.api.model.PodList;
import io.fabric8.kubernetes.api.model.apps.DeploymentList;

public interface KubernetesService {

    NamespaceList getAllNamepsaces();

    DeploymentList getTotalDeploymentsForNamespace(String namespace);

    PodList getTotalPodsForNamespace(String namespace);

    Integer getTotalPodsRunningForNamespace(String namespace);

    Integer getTotalPodsNotRunningForNamespace(String namespace);
}
