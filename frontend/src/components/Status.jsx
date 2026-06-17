import React from 'react'

const Status = () => {
  return (
    <div>
        
      <Box>
                          {booking.status === 'Approved' ? (
                              <Chip label="Approved" sx={{ bgcolor: '#003300', color: '#88ff88'}}/>
                          ) : (
                              <Chip label="pending"/>
                          )}
                          const { name } = req.query;
    console.log("backend recived name", name);
    if (!name || name === 'undefined' || name === 'null') {
      console.log("no username")
      return res.json({message: "user interface required"});
    }
    const userbookings = await Testdrive.find({ name: name}).populate('carId');
    console.log(`found${userbookings.length}`);
    const cmpbooking = await Promise.all(userbookings.map(async (test) => {
      const matching = await Car.findById(test.carId);

      return {
        _id: test._id,
      date: test.date,
      time: test.time,
      status: test.status,
      carModel: matching ? matching.modelName : "premium cars"
      }
    }))
    res.json(cmpbooking);
  } catch (error) {
    console.log("error")
    res.json({message: "error loading"})
  }
})
                      </Box>
                       <Container>
        
       
       </Container>
    </div>
  )
}

export default Status
