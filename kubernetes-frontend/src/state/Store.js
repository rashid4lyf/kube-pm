import create from 'zustand';
import {devtools} from "zustand/middleware";
import axios from "axios";
import KubernetesService from "../services/KubernetesService";
import kubernetesService from "../services/KubernetesService";


let useStore = (set) => ({
    namespaces: [],
    deployments: [],
    loadingNamespaceDetails: false,
    selectedDeploymentDetail: "",
    selectedNamespaceDetail: "",
    selectedNamespaceTotalDeployments: "",
    selectedNamespaceTotalPods: "",
    selectedNamespaceTotalRunningPods: "",
    selectedNamespaceTotalUnavailablePods: "",

    setSelectedDeploymentDetail: (deployment) => {
        set({selectedDeploymentDetail: deployment})
    },
    setSelectedNamespaceDetail: (namespace) => {
        set({selectedNamespaceDetail: namespace})
    },
    getNamespaces: async () => {
        let list = await KubernetesService.getAllNamespaces()
        console.log(list)
        set({namespaces: list})
    },
    getDeploymentsForNamespace: async (namespace) => {
        let deployments = await kubernetesService.getDeploymentsForNamespace(namespace)
        set({deployments: deployments})
    },
    getDeploymentsTotalForNamespaces: async (namespace) => {
        set({loadingNamespaceDetails: true})
        let total = await KubernetesService.getDeploymentsTotalForNamespace(namespace)
        set({selectedNamespaceTotalDeployments: total, loadingNamespaceDetails: false})
    },
    getPodsForNamespaces: async (namespace) => {
        set({loadingNamespaceDetails: true})
        let total = await KubernetesService.getPodsForNamespace(namespace)
        set({selectedNamespaceTotalPods: total, loadingNamespaceDetails: false})
    },
    getPodsRunningForNamespaces: async (namespace) => {
        set({loadingNamespaceDetails: true})
        let total = await KubernetesService.getPodsRunningForNamespace(namespace)
        set({selectedNamespaceTotalRunningPods: total, loadingNamespaceDetails: false})
    },
    getPodsNotRunningForNamespaces: async (namespace) => {
        set({loadingNamespaceDetails: true})
        let total = await KubernetesService.getPodsNotRunningForNamespace(namespace)
        set({selectedNamespaceTotalUnavailablePods: total, loadingNamespaceDetails: false})
    }
})

useStore = devtools(useStore);

export default useStore = create(useStore);