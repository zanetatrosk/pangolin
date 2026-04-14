import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import babel from "@rollup/plugin-babel";

export default defineConfig(() => {
  const isVitest = !!process.env.VITEST;

  const babelPlugin = babel({
    babelHelpers: "bundled",
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    include: ["src/**/*"],
    plugins: [
      ["babel-plugin-react-compiler", { target: "19" }],
      
    ],
  });

  return {
    plugins: isVitest
      ? [
          viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
          tailwindcss(),
          viteReact(),
          babelPlugin,
        ]
      : [
          devtools(),
          nitro(),
          viteTsConfigPaths({
            projects: ["./tsconfig.json"],
          }),
          tailwindcss(),
          tanstackStart(),
          viteReact(),
          babelPlugin,
        ],
  };
});
