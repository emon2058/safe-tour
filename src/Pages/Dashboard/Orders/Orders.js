import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Order from '../Order/Order';
import useAuth from '../../../hooks/useAuth';

const Orders = () => {
    const [orders,setOrders] = useState([]);
    const {user,token} = useAuth();

    useEffect(()=>{
        const url = `https://visibly-bright-server-production.up.railway.app/orders?email=${user.email}`
        const url1 = `http://localhost:5000/orders?email=${user.email}`
        fetch(url,{
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])
    console.log(orders)
    return (
        <Container>
            <Typography variant="h3" sx={{mt:5}}>ORDERS </Typography>
            <Grid container spacing={2}>
                {orders.length?orders?.map(order=>
                    <Order 
                    key={order.id}
                    order={order}/>
                    ):''}
            </Grid>
        </Container>
    );
};

export default Orders;