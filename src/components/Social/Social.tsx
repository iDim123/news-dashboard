import {
  getPositionCenter,
  windowOpen,
} from '@/components/Social/utils';
import LinkedIn from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';

type Props = {
  url: string;
  title: string;
};

export default function Social(props: Props) {
  const { url, title } = props;
  const windowHeight = 400;
  const windowWidth = 550;

  const windowConfig = {
    height: windowHeight,
    width: windowWidth,
    ...getPositionCenter(windowWidth, windowHeight),
  };

  const shareOnTwitter = () => {
    windowOpen(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      windowConfig
    );
  };

  const shareOnLinkedIn = () => {
    windowOpen(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}&summary=summary&source=news`,
      windowConfig
    );
  };

  return (
    <Stack direction="row">
      <IconButton
        aria-label="Share on Twitter"
        sx={{ color: '#000' }}
        onClick={shareOnTwitter}
      >
        <XIcon />
      </IconButton>
      <IconButton
        aria-label="Share"
        sx={{ color: '#0077B5' }}
        onClick={shareOnLinkedIn}
      >
        <LinkedIn />
      </IconButton>
    </Stack>
  );
}
