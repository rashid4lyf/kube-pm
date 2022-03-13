import React from 'react';
import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {BlurOn, Storage} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function PermanentDrawerLeft(props) {

    const drawerWidth = 240;

    const navigate = useNavigate()

    const handleClick = (text) => {
        console.log(text)
        if (text.toLowerCase() === "deployments") {
            navigate('/deployments')
        }
        if (text.toLowerCase() === "namespaces") {
            navigate('/namespaces')
        }
    }
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <ListItem button key={"Workloads"} sx={{marginTop: 1}}>
                    <ListItemIcon>
                        <BlurOn/>
                    </ListItemIcon>
                    <ListItemText primary={"Workloads"}/>
                </ListItem>
                <Divider/>
                <List>
                    {['Namespaces', 'Deployments', 'Pods', 'Daemon Sets', 'Jobs'].map((text, index) => (
                        <ListItem button key={text} onClick={() => handleClick(text)}>
                            <ListItemIcon>
                                <div/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    <ListItem button key={"Config & Storage"}>
                        <ListItemIcon>
                            <Storage/>
                        </ListItemIcon>
                        <ListItemText primary={"Config & Storage"}/>
                    </ListItem>
                    <Divider/>
                    {['CRDs', 'Config Maps', 'Secrets'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                <div/>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default PermanentDrawerLeft;
