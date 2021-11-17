import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Alert, Container, TextField, Typography } from '@mui/material';
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

    const [showAlert,setShowAlert]=useState(false)
    const [userInfo,setUserInfo] = useState({
        address: '',
        phone: ''
    })
    const {id}=useParams();
    const history = useHistory();
    useEffect(()=>{
        const url = `http://localhost:5000/product/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data => setOrder(data))
    },[])
    const handleOnBlur = e =>{
        const name = e.target.name;
        const value = e.target.value;
        const newField = {...userInfo};
        newField[name] = value;
        setUserInfo(newField);
    }
    const handleOrderSubmit=e=>{
        const orders = {
            name:user.displayName,
            productName:order.name,
            description:order.description,
            email:user.email,
            img:order.img,
            price:order.price,
            ...userInfo
        }
        fetch('http://localhost:5000/orders',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(orders)
        })
        .then(res => res.json())
        .then(data=>{
            if(data.insertedId){
                setShowAlert(true);
            }
        })
        .then(() =>{
            history.push('/')
        })
        console.log(orders)
        e.preventDefault()
    }
    return (
        <Container>
            <Typography variant="h3">Orders</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                    <form onSubmit={handleOrderSubmit}>
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
                        value={order.discountPrice?order.discountPrice:parseFloat(order.price).toFixed(2)}
                        variant="standard" />
                        <TextField sx={{width:'75%',mb:2}}
                        placeholder='Your Address'
                        name="address"
                        onBlur={handleOnBlur}
                        variant="standard" />
                        <TextField sx={{width:'75%',mb:2}}
                        placeholder="your phone number"
                        name="phone" 
                        onBlur={handleOnBlur}
                        defaultValue={userInfo.phone}
                        variant="standard" />
                        <br/>
                        <Button type='submit' variant="contained">Submit</Button>
                    </form>
                    {showAlert && <Alert severity="success">Order success</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderNow;