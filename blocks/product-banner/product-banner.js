import { renderProduct } from "./product-fetcher.js";

export default async function decorate(block) {
  block.textContent = "";
  const banner = document.createElement("section");
  const product = await renderProduct();
  console.log("Product is ", product);
  banner.className = "bg-black text-white";

  const imageSrc =
    product?.images?.edges[0]?.node?.src ??
    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";

  const price = product?.variants?.edges[0]?.node?.price?.amount ?? "0.00";
  const currency =
    product?.variants?.edges[0]?.node?.price?.currencyCode ?? "USD";
  const quantity =
    product?.variants?.edges[0]?.node?.quantityAvailable ?? "N/A";

  banner.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-24">
      <div class="flex flex-col md:flex-row items-center gap-10">
        <div class="flex-shrink-0 w-full md:w-1/2">
          <img src="${imageSrc}" alt="Product Image" class="rounded-xl w-full h-auto shadow-lg">
        </div>
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">${product.title}</h2>
          <p class="mt-4 text-gray-400 text-base">${product.description}</p>
          <div class="mt-4 text-white">
            <p class="text-xl font-semibold">Price: ₹ ${price}</p>
            <p class="text-sm text-gray-300 mt-1">Available Quantity: ${quantity}</p>
          </div>
          <ul class="mt-6 space-y-2 text-sm text-gray-300 list-disc list-inside">
            <li>High-quality materials</li>
            <li>Minimalist modern design</li>
            <li>Eco-friendly packaging</li>
            <li>Free shipping and easy returns</li>
          </ul>
          <div class="mt-6 flex space-x-4">
            <a href="#" class="inline-block rounded-md bg-white px-5 py-2 text-black font-medium shadow hover:bg-gray-100 transition">Buy Now</a>
          </div>
        </div>
      </div>
    </div>
  `;

  block.append(banner);
}
