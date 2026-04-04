const fs = require('fs');
const token = JSON.parse(fs.readFileSync(process.env.USERPROFILE + '/.config/sanity/config.json', 'utf8')).authToken;

const homeDoc = {
  _id: 'homeSettings',
  _type: 'homeSettings',
  pageTitle: '首页配置',
  sections: [
    {
      _type: 'heroSection',
      enabled: true,
      sectionName: '首页头图区',
      title: 'Discover the Magic of Xinjiang',
      subtitle: 'Ancient Silk Road • Stunning Landscapes • Rich Culture',
      primaryButtonText: 'Explore Tours',
      primaryButtonTarget: '#tours',
      secondaryButtonText: 'Plan My Trip',
      secondaryButtonTarget: '/contact'
    },
    {
      _type: 'featureIconsSection',
      enabled: true,
      sectionName: '卖点图标区',
      title: 'Why Travel With Us',
      subtitle: 'Flexible modules managed from the CMS',
      items: [
        { _type: 'iconLinkCard', title: 'Local Expertise', description: 'Trusted local guides and real itineraries', iconType: 'emoji', emoji: '🧭', linkText: 'Learn More', linkTarget: '/about' },
        { _type: 'iconLinkCard', title: 'Flexible Routes', description: 'Private and small-group customized trips', iconType: 'emoji', emoji: '🚐', linkText: 'View Tours', linkTarget: '#tours' },
        { _type: 'iconLinkCard', title: 'Fast Support', description: 'Quick response for itinerary planning', iconType: 'emoji', emoji: '💬', linkText: 'Contact Us', linkTarget: '/contact' }
      ]
    },
    {
      _type: 'destinationCardsSection',
      enabled: true,
      sectionName: '目的地卡片区',
      anchorId: 'destinations',
      title: 'Popular Destinations',
      subtitle: 'Explore the most breathtaking places in Xinjiang',
      items: [
        { _type: 'iconLinkCard', title: 'Kanas Lake', description: 'Kanas Lake - God\'s Garden', iconType: 'emoji', emoji: '🏞️', linkTarget: '/contact' },
        { _type: 'iconLinkCard', title: 'Tianchi Lake', description: 'Heavenly Lake of Tianshan Mountains', iconType: 'emoji', emoji: '⛰️', linkTarget: '/contact' },
        { _type: 'iconLinkCard', title: 'Kashgar Old City', description: 'Pearl of the Silk Road', iconType: 'emoji', emoji: '🕌', linkTarget: '/contact' }
      ]
    },
    {
      _type: 'tourListSection',
      enabled: true,
      sectionName: '旅游线路区',
      anchorId: 'tours',
      title: 'Featured Tour Packages',
      subtitle: 'Handpicked itineraries for unforgettable experiences',
      sourceMode: 'auto',
      maxItems: 6,
      viewMoreText: 'View All Tours',
      viewMoreTarget: 'custom',
      viewMoreLink: '/debug'
    },
    {
      _type: 'statsSection',
      enabled: true,
      sectionName: '数据统计区',
      title: 'Why Travelers Choose Us',
      subtitle: 'Trusted local service and unforgettable experiences',
      items: [
        { _type: 'statItem', number: '500+', label: 'Happy Travelers' },
        { _type: 'statItem', number: '10+', label: 'Years of Experience' },
        { _type: 'statItem', number: '98%', label: 'Positive Feedback' },
        { _type: 'statItem', number: '24/7', label: 'Support' }
      ]
    },
    {
      _type: 'testimonialsSection',
      enabled: true,
      sectionName: '用户评价区',
      title: 'What Our Travelers Say',
      subtitle: 'Real feedback from our guests',
      items: [
        { _type: 'testimonialItem', name: 'Emily', country: 'UK', quote: 'Amazing landscapes, smooth organization, and very responsive support.', rating: 5 },
        { _type: 'testimonialItem', name: 'Daniel', country: 'Singapore', quote: 'The Xinjiang route was unforgettable. Everything was easy and professional.', rating: 5 },
        { _type: 'testimonialItem', name: 'Sofia', country: 'Spain', quote: 'Beautiful itinerary and friendly local team. Highly recommended.', rating: 5 }
      ]
    },
    {
      _type: 'articleListSection',
      enabled: true,
      sectionName: '攻略文章区',
      anchorId: 'articles',
      title: 'Travel Guides',
      subtitle: 'Tips and stories from the Silk Road',
      sourceMode: 'auto',
      maxItems: 3
    },
    {
      _type: 'faqPreviewSection',
      enabled: true,
      sectionName: '首页 FAQ 区',
      title: 'Frequently Asked Questions',
      subtitle: 'Quick answers before you book',
      maxItems: 4,
      viewMoreText: 'View All FAQ',
      viewMoreTarget: '/faq'
    },
    {
      _type: 'ctaSection',
      enabled: true,
      sectionName: '底部行动按钮区',
      title: 'Ready to Plan Your Xinjiang Journey?',
      subtitle: 'Tell us your dates, group size and travel style — we will help you build the trip.',
      primaryButtonText: 'Get a Quote',
      primaryButtonTarget: '/contact',
      secondaryButtonText: 'Contact Us',
      secondaryButtonTarget: '/contact'
    }
  ]
};

fetch('https://j7fa6cf0.api.sanity.io/v2026-04-03/data/mutate/production', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
  body: JSON.stringify({ mutations: [{ createOrReplace: homeDoc }] })
}).then(r => r.text()).then(t => console.log(t)).catch(e => { console.error(e); process.exit(1); });
