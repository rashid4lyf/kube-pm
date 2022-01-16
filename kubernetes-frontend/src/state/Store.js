import create from 'zustand';
import {devtools} from "zustand/middleware";
import axios from "axios";
import KubernetesService from "../services/KubernetesService";


let useStore = (set) => ({
    namespaces: [],
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
        let total = await KubernetesService.getDeploymentsForNamespace(namespace)
        set({selectedNamespaceTotalDeployments: total})
    }
})

useStore = devtools(useStore);

export default useStore = create(useStore);