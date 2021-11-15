import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import  Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const OrderNow = () => {
    const [order,setOrder] = useState([]);

    const {user} = useAuth();
    const {id}=useParams();

    useEffect(()=>{
        const url = `http://localhost:5000/product/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data => setOrder(data))
    },[])
    const handleOrder=e=>{
        e.preventDefault()
    }
    return (
        <Container>
            <Typography variant="h3">Orders</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="250"
                            image={order.img}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {order.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {order.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <form onSubmit={handleOrder}>
                        <TextField sx={{width:'75%',mb:2}}
                        disabled
                        value={user.displayName}
                        variant="standard" />
                        <TextField sx={{width:'75%',mb:2}} 
                        disabled
                        value={user.email}
                        variant="standard" />
                        <TextField sx={{width:'75%',mb:2}}
                        disabled
                        value={order.price}
                        variant="standard" />
                        <TextField sx={{width:'75%',mb:2}}
                        placeholder='Your Address'
                        name="address"
                        variant="standard" />
                        <TextField sx={{width:'75%',mb:2}}
                        placeholder="your phone number"
                        name="phone" 
                        variant="standard" />
                        <br/>
                        <Button type='submit' variant="contained">Submit</Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderNow;