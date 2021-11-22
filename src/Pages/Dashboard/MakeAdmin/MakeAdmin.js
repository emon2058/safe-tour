import { Alert, Button, TextField } from '@mui/material';
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
        fetch('https://immense-sea-06792.herokuapp.com/users/admin',{
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
            <h1>Make Admin</h1>
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