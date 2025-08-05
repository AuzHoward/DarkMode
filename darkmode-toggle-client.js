// DarkMode Toggle for Client Websites
(function () {
  const STORAGE_KEY = 'darkmode-toggle-enabled';
  let darkModeEnabled = false;
  let originalStyles = new Map();

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
    document.querySelectorAll('*').forEach(el => {
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
      toggleBtn.classList.remove('active');
    } else {
      applyDarkMode();
      toggleBtn.classList.add('active');
    }
  }

  // Inject toggle button
  const toggleBtn = document.createElement('div');
  toggleBtn.className = 'toggle-switch';
  toggleBtn.innerHTML = '<div class="toggle-thumb"></div>';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.top = '16px';
  toggleBtn.style.right = '16px';
  toggleBtn.style.zIndex = '99999';
  toggleBtn.style.width = '60px';
  toggleBtn.style.height = '34px';
  toggleBtn.style.backgroundColor = '#000';
  toggleBtn.style.borderRadius = '17px';
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
  toggleThumb.style.width = '30px';
  toggleThumb.style.height = '30px';
  toggleThumb.style.backgroundColor = '#fff';
  toggleThumb.style.borderRadius = '50%';
  toggleThumb.style.transition = 'transform 0.3s';
  toggleThumb.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';

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
      transform: translateX(26px);
    }
  `;
  document.head.appendChild(style);

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }

  function initToggle() {
    document.body.appendChild(toggleBtn);
    // Restore previous state
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      applyDarkMode();
      toggleBtn.classList.add('active');
    }
  }
})(); 