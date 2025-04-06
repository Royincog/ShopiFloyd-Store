function n(){let t="7b79305d981573c35085d497d28e8f13";if(!t)throw new Error("\u274C SHOPIFY_TOKEN is not defined in environment variables.");return t}function i(t,e,r){let o=Date.now(),s={data:e,expiry:o+r};localStorage.setItem(t,JSON.stringify(s))}function c(t){let e=localStorage.getItem(t);if(!e)return null;try{let{data:r,expiry:o}=JSON.parse(e);return Date.now()>o?(localStorage.removeItem(t),null):r}catch{return localStorage.removeItem(t),null}}var l=1*60*1e3,u=n(),d=ShopifyStorefrontAPIClient.createStorefrontApiClient({storeDomain:"https://gig-development-online-store.myshopify.com",apiVersion:"2024-07",publicAccessToken:u}),a="shopify_product_demo",p=`
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
  `;async function f(t){try{let e=await d.request(p,{variables:{handle:t}});return e.errors?(console.error("[Shopify Error]:",e.errors),null):e.data?.product??null}catch(e){return console.error("[Shopify Request Failed]:",e),null}}async function S(t){let e=c(a);if(e)return e;let r=await f(t);return r&&i(a,r,l),r}export{S as renderProduct};
