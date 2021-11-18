import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';

const Order = ({order}) => {
    const {img,productName,description,price} = order;
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
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
                    <Typography variant="h6" gutterBottom component="div">
                        ${price}
                    </Typography>
                </Stack>
            </Card>
        </Grid>
    );
};

export default Order;