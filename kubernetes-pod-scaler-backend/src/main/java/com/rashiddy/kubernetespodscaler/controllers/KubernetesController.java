package com.rashiddy.kubernetespodscaler.controllers;


import com.rashiddy.kubernetespodscaler.data.DeploymentInfo;
import com.rashiddy.kubernetespodscaler.services.KubernetesService;
import com.rashiddy.kubernetespodscaler.services.KubernetesServiceImpl;
import io.fabric8.kubernetes.api.model.NamespaceList;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentList;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

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

    @GetMapping(value = "/{namespace}/deployments/total")
    public Mono<Integer> getTotalDeploymentsForNamespace(@PathVariable(name = "namespace") String namespace) {
        Integer total = kubernetesService.getTotalDeploymentsForNamespace(namespace).getItems().size();
        return Mono.just(total);
    }

    @GetMapping (value = "/{namespace}/deployments")
    public Mono<List<DeploymentInfo>> getAllDeploymentsForNamespace(@PathVariable(name = "namespace") String namespace) {
        return Mono.just(kubernetesService.getAllDeploymentsForNamespace(namespace));
    }

    @GetMapping(value = "/{namespace}/deployment/{deploymentName}")
    public Mono<Deployment> getDeploymentInformation(@PathVariable(name = "namespace") String namespace, @PathVariable(name = "deploymentName") String deploymentName) {
        return Mono.just(kubernetesService.getDeploymentInfo(namespace, deploymentName));
    }

    @GetMapping(value = "/{namespace}/deployment/{deploymentName}/restart")
    public Mono<String> restartDeployment(@PathVariable(name = "namespace") String namespace, @PathVariable(name = "deploymentName") String deploymentName) {
        return Mono.just(kubernetesService.restartDeployment(namespace, deploymentName));
    }

    @GetMapping(value = "/{namespace}/pods")
    public Mono<Integer> getTotalPodsForNamespace(@PathVariable(name = "namespace") String namespace) {
        Integer total = kubernetesService.getTotalPodsForNamespace(namespace).getItems().size();
        return Mono.just(total);
    }

    @GetMapping(value = "/{namespace}/pods/running")
    public Mono<Integer> getTotalPodsRunningForNamespace(@PathVariable(name = "namespace") String namespace) {
        Integer total = kubernetesService.getTotalPodsRunningForNamespace(namespace);
        return Mono.just(total);
    }

    @GetMapping(value = "/{namespace}/pods/nonrunning")
    public Mono<Integer> getTotalPodsNotRunningForNamespace(@PathVariable(name = "namespace") String namespace) {
        Integer total = kubernetesService.getTotalPodsNotRunningForNamespace(namespace);
        return Mono.just(total);
    }
}
