import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress, IconButton,
    Typography
} from "@mui/material";
import {red, teal} from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from 'react-router-dom';

function CustomCardView(props) {

    const navigate = useNavigate()

    const onViewMoreClick = () => {

        if (props.overview.toLowerCase() === "deployments") {
            navigate("/deployments/".concat(props.namespace))
        }
    }

    return (
        <Card sx={{minHeight: 250, textAlign: 'left'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: teal[500]}} aria-label="deployments">
                        {props.overview[0]}
                    </Avatar>
                }
                title={props.overview}
                subheader={props.description}
            />

            <CardContent sx={{textAlign: 'center'}}>
                {props.loading &&
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress/>
                    </Box>
                }
                {!props.loading &&
                    <Typography variant={"h2"}>{props.total}</Typography>
                }
            </CardContent>
            <CardActions sx={{justifyContent: 'end'}}>
                <Button color={"secondary"} size="small" onClick={onViewMoreClick}>View details</Button>
            </CardActions>
        </Card>
    );
}

export default CustomCardView;