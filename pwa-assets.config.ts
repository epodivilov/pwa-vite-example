import { defineConfig } from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, "favicon.ico"]],
      padding: 0,
    },
    maskable: {
      sizes: [512],
      padding: 0,
      resizeOptions: {
        background: {
          alpha: 0,
          b: 0,
          g: 0,
          r: 0,
        },
      },
    },
    apple: {
      sizes: [180],
      padding: 0,
      resizeOptions: {
        background: {
          alpha: 0,
          b: 0,
          g: 0,
          r: 0,
        },
      },
    },
  },
  images: ["public/favicon.svg"],
});
