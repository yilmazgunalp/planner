import {
  extendTheme,
  ThemeConfig,
  theme as base,
  withDefaultVariant,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    config,
    colors: {
      'gray.dark': '#1C1C1C',
      'gray.light': '#646464',
      'brand.red': '#E14949',
      aubergine: {
        50: '#BB90B7',
        100: '#AD79A8',
        200: '#9F639A',
        300: '#924D8B',
        400: '#84377D',
        500: '#77216F',
        600: '#6E3C61',
        700: '#5E2750',
        800: '#411934',
        900: '#2C001E',
      },
    },
    fonts: {
      heading: `Circular Std Bold, ${base.fonts?.heading}`,
      body: `Circular Std Book, ${base.fonts?.body}`,
    },
  },
  withDefaultVariant({
    // @ts-ignore
    variant: 'ghost',
    components: ['Button', 'IconButton'],
  })
);
