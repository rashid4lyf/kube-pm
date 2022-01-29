import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import CustomDataGridDeployments from "../components/CustomDataGridDeployments";
import useStore from "../state/Store";

function Deployment(props) {

    let { namespace } = useParams();
    let [query, setQuery] = useState(false)

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'deploymentName', headerName: "Deployment Name", width: 300},
        {field: 'replicas', headerName: "Replicas", width: 200},
        {field: 'labels', headerName: "Labels", width: 300}]

    const deployments = useStore((state) => state.deployments)
    const getDeployments = useStore((state) => state.getDeploymentsForNamespace)

    useEffect(() => {
        console.log(query)
        getDeployments(namespace)
    }, [query]);

    return (
        <div style={{padding: 20}}>
            <Typography align={'left'} variant={"h6"}>{namespace} deployments</Typography>
            <CustomDataGridDeployments deployments={deployments} columns={columns}></CustomDataGridDeployments>
        </div>
    );
}

export default Deployment;
