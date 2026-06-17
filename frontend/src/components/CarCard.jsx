import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const CarCard = ({ car, isSelected, onSelect, onViewDetails}) => {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', p:2.5, height: '100%', bgcolor: '#0a0a0a', border: isSelected ? '1px solid #ff0000' : '1px solid #1a1a1a', borderRadius: '12px', boxShadow: isSelected ? '0px 0px 20px rgba(255, 0, 0, 0.4)' : 'none', transition: 'all 0.25s ease-in-out', '&:hover': {transform: 'translateY(-4px)', borderColor: '#ff0000', boxShadow: '0px 0px 20px rgba(255,0,0,0.3)'}}}>
        <Box onClick={onViewDetails}
        sx={{
          width: '100%',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#000000',
          borderRadius: '8px',
          mb: 2.5,
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid #cc0000'
        }} >
          <img src={car.imageUrl} alt={car.modelName} style={{ width: '90%', height: '90%', objectFit: 'contain'}}/>
        </Box>
        <Box sx={{bgcolor: '#0a0a0a'}}>
          <Typography> {car.modelName}</Typography>
          <Typography>{car.variant}.{car.fuelType}
          </Typography>
          <Typography>
            {car.basePrice?.toLocaleString('en-IN')}
          </Typography>
        </Box>

        <Button>
          {isSelected ? "selected" : "selected for drive"}
        </Button>
      </Box>
    </div>
  );
};

export default CarCard
