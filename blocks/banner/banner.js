export default function decorate(block) {
  block.textContent = "";

  const hero = document.createElement("section");
  hero.className = "bg-black text-white";

  hero.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 py-20">
        <div class="mb-4 inline-flex items-center space-x-2 text-sm font-medium text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Do you know what awesomeness is ??</span>
        </div>
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Welcome to ShopiFloyd Store</h1>
        <p class="mt-4 text-lg text-gray-400 max-w-2xl">
          A exclusive demo store made with goodness of AEM Edge Delivery Service and Shopify !! :)
        </p>
        <div class="mt-6 flex space-x-4">
          <a href="#" class="inline-block rounded-md bg-white px-4 py-2 text-black font-medium shadow hover:bg-gray-100 transition">Shop Now</a>
        </div>
      </div>
    `;

  block.append(hero);
}
