import React from 'react';
import {Box, Chip, Tooltip} from "@mui/material";

function CustomChip(props) {

    return (
        <Box sx={{margin: 1}}>
            <Tooltip title={props.chipKey + ":" + props.chipValue}>
                <Chip sx={{width: 140}} label={props.chipKey + ":" + props.chipValue} variant="outlined"/>
            </Tooltip>
        </Box>
    );
}

export default CustomChip;