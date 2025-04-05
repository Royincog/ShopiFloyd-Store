import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

export default async function decorate(block) {
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : "/nav";
  const fragment = await loadFragment(navPath);

  block.textContent = "";
  const nav = document.createElement("header");
  nav.className = "bg-black text-white";
  nav.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">

        <span class="font-bold text-lg">Shopi Floyd</span>
      </div>

      <nav class="hidden md:flex space-x-6 text-sm font-medium">
        <a href="#" class="hover:underline">Shop</a>
        <a href="#" class="hover:underline">Catalog</a>
        <a href="#" class="hover:underline">Blogs</a>
      </nav>

    </div>
`;

  block.append(nav);

  const toggleButton = nav.querySelector("#mobile-menu-toggle");
  const mobileMenu = nav.querySelector("#mobile-menu");
  if (toggleButton && mobileMenu) {
    toggleButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}
