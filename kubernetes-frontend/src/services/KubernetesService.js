import axios from "axios";


class KubernetesService {

    static getAllNamespaces = async () => {

        let list = []
        let count = 1;
        let response = await axios.get("/api/kubernetes/namespaces")
        response.data.items.forEach(item => {
            console.log(item)
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
        return response.data

    }
}

export default KubernetesService;