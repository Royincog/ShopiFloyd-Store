import { getMetadata } from "../../scripts/aem.js";

const PUBLIC_KEY = getMetadata("token");
const client = ShopifyStorefrontAPIClient.createStorefrontApiClient({
  storeDomain: "https://gig-development-online-store.myshopify.com",
  apiVersion: "2024-07",
  publicAccessToken: PUBLIC_KEY,
});
const PRODUCT_CACHE_KEY = "shopify_product_demo";
const PRODUCT_QUERY = `
  query ProductQuery($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 1) {
        edges {
          node {
            id
            src
            altText
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            price {
              amount
              currencyCode
            }
            quantityAvailable
          }
        }
      }
    }
  }
  `;

/**
 * Fetch a product by its handle from Shopify Storefront API
 * @param {string} handle - The product handle
 * @returns {Promise<Object|null>} Product data or null
 */
async function fetchProduct(handle) {
  try {
    const response = await client.request(PRODUCT_QUERY, {
      variables: { handle },
    });

    if (response.errors) {
      console.error("[Shopify Error]:", response.errors);
      return null;
    }

    return response.data?.product ?? null;
  } catch (error) {
    console.error("[Shopify Request Failed]:", error);
    return null;
  }
}

/**
 * Fetch and return a product's essential info
 * @returns {Promise<{id: string, title: string, handle: string, description: string} | null>}
 */
export async function renderProduct() {
  // Try from cache first
  const cached = localStorage.getItem(PRODUCT_CACHE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.warn("Invalid product data in local storage. Refetching...");
    }
  }

  // Fallback to network
  const product = await fetchProduct("nike-shoe");
  if (product) {
    localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(product));
  }
  return product;
}
