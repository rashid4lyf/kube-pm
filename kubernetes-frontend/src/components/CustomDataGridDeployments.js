import React from 'react';
import {Box, Typography} from "@mui/material";
import {DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton} from "@mui/x-data-grid";
import useStore from "../state/Store";

function CustomDataGridNamespace(props) {

    const setSelectedDeploymentDetail = useStore((state) => state.setSelectedDeploymentDetail)

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
            </GridToolbarContainer>
        );
    }

    function setSelectedDeployment(item) {
        let name = props.deployments.find(element => element.id === item[0]).name
        console.log(name)
        setSelectedDeploymentDetail(name)
    }

    return (
        <div>
            <Box sx={{m: 2}}/>
            <div style={{height: 400, width: "100%"}}>
                <DataGrid
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    rows={props.deployments}
                    columns={props.columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={item => setSelectedDeployment(item)}
                />
            </div>
        </div>
    );
}

export default CustomDataGridNamespace;