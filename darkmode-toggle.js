// DarkMode Toggle MVP
(function () {
  const STORAGE_KEY = 'darkmode-toggle-enabled';
  let darkModeEnabled = false;
  let originalStyles = new Map();

  // Utility: Get computed style property
  function getStyle(el, prop) {
    return window.getComputedStyle(el)[prop];
  }

  // Utility: Simple color transformation (light <-> dark)
  function transformColor(color) {
    // Only handle rgb/rgba/hex for MVP
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
    // Invert color for dark mode
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    return `rgb(${r}, ${g}, ${b})`;
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
      toggleBtn.innerText = '🌙 Dark Mode';
    } else {
      applyDarkMode();
      toggleBtn.innerText = '☀️ Light Mode';
    }
  }

  // Inject toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerText = '🌙 Dark Mode';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.top = '16px';
  toggleBtn.style.right = '16px';
  toggleBtn.style.zIndex = '99999';
  toggleBtn.style.padding = '8px 16px';
  toggleBtn.style.borderRadius = '8px';
  toggleBtn.style.border = 'none';
  toggleBtn.style.background = '#222';
  toggleBtn.style.color = '#fff';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  toggleBtn.style.fontSize = '16px';
  toggleBtn.style.fontFamily = 'inherit';
  toggleBtn.addEventListener('click', toggleDarkMode);
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(toggleBtn);
    // Restore previous state
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      applyDarkMode();
      toggleBtn.innerText = '☀️ Light Mode';
    }
  });
})(); 