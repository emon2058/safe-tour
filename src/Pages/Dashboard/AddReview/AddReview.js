import { Container, TextField, Typography,Button, Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const AddReview = () => {
    const [addReviews,setAddReviews] = useState({
        ratings:0,
        description:''
    });
    const {user} = useAuth();

    const history = useHistory();
    const handleOnBlur = e =>{
        const name = e.target.name;
        const value = e.target.value;
        const newField = {...addReviews};
        newField[name] = value;
        setAddReviews(newField);
    }

    const handleReviewSubmit=e=>{
        const reviews = {
            name:user.displayName,
            ...addReviews
        }
        fetch('http://localhost:5000/reviews',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(reviews)
        })
        .then(res => res.json())
        .then(data=>{
            if(data.insertedId){
                history.push('/');
            }
        })
        console.log(reviews)
        e.preventDefault()
    }
    return (
        <Container>
            <Typography sx={{mt:6}} variant="h3" gutterBottom component="div">
                REVIEW 
          </Typography>
          <form onSubmit={handleReviewSubmit}>
                <TextField sx={{width:'75%',mb:2}}
                disabled
                value={user.displayName || ''}
                variant="standard" />
                <Typography component="legend">Give us Ratings</Typography>
                    <Rating
                    name="simple-controlled"
                    value={addReviews.ratings}
                    onChange={(event, newValue) => {
                        setAddReviews({...addReviews,
                        ratings:newValue});
                    }}
                    /><br/>
                <TextField 
                sx={{width:'75%',mb:2}}
                placeholder="your comment to us"
                name="description" 
                onBlur={handleOnBlur}
                defaultValue={addReviews.description}
                variant="standard" />
                <br/>
                <Button type='submit' variant="contained">Submit</Button>
            </form>
        </Container>
    );
};

export default AddReview;