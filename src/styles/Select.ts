import { Colors } from './Colors';

export const Select = {
  light: {
    '&:focus': {
      backgroundColor: Colors.SecondaryDefault,
    },
    '&:hover': {
      backgroundColor: Colors.SecondaryHover,
    },
  },
  dark: {
    '&:focus': {
      backgroundColor: Colors.Background300Dark,
    },
    '&:hover': {
      backgroundColor: Colors.SecondaryHoverDark,
    },
  },
};
