import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
// import login from '../../../images/login.png'

const Register = () => {
        const [registerData,setRegisterData] = useState({}); 
        const {user,registerUser,authError,loading} = useAuth()

        const history = useHistory();

        const handleChange=e=>{
            const name = e.target.name;
            const value = e.target.value;
            const newLoginData = {...registerData};
            newLoginData[name] = value;
            setRegisterData(newLoginData)
        }
        const handleRegister=e=>{
            registerUser(registerData.email, registerData.password, registerData.name, history)
            e.preventDefault();
        }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{mt:5}} variant="h6">
                        Register
                    </Typography>
                   {!loading && <form onSubmit={handleRegister}>
                       <TextField 
                       sx={{width:'75%' }}
                       id="standard-basic"
                       name="name" 
                       label="Your Name" 
                       variant="standard"
                       onChange={handleChange} />
                       <TextField 
                       sx={{width:'75%' }}
                       id="standard-basic"
                       name="email" 
                       type="email"
                       label="Your Email" 
                       variant="standard"
                       onChange={handleChange} />
                       <TextField 
                       sx={{width:'75%', my:3}}
                       id="standard-basic"
                       type="password"
                       name="password" 
                       label="Your Password" 
                       variant="standard"
                       onChange={handleChange} /><br/>
                       <Button type = "submit" variant="contained">Register</Button>

                   <Typography variant="button" display="block" gutterBottom>
                    Don't have an account? <NavLink to='/login'> Login</NavLink>
                </Typography>
                   </form>}
                {loading && <CircularProgress/>}
                {user?.email && <Alert severity="success">Successfully created user</Alert>}
                {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* <img src={login} width='100%'/> */}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;