'use client';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { NewsItem } from '@/models';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2 as Grid,
} from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSearchParams } from 'next/navigation';

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
      size={{ xs: 12, sm: 6, md: 4 }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={item.image}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.description}
          </Typography>
          <CardActions>
            <Link href={`/dashboard/${item.id}?${params}`} component={NextLink}>
              Детальнее
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
}
