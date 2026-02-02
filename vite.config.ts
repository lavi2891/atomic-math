import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "src/domain"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@app": path.resolve(__dirname, "src/app"),
      "@copy": path.resolve(__dirname, "src/copy"),
      "@shared": path.resolve(__dirname, "src/shared"),
    },
  },
});
