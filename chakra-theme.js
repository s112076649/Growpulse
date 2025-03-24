// GrowPulse Chakra UI主题配置
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: "#6A44CC",
      secondary: "#46C89A",
      warning: "#FF5A35",
      info: "#368BFF",
    },
    gray: {
      50: "#F8F9FD",
      100: "#E1E4ED",
      200: "#C4C8D4",
      300: "#A8ADBB",
      400: "#8B91A1",
      500: "#71767F",
      600: "#585C64",
      700: "#3F4249",
      800: "#2C3039",
      900: "#15171C",
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "6px",
        fontWeight: "500",
      },
      variants: {
        primary: {
          bg: "brand.primary",
          color: "white",
          _hover: {
            bg: "brand.primary",
            opacity: 0.9,
          },
        },
        secondary: {
          bg: "white",
          color: "brand.primary",
          border: "1px solid",
          borderColor: "brand.primary",
          _hover: {
            bg: "gray.50",
          },
        },
        danger: {
          bg: "brand.warning",
          color: "white",
          _hover: {
            bg: "brand.warning",
            opacity: 0.9,
          },
        },
      },
      defaultProps: {
        variant: "primary",
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "white",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          borderRadius: "8px",
          p: 4,
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "6px",
        },
      },
      sizes: {
        md: {
          field: {
            h: "40px",
          },
        },
      },
    },
  },
});

export default theme; 