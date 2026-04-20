# Field Findr

> Find football fields, cricket grounds and sports turfs near you across India — free and paid.

**Live URL:** [your-url-here].netlify.app  
**Built with:** React, React Router  
**Hosted on:** Netlify (free)

---

## What this app does

- Search any major Indian city to find sports grounds, parks and turfs
- Filter by: Turfs only / Free entry / Large fields (10,000+ sqm)
- Sort by: Distance / Size / Name
- Each field has a dedicated shareable URL (e.g. `/field/ptn-1`)
- One-tap directions via Google Maps
- Click-to-call for paid turfs
- Works as a mobile web app (Add to Home Screen on Android/iPhone)

## Cities covered

Patna, Mumbai, Delhi, Bengaluru, Kolkata, Hyderabad, Pune, Chennai, Ahmedabad, Jaipur, Lucknow, Surat

---

## How to run locally (on your computer)

**Step 1 — Install Node.js**  
Go to https://nodejs.org → click "LTS" → install it

**Step 2 — Open Terminal (Mac) or Command Prompt (Windows)**

**Step 3 — Navigate to this folder**
```
cd path/to/fieldfindr
```

**Step 4 — Install dependencies**
```
npm install
```

**Step 5 — Start the app**
```
npm start
```

It opens automatically at http://localhost:3000

---

## How to deploy to Netlify (get a live URL)

**Step 1 — Push to GitHub**
1. Go to github.com → sign up (free)
2. Create a new repository called `fieldfindr`
3. Follow GitHub's instructions to push this folder

**Step 2 — Connect to Netlify**
1. Go to netlify.com → sign up with GitHub
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub → select `fieldfindr`
4. Build command: `npm run build`
5. Publish directory: `build`
6. Click "Deploy site"

Your site is live in ~2 minutes at a URL like `fieldfindr-abc123.netlify.app`

**Step 3 — Custom domain (optional, free)**  
In Netlify settings → Domain management → you can get `fieldfindr.netlify.app` for free,
or connect a custom domain you buy from GoDaddy/Namecheap for ~₹800/year.

---

## How to add a new city

Open `src/data/fields.js` and add a new key to the `FIELDS_DB` object:

```js
yourcity: [
  {
    id: "yct-1",
    name: "Name of Ground",
    type: "park",          // "park", "ground", or "turf"
    address: "Area, City, State PIN",
    area: 15000,           // in square metres
    isPaid: false,
    phone: null,           // or "9999999999" for turfs
    sports: ["Football", "Cricket"],
    hours: "5am – 9pm",
    distKm: 3.5,
    lat: 00.0000,          // Google Maps latitude
    lng: 00.0000,          // Google Maps longitude
    notes: "Short helpful note about the ground."
  },
  // ... more fields
]
```

Then add your city to the `CITIES` array at the top of the file.

---

## Roadmap (future features)

- [ ] Turf owner listing form (they submit their turf)
- [ ] User accounts (save favourite fields)
- [ ] Online booking + Razorpay payments
- [ ] Reviews and ratings
- [ ] GPS-based nearest field detection
- [ ] Native Android/iOS app (React Native)

---

## Business model

1. **Phase 1 — Traffic:** Free app, get users through sports WhatsApp groups, Reddit (r/Cricket, r/IndiaSports), Instagram
2. **Phase 2 — Turf listings:** Charge turf owners ₹500–₹1000/month to appear as "Verified" with priority placement
3. **Phase 3 — Booking commission:** Take 5–10% of every booking made through the platform
4. **Phase 4 — Expand cities:** Each new city is a new market

---

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 18 | Most in-demand frontend skill globally |
| Routing | React Router v6 | Industry standard, shareable URLs |
| Styling | CSS Modules | Scoped, maintainable, no extra libraries |
| Hosting | Netlify | Free tier, auto-deploy from GitHub |
| Database | JSON in code (v1) | Simple, fast, zero cost to start |

---

*Made with purpose. Built for players.*
