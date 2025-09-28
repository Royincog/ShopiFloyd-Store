export default async function decorate(block) {
  block.textContent = "";

  const section = document.createElement("section");
  section.className = "bg-black text-white about-us";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-20">
      <div class="about-us__inner flex flex-col md:flex-row items-start gap-10">
        <div class="about-us__content w-full md:w-7/12">
          <h2 class="about-us__title text-3xl font-bold tracking-tight sm:text-4xl">About Shopi Floyd</h2>
          <p class="about-us__lead mt-4 text-lg text-gray-400 max-w-2xl">We are a modern demo storefront powered by AEM Edge Delivery Service and Shopify. Our focus is fast performance, simple experiences, and a delightful way to discover products online.</p>

          <ul class="about-us__bullets mt-6 space-y-2 text-sm text-gray-300 list-disc list-inside">
            <li>Blazing-fast pages with edge delivery</li>
            <li>Shopify-backed catalog and checkout</li>
            <li>Clean, accessible, mobile-first design</li>
          </ul>

          <div class="about-us__stats mt-8 flex flex-wrap gap-4">
            <div class="about-us__stat">Established: <strong>2025</strong></div>
            <div class="about-us__stat">Products: <strong>150+</strong></div>
            <div class="about-us__stat">Customers: <strong>10k+</strong></div>
          </div>
        </div>

        <div class="about-us__visuals w-full md:w-5/12">
          <div class="about-us__features-grid grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div class="about-us__card">
              <div class="about-us__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="about-us__icon-svg">
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"></path>
                  <path d="M7.5 12a4.5 4.5 0 0 1 9 0"></path>
                </svg>
              </div>
              <div class="about-us__card-content">
                <p class="about-us__card-title text-xl font-semibold">Fast Delivery</p>
                <p class="about-us__card-desc mt-1 text-gray-400 text-sm">Optimized rendering and caching at the edge.</p>
              </div>
            </div>

            <div class="about-us__card">
              <div class="about-us__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="about-us__icon-svg">
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div class="about-us__card-content">
                <p class="about-us__card-title text-xl font-semibold">Secure Checkout</p>
                <p class="about-us__card-desc mt-1 text-gray-400 text-sm">Reliable Shopify integrations for peace of mind.</p>
              </div>
            </div>

            <div class="about-us__card">
              <div class="about-us__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="about-us__icon-svg">
                  <path d="M12 2l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1 3-7z"></path>
                </svg>
              </div>
              <div class="about-us__card-content">
                <p class="about-us__card-title text-xl font-semibold">Quality Products</p>
                <p class="about-us__card-desc mt-1 text-gray-400 text-sm">Curated selections with clear details.</p>
              </div>
            </div>

            <div class="about-us__card">
              <div class="about-us__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="about-us__icon-svg">
                  <path d="M3 7h18"></path>
                  <path d="M3 12h18"></path>
                  <path d="M3 17h18"></path>
                </svg>
              </div>
              <div class="about-us__card-content">
                <p class="about-us__card-title text-xl font-semibold">Simple Experience</p>
                <p class="about-us__card-desc mt-1 text-gray-400 text-sm">Clean UI with a focus on what matters.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  block.append(section);
}
