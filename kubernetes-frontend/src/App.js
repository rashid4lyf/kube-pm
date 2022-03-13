import './App.css';
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import {Box, CssBaseline, Toolbar} from "@mui/material";
import React from "react";

function App() {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Header/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}

export default App;
