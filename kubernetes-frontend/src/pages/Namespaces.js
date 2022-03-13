import React, {useEffect, useState} from 'react';
import useStore from "../state/Store"
import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid, Icon,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import CustomDataGridNamespace from "../components/CustomDataGridNamespace";
import CustomCardView from "../components/CustomCardView";
import CustomDataGridServiceAccount from "../components/CustomDataGridServiceAccount";
import kubernetesService from "../services/KubernetesService";
import {BlurOn, ContentCopyOutlined, RestartAltOutlined} from "@mui/icons-material";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function Namespaces() {

    let [query, setQuery] = useState(false)
    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'creationTime', headerName: "creation Time", width: 300},
        {field: 'apiVersion', headerName: "API Version", width: 200},
        {field: 'name', headerName: "Name", width: 300}]

    const columnsServiceAccount = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'creationTime', headerName: "creation Time", width: 300},
        {field: 'apiVersion', headerName: "API Version", width: 200},
        {field: 'name', headerName: "Name", width: 300}]

    //variables from store
    const namespaces = useStore((state) => state.namespaces)
    const loading = useStore((state) => state.loadingNamespaceDetails)
    const selectedNamespace = useStore((state) => state.selectedNamespaceDetail)
    const totalDeploymentsForNs = useStore((state) => state.selectedNamespaceTotalDeployments)
    const totalPodsForNs = useStore((state) => state.selectedNamespaceTotalPods)
    const totalPodsRunningForNs = useStore((state) => state.selectedNamespaceTotalRunningPods)
    const totalPodsNotRunningForNs = useStore((state) => state.selectedNamespaceTotalUnavailablePods)

    //getters from store
    const getNamespaces = useStore((state) => state.getNamespaces)
    const getTotalDeployments = useStore((state) => state.getDeploymentsTotalForNamespaces)
    const getTotalPods = useStore((state) => state.getPodsForNamespaces)
    const getTotalPodsRunning = useStore((state) => state.getPodsRunningForNamespaces)
    const getTotalPodsNotRunning = useStore((state) => state.getPodsNotRunningForNamespaces)

    const [serviceAccountsList, setServiceAccountsList] = useState([])
    const [serviceAccountDetails, setServiceAccountDetails] = useState({})
    const descriptionSnippets = [
        "Total number of deployments",
        "Total number of pods",
        "Total running pods",
        "Total unavailable pods"
    ]

    const [drawerState, setDrawerState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState({...drawerState, [anchor]: open});
    };

    useEffect(() => {
        getNamespaces()
    }, [query]);

    useEffect(() => {
        if (selectedNamespace !== "") {
            getTotalDeployments(selectedNamespace)
            getTotalPods(selectedNamespace)
            getTotalPodsRunning(selectedNamespace)
            getTotalPodsNotRunning(selectedNamespace)
            getServiceAccounts(selectedNamespace)
        }
    }, [selectedNamespace])

    const getServiceAccounts = (namespace) => {
        let saObjectList = []
        kubernetesService.getServiceAccountsForNs(selectedNamespace).then(result => {
            let count = 1
            result.items.forEach(sa => {
                let saObject = {
                    "id": count,
                    "name": sa.metadata.name,
                    "creationTime": sa.metadata.creationTimestamp,
                    "apiVersion": sa.apiVersion
                }
                saObjectList.push(saObject)
                count++
            })
            setServiceAccountsList(saObjectList)
        })
    }

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 550}}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            {serviceAccountDetails.metadata !== undefined &&
                <Box sx={{overflow: 'auto'}}>
                    <Box sx={{marginTop: 12, marginLeft: 1, marginRight: 1, marginBottom: 1}}>

                        <Grid container spacing={2}>
                            <Grid item xs={11}>
                                <Typography style={{fontWeight: 600}} variant="h7">Service
                                    Account: {serviceAccountDetails.metadata.name}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <CopyToClipboard sx={{padding: 0}} text={serviceAccountDetails.metadata.name}>
                                    <IconButton aria-label="copy label">
                                        <ContentCopyOutlined/>
                                    </IconButton>
                                </CopyToClipboard>
                            </Grid>
                        </Grid>

                    </Box>
                    <Divider/>
                    <Box sx={{overflow: 'auto'}}>
                        <Box sx={{marginTop: 5, marginLeft: 1, marginRight: 1, marginBottom: 1}}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Box sx={{fontSize: 15}}>
                                        Created
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{fontSize: 15}}>
                                        {serviceAccountDetails.metadata.creationTimestamp}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box sx={{overflow: 'auto'}}>
                        <Box sx={{marginTop: 1, marginLeft: 1, marginRight: 1, marginBottom: 1}}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Box sx={{fontSize: 15}}>
                                        Name
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{fontSize: 15}}>
                                        {serviceAccountDetails.metadata.name}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box sx={{overflow: 'auto'}}>
                        <Box sx={{marginTop: 1, marginLeft: 1, marginRight: 1, marginBottom: 1}}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Box sx={{fontSize: 15}}>
                                        Namespace
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{fontSize: 15}}>
                                        {serviceAccountDetails.metadata.namespace}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider/>
                    <Box sx={{overflow: 'auto'}}>
                        <Box sx={{marginTop: 1, marginLeft: 1, marginRight: 1, marginBottom: 1}}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Box sx={{fontSize: 15}}>
                                        UID
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{fontSize: 15}}>
                                        {serviceAccountDetails.metadata.uid}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/*<ListItem button key={"Workloads"} sx={{marginTop: 10}}>*/}
                    {/*    <ListItemIcon>*/}
                    {/*        <BlurOn/>*/}
                    {/*    </ListItemIcon>*/}
                    {/*    <ListItemText primary={"Service Account Details"}/>*/}
                    {/*</ListItem>*/}
                    <Divider/>
                    {/*<List>*/}
                    {/*    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                    {/*        <ListItem button key={text}>*/}
                    {/*            <ListItemIcon>*/}
                    {/*                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                    {/*            </ListItemIcon>*/}
                    {/*            <ListItemText primary={text}/>*/}
                    {/*        </ListItem>*/}
                    {/*    ))}*/}
                    {/*</List>*/}
                    {/*<Divider/>*/}
                    {/*<List>*/}
                    {/*    {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                    {/*        <ListItem button key={text}>*/}
                    {/*            <ListItemIcon>*/}
                    {/*                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                    {/*            </ListItemIcon>*/}
                    {/*            <ListItemText primary={text}/>*/}
                    {/*        </ListItem>*/}
                    {/*    ))}*/}
                    {/*</List>*/}
                </Box>
            }
        </Box>
    );

    const toggleServiceAccountDrawer = (item) => {
        let sa = serviceAccountsList[item - 1]
        if (sa !== undefined) {
            kubernetesService.getSpecifiedServiceAccountDetails(sa, selectedNamespace).then(res => {
                console.log(res)
                    setServiceAccountDetails(res)
                    setDrawerState({...drawerState, ["right"]: true});
                }
            )
        }
    }

    return (
        <div>
            <CustomDataGridNamespace namespaces={namespaces} columns={columns}/>
            <div style={{padding: 20}}>
                <Typography align={"left"} variant={"h6"}>Namespace Details</Typography>
                <Box sx={{m: 2}}/>
                {selectedNamespace !== "" &&
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Deployments"} description={descriptionSnippets[0]}
                                            total={totalDeploymentsForNs} loading={loading}
                                            namespace={selectedNamespace}/>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Pods"} description={descriptionSnippets[1]}
                                            total={totalPodsForNs} loading={loading} namespace={selectedNamespace}/>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Running Pods"} description={descriptionSnippets[2]}
                                            total={totalPodsRunningForNs} loading={loading}
                                            namespace={selectedNamespace}/>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomCardView overview={"Unavailable Pods"} description={descriptionSnippets[3]}
                                            total={totalPodsNotRunningForNs} loading={loading}
                                            namespace={selectedNamespace}/>
                        </Grid>
                    </Grid>
                }
                {selectedNamespace === "" &&
                    <Typography align={"left"}>Select a namespace to view more information...</Typography>
                }
            </div>
            {selectedNamespace !== "" &&
                <CustomDataGridServiceAccount serviceAccounts={serviceAccountsList} columns={columns}
                                              function={toggleServiceAccountDrawer}/>
            }
            <Button onClick={toggleDrawer("right", true)}>as</Button>
            <React.Fragment key="right">

                <Drawer
                    anchor="right"
                    open={drawerState["right"]}
                    onClose={toggleDrawer("right", false)}
                >
                    {list("right")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default Namespaces;