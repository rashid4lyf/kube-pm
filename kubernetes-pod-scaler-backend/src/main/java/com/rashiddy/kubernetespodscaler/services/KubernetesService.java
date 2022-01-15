package com.rashiddy.kubernetespodscaler.services;

import io.fabric8.kubernetes.api.model.NamespaceList;

public interface KubernetesService {

    NamespaceList getAllNamepsaces();
}
