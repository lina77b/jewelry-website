# Luna Jewelry - E-Commerce Front-End Prototype

A clean, responsive front-end prototype for an online jewelry store, created as an academic web development project (L2).

🔗 **Live demo:** [https://bounar.netlify.app/](https://bounar.netlify.app/)

## Overview

Luna Jewelry is a static, multi-page website simulating a jewelry e-commerce shop based in Algeria. It showcases product catalogs (rings, necklaces, bracelets, earrings), a shopping cart with a full checkout flow, user authentication forms, a repair-services page, and a contact page — all built with vanilla HTML, CSS, and JavaScript, with no backend or external framework.

## Features

- **Responsive navigation** with a hamburger menu and dropdown submenus for mobile devices
- **Homepage** with an auto-playing image slider/carousel (pauses on hover, manual prev/next controls)
- **Product categories**: Rings (Bagues), Necklaces (Colliers), Bracelets, and Earrings (Boucles d'oreilles), each with a product grid, images, descriptions, and prices in DZD
- **Shopping cart**
  - Add to cart, update quantities, and remove items
  - Cart persisted in `localStorage`
  - Live cart item counter in the navbar
  - Subtotal, shipping cost, and total calculation
  - Multi-step checkout: delivery details → payment method → order confirmation
  - Delivery form includes a full list of Algeria's 58 wilayas
- **Authentication pages**
  - Sign-up form with real-time password strength validation (length, uppercase, lowercase, number, special character) and password confirmation matching
  - Login form with a Google sign-in button (UI only, non-functional)
- **Repair services page** detailing jewelry repair, cleaning, engraving, resizing, and general repair services
- **Contact page** with a simple message form
- **Categories overview page** linking to each product collection

## Tech Stack

- **HTML5** — semantic, multi-page structure
- **CSS3** — custom responsive styling (`style/styles.css`)
- **Vanilla JavaScript** — no frameworks or libraries (`javascript/script.js`)
- **localStorage** — client-side cart persistence
- **Netlify** — static site hosting/deployment

## Project Structure

```
.
├── index.html                  # Homepage
├── style/
│   └── styles.css              # Global stylesheet
├── javascript/
│   └── script.js               # Cart logic, slider, forms, navigation
├── images/                     # Logos, icons, and product images
└── content/
    ├── categories.html         # Category overview
    ├── bague.html               # Rings
    ├── collier.html             # Necklaces
    ├── bracelet.html            # Bracelets
    ├── boucles.html              # Earrings
    ├── panier.html               # Cart & checkout
    ├── autentification.html      # Login
    ├── inscription.html          # Sign-up
    ├── reparation.html           # Repair services
    └── contact.html              # Contact form
```

> Note: paths above reflect the site's live structure (pages inside a `content/` folder, assets referenced via relative `../` paths). Adjust folder names locally if you reorganize the files.

## Getting Started

This is a static site with no build step or dependencies.

1. Clone or download the repository.
2. Make sure the folder structure matches the relative paths used in the HTML (`images/`, `style/`, `javascript/`, and a `content/` subfolder for the inner pages).
3. Open `index.html` directly in a browser, or serve the folder with a simple local server, e.g.:
   ```bash
   npx serve .
   ```
4. Browse the site, add products to the cart, and try the checkout flow.

## Known Limitations

- This is a **front-end-only prototype**: there is no real backend, database, or payment processor. Forms (sign-up, login, contact, checkout) simulate behavior with alerts and `localStorage`, and do not persist or send data anywhere.
- Google sign-in/sign-up buttons are placeholders (not wired to an OAuth provider).
- Product data is hardcoded in `script.js` and duplicated across the category HTML pages.
- Some minor inconsistencies exist between pages (e.g. language attribute, asset paths) as this was an early academic project.

## Author

Developed as a second-year (L2) academic web development project.

## License

This project is provided for educational and portfolio purposes.
