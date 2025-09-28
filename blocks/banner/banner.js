export default function decorate(block) {
  block.textContent = "";

  const hero = document.createElement("section");
  hero.className = "bg-black text-white banner";

  // ensure lottie-player is available
  if (!window.customElements || !customElements.get('lottie-player')) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@1.5.7/dist/lottie-player.js';
    script.async = true;
    document.head.appendChild(script);
  }

  hero.innerHTML = `
      <div class="banner__lottie">
        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_touohxv0.json"  background="transparent"  speed="0.6"  loop  autoplay></lottie-player>
      </div>
      <div class="banner__content max-w-7xl mx-auto px-4 py-20">
        <div class="mb-4 inline-flex items-center space-x-2 text-sm font-medium text-gray-400">
         <img src="https://www.svgrepo.com/show/303503/shopify-logo.svg" alt="Shopify logo" class="h-5 w-auto">
          <span>Do you know what shopify awesomeness is ??</span>
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
