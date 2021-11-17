import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
  
const ManageAllOrders = () => {
    const [allOrders,setAllOrders] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/orders')
        .then(res => res.json())
        .then(data=>setAllOrders(data))
    },[])
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
                <TableCell align="right">Shipped</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

export default ManageAllOrders;