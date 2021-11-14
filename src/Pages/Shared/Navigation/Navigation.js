import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <NavLink to='/'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Visibly Bright
                    </Typography>
                </NavLink>
                <NavLink to='/allProducts'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Products
                    </Typography>
                </NavLink>
                <Button color="inherit">Login</Button>
                <NavLink to="/dashboard">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        DashBoard
                    </Typography>
                </NavLink>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;