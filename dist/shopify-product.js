function n(){let t="7b79305d981573c35085d497d28e8f13";if(!t)throw new Error("\u274C SHOPIFY_TOKEN is not defined in environment variables.");return t}function i(t,e,r){let o=Date.now(),l={data:e,expiry:o+r};localStorage.setItem(t,JSON.stringify(l))}function c(t){let e=localStorage.getItem(t);if(!e)return null;try{let{data:r,expiry:o}=JSON.parse(e);return Date.now()>o?(localStorage.removeItem(t),null):r}catch{return localStorage.removeItem(t),null}}var u=1*60*1e3,s=n();console.log("Public key is ",s);var d=ShopifyStorefrontAPIClient.createStorefrontApiClient({storeDomain:"https://gig-development-online-store.myshopify.com",apiVersion:"2024-07",publicAccessToken:s}),a="shopify_product_demo",f=`
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
  `;async function h(t){try{let e=await d.request(f,{variables:{handle:t}});return e.errors?(console.error("[Shopify Error]:",e.errors),null):e.data?.product??null}catch(e){return console.error("[Shopify Request Failed]:",e),null}}async function T(){let t="nike-shoe",e=c(a);if(e)return e;let r=await h(t);return r&&i(a,r,u),r}export{T as renderProduct};
