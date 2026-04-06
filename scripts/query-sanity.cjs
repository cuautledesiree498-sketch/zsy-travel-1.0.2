const fs = require('fs');
const query = process.argv[2];
const token = JSON.parse(fs.readFileSync(process.env.USERPROFILE + '/.config/sanity/config.json', 'utf8')).authToken;
fetch('https://j7fa6cf0.api.sanity.io/v2026-04-03/data/query/production?query=' + encodeURIComponent(query), {
  headers: { Authorization: 'Bearer ' + token }
})
  .then((r) => r.text())
  .then((t) => console.log(t))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
