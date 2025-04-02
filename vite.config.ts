import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/pwa-vite-example",
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate",

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "PWA Example",
        short_name: "PWA Example",
        description: "PWA Example",
        theme_color: "#8456b1",
        background_color: "#f3eff6",

        screenshots: [
          {
            src: "screenshots/pwa-esample_desktop.jpeg",
            sizes: "2426x1584",
            form_factor: "wide",
            label: "Desktop view showing weekly meal calendar",
          },
          {
            src: "screenshots/pwa-esample_mobile.png",
            sizes: "1290x2796",
            form_factor: "narrow",
            label: "Mobile view showing weekly meal calendar",
          },
        ],
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
