const fs = require('fs');
const token = JSON.parse(fs.readFileSync(process.env.USERPROFILE + '/.config/sanity/config.json', 'utf8')).authToken;

const query = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    siteTitle,
    siteDescription,
    footerIntro,
    aboutHeroTitle,
    contactHeroTitle,
    faqTitle,
    faqItems[0..2]{question,answer}
  },
  "homeSettings": *[_type == "homeSettings"][0]{
    sections[]{
      _type,
      title,
      subtitle,
      items[0..2]{title,description,quote,number,label,linkText},
      viewMoreText,
      primaryButtonText,
      secondaryButtonText
    }
  },
  "tours": *[_type == "tour"][0..5]{
    title,
    description,
    highlights[0..2],
    itinerary[0..1]{day,title,description}
  },
  "articles": *[_type == "article"][0..5]{
    title,
    author,
    published
  }
}`;

fetch('https://j7fa6cf0.api.sanity.io/v2026-04-03/data/query/production?query=' + encodeURIComponent(query), {
  headers: { Authorization: 'Bearer ' + token }
})
  .then((r) => r.text())
  .then((t) => console.log(t))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
