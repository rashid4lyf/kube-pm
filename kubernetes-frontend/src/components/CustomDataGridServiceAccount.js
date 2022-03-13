import React from 'react';
import {Box, Typography} from "@mui/material";
import {DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton} from "@mui/x-data-grid";
import useStore from "../state/Store";

function CustomDataGridServiceAccount(props) {

    const namespace = props.namespace

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton/>
                <GridToolbarFilterButton/>
            </GridToolbarContainer>
        );
    }


    return (
        <div style={{padding: 20}}>
            <Typography align={'left'} variant={"h6"}>Service Accounts</Typography>
            <Box sx={{m: 2}}/>
            <div style={{height: 400, width: "100%"}}>
                <DataGrid
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    rows={props.serviceAccounts}
                    columns={props.columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={item => props.function(item)}
                />
            </div>
        </div>
    );
}

export default CustomDataGridServiceAccount;