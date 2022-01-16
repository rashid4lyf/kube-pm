import React, {useEffect, useState} from 'react';
import useStore from "../state/Store"
import {Box, Grid, Typography} from "@mui/material";
import CustomDataGrid from "../components/CustomDataGrid";
import CustomCardView from "../components/CustomCardView";

function Namespaces() {

    let [query, setQuery] = useState(false)
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'creationTime', headerName: "creation Time", width: 300},
        {field: 'apiVersion', headerName: "API Version", width: 200},
        {field: 'name', headerName: "Name", width: 300}]

    //variables from store
    const namespaces = useStore((state) => state.namespaces)
    const selectedNamespace = useStore((state) => state.selectedNamespaceDetail)
    const totalDeploymentsForNs = useStore((state) => state.selectedNamespaceTotalDeployments)

    //getters from store
    const getNamespaces = useStore((state) => state.getNamespaces)
    const getTotalDeployments = useStore((state) => state.getDeploymentsForNamespaces)

    const descriptionSnippets = [
        "Total number of deployments",
        "Total number of pods",
        "Total running pods",
        "Total unavailable pods"
    ]

    useEffect(() => {
        console.log(query)
        getNamespaces()
    }, [query]);

    useEffect(() => {
        if (selectedNamespace !== "") {
            getTotalDeployments(selectedNamespace);
        }
    }, [selectedNamespace])


    return (
        <div>
            <CustomDataGrid namespaces={namespaces} columns={columns}/>
            <div style={{padding: 20}}>
                <Typography align={"left"} variant={"h6"}>Namespace Details</Typography>
                <Box sx={{m: 2}}/>
                {selectedNamespace !== "" &&
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Deployments"} description={descriptionSnippets[0]} total={totalDeploymentsForNs}></CustomCardView>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Pods"} description={descriptionSnippets[1]}></CustomCardView>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Running Pods"} description={descriptionSnippets[2]}></CustomCardView>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Unavailable Pods"} description={descriptionSnippets[3]}></CustomCardView>
                        </Grid>
                    </Grid>

                }
                {selectedNamespace === "" &&
                    <Typography align={"left"}>Select a namespace to view more information...</Typography>
                }
            </div>
        </div>
    );
}

export default Namespaces;