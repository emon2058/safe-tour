import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink,useLocation,useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const [loginData,setLoginData] = useState({});
    const {user,loginUser,isLoading,authError,googleLogin} = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleChange=e=>{
        const name = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[name] = value;
        setLoginData(newLoginData)
        console.log(newLoginData,loginData);
    }
    const handleLogin=e=>{
        loginUser(loginData.email,loginData.password,location,history)
        e.preventDefault();
    }
    const handleGoogleLogin = e =>{
        googleLogin(history,location);
        e.preventDefault()
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{mt:5}} variant="h6">
                        Login
                    </Typography>
                   <form onSubmit={handleLogin}>
                       <TextField 
                       sx={{width:'75%' }}
                       id="standard-basic"
                       name="email" 
                       type="email"
                       label="Your Name" 
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
                       <Button type = "submit" variant="contained">LOGIN</Button>

                   <Typography variant="button" display="block" gutterBottom>
                    Don't have an account? <NavLink to='/register'> Register</NavLink>
                </Typography>
                   </form>
                   <Button onClick={handleGoogleLogin} variant="contained">Sign in with Google</Button>
                {isLoading && <CircularProgress/>}
                {user?.email && <Alert severity="success">Successfully created user</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;