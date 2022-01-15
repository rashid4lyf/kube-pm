import create from 'zustand';
import {devtools, persist} from "zustand/middleware";
import axios from "axios";
import namespaces from "../pages/Namespaces";



let useStore = (set) => ({
    namespaces: [],
    getNamespaces: async () => {
        let list = []
        let count = 1;
        const response = await axios.get("/api/kubernetes/namespaces")
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
        set({namespaces: list})


    }
})

useStore = devtools(useStore);

export default useStore = create(useStore);