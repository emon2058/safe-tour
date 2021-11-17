import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const AddProduct = () => {
    const [successAlert,setSuccessAlert] = useState(false);
    const [AddProduct,setAddProduct] = useState({
        img:'',
        name:'',
        description:'',
        price:''
    });
    const handleOnBlur = e =>{
        const name = e.target.name;
        const value = e.target.value;
        const newField = {...AddProduct}
        newField[name] = value;
        setAddProduct(newField);
    }
    const handleAddProduct = (e) =>{
        console.log(AddProduct)
        fetch('http://localhost:5000/products',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(AddProduct)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                setSuccessAlert(true);
            }
        })
        setSuccessAlert(true)
        e.preventDefault()
    }
    return (
        <Container>
            <Typography sx={{mt:6}} variant="h3" gutterBottom component="div">
                Add Product
          </Typography>
          <form onSubmit={handleAddProduct}>
            <TextField sx={{width:'75%',mb:2}}
            placeholder="image url"
            name="img"
            onBlur={handleOnBlur}
            defaultValue={AddProduct.img}
            variant="standard" /><br/>
            <TextField 
            sx={{width:'75%',mb:2}}
            placeholder="Product Name"
            name="name" 
            onBlur={handleOnBlur}
            defaultValue={AddProduct.name}
            variant="standard" />
            <br/>
            <TextField sx={{width:'75%',mb:2}}
            placeholder="Description"
            name="description"
            onBlur={handleOnBlur}
            defaultValue={AddProduct.description}
            variant="standard" /><br/>
            <TextField 
            sx={{width:'75%',mb:2}}
            placeholder="Price"
            name="price" 
            onBlur={handleOnBlur}
            defaultValue={AddProduct.price}
            variant="standard" />
            <br/>
            <Button type='submit' variant="contained">Submit</Button>
          </form>
          {successAlert &&
          <Alert severity="success">Product Added successfully</Alert>}

        </Container>
    );
};

export default AddProduct;