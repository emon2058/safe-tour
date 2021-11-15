import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Rating } from '@mui/material';

const Review = ({review}) => {
    const {name,ratings,description} = review;
    return (
        <Grid xs={6} md={4} sx={{p:2}}>
            <Paper elevation={3}>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
                <Rating name="read-only" value={ratings} readOnly />

                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Review;