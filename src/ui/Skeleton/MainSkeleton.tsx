import {
  Container,
  Grid2 as Grid,
  Skeleton,
  Stack,
} from '@mui/material';

export default function MainSkeleton() {
  return (
    <Container>
      <Stack spacing={2}>
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />

        <Grid container wrap="nowrap" spacing={4}>
          <Grid size={6}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
          <Grid size={6}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
