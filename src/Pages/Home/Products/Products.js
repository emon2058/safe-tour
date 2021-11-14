import React, { useEffect,useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Product from '../Product/Product';
const Products = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    return (
        <Container>
            <Typography variant="h3">Products </Typography>
            <Grid container spacing={2}>
                {products.map(product=>product.id<7?
                <Product 
                key={product.id}
                product={product}/>:'' 
                )}
            </Grid>
        </Container>
    );
};

export default Products;