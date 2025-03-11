'use client';

import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { NewsItem } from '@/models';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  styled,
} from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSearchParams } from 'next/navigation';

const StyledCard = styled(Card)({
  transition: 'all 300ms',
  '&:hover': {
    backgroundColor: '#eee'
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

type Props = {
  item: NewsItem;
};

export default function DraggableCard(props: Props) {
  const { item } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams).toString();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      size={{ xs: 12, sm: 4, md: 6 }}
    >
      <StyledCard>
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{
            aspectRatio: '16 / 9',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary">
            {item.description}
          </StyledTypography>
        </CardContent>
        <CardActions>
          <Button size="small" href={`/dashboard/${item.id}?${params}`} component={NextLink}>
            Детальнее
          </Button>
        </CardActions>
      </StyledCard>
    </Grid>
  );
}
