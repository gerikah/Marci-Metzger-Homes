# Marci Metzger Homes

A responsive, single-page real estate homepage for Marci Metzger and The Ridge Realty Group. The site preserves the provided copy and downloaded source photography while presenting it in an editorial, white-and-earthy visual system.

Live site: [marci-metzger-homes-psi.vercel.app](https://marci-metzger-homes-psi.vercel.app/)

## Features

- Responsive layout for mobile, tablet, desktop, and wide screens
- Semantic HTML with keyboard focus styles and a skip link
- Mobile navigation with a no-JavaScript fallback
- IntersectionObserver-based, one-time scroll reveals
- Hero entrance motion with `prefers-reduced-motion` support
- Seven-image gallery with lightbox open, close, previous, next, Escape, arrow-key navigation, focus trapping, and focus return
- Hover zoom treatment for gallery and service images on hover-capable devices
- Lazy-loaded below-the-fold images and a prioritized hero image
- Branded PNG favicon
- Phone links, social links, directions link, and opt-in Google Maps embed

## Local Development

Requirements: Node.js and npm.

Install dependencies:

```bash
npm install
```

Start the local server at [http://127.0.0.1:4173](http://127.0.0.1:4173):

```bash
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`:

```powershell
npm.cmd run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Serves the project locally on port 4173 |
| `npm run build` | Copies the static site into `dist/` and checks local HTML references |
| `npm test` | Runs Playwright QA across responsive viewports and key interactions |

The test suite expects the local server to be running at `http://127.0.0.1:4173`.

## Deployment

The project is configured for static deployment on Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: none

The generated `dist/` directory contains the HTML, CSS, JavaScript, fonts, and `ASSETS/` directory required by the page.

## Integrations and Limitations

- Listing search is a clearly labeled preview. It validates and summarizes selected preferences but does not query live listings or transfer filters. Visitors can use the link to the original listings page.
- The contact form is not connected to a messaging endpoint. It does not claim to send messages and provides the phone contact option instead.
- The Google Map is opt-in and loads only after the visitor selects the map button.

## Project Files

- `index.html` - page structure, content, links, forms, gallery, and lightbox markup
- `styles.css` - responsive layout, typography, color tokens, motion, and focus states
- `script.js` - navigation, gallery lightbox, preview form behavior, map loading, and scroll reveals
- `ASSETS/` - downloaded source images used by the homepage
- `qa.cjs` - Playwright browser checks
- `build.cjs` - static build and local-reference validation