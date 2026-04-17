const fs = require('fs');
const path = require('path');
const { createClient } = require('next-sanity');

const tokenFromEnv = process.env.SANITY_API_TOKEN;
const tokenFile = path.join(__dirname, '..', 'secrets', 'sanity_token.txt');
const tokenFromFile = fs.existsSync(tokenFile) ? fs.readFileSync(tokenFile, 'utf8').trim() : '';
const token = tokenFromEnv || tokenFromFile || undefined;

const client = createClient({
  projectId: 'j7fa6cf0',
  dataset: 'production',
  apiVersion: '2026-04-03',
  useCdn: false,
  token,
});

async function main() {
  const tours = await client.fetch(`*[_type == "tour"] | order(_createdAt desc) { _id, title, "slug": slug.current, published, _createdAt }`);
  const destinations = await client.fetch(`*[_type == "destination"] | order(_createdAt desc) { _id, name, "slug": slug.current, published, _createdAt }`);

  console.log(
    JSON.stringify(
      {
        tokenSource: tokenFromEnv ? 'env' : tokenFromFile ? 'file' : 'none',
        counts: {
          tours: tours.length,
          destinations: destinations.length,
        },
        tours,
        destinations,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
