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
        <div class="product-carousel__meta flex items-center gap-4">
          <span class="text-sm text-gray-400">Curated picks</span>
        </div>
      </div>
      <div id="${carouselId}" class="product-carousel__track" tabindex="0"></div>
      <div class="product-carousel__dots" role="tablist" aria-label="Carousel dots"></div>
    </div>
  `;

  block.append(section);

  const track = section.querySelector('.product-carousel__track');
  const dotsContainer = section.querySelector('.product-carousel__dots');

  // render placeholder when no handles
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
        <div class="product-card p-6 rounded-xl">
          <div class="product-card__image placeholder h-44 w-full bg-gray-800 rounded-lg"></div>
          <div class="mt-4">
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
      <div class="product-card p-6 rounded-xl">
        <div class="product-card__image-wrapper rounded-lg overflow-hidden">
          <img src="${imageSrc}" alt="${product.title || ''}" class="product-card__image w-full h-44 object-cover rounded-lg">
        </div>
        <div class="mt-4">
          <p class="product-card__title font-medium">${product.title}</p>
          <p class="product-card__price mt-1 text-sm text-gray-300">₹ ${price}</p>
          <div class="mt-5">
            <a href="#" class="product-card__buy inline-block rounded-md px-5 py-2 text-sm font-semibold">Buy Now</a>
          </div>
        </div>
      </div>
    `;

    track.append(item);
    items.push(item);
  }

  // create dots
  const dots = [];
  items.forEach((it, idx) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'product-carousel__dot';
    dot.dataset.index = String(idx);
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${idx + 1}`);
    dot.addEventListener('click', () => {
      track.scrollTo({ left: it.offsetLeft, behavior: 'smooth' });
      setActiveDot(idx);
    });
    dotsContainer.append(dot);
    dots.push(dot);
  });

  function setActiveDot(activeIndex) {
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === activeIndex);
      d.setAttribute('aria-selected', String(i === activeIndex));
    });
  }

  // set initial active
  setActiveDot(0);

  // update active dot on scroll (debounced)
  let rafId = null;
  track.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDelta = Infinity;
      items.forEach((it, i) => {
        const rect = it.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        const itemCenter = it.offsetLeft + (it.offsetWidth / 2);
        const delta = Math.abs(itemCenter - center);
        if (delta < closestDelta) {
          closestDelta = delta;
          closest = i;
        }
      });
      setActiveDot(closest);
    });
  });

  // keyboard support for dots
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const current = dots.findIndex((d) => d.classList.contains('active'));
      const prev = Math.max(0, current - 1);
      dots[prev]?.click();
    }
    if (e.key === 'ArrowRight') {
      const current = dots.findIndex((d) => d.classList.contains('active'));
      const next = Math.min(dots.length - 1, current + 1);
      dots[next]?.click();
    }
  });
}
