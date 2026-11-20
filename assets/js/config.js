/* ==========================================================================
   SITE CONFIG — edit this one file to update contact details, price and listings.
   Every page reads from here, so a change made once shows everywhere.
   ========================================================================== */
window.SITE = {
  brand: "Philippines Listing Service",
  shortBrand: "PLS",
  domain: "philippineslistingservice.com",
  tagline: "Direct listings. Honest photos. Serious buyers.",

  agent: {
    name: "Nelson Velasco",
    phoneDisplay: "0962 448 8936",
    phoneIntl: "+639624488936",      // used for tel:, WhatsApp and Viber links
    // TODO (client): confirm the inbox that should receive enquiries.
    email: "hello@philippineslistingservice.com"
  },

  // Google Analytics 4 — paste the Measurement ID (e.g. "G-XXXXXXX") to switch tracking on.
  gaMeasurementId: "",

  // Rooms in the order the client sent them. `count` images live in images/property/<slug>/
  rooms: [
    { slug: "front-house",    label: "Front House",    files: [1,2,3,4,5,6,7,8,9],        asIs: "front-house" },
    { slug: "kitchen",        label: "Kitchen",        files: [10,11,12,13,14,15],        asIs: "kitchen" },
    { slug: "living-room",    label: "Living Room",    files: [16,17,18,19,20,21],        asIs: "living-room" },
    { slug: "master-bedroom", label: "Master Bedroom", files: [22,23,24,25,26,27],        asIs: "master-bedroom" },
    { slug: "main-room",      label: "Main Bedroom",   files: [28,29,30,31,32],           asIs: "main-bedroom" },
    { slug: "dining-room",    label: "Dining Room",    files: [33,34,35,36,37,38,39,40],  asIs: "dining-room" },
    { slug: "patio",          label: "Patio",          files: [41,42,43,44,45],           asIs: "patio" },
    { slug: "guest-house",    label: "Guest House",    files: [46,47,48,49,50],           asIs: "guest-house" },
    { slug: "guest-room",     label: "Guest Room",     files: [51,52,53,54,55],           asIs: "guest-room" },
    { slug: "small-room",     label: "Small Bedroom",  files: [56,57,58,59,60,61,62,63],  asIs: "small-bedroom" },
    { slug: "large-room",     label: "Large Bedroom",  files: [65,66,67,68,69],           asIs: "large-bedroom" }
  ],

  /* Listings. Add the next properties here — the Properties page and Buy menu update themselves.
     status: "for-sale" | "coming-soon" | "sold"  */
  properties: [
    {
      id: "bel-air-ii-comet",
      status: "for-sale",
      featured: true,
      type: "House & Lot",
      title: "Rare Family Home & Prime Investment Opportunity",
      shortTitle: "Bel-Air II Family Home",
      address: "34 Comet St., Bel-Air II, Makati City",
      area: "Bel-Air II, Makati",
      city: "Makati City",
      // TODO (client): add the asking price, e.g. "₱ 180,000,000". Leave "" to show "Price on request".
      price: "",
      reservationFee: "₱3,000,000",
      payment: "Cash purchase only",
      negotiation: "Submit a Letter of Intent (LOI)",
      title_status: "Clean title",
      turnover: "Within 1 month",
      lotArea: "502 sqm",
      orientation: "East-facing end lot",
      floorArea: "",        // TODO (client): confirm floor area
      bedrooms: "",         // TODO (client): confirm bedroom count
      bathrooms: "",        // TODO (client): confirm bathroom count
      homes: "Main house + guest house",
      parking: "Up to 11 cars",
      pool: "Private swimming pool",
      url: "bel-air-property.html",
      image: "images/property/front-house/belair-front-house-005-cs.jpg",
      viewingNotice: "By appointment only — please book at least 3 days in advance."
    },
    { id: "slot-2", status: "coming-soon", type: "House & Lot", shortTitle: "Next listing — Metro Manila", area: "Coming soon", image: "images/stock/plsm-modern-tropical-home.jpg" },
    { id: "slot-3", status: "coming-soon", type: "House & Lot", shortTitle: "Next listing — Metro Manila", area: "Coming soon", image: "images/stock/plsm-pool-home.jpg" },
    { id: "slot-4", status: "coming-soon", type: "Lot",         shortTitle: "Next listing — Metro Manila", area: "Coming soon", image: "images/stock/plsm-village-street.jpg" },
    { id: "slot-5", status: "coming-soon", type: "Condominium", shortTitle: "Next listing — Makati",       area: "Coming soon", image: "images/stock/plsm-makati-towers.jpg" },
    { id: "slot-6", status: "coming-soon", type: "Condominium", shortTitle: "Next listing — Makati",       area: "Coming soon", image: "images/stock/plsm-makati-skyline-day.jpg" }
  ]
};
