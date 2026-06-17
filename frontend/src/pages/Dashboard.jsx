import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardContent, Chip, Container, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CalendarToday, AccessTime, CancelOutlined } from '@mui/icons-material';

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [mybookings, setMyBookings] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        date: '',
        time: '10:00 AM',
        totalEstimatedPrice: ''
    });
    const navigate = useNavigate();

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:3004/api/car');
            setCars(response.data);
        } catch (error) {
            console.log('error in fetching cars');
        }
    };
   
    const fetchMyBookings = async () => {
        const current = localStorage.getItem('name') || localStorage.getItem('username') || localStorage.getItem('userName');
        if (!current) {
            setMyBookings([]);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3004/api/mybook?name=${current}`);
            if (response.data && Array.isArray(response.data)) {
                setMyBookings(response.data);
            } else {
                setMyBookings([]);
            }
        } catch (error) {
            console.error("error fetching user bookings", error);
            setMyBookings([]);
        }
    };
    
    useEffect(() => {
        fetchCars();
        fetchMyBookings();
    }, []);

    const handleInputChange = (e) => {
        setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
    };

    const handleSelectCar = (car) => {
        setSelectedCar(car);
        setBookingForm({ ...bookingForm, totalEstimatedPrice: car.basePrice });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCar) {
            alert("please choose a vehicle");
            return;
        }
        const current = localStorage.getItem('name');
        if (!current) {
            alert("Please login to book a test drive.");
            navigate('/auth');
            return;
        }
        const payload = {
            name: current,
            carId: selectedCar?._id,
            carModel: selectedCar?.modelName,
            date: bookingForm.date,
            time: bookingForm.time,
            totalEstimatedPrice: bookingForm.totalEstimatedPrice,
            status: 'Pending'
        };
        try {
            await axios.post('http://localhost:3004/api/test/book', payload);
            alert(`Test drive booking for the ${selectedCar.modelName} submitted successfully`);
            setBookingForm({ date: '', time: '10:00 AM', totalEstimatedPrice: '' });
            setSelectedCar(null);
            fetchMyBookings();
        } catch (error) {
            console.log('error booking:', error);
            alert("failed to record booking");
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3004/api/booking/${bookingId}`);
            alert("Booking cancelled successfully.");
            fetchMyBookings();
        } catch (error) {
            console.error("error cancelling booking", error);
            alert("Failed to cancel booking.");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const getStatusChip = (status) => {
        switch (status) {
            case 'Approved':
                return <Chip label="Approved" sx={{ bgcolor: '#1b5e20', color: '#a5d6a7', fontWeight: 'bold' }} />;
            case 'Key Handed':
                return <Chip label="Key Handed" sx={{ bgcolor: '#0d47a1', color: '#90caf9', fontWeight: 'bold' }} />;
            case 'Completed':
                return <Chip label="Completed" sx={{ bgcolor: '#004d40', color: '#80cbc4', fontWeight: 'bold' }} />;
            case 'Pending':
            default:
                return <Chip label="Pending" sx={{ bgcolor: '#e65100', color: '#ffcc80', fontWeight: 'bold' }} />;
        }
    };

    return (
        <Container sx={{ minHeight: '100vh', bgcolor: '#000000', pt: 4, pb: 8 }}>
            {/* Header Session Bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, pb: 2, borderBottom: '1px solid #222' }}>
                <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                    Welcome, <span style={{ color: '#ff0000', fontStyle: 'italic' }}>{localStorage.getItem('name') || 'Guest'}</span>
                </Typography>
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleLogout}
                    sx={{ 
                        fontWeight: 'bold', 
                        borderRadius: '8px', 
                        textTransform: 'uppercase',
                        borderColor: '#ff0000',
                        '&:hover': {
                            bgcolor: 'rgba(255, 0, 0, 0.1)',
                            borderColor: '#ff3333'
                        }
                    }}
                >
                    Sign Out
                </Button>
            </Box>

            <Typography sx={{ color: '#ffffff', letterSpacing: '1.5px', fontStyle: 'italic', textTransform: 'uppercase', mb: 0.5 }}>
                DRIVE-CENTRIC SHOWROOM FLEET
            </Typography>
            <Typography variant="h5" sx={{ color: '#ffffff', letterSpacing: '1.5px', fontStyle: 'italic', textTransform: 'uppercase', mb: 4 }}>
                Available showroom inventory
            </Typography>
            
            <Grid container spacing={4} sx={{ mb: 6 }}>
                {cars.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography color='#ffffff' align="center">
                            The showroom inventory catalog is currently empty.
                        </Typography>
                    </Grid>
                ) : (
                    cars.map((car) => {
                        const isSelected = selectedCar?._id === car._id;
                        return (
                            <Grid item xs={12} sm={6} md={4} key={car._id}>
                                <Box 
                                    sx={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 2,
                                        height: '100%',
                                        border: isSelected ? '2px solid #ff0000' : '1px solid #1a1a1a',
                                        bgcolor: "#0a0a0a",
                                        borderRadius: 4,
                                        boxShadow: isSelected ? '0px 0px 20px rgba(255, 0, 0, 0.5)' : '0px 4px 10px rgba(0, 0, 0, 0.5)',
                                        transition: 'all 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            borderColor: '#ff0000',
                                            boxShadow: '0px 8px 25px rgba(255, 0, 0, 0.4)'
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, bgcolor: '#0e0e0e', borderRadius: 2, p: 1 }}>
                                        <img src={car.imageUrl} alt={car.modelName}
                                            style={{ width: '100%', height: '160px', objectFit: 'contain' }} />
                                    </Box>
                                    <Typography variant='h6' sx={{ color: '#ffffff', fontWeight: 'bold', mb: 0.5 }}>
                                        {car.modelName}
                                    </Typography>
                                    <Typography variant='body2' sx={{ color: '#888888', mb: 1 }}>
                                        {car.variant} • {car.fuelType} • {car.transmission}
                                    </Typography>
                                    <Typography variant='h6' sx={{ color: '#ff0000', fontWeight: '900', mb: 2 }}>
                                        ₹{car.basePrice?.toLocaleString('en-IN')}
                                    </Typography>
                                    <Box sx={{ mt: 'auto' }}>
                                        <Button 
                                            variant={isSelected ? "contained" : "outlined"} 
                                            color={isSelected ? "error" : "primary"} 
                                            fullWidth
                                            onClick={() => handleSelectCar(car)}
                                            sx={{ 
                                                py: 1,
                                                fontWeight: 'bold',
                                                bgcolor: isSelected ? '#ff0000' : 'transparent',
                                                color: '#ffffff',
                                                border: '1px solid #ff0000',
                                                borderRadius: '8px',
                                                '&:hover': {
                                                    bgcolor: isSelected ? '#cc0000' : 'rgba(255,0,0,0.1)',
                                                    borderColor: '#ff3333'
                                                }
                                            }}
                                        >
                                            {isSelected ? "Selected" : "Select For Drive"}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })
                )}
            </Grid>

            {/* Booking Slot Form */}
            <Box sx={{ p: 4, border: '1px solid #333', borderRadius: 4, maxWidth: '500px', mx: 'auto', bgcolor: '#0a0a0a', boxShadow: '0px 10px 30px rgba(0,0,0,0.5)', mb: 8 }}>
                <Typography variant='h5' align="center" sx={{ color: '#ffffff', letterSpacing: '1px', fontStyle: 'italic', textTransform: 'uppercase', mb: 3, fontWeight: 'bold' }}>
                    Book Your Appointment Slot
                </Typography>
                {selectedCar && (
                    <Typography align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#4caf50' }}>
                        Chosen Model: {selectedCar.modelName} ({selectedCar.variant})
                    </Typography>
                )}

                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField 
                        type="date" 
                        name="date" 
                        value={bookingForm.date} 
                        onChange={handleInputChange} 
                        required
                        sx={{
                            '& .MuiInputBase-root': { backgroundColor: '#111', color: '#fff' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff0000' },
                                '&.Mui-focused fieldset': { borderColor: '#ff0000' }
                            }
                        }}
                    />
                    <TextField 
                        select 
                        label="Appointment Time Slot" 
                        name="time" 
                        value={bookingForm.time} 
                        onChange={handleInputChange}
                        required
                        sx={{
                            '& .MuiInputBase-root': { backgroundColor: '#111', color: '#fff' },
                            '& .MuiInputLabel-root': { color: '#888' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#ff0000' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff0000' },
                                '&.Mui-focused fieldset': { borderColor: '#ff0000' }
                            }
                        }}
                    >
                        <MenuItem value="10:00 AM">10:00 AM (Morning Session)</MenuItem>
                        <MenuItem value="01:30 PM">01:30 PM (Midday Session)</MenuItem>
                        <MenuItem value="04:00 PM">04:00 PM (Evening Session)</MenuItem>
                    </TextField>

                    <TextField 
                        label='Estimated Price' 
                        name='totalEstimatedPrice' 
                        type='number' 
                        value={bookingForm.totalEstimatedPrice} 
                        onChange={handleInputChange}
                        required
                        InputProps={{ readOnly: true }}
                        sx={{
                            '& .MuiInputBase-root': { backgroundColor: '#111', color: '#fff' },
                            '& .MuiInputLabel-root': { color: '#888' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#ff0000' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#333' },
                                '&:hover fieldset': { borderColor: '#ff0000' },
                                '&.Mui-focused fieldset': { borderColor: '#ff0000' }
                            }
                        }}
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{
                            py: 1.5,
                            fontWeight: 'bold',
                            bgcolor: '#ff0000',
                            color: '#ffffff',
                            borderRadius: '8px',
                            '&:hover': { bgcolor: '#cc0000' }
                        }}
                    >
                        Confirm Appointment
                    </Button>
                </form>
            </Box>

            {/* My Bookings Section */}
            <Box sx={{ mt: 6, p: 3, border: '1px solid #1a1a1a', borderRadius: 4, bgcolor: '#050505', boxShadow: '0px 0px 25px rgba(255, 0, 0, 0.05)' }}>
                <Typography variant='h5' sx={{ color: '#ffffff', fontWeight: 'bold', fontStyle: 'italic', textTransform: 'uppercase', mb: 4, pb: 1, borderBottom: '1px solid #222' }}>
                    My Booking Reservations
                </Typography>
                
                {mybookings.length === 0 ? (
                    <Typography sx={{ color: '#888888', textAlign: 'center', py: 4 }}>
                        You don't have any booked test drives yet. Choose a supercar and select a time slot to reserve one!
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {mybookings.map((booking) => (
                            <Grid item xs={12} key={booking._id}>
                                <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid #1a1a1a', transition: 'all 0.3s', '&:hover': { borderColor: '#ff0000', boxShadow: '0px 4px 15px rgba(255,0,0,0.15)' } }}>
                                    <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1 }}>
                                                {booking.carModel || 'Supercar Drive'}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#888888' }}>
                                                    <CalendarToday fontSize="small" sx={{ color: '#ff0000' }} />
                                                    <Typography variant="body2">{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#888888' }}>
                                                    <AccessTime fontSize="small" sx={{ color: '#ff0000' }} />
                                                    <Typography variant="body2">{booking.time}</Typography>
                                                </Box>
                                                {booking.totalEstimatedPrice && (
                                                    <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                                                        Est: ₹{booking.totalEstimatedPrice.toLocaleString('en-IN')}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                                            {getStatusChip(booking.status)}
                                            {booking.status === 'Pending' && (
                                                <Button 
                                                    variant="outlined" 
                                                    color="error" 
                                                    size="small"
                                                    startIcon={<CancelOutlined />}
                                                    onClick={() => handleCancelBooking(booking._id)}
                                                    sx={{ 
                                                        fontWeight: 'bold', 
                                                        borderColor: '#e53935', 
                                                        color: '#e53935',
                                                        '&:hover': {
                                                            bgcolor: 'rgba(229, 57, 53, 0.1)',
                                                            borderColor: '#ef5350'
                                                        }
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default Dashboard;