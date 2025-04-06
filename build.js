import dotenv from "dotenv";
import { build } from "esbuild";
dotenv.config();

const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

await build({
  entryPoints: ["./scripts/product-fetcher.js"],
  bundle: true,
  minify: true,
  outfile: "./dist/shopify-product.js",
  define: {
    "process.env.SHOPIFY_TOKEN": JSON.stringify(SHOPIFY_TOKEN),
  },
  target: ["esnext"],
  format: "esm",
  platform: "browser",
});
