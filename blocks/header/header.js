import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

export default async function decorate(block) {
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : "/nav";
  const fragment = await loadFragment(navPath);

  block.textContent = "";
  const nav = document.createElement("header");
  nav.className = "site-header";
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

      <div class="flex items-center space-x-4">
        <button id="theme-toggle" type="button" class="inline-flex items-center px-4 py-2 rounded-md outline transition"></button>
      </div>
    </div>
`;

  block.append(nav);

  const getTheme = () => document.documentElement.getAttribute("data-theme") || "light";

  const toggleBtn = nav.querySelector("#theme-toggle");
  const updateToggleBtn = (theme) => {
    toggleBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    toggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    updateToggleBtn(theme);
  };

  // initialize toggle label from current theme
  updateToggleBtn(getTheme());

  toggleBtn.addEventListener("click", () => {
    const current = getTheme();
    setTheme(current === "dark" ? "light" : "dark");
  });
}
