import { Box, Button, Container, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config";


const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer' || 'admin');
  const [isLogin, setIsLogin] = useState(true);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   password: '',
  //   role: 'customer'
  // });
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value});
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      alert("please fill in all field.");
      return;
    }
    try{ 
    const response = await axios.post(`${API_URL}/api/login`, {name, password, role: role});
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
      if (name.toLowerCase() === 'admin') {
        navigate('/admin')}
        else{
          navigate('/booking');
        }
        if (response.data.token){
          localStorage.setItem('token', response.data.token);

        }
        localStorage.setItem('name', name);
        localStorage.setItem('role', role);
      
    } catch (error) {
      console.log("authentication error");
      alert("authentication failed recheck");
    }
  };
  return (
    <div>
      <Box 
      sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#000000', boxShadow: 1, pt:4, pb:8, alignItems:'center', justifyContent: 'center',borderColor: '#ff0000'}}>
        <Container  maxWidth="xs">
        <Box 
        sx={{ display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          bgcolor: '#0a0a0a',
          border: '1px solid #3b0000',
          borderRadius: '12px',
          boxShadow: '0px 10px 40px rgba(255, 0,0,0.15)',
          transition: 'allm0.3s ease-in-out',
          '&:hover': {borderColor: '#ff0000', boxShadow: '0px 0px 25px rgba(255,0,0,0.15)'}
        }}>
      <Typography variant="h4" fontWeight= '900' sx={{color: '#ffffff', letterSpacing: '1.5px', fontStyle: 'italic', textTransform: 'uppercase', mb: 0.5}}>
        Welcome to DRIVE CENTRIC App</Typography>
      <br />
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px',borderColor: '#ff0000',bgcolor:'#ffffff'}}>
      <TextField
        variant="outlined"
        label="User Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        // InputLabelProps={{ style: {color: '#666666', fontWeight: 'bold',borderColor: '#ff0000'}}}
        // InputProps={{style: {color:' #ffffff', backgroundColor: '#000000',borderColor: '#ff0000'},}}
        sx={{'& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px'}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}
      />
      <TextField
        variant="outlined"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        // InputLabelProps={{ style: {color: '#666666', fontWeight: 'bold'}}}
        // InputProps={{style: {color:' #ffffff', backgroundColor: '#000000', borderColor: '#cc0000'},}}
        sx={{fontWeight:'50','& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px',}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}
      />
      <TextField select label="Select Account" name="role" value={role} onChange={(e)=> setRole(e.target.value)} sx={{fontWeight:'50','& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px',}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}>
        <MenuItem value="customer">Customer/Buyer</MenuItem>
        <MenuItem value="admin">Showroom admin </MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" size="large" sx={{ py: 1.2,
          fontWeight: '900',
          bgcolor: '#0a0a0a',
          color: '#ffffff',
          border: '1px solid #1a1a1a',
          borderRadius: '9px',
          boxShadow: '0px 4px 15px rgba(255, 0,0,0.3)',
          '&:hover': {borderColor: '#cc0000', boxShadow: '0px 6px 20px rgba(255,0,0,0.5)'}}}>
        {isLogin ? 'Sign In' : 'Create Account'}
      </Button>
      </form>

      <Typography align="center" sx={{ mt: 3, fontSize: '14px', color: '#ffffff'}}>
        {isLogin ? "new to drive?" : "already have an account"}
        <span style={{ color: '#6b0000', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline'}}
        onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register here ' : 'login here'}
        </span>
      </Typography>
      </Box>
      </Container>
      </Box>
    </div>
  );
};

export default Login;
