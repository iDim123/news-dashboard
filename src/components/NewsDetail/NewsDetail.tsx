'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  Paper,
  Grid2 as Grid,
} from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import { NewsItem } from '@/models';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import Social from '@/components/Social/Social';

type Props = {
  article: NewsItem;
  related: NewsItem[];
};

export default function NewsDetail(props: Props) {
  const { article, related } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams).toString();
  const [likes, setLikes] = useState(article.likes || 0);
  const [isFullSizeMode, setFullSizeMode] = useState(false);

  const handleLike = () => setLikes(likes + 1);

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Link href={`/dashboard?${params}`} component={NextLink}>
          Назад к новостям
        </Link>

        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          {article.title}
        </Typography>
        <Grid
          container
          sx={{
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Grid size="grow">
            <Typography variant="subtitle1" color="text.secondary">
              {article.date}
            </Typography>
          </Grid>
          <Grid size="auto">
            <Button
              variant="outlined"
              onClick={() => setFullSizeMode(!isFullSizeMode)}
            >
              {isFullSizeMode ? 'Выйти из режима просмотра' : 'Режим просмотра'}
            </Button>
          </Grid>
        </Grid>
        <Box
          component="img"
          sx={{
            height: 'auto',
            width: '100%',
          }}
          alt={article.title}
          src={article.image}
        />
        <Paper variant="outlined" sx={{ p: 2, mt: 2, mb: 2 }}>
          <Typography
            variant="body1"
            sx={{ mb: 2, fontSize: isFullSizeMode ? 18 : undefined }}
          >
            {article.content}
          </Typography>
          <Grid container>
            <Grid size="grow">
              <Button startIcon={<ThumbUp />} onClick={handleLike}>
                {likes} Likes
              </Button>
            </Grid>
            <Grid size="auto">
              <Social url={`/dashboard/${article.id}`} title={article.title} />
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {!isFullSizeMode && (
        <>
          <Container maxWidth="md">
            <Typography variant="h6" gutterBottom>
              Комментарии
            </Typography>

            <Box>
              {article.comments.map((comment, index) => (
                <Card key={index} sx={{ mb: 2, position: 'relative' }}>
                  <CardContent>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                      {new Date(comment.date).toLocaleDateString()}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {comment.user}
                    </Typography>
                    <Typography variant="body2">{comment.text}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
          </Container>

          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Похожие новости
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                overflowX: 'auto',
              }}
            >
              {related.map((item) => (
                <Card key={item.id} sx={{ mb: 2, width: 300 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Link
                      href={`/dashboard/${item.id}?${params}`}
                      component={NextLink}
                    >
                      Читать далее
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        </>
      )}
    </>
  );
}
