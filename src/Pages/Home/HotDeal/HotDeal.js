import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const HotDeal = ({hotDeal}) => {
    const {_id,img,name,price,discountPrice,description} = hotDeal;
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
                    {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {description}
                    </Typography>
                </CardContent>
                <Stack direction="row" justifyContent="space-between" sx={{mx:2}}>
                    <CardActions>
                        <Link style={{textDecoration:'none'}} to={`/product/${_id}`}>
                            <Button variant="contained">Order Now</Button>
                        </Link>
                    </CardActions>
                    <Stack>
                        <Typography sx={{textDecoration:'line-through', color:'gray'}} variant="h6" gutterBottom component="div">
                            ${price}
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div">
                            ${discountPrice}
                        </Typography>
                    </Stack>
                </Stack>
            </Card>
        </Grid>
    );
};

export default HotDeal;