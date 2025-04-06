// utils/get-token.js

/**
 * Get the Shopify token from environment variables
 * Throws an error if not found
 * @returns {string} Shopify Storefront token
 */
export function getShopifyToken() {
  const token = process.env.SHOPIFY_TOKEN;
  if (!token) {
    throw new Error(
      "❌ SHOPIFY_TOKEN is not defined in environment variables."
    );
  }

  return token;
}
