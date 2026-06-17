import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';


const Home = ({ onNavigateToBooking }) => {
    const [featuredCars, setFeaturedCars] = useState([]);
    useEffect(() =>{
        const fetchCarsPreview = async () => {
            try {
                 const response = await axios.get('http://localhost:3004/api/car');
                 if (response.data && Array.isArray(response.data)){
                    setFeaturedCars(response.data.slice(0,3));
                 }
            } catch (error) {
                console.log('error loading featured cars');
                
            }
        };
        fetchCarsPreview();
       
    }, []);

  return (
    <div>
        <Box sx={{ minHeight: '100vh', bgcolor: '#181414', color: '#fafafa', background:'linear-gradient(180deg, #150000 0%, #000000 100%' }}>

            <Box sx={{ bgcolor: '#1b1d20', color: '#ffffff', pt: 12, pb: 12, textAlign: 'center', backgroundImage: 'linear-gradient(180deg, #0a192f 0%, #112240 100%)', background:'linear-gradient(180deg, #150000 0%, #000000 100%)', borderBottom: '1px solid #1a1a1a'}}>
                <Container maxWidth="md">
                    <Box 
                    component="img"
                    src='/log.png'
                    alt="drive logo"
                    sx={{
                        height: {xs: '500px', md: '500px'},
                        width: 'auto',
                        boxShadow: '0px 4px 15px rgba(255, 0, 0, 0.81)',
                        objectFit:'contain',
                        mb: 4
                    }}/>
                    <Typography variant='h6' >
                        "Luxury is not a product; it is a meticulously crafted standard of service."

                        At our showroom, we don't just sell cars; we curate masterpieces. From the moment you step through our doors, you are immersed in a world where cutting-edge engineering meets timeless elegance. Every vehicle in our collection represents the absolute zenith of design, performance, and craftsmanship. We cater exclusively to those who refuse to compromise—those who understand that a vehicle is not merely a tool for transportation, but a profound extension of one’s identity and ambition.
                    </Typography>
                    <Typography>
                        A quick glace at our premium cars
                    </Typography>
                    <Button variant='contained' size='large' onClick={onNavigateToBooking}
                    sx={{
                    
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ffffff',
                    bgcolor: '#ff0000',
                    borderRadius: '10px',
                    px:8,
                    py: 1.2,
                    boxShadow: '0px 4px 15px rgba(255,0,0,0.3)',
                    '&:hover': {bgColor: '#cc0000', boxShadow: '0px 6px 20px rgba(255,0,0,0.5)'}}} >
                        Explore
                    </Button>
                </Container>

            </Box>

            <Container maxWidth="lg" sx={{ mt: 10, mb:10}}>
                <Grid container spacing={4}>
                    {[
                        { title: "Elite Fleet", desc: "Access premium performance vehicles configured to highest track standards."},
                        { title: "Pure Power", desc: "Evaluate real engine dynamics , suspension balance, and track performance handling"},
                        { title: "Seamless Booking", desc: "Select dedicated morning or midday or evening allocation slots with instant key preparation"}

                    ].map((item, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                            <Box sx={{ p: 2, borderLeft: '3px solid #ff0000', bgcolor: '#0a0a0a', borderRadius: '0 8px 8px 0'}}>
                                <Typography>
                                    {item.title}
                                </Typography>
                                <Typography>
                                    {item.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ pb: 10}}>
                <Box sx={{ mb: 6, textAlign: 'center'}}>
                    <Typography variant='caption' sx={{ color: '#ff0000', fontWeight: '900', letterSpacing: '2px', display: 'block'}}>
                        SHOWCASE HIGHLIGHT
                    </Typography>
                    <Typography>
                        To look upon a luxury automobile is to witness poetry in motion. Sculpted contours, lightweight carbon-fiber architecture, and hand-stitched leather interiors come together to create an environment of unparalleled indulgence. Under the hood lies an orchestra of pure power, waiting to deliver a driving dynamic that is as exhilarating as it is effortless. Whether you seek the whisper-quiet, sustainable luxury of a modern grand tourer or the raw, visceral roar of a track-bred supercar, our collection is curated to ignite your passion for the road.
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent='center'>
                    {featuredCars.length === 0? (
                        <Typography variant="body1" sx={{ color: '#686565', mt: 4}}>
                            connecting to Showroom
                        </Typography>
                    ) : (
                        featuredCars.map((car) => {
                            if (!car) return null;
                            return( 
                            <Grid item xs={12} sm={6} md={4} key={car._id}>
                                <Card
                                sx={{ height:'100%',
                                    p: 2.5,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    bgcolor: '#0a0a0a',
                                    border: '1px solid #1a1a1a',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: '#ff0000',
                                        boxShadow: '0px 0px 20px rgba(255, 0, 0.25)',
                                        transform: 'translateY(-6px)'
                                    }
                                }}>

                                    <Box sx={{ width: '100%', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center',bgcolor: '#11111',
                                        borderRadius:'8px', mb: 2.5, border: '1px solid #1c1c1c'
                                    }}>
                                        <CardMedia component="img" image={car.imageUrl } alt={car.modelName}
                                        sx={{width: '90%', height:'160px', objectFit: 'contain'}}/>
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1, pt:2, textAlign: 'center'}}>
                                        <Typography variant='h6' fontWeight="800" sx={{ color: '#ffffff', fontStyle: 'italic'}}>
                                            {car.modelName}
                                        </Typography>
                                        <Typography variant='body2' sx={{color:' #888888'}}>
                                            {car.variant}.{car.fuelType}
                                        </Typography>

                                        <Box>
                                            <Typography>
                                                {car.basePrice?.toLocaleString('en-IN')}
                                            </Typography>
                                            <Button variant= 'outlined' onClick={onNavigateToBooking} 
                                            sx={{ borderRadius: '4px',
                                                fontWeight: '900',
                                                py: 1.2,
                                                color: '#ff0000',
                                                borderColor: '#ff0000',
                                                '&:hover': {borderColor: '#ff3333', bgcolor: 'rgba(255,0,0,0.08)'}
                                            }}>
                                                Reserve
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            
                            </Grid>
                            
                            
                        );
                        })
                    )}
                </Grid>
            </Container>

        </Box>
      
    </div>
  );
};

export default Home;
