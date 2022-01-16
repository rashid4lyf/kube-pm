import React from 'react';
import {
    AppBar,
    Box,
    Button,
    createTheme,
    IconButton,
    MenuItem,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import {teal} from "@mui/material/colors";
import {useNavigate} from 'react-router-dom';

function Header() {

    const theme = createTheme({
        palette: {
            primary: {
                main: teal[700],
            },
            secondary: {
                main: '#ffeb3b',
            },
        },
    });

    const pages = ['Namespaces', 'Deployments', 'Pods'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSelectNavMenu = (page) => {
        console.log(page)
        if (page.toLowerCase() === "deployments") {
            navigate('/deployments')
        }
        if (page.toLowerCase() === "namespaces") {
            navigate('/namespaces')
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <Box sx={{flexGrow: 1}}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}>
                            Kubernetes Pod Manager
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleOpenNavMenu}
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleSelectNavMenu.bind(this, page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}/>
                        <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleSelectNavMenu.bind(this, page)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>

    );
}

export default Header;