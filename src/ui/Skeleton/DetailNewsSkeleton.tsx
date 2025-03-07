import {
  Container,
  Divider,
  Grid2 as Grid,
  Skeleton,
  Stack,
} from '@mui/material';

export default function DetailNewsSkeleton() {
  return (
    <Container>
      <Stack spacing={2}>
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={400} />
        <Skeleton
          variant="rectangular"
          height={400}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Skeleton variant="rectangular" height={100} />
        <Divider orientation="horizontal" flexItem style={{ marginTop: 10 }} />
        <Grid container wrap="nowrap" spacing={4}>
          <Grid size={4}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
          <Grid size={4}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
          <Grid size={4}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
