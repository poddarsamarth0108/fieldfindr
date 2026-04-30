const fetch = require("node-fetch");
const fs = require("fs");

// IMPORTANT: Adjust path if needed
const { FIELDS_DB } = require("./src/data/fields");

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "fieldfindr-app" }
  });

  const data = await res.json();

  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon)
    };
  }

  return null;
}

async function run() {
  for (const city in FIELDS_DB) {
    for (const field of FIELDS_DB[city]) {

      // Skip if already valid

      console.log("🔍 Fetching:", field.name);

      const result = await geocode(field.address);

      if (result) {
        field.lat = result.lat;
        field.lng = result.lng;
        console.log("✅ Done:", field.name);
      } else {
        console.log("❌ Failed:", field.name);
      }

      await new Promise(r => setTimeout(r, 1000));
    }
  }

  fs.writeFileSync(
    "./src/data/fields_updated.json",
    JSON.stringify(FIELDS_DB, null, 2)
  );

  console.log("🎉 DONE — check fields_updated.json");
}

run();