const fs = require('fs');
const token = JSON.parse(fs.readFileSync(process.env.USERPROFILE + '/.config/sanity/config.json', 'utf8')).authToken;
const query = `*[_type == "tour"] | order(order asc, _createdAt desc)[0..9]{title, "slug": slug.current, description, highlights, itinerary}`;
fetch('https://j7fa6cf0.api.sanity.io/v2026-04-03/data/query/production?query=' + encodeURIComponent(query), {
  headers: { Authorization: 'Bearer ' + token }
})
  .then((r) => r.text())
  .then((t) => console.log(t))
  .catch((e) => { console.error(e); process.exit(1); });
