import React from 'react';
import {Avatar, Box, Card, CardContent, CardHeader, CircularProgress, Typography} from "@mui/material";
import {red, teal} from "@mui/material/colors";

function CustomCardView(props) {
    return (
        <Card sx={{ minHeight: 250}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: teal[500]}} aria-label="deployments">
                        {props.overview[0]}
                    </Avatar>
                }
                title={props.overview}
                subheader={props.description}
            />

            <CardContent>
                { props.total === "" &&
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                }
                <Typography variant={"h2"}>{props.total}</Typography>
            </CardContent>
        </Card>
    );
}

export default CustomCardView;