'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import InheritList from '@/app/(DashboardLayout)/components/dashboard/InheritTable';

const Inherit = () => {
  return (
    <PageContainer title="Automation" description="Automation">
      <Box>
          <Grid item xs >
            <InheritList />
          </Grid>
      </Box>
    </PageContainer>
  )
}

export default Inherit;
