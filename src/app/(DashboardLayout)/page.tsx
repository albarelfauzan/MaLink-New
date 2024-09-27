'use client';
import React from 'react';
import { Box, Typography, Chip, alpha } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';


const Home = () => {
  return (
    <PageContainer title="Home" description="Home">
      <Box sx={{ 
        textAlign: 'center', 
        minHeight: '75vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
      }}>
        {/* Introducing Chip */}
        <Chip 
          label="INTRODUCING MALINK" 
          sx={{ 
            backgroundColor: alpha('#fff', 0.1), 
            color: '#E5DBF0', 
            fontWeight: 'bold',
            letterSpacing: '1px',
            marginBottom: '16px'
          }} 
        />

        {/* Main Title */}
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#fff', 
            marginBottom: '12px', 
            fontSize: '3.5rem',  
            lineHeight: '1.2',
          }}>
          Managed Your <br /> Assets With <br /> Crypto Automation
        </Typography>

        {/* Subtitle */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: '#B1A6C4', 
            fontSize: '1rem',  
          }}>
          Ensuring asset safety with automated, secure blockchain solutions for everyone.
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default Home;
