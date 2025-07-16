# DarkMode Toggle

A plug-and-play dark mode toggle for any website. Instantly add a dark mode button to your site with a single script tag—no dependencies, no code exposure.

## Features
- One-line integration
- Automatically transforms your site's colors for dark mode
- Toggle button injected into the page
- Remembers user preference
- No dependencies

## Usage

### 1. Add the Script Tag
Add the following to your HTML, ideally before the closing `</body>` tag:

```html
<script src="https://yourdomain.com/darkmode-toggle.js"></script>
```

For local testing, use:
```html
<script src="./darkmode-toggle.js"></script>
```

### 2. That's It!
A dark mode toggle button will appear in the top-right corner of your site. Clicking it will switch your site between light and dark mode.

## Optional Configuration
*Configuration API coming soon!*

## How It Works
- The script scans your page and inverts background/text colors for a dark mode effect.
- User preference is saved in localStorage.
- Toggling restores the original colors.

## Demo
See `demo.html` for a local example.

## License
MIT 