import { Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51HWpvyLUnNLJLkiJWVrzU1PPdePbwckI5m0FTZzWreuUdCIWpV8bkENANwDZgY9pi8gSsIPdxB5a12pGJPxuU7ZI00xavVxc1M');
const Pay = () => {
  const {id} = useParams()
  const [order,setOrder] = useState({})
  useEffect(()=>{
    fetch(`http://localhost:5000/orders/${id}`)
    .then(res=>res.json())
    .then(data => setOrder(data))
  },[id])
    return (
      <>
        <Typography sx={{mt:6}} variant="h6" gutterBottom component="div">
        {order.name}
      </Typography>
        <Typography sx={{mt:6}} variant="p" gutterBottom component="div">
        Product Name : {order.productName} <br/>Price : {order.price}
      </Typography>
      <Elements stripe={stripePromise} >
      <CheckoutForm order={order}/>
    </Elements>
      </>
    );
};

export default Pay;