import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { fetchCameras, clearErrors } from '../../../../data/slice/CameraSlice';
export default function CamerasPage() {
  
  const [scanResults, setScanResults] = useState([]);
  const dispatch = useDispatch();
 
  const { cameras, loading, error } = useSelector((state) => state.camera);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCameras()).unwrap();
      } catch (err) {
        console.error("Failed to fetch cameras: ", err);
      }
    };

    fetchData();


  
      

    return () => {
      // Clear errors when component unmounts
      dispatch(clearErrors());
    };
  }, [dispatch]);

  

  return (
    <Container>
      <CustomBreadcrumbs
        heading="Cameras"
        links={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Cameras', href: '/dashboard/room' },
          { name: 'New Camera' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

     
      <Button variant="contained"  sx={{ mb: 3 }}>
        Scan for Available Cameras
      </Button>

      <Grid container spacing={3}>
        {cameras.map((camera) => (
          <Grid item xs={12} sm={6} md={4} key={camera._id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{camera.name}</Typography>
              <Typography>Model: {camera.model}</Typography>
              <Typography>IP Address: {camera.ipAddress}</Typography>
              <Typography>Status: {camera.status}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {scanResults.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Scan Results</Typography>
          <Grid container spacing={3}>
            {scanResults.map((camera) => (
              <Grid item xs={12} sm={6} md={4} key={camera.id}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">{camera.name}</Typography>
                  <Typography>Model: {camera.model}</Typography>
                  <Typography>IP Address: {camera.ipAddress}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
