import { extendTheme, type ThemeConfig } from "@chakra-ui/react";


// With type ThemeConfig, it is enable to use auto filling and type checking.
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;