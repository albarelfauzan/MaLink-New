'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import AdminCard from '../components/dashboard/admin';

const Admin = () => {
  return (
    <PageContainer title="Admin" description="Admin">
      <Box>
          <Grid item xs >
            <AdminCard />
          </Grid>
      </Box>
    </PageContainer>
  )
}

export default Admin;
