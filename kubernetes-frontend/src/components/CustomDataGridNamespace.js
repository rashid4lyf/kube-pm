import React from 'react';
import {Box, Typography} from "@mui/material";
import {DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton} from "@mui/x-data-grid";
import useStore from "../state/Store";

function CustomDataGridNamespace(props) {

    const setSelectedNamespaceDetail = useStore((state) => state.setSelectedNamespaceDetail)

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
            </GridToolbarContainer>
        );
    }

    function setSelectedNamespace(item) {
        let name = props.namespaces.find(element => element.id === item[0]).name
        setSelectedNamespaceDetail(name)
    }

    return (
        <div style={{padding: 20}}>
            <Typography align={'left'} variant={"h6"}>Namespaces</Typography>
            <Box sx={{m: 2}}/>
            <div style={{height: 400, width: "100%"}}>
                <DataGrid
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    rows={props.namespaces}
                    columns={props.columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={item => setSelectedNamespace(item)}
                />
            </div>
        </div>
    );
}

export default CustomDataGridNamespace;