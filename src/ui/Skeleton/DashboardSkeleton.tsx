import { Box, Skeleton } from '@mui/material';

export default function DashboardSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '2rem' }}  />
      <Skeleton variant='rectangular' height={400}/>
    </Box>
  );
}
