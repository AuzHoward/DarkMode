# DarkMode Toggle

A plug-and-play dark mode toggle for any website. Instantly add a dark mode button to your site with a single script tag—no dependencies, no code exposure.

## Features
- One-line integration
- Automatically transforms your site's colors for dark mode
- Toggle button injected into the page
- Remembers user preference
- No dependencies
- **NEW: Global dark mode across entire website**

## Usage

### For Your Own Website (Landing Page)
Add the following to your HTML, ideally before the closing `</body>` tag:

```html
<script src="https://yourdomain.com/darkmode-toggle.js"></script>
```

### For Client Websites (Global Dark Mode)
Add this single line to enable dark mode across the entire website:

```html
<script src="https://yourdomain.com/darkmode-toggle-client.js"></script>
```

**That's it!** The toggle will appear and work across all pages of the website.

## How It Works
- **Client Version:** Applies dark mode globally using CSS classes and neutral color inversion
- **Landing Page Version:** Custom styling for your specific design
- User preference is saved in localStorage and persists across all pages
- Toggle appears in the top-right corner of every page

## Demo
See `demo.html` for a local example.

## License
MIT 