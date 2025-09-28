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
  // set icon markup (moon for dark, sun for light)
  toggleBtn.innerHTML = `
    <span class="theme-icon icon-moon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/></svg>
    </span>
    <span class="theme-icon icon-sun" aria-hidden="true" style="display:none">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><path d="M6.76 4.84l-1.8-1.79L3.17 5.84l1.79 1.79 1.8-2.79zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.03 1.05l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM17 13h3v-2h-3v2zM6.76 19.16l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79zM11 20h2v3h-2v-3zM20.83 18.36l-1.79-1.79-1.79 1.79 1.79 1.79 1.79-1.79zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="currentColor"/></svg>
    </span>
    <span class="sr-only">Toggle theme</span>
  `;

  const updateToggleBtn = (theme) => {
    // theme: 'dark' means site is currently dark; button should indicate action (switch to light)
    const moon = toggleBtn.querySelector('.icon-moon');
    const sun = toggleBtn.querySelector('.icon-sun');
    if (moon) moon.style.display = theme === 'dark' ? 'inline-block' : 'none';
    if (sun) sun.style.display = theme === 'light' ? 'inline-block' : 'none';
    toggleBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    updateToggleBtn(theme);
  };

  // initialize toggle icon from current theme
  updateToggleBtn(getTheme());

  toggleBtn.addEventListener("click", () => {
    const current = getTheme();
    setTheme(current === "dark" ? "light" : "dark");
  });
}
