package com.rashiddy.kubernetespodscaler.controllers;


import com.rashiddy.kubernetespodscaler.services.KubernetesService;
import com.rashiddy.kubernetespodscaler.services.KubernetesServiceImpl;
import io.fabric8.kubernetes.api.model.NamespaceList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/kubernetes")
public class KubernetesController {

    private KubernetesService kubernetesService;

    public KubernetesController(KubernetesServiceImpl kubernetesService) {
        this.kubernetesService = kubernetesService;

    }


    @GetMapping("/namespaces")
    public Mono<NamespaceList> getNamespaces() {
        NamespaceList namespaceList = kubernetesService.getAllNamepsaces();
        return Mono.just(namespaceList);
    }
}
