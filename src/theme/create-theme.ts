import "@fontsource/kanit/300.css";
import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/kanit/600.css";
import "@fontsource/kanit/700.css";

import type { Theme } from "@mui/material/styles";
import { extendTheme } from "@mui/material/styles";

import {
  shadows,
  typography,
  components,
  colorSchemes,
  customShadows,
} from "./core";

// ----------------------------------------------------------------------

export function createTheme(): Theme {
  const initialTheme = {
    colorSchemes,
    shadows: shadows("light"),
    customShadows: customShadows("light"),
    shape: { borderRadius: 8 },
    components,
    typography: {
      ...typography,
      fontFamily: '"Kanit", "Public Sans", sans-serif',
    },
    cssVarPrefix: "",
    shouldSkipGeneratingVar,
  };

  const theme = extendTheme(initialTheme);

  return theme;
}

// ----------------------------------------------------------------------

function shouldSkipGeneratingVar(keys: string[]): boolean {
  const skipGlobalKeys = [
    "mixins",
    "overlays",
    "direction",
    "breakpoints",
    "cssVarPrefix",
    "unstable_sxConfig",
    "typography",
  ];

  const skipPaletteKeys: {
    [key: string]: string[];
  } = {
    global: ["tonalOffset", "dividerChannel", "contrastThreshold"],
    grey: ["A100", "A200", "A400", "A700"],
    text: ["icon"],
  };

  const isPaletteKey = keys[0] === "palette";

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}
