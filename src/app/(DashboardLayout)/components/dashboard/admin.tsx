import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';

const Admin = () => {
    return (
        <DashboardCard>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px',
                    bgcolor: '#3C354A',
                    borderRadius: '12px',
                    textAlign: 'center',
                    width: '300px',
                    margin: 'auto'
                }}
            >
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                    Group Name
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#A0AEC0', mb: 4 }}>
                    You Want To Release This Group Now?
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: '#AC6AEC',
                        color: '#fff',
                        padding: '10px 30px',
                        borderRadius: '8px',
                        '&:hover': {
                            bgcolor: '#9A58D0',
                        }
                    }}
                >
                    Release
                </Button>
            </Box>
        </DashboardCard>
    );
};

export default Admin;
