import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

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
                <Link to='/'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Visibly Bright
                    </Typography>
                </Link>
                <Link to='/products'>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Products
                    </Typography>
                </Link>
                <Button color="inherit">Login</Button>
                <Link to="/dashboard">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        DashBoard
                    </Typography>
                </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;