# Philippines Listing Service: Bel-Air II website

This is a static HTML website for client **mrmanilamanila**: a Zameen/Lamudi-style property portal built to sell the Bel-Air II home first. It's ready for the next 5 properties.

## Open it
Double-click `index.html`. No build step is needed. Fonts are self-hosted in `assets/fonts` (Cormorant Garamond + Jost, SIL Open Font License); only the Google Map needs the internet.

**Design (luxury edition):** ink and champagne palette, editorial numbered sections, and overlay-free crops of every photo (`*-c.jpg` / `*-cs.jpg`) so the yellow "To your dream home" text and phone number never show. The original slides are kept untouched next to them. The photo viewer shows each concept with the room's real "as it stands today" photo.

**First, run `move-stock-photos.bat`.** Chrome saved 11 Unsplash photos to your Downloads folder as `plsm-*.jpg`. The script moves them into `images/stock/`. Until you run it, those spots show a navy gradient.

## Pages
| File | What it is |
|---|---|
| `index.html` | Homepage: full-screen hero with price and key figures, the residence, a room-by-room grid, Today vs Concept, the address and nearby places, acquisition steps, the property collection (Zameen-style cards) and an enquiry form. |
| `bel-air-property.html` | Listing page. It has a photo mosaic, details table, features, a gallery filtered by room (68 photos), 11 as-is photos, a map with nearby places, a Schedule-a-Viewing form, a sticky Call/WhatsApp/Viber card and share buttons. |
| `properties.html` | All listings, with type and status filters. Five "coming soon" slots are ready. |
| `about.html`, `contact.html`, `privacy.html` | About page, contact page, and the privacy policy with the property disclaimer (`#disclaimer`). |
| `fact-sheet.html` | One-page A4 fact sheet. "Download PDF" opens the print dialog so it can be saved as a PDF. |

## Edit content
Everything that changes lives in **`assets/js/config.js`**: phone, email, price, Google Analytics ID, rooms and the property list. To add a property, add an object to `properties` and change its `status` from `coming-soon` to `for-sale`.

## How the forms work (static site)
The forms validate first. They block spam with a hidden honeypot field and a minimum fill time. They then open **WhatsApp** (or the visitor's **email app**) with the enquiry already written out for +63 962 448 8936. The visitor presses Send. If the client wants automatic email alerts without that last step, you'll need hosting with a form backend (PHP mail, Formspree, or WordPress).

## Open items to confirm with the client
1. **Asking price.** It isn't in the chat. The same 502 sqm, east-facing end lot on Comet St is listed on Dot Property by another broker (Finest Homes Realty) at **₱174M, "priced at land value"**. Santos Knight Frank's H1 2026 figure for Bel-Air is about **₱550,000/sqm**. Ask the client to confirm the price and whether another broker is also marketing the property.
2. **Brand name.** Three names appear: "Fil NEST" (on the photos), "Nelson Homes PH" (in the description) and "PhilippinesListingService.com" (the domain). The site uses Philippines Listing Service.
3. **Floor area, bedroom and bathroom count.** These are missing and show as "On request".
4. **Email inbox** for enquiries. A placeholder is set in config.js.
5. **AI concept photos.** Every gallery image is a renovation concept with a "Remodeling Needed / Direct Buyers Only" overlay. The site labels them as concepts and pairs each with the real as-is photo, which is the current best practice in disclosure rules (for example California AB 723, effective 2026). Keep that labeling.
6. **Items from the requirements form beyond the agreed plan:** Sell, Home Valuation, Communities, Blog, their own CRM, and the admin login. The admin login (add properties, mark as Sold) needs a CMS or backend, so it can't be done in static HTML.
7. **Nearby travel times.** These are approximate and should be checked. "Walking distance to Makati Medical Center" comes from the client.
8. **Legal.** The privacy policy and disclaimer should be reviewed by their lawyer, and the business name and address added.

## Research notes (niche)
- **Market.** Bel-Air is one of the "big five" Makati villages. Santos Knight Frank's H1 2026 benchmarks: Forbes Park ₱800k/sqm, Dasmariñas ₱750k, Urdaneta ₱580k, Bel-Air ₱550k, San Lorenzo ₱520k. Current Bel-Air II house-and-lot asking prices on Lamudi and Housal run from about ₱174M to ₱350M.
- **Reference UX (Zameen/Lamudi).** Listing pages share a pattern: gallery mosaic, then an icon row (beds/baths/area), then an Overview/Details table, then amenities grouped by category, then "Location & Nearby" with map tabs (schools/hospitals/malls), then a finance calculator, then a sticky agent card with Call/WhatsApp. The finance calculator was skipped because the sale is cash only.
- **Single-property sites** convert best when every page has one call to action and a lead form, the property has its own URL and SEO, and there's a large photo gallery. All of these are implemented.
- **Who can buy land.** Generally only Filipino citizens. Former natural-born Filipinos can buy up to 1,000 sqm of urban land for residential use (BP 185), and dual citizens under RA 9225 have no limit. This matters for buyers abroad, so it's covered in the disclaimer.
- **Closing costs.** By custom the seller pays 6% CGT. The buyer pays 1.5% DST, a transfer tax of about 0.5–0.75%, and about 0.25% in registration fees.
