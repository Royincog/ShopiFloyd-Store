import { renderProduct } from "../../dist/shopify-product.js";

function parseHandles(block) {
  const anchors = block.querySelectorAll('a');
  if (anchors && anchors.length > 0) {
    return Array.from(anchors)
      .map((a) => (a.textContent || a.getAttribute('href') || '').trim())
      .map((s) => s.replace(/\s+/g, '-').toLowerCase())
      .filter(Boolean);
  }
  const txt = block.textContent || '';
  return txt
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\s+/g, '-').toLowerCase());
}

export default async function decorate(block) {
  const handles = parseHandles(block).slice(0, 12);
  block.textContent = '';

  const section = document.createElement('section');
  section.className = 'product-carousel bg-black text-white';

  const carouselId = `carousel-${Math.random().toString(36).slice(2, 9)}`;

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-bold">Featured Products</h3>
        <div class="product-carousel__controls">
          <button class="product-carousel__prev" aria-label="Previous">◀</button>
          <button class="product-carousel__next" aria-label="Next">▶</button>
        </div>
      </div>
      <div id="${carouselId}" class="product-carousel__track" tabindex="0"></div>
    </div>
  `;

  block.append(section);

  const track = section.querySelector('.product-carousel__track');
  const prevBtn = section.querySelector('.product-carousel__prev');
  const nextBtn = section.querySelector('.product-carousel__next');

  // render placeholders while fetching
  if (handles.length === 0) {
    track.innerHTML = '<p class="text-gray-400">No products provided. Add product handles as links or comma-separated text inside the block.</p>';
    return;
  }

  const items = [];
  for (let i = 0; i < handles.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const product = await renderProduct(handles[i]);
    const item = document.createElement('div');
    item.className = 'product-carousel__item';

    if (!product) {
      item.innerHTML = `
        <div class="product-card bg-gray-900 p-4 rounded-lg">
          <div class="product-card__image placeholder h-40 w-full bg-gray-800 rounded-md"></div>
          <div class="mt-3">
            <p class="text-sm text-gray-400">Product not found</p>
          </div>
        </div>
      `;
      track.append(item);
      items.push(item);
      continue;
    }

    const imageSrc = product?.images?.edges[0]?.node?.src || 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png';
    const price = product?.variants?.edges[0]?.node?.price?.amount ?? '0.00';

    item.innerHTML = `
      <div class="product-card p-4 rounded-lg">
        <div class="product-card__image-wrapper rounded-md overflow-hidden">
          <img src="${imageSrc}" alt="${product.title || ''}" class="product-card__image w-full h-40 object-cover rounded-md">
        </div>
        <div class="mt-3">
          <p class="product-card__title font-medium">${product.title}</p>
          <p class="product-card__price mt-1 text-sm text-gray-300">₹ ${price}</p>
          <div class="mt-3">
            <a href="#" class="inline-block rounded-md bg-white px-4 py-2 text-black font-medium shadow hover:bg-gray-100 transition">Buy Now</a>
          </div>
        </div>
      </div>
    `;

    track.append(item);
    items.push(item);
  }

  // scrolling behavior
  const visibleItems = Math.min(3, items.length);
  const scrollStep = () => {
    if (!items[0]) return track.clientWidth;
    const itemStyle = getComputedStyle(items[0]);
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const width = items[0].getBoundingClientRect().width + gap;
    return Math.round(width * visibleItems);
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollStep(), behavior: 'smooth' });
  });

  // keyboard support
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

  // small touch snap
  track.addEventListener('scroll', () => {
    // could add indicators in future
  });
}
