import { fileURLToPath, URL } from "node:url";

import { ValidateEnv } from "@julr/vite-plugin-validate-env";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { z } from "zod";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "./");

  return {
    plugins: [
      ValidateEnv({
        validator: "zod",
        schema: {
          VITE_PORT: z.coerce.number().min(1, "Port is required"),
          VITE_SERVER_ORIGIN: z.string().min(1, "Server Origin is required"),
          VITE_SERVER_HOST: z.string().min(1, "Server Host is required"),
          VITE_SERVER_PORT: z.coerce.number().min(1, "Server Port is required"),
        },
      }),
      react(),
    ],
    build: {
      outDir: "build",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    server: {
      port: Number(env.VITE_PORT),
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
