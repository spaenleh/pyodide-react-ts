import { createContext } from 'react';

// color mode context used to switch the color
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default ColorModeContext;
