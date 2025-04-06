import dotenv from "dotenv";
import { build } from "esbuild";
dotenv.config();

const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

await build({
  entryPoints: ["./scripts/token.js"],
  bundle: true,
  minify: true,
  outfile: "./dist/shopify-token.js",
  define: {
    "process.env.SHOPIFY_TOKEN": JSON.stringify(SHOPIFY_TOKEN),
  },
  target: ["es2020"],
  format: "esm",
  platform: "browser",
});
