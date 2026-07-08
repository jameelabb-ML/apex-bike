/**
 * APEX Bespoke Tailoring — Complete E-Commerce Motorsport Asset Registry
 * All images are REAL motorcycle racing leather suits, riders, and gear.
 */

export const suitTypes = [
  {
    id: '1pc',
    name: '1-Piece Full Track Suit',
    description: 'Seamless aerodynamic construction with integrated aerodynamic hump, knee sliders, and full perforation zones. Engineered for maximum velocity on the circuit.',
    premium: 150,
    basePrice: 2499,
    img: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/0b41da9a0f2276a672748f30c7d9f459183d3985.jpg',
    gallery: ['https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/0b41da9a0f2276a672748f30c7d9f459183d3985.jpg', 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/109f1699b97c3cc5bbe9600301992bfac46901ad.jpeg', 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg', 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg'],
    features: ['Aerodynamic hump', 'Integrated knee sliders', 'Full perforation zones', 'CE Level 2 armor'],
    rating: 4.9,
    reviews: 847,
    sku: 'APEX-1PC-2024',
    stock: 'In Stock',
  },
  {
    id: '2pc',
    name: '2-Piece Street-Tuned Suit',
    description: 'Versatile two-piece configuration with zip-together compatibility. Ideal for street performance and occasional track days without compromising protection.',
    premium: 0,
    basePrice: 1899,
    img: 'https://kimi-web-img.moonshot.cn/img/motrox.co.uk/c34ac9462ac21e18fd4ec27e38ce08fa6f3fcd9e.jpg',
    gallery: ['https://kimi-web-img.moonshot.cn/img/motrox.co.uk/c34ac9462ac21e18fd4ec27e38ce08fa6f3fcd9e.jpg', 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg', 'https://kimi-web-img.moonshot.cn/img/rydermotorcycles.co.uk/c834a8a28acc45973a8bff306d9892233d4f3539.jpg', 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/0b41da9a0f2276a672748f30c7d9f459183d3985.jpg'],
    features: ['Modular zip system', 'Removable thermal liner', 'Reflective accents', 'CE Level 1 armor'],
    rating: 4.7,
    reviews: 623,
    sku: 'APEX-2PC-2024',
    stock: 'In Stock',
  },
];

export const perforationOptions = [
  {
    id: 'perf-none',
    name: 'Solid Construction',
    description: 'Unperforated full-grain leather for maximum abrasion resistance and weather protection. Preferred for wet-weather racing and cooler climates.',
    premium: 0,
    img: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/109f1699b97c3cc5bbe9600301992bfac46901ad.jpeg',
  },
  {
    id: 'perf-partial',
    name: 'Strategic Ventilation',
    description: 'Laser-perforated chest panels and inner thighs for balanced airflow without compromising structural integrity at high-speed impact zones.',
    premium: 89,
    img: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/0b41da9a0f2276a672748f30c7d9f459183d3985.jpg',
  },
  {
    id: 'perf-full',
    name: 'Full Race Ventilation (Max Airflow)',
    description: 'Laser-perforated chest, back, thighs, and arms for high-velocity track heat management. Engineered to maintain structural integrity while maximizing thermal regulation.',
    premium: 179,
    img: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/0b41da9a0f2276a672748f30c7d9f459183d3985.jpg',
  },
];

export const protectionOptions = [
  {
    id: 'prot-standard',
    name: 'Standard CE Armor Package',
    description: 'CE Level 1 certified armor inserts at shoulders, elbows, knees, and back. Removable and replaceable for long-term suit maintenance.',
    premium: 0,
    img: 'https://kimi-web-img.moonshot.cn/img/rydermotorcycles.co.uk/c834a8a28acc45973a8bff306d9892233d4f3539.jpg',
  },
  {
    id: 'prot-advanced',
    name: 'Advanced Composite Armor System',
    description: 'CE Level 2 multi-density armor with D3O molecular shock absorption technology. 40% greater impact dispersion than standard CE Level 1.',
    premium: 249,
    img: 'https://kimi-web-img.moonshot.cn/img/rydermotorcycles.co.uk/c834a8a28acc45973a8bff306d9892233d4f3539.jpg',
  },
  {
    id: 'prot-airbag',
    name: 'Integrated Electronic Airbag System',
    description: 'Fitted with intelligent reactive deployment safety chambers. Inertial measurement unit detects crash dynamics in under 45ms, deploying full-torso airbag protection before ground contact.',
    premium: 499,
    img: 'https://kimi-web-img.moonshot.cn/img/cdn-iutgbvdd.sportsbikeshop.co.uk/60c23014af45c35a61e839ac1b9eea4a738cfc33.jpg',
  },
];

export const teamPresets = [
  {
    id: 'preset-gp-shadow',
    name: 'GP Shadow-Line',
    tagline: 'Stealth Dominance',
    description: 'Matte black-on-black aesthetic with subtle gunmetal accents. Inspired by factory prototype testing liveries used by championship-winning teams during pre-season development.',
    img: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/109f1699b97c3cc5bbe9600301992bfac46901ad.jpeg',
    gallery: ['https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/109f1699b97c3cc5bbe9600301992bfac46901ad.jpeg', 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg', 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/109f1699b97c3cc5bbe9600301992bfac46901ad.jpeg'],
    colorScheme: 'Matte Obsidian / Gunmetal / Stealth Grey',
    suitType: '1pc',
    perforation: 'perf-full',
    protection: 'prot-airbag',
    basePrice: 3147,
    rating: 5.0,
    reviews: 124,
    sku: 'APEX-PRESET-GP-SHADOW',
    stock: 'Made to Order',
    features: ['Matte obsidian finish', 'Gunmetal hardware', 'Shadow-line pinstriping', 'Factory prototype aesthetic'],
  },
  {
    id: 'preset-corsair',
    name: 'Corsair Factory Racing',
    tagline: 'Velocity Redefined',
    description: 'Aggressive racing red with carbon fiber weave panels and championship gold accents. The definitive factory team livery for riders who demand podium presence.',
    img: 'https://kimi-web-img.moonshot.cn/img/cdn.ecommercedns.uk/c974751d376e67e8c468113b65fff27af2ff5327.png',
    gallery: ['https://kimi-web-img.moonshot.cn/img/cdn.ecommercedns.uk/c974751d376e67e8c468113b65fff27af2ff5327.png', 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg', 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg'],
    colorScheme: 'Racing Red / Carbon Fiber / Championship Gold',
    suitType: '1pc',
    perforation: 'perf-partial',
    protection: 'prot-advanced',
    basePrice: 2837,
    rating: 4.9,
    reviews: 356,
    sku: 'APEX-PRESET-CORSAIR',
    stock: 'In Stock',
    features: ['Racing red base', 'Carbon fiber weave panels', 'Gold accent stitching', 'Factory team livery'],
  },
  {
    id: 'preset-monza',
    name: 'Monza Heritage Edition',
    tagline: 'Timeless Italian Craftsmanship',
    description: 'Classic racing green with cream leather panels and hand-stitched brass hardware. A tribute to the golden era of Grand Prix motorcycle racing and Italian leather craftsmanship.',
    img: 'https://kimi-web-img.moonshot.cn/img/agvsportgear.com/164283a5dc803fb902b3ad2c323f884b0350089b.png',
    gallery: ['https://kimi-web-img.moonshot.cn/img/agvsportgear.com/164283a5dc803fb902b3ad2c323f884b0350089b.png', 'https://kimi-web-img.moonshot.cn/img/img.magnific.com/ba3722b225a7a30899122caa3bf586fc5459b303.jpg', 'https://kimi-web-img.moonshot.cn/img/img.magnific.com/ba3722b225a7a30899122caa3bf586fc5459b303.jpg'],
    colorScheme: 'Racing Green / Cream Leather / Brass Hardware',
    suitType: '2pc',
    perforation: 'perf-partial',
    protection: 'prot-advanced',
    basePrice: 2187,
    rating: 4.8,
    reviews: 89,
    sku: 'APEX-PRESET-MONZA',
    stock: 'Made to Order',
    features: ['Classic racing green', 'Cream leather panels', 'Hand-stitched brass', 'Heritage Grand Prix aesthetic'],
  },
];

export const measurementFields = {
  upperBody: [
    { id: 'height', label: 'Total Height', unit: 'cm', min: 140, max: 220, placeholder: 'e.g. 178' },
    { id: 'weight', label: 'Weight', unit: 'kg', min: 40, max: 180, placeholder: 'e.g. 75' },
    { id: 'chest', label: 'Chest Circumference', unit: 'cm', min: 70, max: 160, placeholder: 'e.g. 102' },
    { id: 'shoulderWidth', label: 'Shoulder Width', unit: 'cm', min: 35, max: 70, placeholder: 'e.g. 48' },
    { id: 'armLength', label: 'Arm Reach', unit: 'cm', min: 50, max: 90, placeholder: 'e.g. 65' },
    { id: 'neck', label: 'Neck Circumference', unit: 'cm', min: 30, max: 55, placeholder: 'e.g. 40' },
    { id: 'bicep', label: 'Bicep Circumference', unit: 'cm', min: 20, max: 55, placeholder: 'e.g. 34' },
  ],
  lowerBody: [
    { id: 'waist', label: 'Waist Circumference', unit: 'cm', min: 55, max: 150, placeholder: 'e.g. 82' },
    { id: 'hips', label: 'Hip Circumference', unit: 'cm', min: 70, max: 160, placeholder: 'e.g. 96' },
    { id: 'inseam', label: 'Inseam Length', unit: 'cm', min: 60, max: 100, placeholder: 'e.g. 78' },
    { id: 'thigh', label: 'Thigh Circumference', unit: 'cm', min: 40, max: 90, placeholder: 'e.g. 58' },
    { id: 'calf', label: 'Calf Circumference', unit: 'cm', min: 25, max: 60, placeholder: 'e.g. 38' },
    { id: 'outseam', label: 'Outseam Length', unit: 'cm', min: 80, max: 130, placeholder: 'e.g. 102' },
  ],
};

export const heroImages = {
  hero: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&q=80',
  suit1pc: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/0b41da9a0f2276a672748f30c7d9f459183d3985.jpg',
  suit2pc: 'https://kimi-web-img.moonshot.cn/img/motrox.co.uk/c34ac9462ac21e18fd4ec27e38ce08fa6f3fcd9e.jpg',
  teamPresets: 'https://kimi-web-img.moonshot.cn/img/cdn.ecommercedns.uk/c974751d376e67e8c468113b65fff27af2ff5327.png',
  riderTrack: 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg',
  suitDetail: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/109f1699b97c3cc5bbe9600301992bfac46901ad.jpeg',
  aerodynamic: 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg',
  airbag: 'https://kimi-web-img.moonshot.cn/img/cdn-iutgbvdd.sportsbikeshop.co.uk/60c23014af45c35a61e839ac1b9eea4a738cfc33.jpg',
  blueprint: 'https://kimi-web-img.moonshot.cn/img/www.wheelup.com/56a400d335cf8f7b99788476415ae86a20863054.JPG',
  customDesign: 'https://kimi-web-img.moonshot.cn/img/img.magnific.com/ba3722b225a7a30899122caa3bf586fc5459b303.jpg',
  perforation: 'https://kimi-web-img.moonshot.cn/img/www.fc-moto.com/0b41da9a0f2276a672748f30c7d9f459183d3985.jpg',
  motogp: 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg',
  hump: 'https://kimi-web-img.moonshot.cn/img/s3.amazonaws.com/4a2e818681d7ddbc309f974ff61c14de9710f966.jpg',
  kneeSlider: 'https://kimi-web-img.moonshot.cn/img/rydermotorcycles.co.uk/c834a8a28acc45973a8bff306d9892233d4f3539.jpg',
  teamRider: 'https://kimi-web-img.moonshot.cn/img/img.magnific.com/ba3722b225a7a30899122caa3bf586fc5459b303.jpg',
};

export const technicalSpecs = {
  leather: '1.3mm — 1.5mm full-grain race-grade cowhide with reinforced double-stitching at all impact zones',
  stitching: 'Reinforced bonded nylon thread, 8-10 stitches per inch, double-needle construction at seams',
  armor: 'CE EN 1621-1 / EN 1621-2 certified, removable and replaceable insert system',
  ventilation: 'Laser-perforated panels with 3D mesh backing, tested at speeds exceeding 280 km/h',
  certification: 'CE Category II PPE, EN 13595-1 certified for professional motorcycle racing',
  warranty: '5-year structural integrity warranty with complimentary annual inspection service',
};

export const reviews = [
  { id: 1, name: 'Marco Rossi', rating: 5, date: '2024-11-15', text: 'The fit is absolutely perfect. The 0.3mm tolerance claim is real — this suit feels like a second skin at 280km/h.', verified: true, location: 'Monza, Italy' },
  { id: 2, name: 'James Chen', rating: 5, date: '2024-10-22', text: 'Went with the Corsair preset and the airbag system. The quality of the leather and stitching is championship-level.', verified: true, location: 'Austin, TX' },
  { id: 3, name: 'Sarah Mitchell', rating: 4, date: '2024-09-08', text: 'Incredible craftsmanship. The measurement process was thorough and the final product exceeded expectations. 6-week delivery as promised.', verified: true, location: 'Silverstone, UK' },
  { id: 4, name: 'Kazuki Tanaka', rating: 5, date: '2024-08-30', text: 'GP Shadow-Line preset with full perforation. Best suit I have ever owned. The ventilation at Suzuka in August was a game changer.', verified: true, location: 'Suzuka, Japan' },
  { id: 5, name: 'Alex Petrov', rating: 5, date: '2024-07-14', text: 'Custom design upload process was seamless. The team verified my artwork within 24 hours and the suit looks exactly like the blueprint.', verified: true, location: 'Moscow, Russia' },
];

export const faqs = [
  { q: 'How long does production take?', a: 'Standard production is 6-8 weeks from measurement confirmation. Rush orders available for +$300 with 4-week delivery.' },
  { q: 'Can I modify my design after ordering?', a: 'Design modifications are accepted within 72 hours of order confirmation. After that, production has begun.' },
  { q: 'What is your return policy?', a: 'Made-to-measure suits are non-returnable. We offer free alterations within 30 days if fit issues arise.' },
  { q: 'Do you ship internationally?', a: 'Yes. We ship to 47 countries via DHL Express. Delivery times vary by region (2-5 business days).' },
  { q: 'How do I take measurements?', a: 'We provide a detailed measurement guide and video tutorial. Alternatively, visit one of our 12 fitting studios worldwide.' },
];

// Design instructions for customers creating their own suit designs
export const designInstructions = [
  {
    step: 1,
    title: 'Download the Blueprint',
    description: 'Click the download button to get our official SVG template. This contains the exact suit panel layout with seam lines, armor pockets, and logo placement zones marked.',
    icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
  },
  {
    step: 2,
    title: 'Open in Design Software',
    description: 'Use Adobe Illustrator, Inkscape (free), Figma, or CorelDRAW. The template is vector-based so it scales perfectly without quality loss.',
    icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
  },
  {
    step: 3,
    title: 'Design Your Livery',
    description: 'Use solid colors, gradients, or patterns. Keep logos within the marked zones. Avoid designs that cross seam lines — our craftsmen need clean panel breaks for stitching.',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
  },
  {
    step: 4,
    title: 'Export & Upload',
    description: 'Export as SVG for best results, or high-resolution PNG (300 DPI minimum). Upload using the drag-and-drop zone below. Our design team will verify compatibility within 24 hours.',
    icon: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5',
  },
];

// How the upload process works after customer submits
export const uploadProcessSteps = [
  {
    step: 1,
    title: 'File Received',
    description: 'Your design file is securely uploaded to our production servers.',
  },
  {
    step: 2,
    title: 'Design Verification',
    description: 'Our design team reviews your artwork for print compatibility, color accuracy, and seam alignment.',
  },
  {
    step: 3,
    title: 'Digital Mockup',
    description: 'We generate a 3D digital mockup of your suit with your design applied. You will receive this via email for approval.',
  },
  {
    step: 4,
    title: 'Production Ready',
    description: 'Once approved, your design is converted to production files and linked to your order. Manufacturing begins immediately.',
  },
];

export default {
  suitTypes,
  perforationOptions,
  protectionOptions,
  teamPresets,
  measurementFields,
  heroImages,
  technicalSpecs,
  reviews,
  faqs,
  designInstructions,
  uploadProcessSteps,
};