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
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.textAlign = 'center';
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