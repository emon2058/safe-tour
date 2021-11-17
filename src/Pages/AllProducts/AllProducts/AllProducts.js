import React, { useEffect,useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Product from '../Product/Product';
import Navigation from '../../Shared/Navigation/Navigation';
const AllProducts = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return (
        <Container>
            <Typography variant="h3">Products </Typography>
            <Grid container spacing={2}>
                {products.map(product=>
                    <Product 
                    key={product._id}
                    product={product}/>
                    )}
            </Grid>
        </Container>
    );
};

export default AllProducts;