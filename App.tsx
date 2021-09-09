import React from "react";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";

import theme from "./src/global/styles/theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { CategorySelect } from "./src/screens/CategorySelect";

export default function App() {
  const [fonstLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fonstLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CategorySelect />
    </ThemeProvider>
  );
}
