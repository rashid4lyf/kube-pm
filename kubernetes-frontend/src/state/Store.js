import create from 'zustand';
import {devtools} from "zustand/middleware";
import axios from "axios";
import KubernetesService from "../services/KubernetesService";


let useStore = (set) => ({
    namespaces: [],
    loadingNamespaceDetails: false,
    selectedNamespaceDetail: "",
    selectedNamespaceTotalDeployments: "",
    selectedNamespaceTotalPods: "",
    selectedNamespaceTotalRunningPods: "",
    selectedNamespaceTotalUnavailablePods: "",
    setSelectedNamespaceDetail: (namespace) => {
        set({selectedNamespaceDetail: namespace})
    },
    getNamespaces: async () => {
        let list = await KubernetesService.getAllNamespaces()
        set({namespaces: list})
    },
    getDeploymentsForNamespaces: async (namespace) => {
        set({loadingNamespaceDetails: true})
        let total = await KubernetesService.getDeploymentsForNamespace(namespace)
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