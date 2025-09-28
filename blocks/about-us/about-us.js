export default async function decorate(block) {
  block.textContent = "";

  const section = document.createElement("section");
  section.className = "bg-black text-white";

  section.innerHTML = `
    <div class=\"max-w-7xl mx-auto px-4 py-20\">
      <div class=\"flex flex-col md:flex-row items-start gap-10\">
        <div class=\"w-full md:w-7/12\">
          <h2 class=\"text-3xl font-bold tracking-tight sm:text-4xl\">About Shopi Floyd</h2>
          <p class=\"mt-4 text-lg text-gray-400 max-w-2xl\">We are a modern demo storefront powered by AEM Edge Delivery Service and Shopify. Our focus is fast performance, simple experiences, and a delightful way to discover products online.</p>
          <ul class=\"mt-6 space-y-2 text-sm text-gray-300 list-disc list-inside\">
            <li>Blazing-fast pages with edge delivery</li>
            <li>Shopify-backed catalog and checkout</li>
            <li>Clean, accessible, mobile-first design</li>
          </ul>
        </div>
        <div class=\"w-full md:w-5/12\">
          <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-4\">
            <div class=\"rounded-xl border border-gray-800/60 p-5 bg-black/20\">
              <p class=\"text-xl font-semibold\">Fast Delivery</p>
              <p class=\"mt-1 text-gray-400 text-sm\">Optimized rendering and caching at the edge.</p>
            </div>
            <div class=\"rounded-xl border border-gray-800/60 p-5 bg-black/20\">
              <p class=\"text-xl font-semibold\">Secure Checkout</p>
              <p class=\"mt-1 text-gray-400 text-sm\">Reliable Shopify integrations for peace of mind.</p>
            </div>
            <div class=\"rounded-xl border border-gray-800/60 p-5 bg-black/20\">
              <p class=\"text-xl font-semibold\">Quality Products</p>
              <p class=\"mt-1 text-gray-400 text-sm\">Curated selections with clear details.</p>
            </div>
            <div class=\"rounded-xl border border-gray-800/60 p-5 bg-black/20\">
              <p class=\"text-xl font-semibold\">Simple Experience</p>
              <p class=\"mt-1 text-gray-400 text-sm\">Clean UI with a focus on what matters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  block.append(section);
}
