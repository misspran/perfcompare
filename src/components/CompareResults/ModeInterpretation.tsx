import { Box } from '@mui/material';

import { useAppSelector } from '../../hooks/app';
import { Colors } from '../../styles/Colors';
import { MannWhitneyResultsItem } from '../../types/state';

export const ModeInterpretation = (result: MannWhitneyResultsItem) => {
  if (!result || !result.silverman_kde) {
    return null;
  }

  function getStyles(theme: string) {
    const backgroundColor =
      theme === 'light' ? Colors.Background300 : Colors.Background300Dark;

    return {
      backgroundColor,
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 2fr',
      gap: '10px',
      alignItems: 'center',
    };
  }
  const mode = useAppSelector((state) => state.theme.mode);
  return (
    <Box sx={getStyles(mode)}>
      <div></div>
      <div>Median Shift</div>
      <div>Interpretation</div>
      <div>{result.silverman_kde.mode_summary}</div>
      <div>{result.silverman_kde.shift}</div>
      <div>{result.silverman_kde.shift_summary ?? 'No significant shift'}</div>
    </Box>
  );
};
