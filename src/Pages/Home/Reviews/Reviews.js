import { Container, Grid, Typography } from '@mui/material';
import React ,{useEffect, useState} from 'react';
import Review from '../Review/Review';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        fetch('review.json')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])
    return (
        <Container>
            <Typography variant="h3">Reviews</Typography>
            <Grid container>
                {reviews.map(review=><Review
                    key = {review.id}
                    review={review}></Review>)}
            </Grid>
        </Container>
    );
};

export default Reviews;