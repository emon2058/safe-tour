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
        fetch('https://visibly-bright-server-production.up.railway.app/orders')
        .then(res => res.json())
        .then(data=>setAllOrders(data))
    },[allOrders])
    
    const handleRemoveOrder = id =>{
      const url=`https://visibly-bright-server-production.up.railway.app/orders/${id}`
      console.log(url)
      fetch(url,{
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data =>{
        if(data.deletedCount){
          console.log('deleted')
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
                {order.payment?'Paid':
                  <Link style={{textDecoration:'none'}} to={`/dashboard/pay/${order._id}`}>
                    <Button variant="contained">Pay</Button>
                  </Link>}
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