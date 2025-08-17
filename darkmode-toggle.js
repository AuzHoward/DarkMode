// DarkMode Toggle for Landing Page
(function () {
  const STORAGE_KEY = 'darkmode-toggle-enabled';
  let darkModeEnabled = false;

  function applyDarkMode() {
    document.body.classList.add('darkmode');
    darkModeEnabled = true;
    localStorage.setItem(STORAGE_KEY, '1');
  }

  function removeDarkMode() {
    document.body.classList.remove('darkmode');
    darkModeEnabled = false;
    localStorage.setItem(STORAGE_KEY, '0');
  }

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
  toggleBtn.style.position = 'relative';
  toggleBtn.style.zIndex = '99999';
  toggleBtn.style.width = '120px';
  toggleBtn.style.height = '68px';
  toggleBtn.style.backgroundColor = '#2c2c2c';
  toggleBtn.style.borderRadius = '34px';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.transition = 'background-color 0.3s';
  toggleBtn.style.border = '1px solid #2c2c2c';
  toggleBtn.style.padding = '0';
  toggleBtn.style.boxSizing = 'border-box';
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'flex-start';
  toggleBtn.style.paddingLeft = '4px';
  toggleBtn.style.margin = '0 auto 20px auto';
  toggleBtn.addEventListener('click', toggleDarkMode);

  // Style the thumb
  const toggleThumb = toggleBtn.querySelector('.toggle-thumb');
  toggleThumb.style.width = '60px';
  toggleThumb.style.height = '60px';
  toggleThumb.style.backgroundColor = 'transparent';
  toggleThumb.style.backgroundImage = 'url("images/moon3.png")';
  toggleThumb.style.backgroundSize = 'contain';
  toggleThumb.style.backgroundRepeat = 'no-repeat';
  toggleThumb.style.backgroundPosition = 'center';
  toggleThumb.style.borderRadius = '50%';
  toggleThumb.style.transition = 'transform 0.3s, border-color 0.3s';
  toggleThumb.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  toggleThumb.style.border = '1px solid #f8f6f2';

  // Active state styles
  const style = document.createElement('style');
  style.textContent = `
    .toggle-switch.active {
      background-color: #f8f6f2;
      border-color: #f8f6f2;
      justify-content: flex-end;
      padding-left: 0;
      padding-right: 4px;
    }
    .toggle-switch.active .toggle-thumb {
      transform: translateX(52px);
      border-color: #111;
    }
  `;
  document.head.appendChild(style);

  function initToggle() {
    const togglePlaceholder = document.querySelector('.toggle-placeholder');
    if (togglePlaceholder) {
      togglePlaceholder.appendChild(toggleBtn);
    } else {
      document.body.appendChild(toggleBtn);
    }
    // Restore previous state
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      applyDarkMode();
      toggleBtn.classList.add('active');
    }
  }

  document.addEventListener('DOMContentLoaded', initToggle);
})(); 