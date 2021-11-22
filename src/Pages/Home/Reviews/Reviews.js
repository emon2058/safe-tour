import { Container, Grid, Typography } from '@mui/material';
import React ,{useEffect, useState} from 'react';
import Review from '../Review/Review';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        fetch('https://immense-sea-06792.herokuapp.com/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])
    return (
        <Container>
            <Typography variant="h3">Reviews</Typography>
            <Grid container>
                {reviews.map(review=><Review
                    key = {review._id}
                    review={review}></Review>)}
            </Grid>
        </Container>
    );
};

export default Reviews;