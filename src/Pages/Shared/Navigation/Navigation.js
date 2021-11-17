import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navigation = () => {
    const {user,logout,admin}=useAuth();
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
                    <Typography variant="h6" component="div" sx={{ mx:'auto',flexGrow: 1 }}>
                        Products
                    </Typography>
                </NavLink>
                {user.email?<Box>
                    {admin?<NavLink to='/dashboard/manageOrders'>
                    <Button color="inherit">DASHBOARD</Button>
                </NavLink>:<NavLink to='/dashboard/orders'>
                    <Button color="inherit">DASHBOARD</Button>
                </NavLink>}
                <Typography variant="h6" component="span" sx={{ flexGrow: 1 ,color:'yellow'}}>
                        {user.displayName||user.email}
                    </Typography>
                <Button onClick={logout} color="inherit">Logout</Button>
                </Box>:<NavLink to='/login'>
                        <Button color="inherit">Login</Button>
                    </NavLink>
                }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;