import axios from "axios";


class KubernetesService {

    static getAllNamespaces = async () => {

        let list = []
        let count = 1;
        let response = await axios.get("/api/kubernetes/namespaces")
        response.data.items.forEach(item => {
            list.push({
                id: count,
                creationTime: item.metadata.creationTimestamp,
                apiVersion: item.apiVersion,
                name: item.metadata.name
            })
            count++
        })
        return list
    }

    static getDeploymentsForNamespace = async (namespace) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/deployments"))
        console.log(response.data)
        return response.data
    }

    static getDeploymentsTotalForNamespace = async (namespace) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/deployments/total"))
        return response.data
    }

    static getPodsForNamespace = async (namespace) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/pods"))
        return response.data
    }

    static getPodsRunningForNamespace = async (namespace) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/pods/running"))
        return response.data
    }

    static getPodsNotRunningForNamespace = async (namespace) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/pods/nonrunning"))
        return response.data
    }

    static restartDeployment = async (namespace, deploymentName) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/deployment/").concat(deploymentName).concat("/restart"))
        return response.data
    }

    static getServiceAccountsForNs = async (namespace) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/serviceaccounts"))
        return response.data
    }

    static getSpecifiedServiceAccountDetails = async (sa, namespace) => {
        let response = await axios.get("/api/kubernetes/".concat(namespace).concat("/serviceaccounts/").concat(sa.name))
        return response.data
    }


}

export default KubernetesService;