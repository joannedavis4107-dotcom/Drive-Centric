import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token') || !!localStorage.getItem('role');
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" elevation={0} sx={{background: 'linear-gradient(90deg, #000000 0%, #500000 55%, #800000 85%)', borderBottom: '2px solid #ff0000', px: 2}}>
           <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '70px'}}>
            
            
            
            <Box component={Link} to='/'  sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap: '6px', justifyContent: 'flex-start', textDecoration: 'none'}}> 
            <Box component="img" src="/log.png " alt="drivelogo " sx={{ height: '80px', width: '80px',boxShadow: '0px 4px 15px rgba(255,0,0,0.3)', objectFit: 'contain', display: 'block',}}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
             <Typography variant="h5" 
              sx={{ fontWeight: '900', fontStyle: 'italic', color: '#ffffff' , letterSpacing: '3px', lineHeight: 1,fontSize: {xs: '1.2rem', sm: '1.5rem'}, transform: 'translateY(-7px)'}}>
              DRIVE-CENTRIC
            </Typography>
            <Typography variant="caption" 
              sx={{ fontWeight: '800', color: '#ff0000' , letterSpacing: '2px', fontSize: '0.6rem', lineHeight: 1, mt: 0.3}}>
              SUPERCAR COLLECTION
            </Typography>
            </Box>
            </Box>
            {/* </Toolbar>
            
            //navigation control
            <Toolbar disableGutters sx={{ justifyContent: 'end', minHeight: '70px'}}> */}
            <Box display='flex' alignItems= 'center' >
            <Button component={Link} to="/" sx={{color: '#ffffff', fontWeight: '700', letterSpacing: '0.5px', fontSize: {xs: '0.9rem', sm: '0.85'}, '&:hover': {color: '#ff3333'}}}>
              Home
            </Button>
             {/* <Button component={Link} to="/booking"  sx={{color: '#ffffff', fontWeight: '700', letterSpacing: '0.5px', fontSize: {xs: '0.9rem', sm: '0.85'}, '&:hover': {color: '#ff3333'}}} >
              Booking
            </Button> */}
            {/* <Button color="inherit" onClick={() => navigate('/admin')}>
              Admin Panel
            </Button> */}
               <Button component={Link} to="/auth" variant="outlined" sx={{color: '#ffffff', borderColor: '#ff0000', fontWeight: '700',borderWidth: '1.5px',borderRadius: '4px', letterSpacing: '0.5px', fontSize: {xs: '0.9rem', sm: '0.85'}, '&:hover': {bgcolor: 'rgba(255,0,0,0.15)', borderColor: '#ffffff'}}} >
              Login/Signup
              </Button>
             
            </Box>
          </Toolbar>
        </AppBar>
        </Box>
  );
};

export default NavBar;
