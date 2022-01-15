package com.rashiddy.kubernetespodscaler.services;


import io.fabric8.kubernetes.api.model.NamespaceList;
import io.fabric8.kubernetes.client.KubernetesClient;
import org.springframework.stereotype.Service;

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
}
