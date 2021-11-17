import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [successAlert,setSuccessAlert] = useState(false);
    const [email,setEmail] = useState('');
    const handleOnBlur = e =>{
        setEmail(e.target.value)
    }
    const handleAdminSubmit = e =>{
        const user={email};
        console.log(user)
        fetch('http://localhost:5000/users/admin',{
            method:'PUT',
            headers:{
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