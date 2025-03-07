'use client';

import { useAppContext } from '@/context/App/ContextApp';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';

export default function ModeSwitch() {
  const { is404 } = useAppContext();
  const { mode, setMode } = useColorScheme();

  if (!mode || is404) return null;
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 1,
        p: 1,
      }}
    >
      <FormControl size="small">
        <InputLabel id="mode-select-label">Тема</InputLabel>
        <Select
          labelId="mode-select-label"
          id="mode-select"
          value={mode}
          onChange={(event) => setMode(event.target.value as typeof mode)}
          label="Theme"
        >
          <MenuItem value="system">Системная</MenuItem>
          <MenuItem value="light">Светлая</MenuItem>
          <MenuItem value="dark">Тёмная</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}