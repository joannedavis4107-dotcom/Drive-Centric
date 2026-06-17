import { DeleteOutlined, ImageAspectRatioOutlined, PivotTableChartOutlined } from '@mui/icons-material';
import { Box, Button, Container, Divider, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Adashboard = () => {
    const [cars, setCars] = useState([]);
    const [tests, setTests] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [updatedPrices, setUpdatedPrices ] = useState({});
    const [message, setMessage] = useState([]);
    const [carForm, setCarForm] = useState({
        modelName: '',
        variant: '',
        basePrice: '' ,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        imageUrl: '',
        status: 'Available'
    });
    const navigate = useNavigate();

    const fetchBookings = async () =>{
        try {
            const response = await axios.get('http://localhost:3004/api/test');
            console.log("admin",response.date)
            if (response.data && Array.isArray(response.data)){
                setBookings(response.data);
            } else {
                setBookings([]);
            }
        } catch (error) {
            console.log('error fechting');
            setBookings([]);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);

   const fetchCars = async () => {
           try {
               const response = await axios.get('http://localhost:3004/api/car');
               if (response.data && Array.isArray(response.data))
               setCars(response.data);
           } catch (error) {
               console.log('error in fetching');
           }
       };
        useEffect(() =>{
               fetchCars();
           }, []);
    const handleDeleteCar = async (carId) => {
        if( window.confirm("Are you sure")){
            try {
                await axios.delete(`http://localhost:3004/api/car/${carId}`);
                setMessage("Car successfuly removed");
                
                setCars(cars.filter(car => car._id !== carId))
            } catch (error) {
                console.log("error");
                alert("Failed to delete");
                
            }
        }
    };
       
    const handleDeleteBooking = async (bookingId) => {
        if( !window.confirm("Are you sure")){
            return;
        }
            try {
                await axios.delete(`http://localhost:3004/api/booking/${bookingId}`);
                setBookings((prevBookings) => prevBookings.filter((b)=> b._id !== bookingId));
                
                // setTests(tests.filter(test => car._id !== carId))
            } catch (error) {
                console.log("error");
                alert("Failed to delete");
                
            }
        };

    const handleInputChange= (e) => {
        setCarForm({ ...carForm, [e.target.name]: e.target.value});
    };

    const handleCarSubmit = async (e) =>{
        e.preventDefault();
        try {
           await axios.post('http://localhost:3004/api/car', carForm);
           alert('car saved');
           setCarForm({
            modelName: '', variant: '', basePrice: '' , transmission: 'Automatic',
             fuelType: 'Petrol', imageUrl: '', status: 'Available'
           });
        } catch (error) {
            console.log('error');
            alert('error saving car');
        }
    };

    const handleStatusChange = async (id, newStatus) =>{
        try {
            await axios.put(`http://localhost:3004/api/test/${id}`, { status: newStatus});
            alert('staus updated');
            fetchBookings();
        } catch (error) {
            console.log('error');
        }
    };
    const handleUpdatePrices = async (carId) => {
        const newPrice = updatedPrices[carId];
        if (!newPrice || !String(newPrice).trim() || isNaN(newPrice)){
            alert("please enter a valid numeric price.");
            return;
        }
        try {
            await axios.put(`http://localhost:3004/api/car/${carId}`,{
                basePrice: Number(newPrice)
            });
            alert("vechile  price updated");
            setCars(prevCars => prevCars.map(car => car._id === carId ? {...car, basePrice: Number(newPrice) } : car));
            setUpdatedPrices(prev =>({...prev, [carId]: ''}));
        } catch (error) {
            console.log("error in updating");
            alert("failed to update")
        }
    }
    
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

  return (
    <Container sx={{ mt:0, display: 'flex', gap: 0.0, flexWrap: 'wrap', bgcolor: "#000000"}}>
      {/* //for adding cars to the inventory */}
      {/* <Typography>Welcome, {user?.name || "Guest"}</Typography> */}
      <Box sx={{ flex:1, minWidth: '300px', p: 3, border: '1px solid #0a0a0a', borderRadius: 2, bgcolor: "#0f0f0f8e",boxShadow: '0px 4px 15px rgba(255, 0, 0, 0.81)'}}>
        <Typography variant='h5' color='#ffffff'>🏎️ADD CARS TO SHOWROOM🏎️</Typography>
        <form onSubmit={handleCarSubmit} style={{display: 'flex', flexDirection: 'column'}}>
            <TextField label="Model name" name='modelName' value={carForm.modelName} onChange={handleInputChange}  sx={{'& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px'}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}/>
            <br></br>
            <TextField label="Variant" name='variant' value={carForm.variant} onChange={handleInputChange} sx={{'& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px'}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}/><br></br>
            <TextField label="Base Price" name='basePrice' value={carForm.basePrice} onChange={handleInputChange}  sx={{'& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px'}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}/><br></br>
            <TextField select label="Transmission" name='transmission' value={carForm.transmission} onChange={handleInputChange}  sx={{'& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px'}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}>
            <MenuItem value="Automatic">Automatic</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
            </TextField><br></br>
            <TextField label="Image URL" name='imageUrl' value={carForm.imageUrl} onChange={handleInputChange}  sx={{'& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px'}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}/><br></br>
            <TextField select label="Fuel Type" name='fuelType' value={carForm.fuelType} onChange={handleInputChange}  sx={{'& .MuiInputBase-root': {backgroundColor: '#1616167c',}, '& .MuiInputBase-input': { color: '#ffffff',}, '& .MuiInputLabel-root' : {color: '#ffffff',}, '& .MuiOutlinedInput-root': { '& fieldset':{borderColor: 'red'}, '&:hover fieldset': {borderColor: '#ff0000', boxShadow:'10px'}, '&.Mui-focused fieldset': {borderColor: '#f56060'}}}}>
            <MenuItem value="Petrol">Petrol</MenuItem>
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
            </TextField><br></br>

            <Button type="submit" variant="contained" color="primary">Save Car</Button>

        </form>
      </Box>
{/* //for viewing the booking */}
      <Box sx={{ flex: 1.5, minWidth: '350px', p: 3, border: '1px solid #251111', borderRadius: 2, boxShadow: '0px 4px 15px rgba(255, 0, 0, 0.81)',}}>
        <Typography variant="h5" gutterBottom sx={{color:"#ffffff"}}>Booking Logs</Typography>
        {(!Array.isArray(bookings) || bookings.length === 0) ? (
            <Typography>No booking found</Typography>
        ) : (
            bookings.map((booking) => (
                <Box key={booking?._id} sx={{ mb: 2, p: 3, border: '1px soild #ddd', borderRadius: 1,bgcolor:"#1d1d1d"}}>
                    <Typography><strong>Car Id:</strong> {booking.carModel|| 'not specificed'}</Typography>
                    <Typography><strong>Slot: </strong> {booking.date ? new Date(booking.date).toLocaleDateString() : ''} - {booking.time}</Typography>
                    <Typography><strong>Status:</strong> {booking.status}</Typography>
                    <Typography sx={{ mb: 1}}><strong>Estimated value</strong> {booking.totalEstimatedPrice}</Typography>
                    
                    <Box sx={{ display: 'flex', bgcolor: '#1d1d1d', borderColor: '#ff0000'}}>
                        <Button size='small' variant='outlined' onClick={() => handleStatusChange(booking._id, 'Approved')}>Approve</Button>
                        <Button size='small' variant='outlined' onClick={() => handleStatusChange(booking._id, 'Key Handed')}>Hand over</Button>
                        <Button size='small' variant='contained' color='success' onClick={() => handleStatusChange(booking._id, 'Completed')}>Complete</Button>
                        <Button variant= 'outlined' size='small' startIcon={<DeleteOutlined/> } onClick={() => handleDeleteBooking(booking._id)}
                                    sx={{ textTransform: 'none', borderRadius: 1.5, fontWeight: 'bold'}}>
                                        Delete
                                    </Button>
                    </Box>
                 </Box>
            ))
        )}
    </Box>

    <Divider sx={{ my: 4}}/>

    <Box sx={{ mt: 4, boxShadow: '0px 4px 15px rgba(255, 0, 0, 0.81)', bgcolor:'#000000'}}>
        <Typography variant='h5' sx={{color:'#ffffff'}}>
           ACTIVE SHOWROOM FLEET REGISTRY
        </Typography>

        {cars.length === 0 ? (
            <Paper variant='outlined' sx={{mb: 3, color: '#2f0a0a'}}>
                <Typography color= 'textSecondary'>
                    No registered vehicle found in the catalog
                </Typography>
            </Paper>
        ) : (
            <TableContainer component={Paper} variant='outlined' sx={{ borderRadius: 2, bgcolor: '#0a0a0a'}} >
                <Table aria-label='showroom fleet table'>
                    <TableHead sx={{bgcolor:'#cf0101'}}>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', color:'#ffffff'}}> Thumbnail</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color:'#ffffff'}}> Model Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color:'#ffffff'}}> Variant</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color:'#ffffff'}}> Fuel Type</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color:'#ffffff'}}> Base Price</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color:'#ffffff'}}> Update Price</TableCell>
                            <TableCell style={{ fontWeight: 'bold', color: '#ffffff'}}> Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cars.map((car) => (
                            
                            <TableRow key= {car._id} hover sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell>
                                    <Box sx={{ width: '60px', height: '100%', overflow: 'hidden', borderRadius:1, bgcolor: '#0a0a0a'}}>
                                        <img src={car.imageUrl} alt={car.modelName} style={{ width: '100%' , objectFit: 'contain'}}/>
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ fontWeight: '600', textTransform: 'uppercase', color: '#ffffff'}}> {car.modelName}</TableCell>
                                <TableCell sx={{  textTransform: 'capitalize', color: '#ffffff'}}> {car.variant}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: '#ffffff'}}> {car.fuelType}</TableCell>
                                <TableCell sx={{ fontWeight: '600', color: '#d21919'}}> {car.basePrice?.toLocaleString('en-IN')}</TableCell>

                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <TextField
                                            size="small"
                                            placeholder="New Price"
                                            value={updatedPrices[car._id] || ''}
                                            onChange={(e) => setUpdatedPrices(prev => ({ ...prev, [car._id]: e.target.value }))}
                                            type="number"
                                            sx={{
                                                width: '120px',
                                                '& .MuiInputBase-root': {
                                                    backgroundColor: '#1616167c',
                                                    height: '32px',
                                                    fontSize: '0.875rem',
                                                },
                                                '& .MuiInputBase-input': {
                                                    color: '#ffffff',
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': { borderColor: '#555555' },
                                                    '&:hover fieldset': { borderColor: '#ff0000' },
                                                    '&.Mui-focused fieldset': { borderColor: '#f56060' }
                                                }
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleUpdatePrices(car._id)}
                                            sx={{
                                                textTransform: 'none',
                                                height: '32px',
                                                bgcolor: '#cf0101',
                                                fontWeight: 'bold',
                                                '&:hover': { bgcolor: '#ff0000' }
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </TableCell>

                                <TableCell align='center'>
                                    <Button variant= 'outlined' size='small' startIcon={<DeleteOutlined/> } onClick={() => handleDeleteCar(car._id)}
                                    sx={{ textTransform: 'none', borderRadius: 1.5, fontWeight: 'bold'}}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )}
        <Button sx={{ py: 1.2,
              fontWeight: '900',
              bgcolor: '#0a0a0a',
              color: '#ffffff',
              border: '1px solid #1a1a1a',
              borderRadius: '9px',
              boxShadow: '0px 4px 15px rgba(255, 0,0,0.3)',
              '&:hover': {borderColor: '#cc0000', boxShadow: '0px 6px 20px rgba(255,0,0,0.5)'}}} onClick={handleLogout}>Logout</Button>
    </Box>
    
    </Container>
  );
};

export default Adashboard;
