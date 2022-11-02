import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Order = ({order}) => {
    const {_id,img,productName,description,price} = order;
    const handleRemoveOrder = (id)=>{
        const url=`https://visibly-bright-server-production.up.railway.app/orders/${id}`
        fetch(url,{
          method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
          if(data.deletedCount){
            console.log('deleted')
          }
        })
    }
    console.log('order',order)
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card sx={{p:2}}>
                <CardMedia
                    component="img"
                    height="250"
                    image={img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {description}
                    </Typography>
                </CardContent>
                <Stack direction="row" justifyContent="center" sx={{mx:2}}>
                    <Typography variant="h6" gutterBottom component="span">
                        ${price}
                    </Typography>
                    {/* {order.payment?'Paid':
                  <Link style={{textDecoration:'none',margin:'0 auto'}} to={`/dashboard/pay/${order._id}`}>
                    <Button variant="contained">Pay</Button>
                  </Link>}
                  <Button variant="outlined" onClick={()=>handleRemoveOrder(order._id)}>Delete</Button> */}
                </Stack>
            </Card>
        </Grid>
    );
};

export default Order;