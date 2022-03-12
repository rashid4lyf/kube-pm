import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    Autocomplete,
    Box,
    Button,
    Chip, CircularProgress,
    Grid,
    IconButton,
    Paper,
    Popper,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import CustomDataGridDeployments from "../components/CustomDataGridDeployments";
import useStore from "../state/Store";
import CustomChip from "../components/CustomChip";
import {RestartAlt, RestartAltOutlined} from "@mui/icons-material";
import RestartDialog from "../components/RestartDialog";
import KubernetesService from "../services/KubernetesService";

function Deployment(props) {

    let { namespace } = useParams();
    let [query, setQuery] = useState(false)
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")

    const namespaces = useStore((state) => state.namespaces)
    const getNamespaces = useStore((state) => state.getNamespaces)

    const deployments = useStore((state) => state.deployments)
    const getDeployments = useStore((state) => state.getDeploymentsForNamespace)

    const [openAuto, setOpenAuto] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;


    useEffect(() => {
        getNamespaces()
        if (namespace !== undefined) {
            getDeployments(namespace)
        }
    }, [query]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await getNamespaces();

            if (active) {
                setOptions([...namespaces]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const renderChips = (cellValues) => {
        const items = []
        if (cellValues.row.labels !== null) {
            const map = new Map(Object.entries(cellValues.row.labels));
            let count = 0;
            let extra = 0;
            let allLabels = ""
            map.forEach((value, key) => {
                count++
                if (count <= 2) {
                    items.push(<CustomChip key={key} chipKey={key} chipValue={value}/>)
                    allLabels = allLabels.concat(key).concat(":").concat(value).concat("; ");
                } else {
                    allLabels = allLabels.concat(key).concat(":").concat(value).concat("; ");
                    extra++
                }
            });
            if (extra > 1) {
                items.push(<Box key={allLabels} sx={{ marginTop:1}}><Tooltip title={allLabels}><Chip label={"+" + extra}/></Tooltip></Box>)
            }

            return items
        }
        return items

    }

    const handleClick = (cellValues) => {
        setSelectedValue(cellValues.row.deploymentName)
        setOpenDialog(true)
    }

    const onCloseDialog = (selectedValue, deploymentName) => {
      if (selectedValue === "confirm") {
          KubernetesService.restartDeployment(namespace, deploymentName).then(r =>
          console.log(r.data))
      }
      setOpenDialog(false)
    }

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.125},
        {field: 'deploymentName', headerName: "Deployment Name", flex: 0.5},
        {field: 'labels', headerName: "Labels", width: 400, renderCell: (cellValues) => {
                return (

                    <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', width: 400, p: 1, height: '100%', flexDirection: "row", overflow: "hidden" }}>
                        {renderChips(cellValues)}
                    </Box>
                );
            }},
        {field: 'status', headerName: "status", flex: 0.25},
        {field: 'age', headerName: "age", flex: 0.25},
        {field: 'actions', headerName: "actions", flex: 0.25, renderCell: (cellValues => {
            return (
                <Tooltip title="Restart">
                    <IconButton aria-label="restart deployment" onClick={() => handleClick(cellValues)}>
                        <RestartAltOutlined></RestartAltOutlined>
                    </IconButton>
                </Tooltip>
            )
            })}
    ]

    return (
        <div style={{padding: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography align={'left'} variant={"h6"}>{namespace} deployments</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        disablePortal
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}
                        id="combo-box-demo"
                        options={options}
                        loading={loading}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Asynchronous"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <CustomDataGridDeployments deployments={deployments} columns={columns}></CustomDataGridDeployments>
            <RestartDialog selectedValue={selectedValue} onClose={onCloseDialog} open={openDialog}></RestartDialog>
        </div>
    );
}

export default Deployment;
