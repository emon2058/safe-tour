import * as React from 'react';
import  { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const ManageAllOrders = () => {

    const[shipped,setShipped] = useState('Shipped');
    const [allOrders,setAllOrders] = useState([]);

    useEffect(()=>{
        fetch('https://immense-sea-06792.herokuapp.com/orders')
        .then(res => res.json())
        .then(data=>setAllOrders(data))
    },[])
    
    const handleRemoveOrder = id =>{
      const url=`https://immense-sea-06792.herokuapp.com/orders/${id}`
      console.log(url)
      fetch(url,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data =>{
        if(data.deletedCount){
          window.location.reload()
        }
      })
    }
    let id=1;
    return (
      <TableContainer component={Paper} sx={{mt:6}}>
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrders.map((order) => (
              <TableRow
                key={order._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id++}
                </TableCell>
                <TableCell component="th" scope="row">
                  {order.name}
                </TableCell>
                <TableCell align="right">{order.email}</TableCell>
                <TableCell align="right">{order.productName}</TableCell>
                <TableCell align="right">{order.price}</TableCell>
                <TableCell align="right">
                  <Link sx={{textDecoration:'none',backgroundColor:'green'}} to={`/dashboard/pay/${order._id}`}>
                    <Button variant="contained">Pay</Button>
                  </Link>
                  </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={()=>handleRemoveOrder(order._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    );
};

export default ManageAllOrders;