import { Alert, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [successAlert,setSuccessAlert] = useState(false);
    const [email,setEmail] = useState('');
    const {token} = useAuth()
    const handleOnBlur = e =>{
        setEmail(e.target.value)
    }
    const handleAdminSubmit = e =>{
        const user={email};
        console.log(user)
        fetch('https://visibly-bright-server-production.up.railway.app/users/admin',{
            method:'PUT',
            headers:{
                'authorization':`Bearer ${token}`,
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(data=>{
            if(data.status===200){
                setEmail('');
                console.log(email)
                setSuccessAlert(true);
            }
        })
        e.preventDefault();
    }
    return (
        <div>
            <Typography sx={{mt:6}} variant="h2" gutterBottom component="h1">Make Admin
      </Typography>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                label="Email"
                type="email"
                onBlur={handleOnBlur}
                variant="standard" />
                 <Button sx={{m:2}} variant="contained" type="submit">ADD</Button>
                 {successAlert && <Alert severity="success">Admin set successfully</Alert>
}
            </form>
        </div>
    );
};

export default MakeAdmin;