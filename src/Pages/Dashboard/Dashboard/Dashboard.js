import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddReview from '../AddReview/AddReview';
import Orders from '../Orders/Orders';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import useAuth from '../../../hooks/useAuth';
import { Button } from '@mui/material';
import DashboardHome from '../DashboardHome/DashboardHome';
import Pay from '../Pay/Pay';
import ManageAllOrders from '../ManageAllOrders/ManageAllOrders';
import AddProduct from '../AddProduct/AddProduct';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
const drawerWidth = 240;
const Dashboard = (props) => {
    let { path, url } = useRouteMatch();

    const {admin}=useAuth();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <div>
        <Toolbar />
        <Divider />
        <List>
         {!admin?<Box> 
          {/* {admin && */}
           <Link style={{textDecoration:'none'}} to={`${url}/orders`}><Button color="inherit">Orders</Button></Link><br/>
           <Link style={{textDecoration:'none'}} to={`${url}/pay`}><Button color="inherit">Pay</Button></Link><br/>
           <Link style={{textDecoration:'none'}} to={`${url}/addReview`}><Button color="inherit">Review</Button></Link><br/>
           </Box>:
           <Box><Link style={{textDecoration:'none'}} to={`${url}/manageOrders`}><Button color="inherit">All Orders</Button></Link><br/>
           <Link style={{textDecoration:'none'}} to={`${url}/addProduct`}><Button color="inherit">Add a Product</Button></Link><br/>
          <Link style={{textDecoration:'none'}} to={`${url}/makeAdmin`}><Button color="inherit">Make Admin</Button></Link><br/>
          </Box>}
        </List>
        <Divider />
      </div>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Link style={{textDecoration:'none', color:'white'}} to='/'>
            <Typography variant="h6" noWrap component="div">
              Visibly Light
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Switch>
        <Route exact path={path}>
          <DashboardHome/>
        </Route>
        <Route path={`${path}/orders`}>
          <Orders/>
        </Route>
        <Route path={`${path}/pay/:id`}>
          <Pay/>
        </Route>
        <Route path={`${path}/addReview`}>
          <AddReview/>
        </Route>
        <AdminRoute path={`${path}/manageOrders`}>
          <ManageAllOrders/>
        </AdminRoute>
        <AdminRoute path={`${path}/addProduct`}>
          <AddProduct/>
        </AdminRoute>
        <AdminRoute path={`${path}/makeAdmin`}>
          <MakeAdmin/>
        </AdminRoute>
      </Switch>
      </Box>
      </Box>
    );
};

export default Dashboard;