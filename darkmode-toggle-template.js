// DarkMode Toggle for Template Injection - Single Script for Entire Website
(function () {
  const STORAGE_KEY = 'darkmode-toggle-enabled';
  let darkModeEnabled = false;
  let originalStyles = new Map();
  let bannerCreated = false;

  // Check saved preference immediately
  function checkSavedPreference() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === '1') {
      darkModeEnabled = true;
      applyDarkMode();
    }
  }

  // Create persistent banner (only once per page)
  function createBanner() {
    if (bannerCreated) return null;
    
    // Remove existing banner if it exists
    const existingBanner = document.getElementById('darkmode-banner');
    if (existingBanner) {
      existingBanner.remove();
    }

    const banner = document.createElement('div');
    banner.id = 'darkmode-banner';
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.height = '60px';
    banner.style.backgroundColor = '#000';
    banner.style.color = '#fff';
    banner.style.zIndex = '999999';
    banner.style.display = 'flex';
    banner.style.alignItems = 'center';
    banner.style.justifyContent = 'flex-end';
    banner.style.padding = '0 20px';
    banner.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    banner.style.fontFamily = 'Arial, sans-serif';
    banner.style.fontSize = '14px';
    banner.style.boxSizing = 'border-box';

    // Add banner text
    const bannerText = document.createElement('span');
    bannerText.textContent = 'Dark Mode';
    bannerText.style.marginRight = '15px';
    bannerText.style.userSelect = 'none';
    banner.appendChild(bannerText);

    // Add toggle button
    const toggleBtn = document.createElement('div');
    toggleBtn.className = 'toggle-switch';
    toggleBtn.innerHTML = '<div class="toggle-thumb"></div>';
    toggleBtn.style.width = '50px';
    toggleBtn.style.height = '28px';
    toggleBtn.style.backgroundColor = '#333';
    toggleBtn.style.borderRadius = '14px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.transition = 'background-color 0.3s';
    toggleBtn.style.border = '1px solid #fff';
    toggleBtn.style.padding = '0';
    toggleBtn.style.boxSizing = 'border-box';
    toggleBtn.style.display = 'flex';
    toggleBtn.style.alignItems = 'center';
    toggleBtn.style.justifyContent = 'flex-start';
    toggleBtn.style.paddingLeft = '2px';
    toggleBtn.addEventListener('click', toggleDarkMode);

    // Style the thumb
    const toggleThumb = toggleBtn.querySelector('.toggle-thumb');
    toggleThumb.style.width = '24px';
    toggleThumb.style.height = '24px';
    toggleThumb.style.backgroundColor = '#fff';
    toggleThumb.style.borderRadius = '50%';
    toggleThumb.style.transition = 'transform 0.3s';
    toggleThumb.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

    banner.appendChild(toggleBtn);

    // Add banner to page
    document.body.appendChild(banner);
    bannerCreated = true;

    // Adjust page content to account for banner
    adjustPageContent();

    return toggleBtn;
  }

  // Adjust page content to prevent banner overlap
  function adjustPageContent() {
    const body = document.body;
    const html = document.documentElement;
    const bannerHeight = '60px';
    
    // Check if content needs adjustment
    const currentPadding = window.getComputedStyle(body).paddingTop;
    const currentMargin = window.getComputedStyle(body).marginTop;
    
    if (!body.style.paddingTop || parseInt(body.style.paddingTop) < 60) {
      body.style.paddingTop = bannerHeight;
    }
    
    // Also adjust html if needed
    if (!html.style.paddingTop || parseInt(html.style.paddingTop) < 60) {
      html.style.paddingTop = bannerHeight;
    }
  }

  // Run immediately if DOM is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    // DOM is already loaded, run immediately
    checkSavedPreference();
    initToggle();
  }

  // Also run on window load to handle dynamic content
  window.addEventListener('load', function() {
    if (!bannerCreated) {
      initToggle();
    }
  });

  // Utility: Get computed style property
  function getStyle(el, prop) {
    return window.getComputedStyle(el)[prop];
  }

  // Utility: Check if a color is neutral (gray scale)
  function isNeutral(r, g, b, threshold = 10) {
    return Math.abs(r - g) < threshold && Math.abs(g - b) < threshold && Math.abs(b - r) < threshold;
  }

  // Utility: Simple color transformation (invert only neutral colors)
  function transformColor(color) {
    if (!color) return color;
    let r, g, b, a = 1;
    if (color.startsWith('rgb')) {
      const parts = color.match(/\d+/g);
      if (!parts) return color;
      [r, g, b, a] = parts.map(Number);
      if (typeof a === 'undefined') a = 1;
    } else if (color.startsWith('#')) {
      let hex = color.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      return color; // Named colors, gradients, etc.
    }
    // Only invert if neutral (gray scale)
    if (isNeutral(r, g, b)) {
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Leave accent/brand colors unchanged
      return color;
    }
  }

  // Traverse DOM and apply dark mode styles
  function applyDarkMode() {
    // Apply to html element for global scope
    document.documentElement.classList.add('darkmode');
    
    // Also apply to current page elements
    document.querySelectorAll('*').forEach(el => {
      // Skip the banner and its children
      if (el.id === 'darkmode-banner' || el.closest('#darkmode-banner')) return;
      
      // Save original styles
      if (!originalStyles.has(el)) {
        originalStyles.set(el, {
          background: el.style.backgroundColor,
          color: el.style.color,
        });
      }
      // Transform background
      const bg = getStyle(el, 'backgroundColor');
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        el.style.backgroundColor = transformColor(bg);
      }
      // Transform text color
      const fg = getStyle(el, 'color');
      if (fg) {
        el.style.color = transformColor(fg);
      }
    });
    darkModeEnabled = true;
    localStorage.setItem(STORAGE_KEY, '1');
  }

  // Revert to original styles
  function removeDarkMode() {
    // Remove global class
    document.documentElement.classList.remove('darkmode');
    
    // Revert current page elements
    originalStyles.forEach((styles, el) => {
      if (styles.background !== undefined) el.style.backgroundColor = styles.background;
      if (styles.color !== undefined) el.style.color = styles.color;
    });
    darkModeEnabled = false;
    localStorage.setItem(STORAGE_KEY, '0');
  }

  // Toggle handler
  function toggleDarkMode() {
    if (darkModeEnabled) {
      removeDarkMode();
      const toggleBtn = document.querySelector('.toggle-switch');
      if (toggleBtn) toggleBtn.classList.remove('active');
    } else {
      applyDarkMode();
      const toggleBtn = document.querySelector('.toggle-switch');
      if (toggleBtn) toggleBtn.classList.add('active');
    }
  }

  // Active state styles
  const style = document.createElement('style');
  style.textContent = `
    .toggle-switch.active {
      background-color: #4CAF50;
      justify-content: flex-end;
      padding-left: 0;
      padding-right: 2px;
    }
    .toggle-switch.active .toggle-thumb {
      transform: translateX(22px);
    }
  `;
  document.head.appendChild(style);

  // Inject global CSS for dark mode
  const globalCSS = document.createElement('style');
  globalCSS.textContent = `
    /* Global Dark Mode Styles */
    html.darkmode {
      background-color: #111 !important;
      color: #fff !important;
    }
    
    html.darkmode body {
      background-color: #111 !important;
      color: #fff !important;
    }
    
    html.darkmode * {
      background-color: inherit !important;
      color: inherit !important;
    }
    
    /* Preserve some elements */
    html.darkmode img,
    html.darkmode video,
    html.darkmode iframe {
      background-color: transparent !important;
    }
    
    /* Override for specific elements that should keep their colors */
    html.darkmode [style*="background"] {
      background-color: #111 !important;
    }
    
    html.darkmode [style*="color"] {
      color: #fff !important;
    }
  `;
  document.head.appendChild(globalCSS);

  function initToggle() {
    const toggleBtn = createBanner();
    if (toggleBtn) {
      // Set initial state based on saved preference
      if (darkModeEnabled) {
        toggleBtn.classList.add('active');
      }
    }
  }
})(); 