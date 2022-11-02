import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { makeStyles } from '@mui/styles';
import { Container, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Navigation = () => {
    const {user,logout,admin}=useAuth();

    const [state, setState] = React.useState(false);
    
    const theme = useTheme();
    const useStyle = makeStyles({
        navItem:{
            color:'white',
            marginRight:'10px',
            textDecoration:'none'
        },
        navIcon:{
            [theme.breakpoints.up('sm')]: {
                display:'none !important',
              },
        },
        navItemContainer:{
            [theme.breakpoints.down('sm')]: {
                display:'none !important',
              },
        }
    })
    const {navItem,navIcon,navItemContainer} = useStyle();
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{backgroundColor:'steelblue'}}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    className={navIcon}
                    onClick={()=>setState(true)}
                >
                    <MenuIcon />
                </IconButton>
                <NavLink className={navItem} to='/'>
                    <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                        Visibly Bright
                    </Typography>
                </NavLink>
                <Box component="div" className={navItemContainer}>
                    <NavLink className={navItem} to='/allProducts'>
                        <Typography variant="h6" component="span">
                            Products
                        </Typography>
                    </NavLink>
                    {user.email?<Box component="span">
                        {admin?<NavLink  className={navItem} style={{textDecoration:'none'}} to='/dashboard/manageOrders'>
                        <Button color="inherit">DASHBOARD</Button>
                    </NavLink>:<NavLink  className={navItem} style={{textDecoration:'none'}} to='/dashboard/orders'>
                        <Button color="inherit">DASHBOARD</Button>
                    </NavLink>}
                    <Typography variant="h6" component="span" sx={{color:'yellow'}}>
                            {user.displayName||user.email}
                        </Typography>
                    <Button onClick={logout} color="inherit">Logout</Button>
                    </Box>:<NavLink  className={navItem} to='/login'>
                            <Button color="inherit">Login</Button>
                        </NavLink>
                    }
                </Box>
                </Toolbar>
            </AppBar>
        </Box>
        <React.Fragment>
          
          <Drawer
            open={state}
            onClose={()=>setState(false)}
          >
          <Box
          sx={{ width: 250 ,backgroundColor:'steelblue',color:'white'}}
          role="presentation">
            <List>
                <ListItem button>
                  <NavLink className={navItem} to='/'>
                    <ListItemText >Home</ListItemText>
                  </NavLink>
                </ListItem>
                <Divider sx={{border:'1px solid gold'}}/>
                <ListItem button>
                  <NavLink className={navItem} to='/allProducts'>
                    <ListItemText >Products</ListItemText>
                  </NavLink>
                </ListItem>
                <Divider sx={{border:'1px solid gold'}}/>
                {user.email?<Box component="span">
                        {admin?<ListItem button>
                  <NavLink className={navItem} to='/dashboard/manageOrders'>
                    <ListItemText >Dashboard</ListItemText>
                  </NavLink>
                </ListItem>:<ListItem button>
                  <NavLink className={navItem} to='/dashboard/orders'>
                    <ListItemText >Dashboard</ListItemText>
                  </NavLink>
                </ListItem>}
                <Divider sx={{border:'1px solid gold'}}/>
                <ListItem button>
                  <Button className={navItem} onClick={logout}>Logout</Button>
                </ListItem>
                </Box>:<NavLink  className={navItem} to='/login'>
                        <Button color="inherit">Login</Button>
                    </NavLink>}
              </List>

            </Box>
          </Drawer>
        </React.Fragment>
        </>
    );
};

export default Navigation;