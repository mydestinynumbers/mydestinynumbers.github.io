/**
 * ASTRO GOUTAM INC - Master Chaldean, Lo-Shu & Vastu Data (Canonical Reference)
 * Includes 81-Combination Engine, Lo-Shu Missing Crystals (Section A),
 * Purpose Crystals (Section B), and Vastu Spatial Systems.
 */

// 1. Chaldean Alphabet Map
const CHALDEAN_MAP = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

function reduceToSingle(num) {
  let val = Math.abs(Math.floor(num));
  if (val === 0) return 0;
  while (val > 9) {
    let s = 0;
    while (val > 0) {
      s += val % 10;
      val = Math.floor(val / 10);
    }
    val = s;
  }
  return val;
}

// 2. Planets 1-9 Master Archetypes
const PLANET_DATA = {
  1: {
    number: 1,
    planetEn: 'Sun (Surya)',
    planetBn: 'সূর্য (Surya)',
    deityEn: 'Lord Shiva / Gayatri',
    deityBn: 'মহাদেব / গায়ত্রী',
    gemstoneEn: 'Ruby (Manikya)',
    gemstoneBn: 'চুনি (Ruby)',
    luckyColorsEn: ['Gold', 'Orange', 'Copper', 'Yellow'],
    luckyColorsBn: ['সোনালী', 'কমলা', 'তামাটে', 'হলুদ'],
    luckyDaysEn: ['Sunday', 'Monday'],
    luckyDaysBn: ['রবিবার', 'সোমবার'],
    friendlyNumbers: [1, 2, 3, 5, 9],
    enemyNumbers: [6, 8],
    elementEn: 'Fire',
    elementBn: 'অগ্নি',
    positiveTraitsEn: ['Natural leader', 'Magnanimous', 'High ambition', 'Pioneering'],
    positiveTraitsBn: ['জন্মগত নেতা', 'উদারচেতা', 'উচ্চাকাঙ্ক্ষী', 'অগ্রগামী'],
    careersEn: ['Government & Administrative', 'CEO / Executive', 'Politics', 'Jewelry & Metals']
  },
  2: {
    number: 2,
    planetEn: 'Moon (Chandra)',
    planetBn: 'চন্দ্র (Chandra)',
    deityEn: 'Goddess Parvati / Shiva',
    deityBn: 'দেবী পার্বতী / মহাদেব',
    gemstoneEn: 'Natural Pearl (Mukta)',
    gemstoneBn: 'মুক্তো (Pearl)',
    luckyColorsEn: ['White', 'Silver', 'Cream', 'Pale Green'],
    luckyColorsBn: ['সাদা', 'রুপালী', 'ক্রিম', 'হালকা সবুজ'],
    luckyDaysEn: ['Monday', 'Sunday'],
    luckyDaysBn: ['সোমবার', 'রবিবার'],
    friendlyNumbers: [1, 2, 3, 5],
    enemyNumbers: [4, 8, 9],
    elementEn: 'Water',
    elementBn: 'জল',
    positiveTraitsEn: ['Empathic', 'Diplomatic', 'Artistic intuition', 'Peacemaker'],
    positiveTraitsBn: ['সংবেদনশীল', 'কূটনৈতিক', 'শিল্পরসিক', 'শান্তিকামী'],
    careersEn: ['Psychology & Counseling', 'Dairy & Liquids', 'Arts & Poetry', 'Hospitality']
  },
  3: {
    number: 3,
    planetEn: 'Jupiter (Brihaspati / Guru)',
    planetBn: 'বৃহস্পতি (Brihaspati)',
    deityEn: 'Lord Vishnu / Brihaspati',
    deityBn: 'শ্রীবিষ্ণু / দেবগুরু বৃহস্পতি',
    gemstoneEn: 'Yellow Sapphire (Pukhraj)',
    gemstoneBn: 'হলুদ পোখরাজ (Yellow Sapphire)',
    luckyColorsEn: ['Yellow', 'Saffron', 'Golden Honey'],
    luckyColorsBn: ['হলুদ', 'গেরুয়া', 'মধুরঙা সোনালী'],
    luckyDaysEn: ['Thursday', 'Tuesday'],
    luckyDaysBn: ['বৃহস্পতিবার', 'মঙ্গলবার'],
    friendlyNumbers: [1, 2, 3, 5, 9],
    enemyNumbers: [6],
    elementEn: 'Ether (Space)',
    elementBn: 'আকাশ (ইথার)',
    positiveTraitsEn: ['Philosophical wisdom', 'Visionary teacher', 'Generous', 'Counselor'],
    positiveTraitsBn: ['দার্শনিক প্রজ্ঞা', 'দূরদর্শী শিক্ষক', 'উদার', 'পরামর্শদাতা'],
    careersEn: ['Education & Academia', 'Judiciary & Law', 'Finance & Advisory', 'Publishing']
  },
  4: {
    number: 4,
    planetEn: 'Rahu (North Node / Uranus)',
    planetBn: 'রাহু (Rahu)',
    deityEn: 'Lord Bhairava / Goddess Durga',
    deityBn: 'কালভৈরব / মা দুর্গা',
    gemstoneEn: 'Hessonite Garnet (Gomed)',
    gemstoneBn: 'গোমেদ (Hessonite)',
    luckyColorsEn: ['Electric Blue', 'Smoky Grey', 'Silver'],
    luckyColorsBn: ['ইলেকট্রিক ব্লু', 'ধোঁয়াটে ছাই', 'রুপালী'],
    luckyDaysEn: ['Saturday', 'Sunday'],
    luckyDaysBn: ['শনিবার', 'রবিবার'],
    friendlyNumbers: [1, 5, 6, 7],
    enemyNumbers: [2, 4, 8, 9],
    elementEn: 'Air',
    elementBn: 'বায়ু',
    positiveTraitsEn: ['Radical innovator', 'Out-of-box thinker', 'Unconventional', 'Technical genius'],
    positiveTraitsBn: ['বৈপ্লবিক চিন্তক', 'প্রথাবিরোধী', 'কারিগরি প্রতিভা', 'কৌশলী'],
    careersEn: ['IT & Artificial Intelligence', 'Aviation & Space', 'Electrical Research', 'Media disruption']
  },
  5: {
    number: 5,
    planetEn: 'Mercury (Budh)',
    planetBn: 'বুধ (Budh)',
    deityEn: 'Lord Ganesha / Vishnu',
    deityBn: 'সিদ্ধিদাতা গণেশ / শ্রীবিষ্ণু',
    gemstoneEn: 'Emerald (Panna)',
    gemstoneBn: 'পান্না (Emerald)',
    luckyColorsEn: ['Emerald Green', 'Turquoise', 'Light Grey'],
    luckyColorsBn: ['পান্না সবুজ', 'ফিরোজা', 'হালকা ছাই'],
    luckyDaysEn: ['Wednesday', 'Friday'],
    luckyDaysBn: ['বুধবার', 'শুক্রবার'],
    friendlyNumbers: [1, 2, 3, 5, 6],
    enemyNumbers: [],
    elementEn: 'Earth',
    elementBn: 'পৃথিবী',
    positiveTraitsEn: ['Commercial genius', 'Magnetic speaker', 'Super adaptable', 'Quick thinker'],
    positiveTraitsBn: ['ব্যবসায়িক প্রতিভা', 'বাকপটু', 'দ্রুত পরিবর্তনশীল', 'রসিক'],
    careersEn: ['Stock Markets & Forex', 'Trading & Brokerage', 'Marketing & PR', 'Journalism']
  },
  6: {
    number: 6,
    planetEn: 'Venus (Shukra)',
    planetBn: 'শুক্র (Shukra)',
    deityEn: 'Mahalakshmi / Shukracharya',
    deityBn: 'মহালক্ষ্মী / শুক্রাচার্য',
    gemstoneEn: 'Diamond / White Zircon',
    gemstoneBn: 'হীরে / সাদা জিরকন',
    luckyColorsEn: ['Sparkling White', 'Soft Pink', 'Sky Blue'],
    luckyColorsBn: ['ঝলমলে সাদা', 'গোলাপী', 'আকাশি নীল'],
    luckyDaysEn: ['Friday', 'Wednesday'],
    luckyDaysBn: ['শুক্রবার', 'বুধবার'],
    friendlyNumbers: [5, 6, 7],
    enemyNumbers: [1, 3],
    elementEn: 'Water',
    elementBn: 'জল',
    positiveTraitsEn: ['Charismatic beauty', 'Luxury magnet', 'Harmonizer', 'Refined taste'],
    positiveTraitsBn: ['সৌন্দর্য ও আকর্ষণ', 'বিলাসিতা অনুরাগী', 'সম্প্রীতি সৃষ্টিকারী', 'রুচিশীল'],
    careersEn: ['Luxury Brands & Fashion', 'Film & Entertainment', 'Cosmetics', 'Architecture & Design']
  },
  7: {
    number: 7,
    planetEn: 'Ketu (South Node / Neptune)',
    planetBn: 'কেতু (Ketu)',
    deityEn: 'Lord Ganesha / Matsya Avatar',
    deityBn: 'শ্রীগণেশ / মৎস্য অবতার',
    gemstoneEn: "Cat's Eye (Lehsuniya)",
    gemstoneBn: 'বৈদূর্য মণি / ক্যাটস আই',
    luckyColorsEn: ['Pale Green', 'White', 'Light Yellow'],
    luckyColorsBn: ['হালকা সবুজ', 'সাদা', 'হালকা হলুদ'],
    luckyDaysEn: ['Monday', 'Sunday'],
    luckyDaysBn: ['সোমবার', 'রবিবার'],
    friendlyNumbers: [1, 2, 4, 5],
    enemyNumbers: [9],
    elementEn: 'Water',
    elementBn: 'জল',
    positiveTraitsEn: ['Mystic researcher', 'Deep intuition', 'Spiritual seeker', 'Analytical analyst'],
    positiveTraitsBn: ['গবেষক', 'দিব্য অন্তর্দৃষ্টি', 'আধ্যাত্মিক অনুরাগী', 'গভীর বিশ্লেষক'],
    careersEn: ['Data Science & Research', 'Occult & Metaphysics', 'Pharmaceuticals', 'Spiritual Philosophy']
  },
  8: {
    number: 8,
    planetEn: 'Saturn (Shani)',
    planetBn: 'শনি (Shani)',
    deityEn: 'Lord Shani / Lord Shiva',
    deityBn: 'শনৈশ্চর দেব / মহাদেব',
    gemstoneEn: 'Blue Sapphire (Neelam)',
    gemstoneBn: 'নীলা (Blue Sapphire)',
    luckyColorsEn: ['Dark Navy Blue', 'Black', 'Steel Grey'],
    luckyColorsBn: ['গাঢ় নীল', 'কালো', 'ইস্পাত ছাই'],
    luckyDaysEn: ['Saturday', 'Friday'],
    luckyDaysBn: ['শনিবার', 'শুক্রবার'],
    friendlyNumbers: [3, 5, 6, 7],
    enemyNumbers: [1, 2, 4, 8, 9],
    elementEn: 'Air',
    elementBn: 'বায়ু',
    positiveTraitsEn: ['Unshakable perseverance', 'Karmic judge', 'Strategic endurance', 'Architect of empires'],
    positiveTraitsBn: ['অদম্য ধৈর্য', 'কর্মফল বিচারক', 'কঠোর পরিশ্রমী', 'সাম্রাজ্য নির্মাতা'],
    careersEn: ['Real Estate & Infrastructure', 'Mining, Oil & Steel', 'Judiciary & Heavy Industries', 'Logistics']
  },
  9: {
    number: 9,
    planetEn: 'Mars (Mangal)',
    planetBn: 'মঙ্গল (Mangal)',
    deityEn: 'Lord Hanuman / Kartikeya',
    deityBn: 'বজরংবলী হনুমান / দেব কার্তিক',
    gemstoneEn: 'Red Coral (Moonga)',
    gemstoneBn: 'রক্ত প্রবাল (Red Coral)',
    luckyColorsEn: ['Crimson Red', 'Coral Pink', 'Bright Scarlet'],
    luckyColorsBn: ['গাঢ় লাল', 'প্রবাল গোলাপী', 'সিঁদুরে লাল'],
    luckyDaysEn: ['Tuesday', 'Thursday'],
    luckyDaysBn: ['মঙ্গলবার', 'বৃহস্পতিবার'],
    friendlyNumbers: [1, 2, 3, 5],
    enemyNumbers: [4, 7, 8],
    elementEn: 'Fire',
    elementBn: 'অগ্নি',
    positiveTraitsEn: ['Fearless warrior', 'High energy', 'Protective chivalry', 'Decisive execution'],
    positiveTraitsBn: ['নির্ভীক যোদ্ধা', 'উচ্চ প্রাণশক্তি', 'রক্ষাকর্তা', 'দ্রুত বাস্তবায়ন'],
    careersEn: ['Defense & Police Forces', 'Surgery & Medicine', 'Sports & Athletics', 'Real Estate Development']
  }
};

// 3. Classical Chaldean Compound Occult Meanings (Selected 10-90)
const COMPOUND_NUMBERS = {
  10: { titleEn: 'Wheel of Fortune', titleBn: 'ভাগ্যের চাকা', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Supreme rise through individual grit. Honor, faith and self-made triumph.' },
  14: { titleEn: 'Movement & Risk', titleBn: 'ঝুঁকি ও অস্থিরতা', verdictEn: 'Challenging', verdictBn: 'সতর্কতা', textEn: 'Extreme volatility with legal risks, loans, contracts and bodily hazards.' },
  15: { titleEn: 'The Magician', titleBn: 'মায়াবী জাদুকর', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Supreme Venusian magnetism. Attracts money, eloquence, gifts, and artistic fame.' },
  16: { titleEn: 'The Shattered Citadel', titleBn: 'ভগ্ন প্রাসাদ', verdictEn: 'Challenging', verdictBn: 'অশুভ', textEn: 'Sudden collapse of high ego. Marital discord, fall from position, financial shocks.' },
  19: { titleEn: 'The Prince of Heaven', titleBn: 'স্বর্গের রাজপুত্র', verdictEn: 'Supreme Fortune', verdictBn: 'পরম কল্যাণকারী', textEn: 'Greatest compound in Chaldean numerology. Boundless victory, honor and lasting fortune.' },
  21: { titleEn: 'The Crown of the Magi', titleBn: 'জ্ঞানীর মুকুট', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Global advancement and final victory after rigorous karmic struggle.' },
  23: { titleEn: 'The Royal Star of the Lion', titleBn: 'সিংহ রাশি চক্র', verdictEn: 'Supreme Fortune', verdictBn: 'পরম বিজয়ী', textEn: 'All undertakings succeed. Favors from people of power, safety against opposition.' },
  24: { titleEn: 'Love, Money & Venus', titleBn: 'প্রেম ও ধনলাভ', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Financial abundance through beauty, harmonious alliances and arts.' },
  29: { titleEn: 'Grace Under Fire (Dhan Yog)', titleBn: 'অপ্রত্যাশিত ধনপ্রাপ্তি', verdictEn: 'Favourable', verdictBn: 'শুভ ফলপ্রসূ', textEn: 'Powerful wealth attraction; requires conscious grounding to avoid deceptive partners.' },
  32: { titleEn: 'The Magnetic Communicator', titleBn: 'জনপ্রিয় বক্তা', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'High public resonance, commercial agility, mass following in trading.' },
  33: { titleEn: 'The Master Healer', titleBn: 'মাস্টার গুরু', verdictEn: 'Supreme Fortune', verdictBn: 'মাস্টার শুভ', textEn: 'Supreme humanitarian magnetism, artistic perfection and societal fortune.' },
  37: { titleEn: 'The Golden Alliance (Dhan Yog)', titleBn: 'পরম ধনযোগ', verdictEn: 'Supreme Fortune', verdictBn: 'পরম ধনযোগ', textEn: 'Divine luck, high financial status, unexpected wealth and loyal friendships.' },
  41: { titleEn: 'The Visionary Strategist', titleBn: 'দূরদর্শী অধিপতি', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Dynamic commercial leadership, large corporate empires and unbending authority.' },
  42: { titleEn: 'Affectionate Abundance', titleBn: 'স্নেহশীল প্রাচুর্য', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Loving partnerships, steady material wealth and serene home life.' },
  45: { titleEn: 'The Commercial Lion', titleBn: 'বাণিজ্য সিংহ', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Bold commercial conquest, immense resilience and market dominance.' },
  51: { titleEn: 'The Victorious General', titleBn: 'বিজয়ী সেনানায়ক', verdictEn: 'Fortunate', verdictBn: 'শুভ', textEn: 'Sudden ascension to power, dominance over competitors and supreme will.' }
};

// 4. Canonical 81-Combination Engine (9 Mulank x 9 Bhagyank)
function get81Combination(mulank, bhagyank) {
  const m = PLANET_DATA[mulank];
  const b = PLANET_DATA[bhagyank];
  const key = `${mulank}x${bhagyank}`;

  // Dedicated special lookup table for key master pairs
  const matrixOverrides = {
    '1x1': {
      titleEn: 'The Sovereign Commander', titleBn: 'সার্বভৌম অধিপতি',
      themesEn: 'Supreme willpower, executive leadership, unbending independence, administrative command, and pioneer drive.',
      themesBn: 'চূড়ান্ত ইচ্ছাশক্তি, প্রশাসনিক নেতৃত্ব, আপসহীন ব্যক্তিত্ব ও জন্মগত অগ্রদূত।',
      luckyNums: [1, 6], luckyDaysEn: '1, 10, 19, 28 series dates', luckyDaysBn: '১, ১০, ১৯, ২৮ তারিখ',
      unluckyDaysEn: '8, 17, 26 series (Saturn)', unluckyDaysBn: '৮, ১৭, ২৬ তারিখ (শনির সংঘাত)',
      colorsEn: ['Gold', 'Yellow', 'Light Blue'], colorsBn: ['সোনালী', 'হলুদ', 'হালকা নীল'],
      cautionEn: ['Black', 'Dark Red'], cautionBn: ['কালো', 'গাঢ় লাল'],
      gemsEn: ['Ruby', 'Yellow Sapphire'], gemsBn: ['চুনি', 'হলুদ পোখরাজ'],
      businessEn: ['Executive Leadership', 'Government Contracts', 'Energy & Power', 'Metals'],
      businessBn: ['প্রশাসনিক পরিচালনা', 'সরকারি কাজ', 'বিদ্যুৎ ও শক্তি', 'ধাতব শিল্প'],
      nameRecs: [19, 37, 46, 64, 24, 33],
      remedyEn: 'Channel fiery energy constructively. Avoid Saturn conflicts and arrogant isolation.',
      remedyBn: 'অহংকার পরিহার করুন এবং শনি সংক্রান্ত সংঘাত এড়িয়ে চলুন।'
    },
    '1x8': {
      titleEn: 'Surya-Shani Karmic Forge', titleBn: 'সূর্য-শনি কর্মবন্ধন',
      themesEn: 'Intense struggle between authoritative ambition and Saturnian delays. Exceptional endurance builds immense long-term empires.',
      themesBn: 'উচ্চাকাঙ্ক্ষা ও শনির বাধার দ্বন্দ্বে পোড় খাওয়া ব্যক্তিত্ব। দীর্ঘমেয়াদী পরিশ্রমে বিশাল সাম্রাজ্য গড়ে।',
      luckyNums: [5, 6], luckyDaysEn: '5, 14, 23 and 6, 15, 24 dates', luckyDaysBn: '৫, ১৪, ২৩ এবং ৬, ১৫, ২৪ তারিখ',
      unluckyDaysEn: '8, 17, 26 and 1, 10, 19 clash dates', unluckyDaysBn: '৮, ১৭, ২৬ এবং ১, ১০, ১৯ তারিখ',
      colorsEn: ['Emerald Green', 'Light Blue', 'Silver'], colorsBn: ['পান্না সবুজ', 'হালকা নীল', 'রুপালী'],
      cautionEn: ['Jet Black', 'Blood Red'], cautionBn: ['কুচকুচে কালো', 'রক্তবর্ণ লাল'],
      gemsEn: ['Emerald (Panna)', 'Diamond / Opal'], gemsBn: ['পান্না', 'হীরে / ওপাল'],
      businessEn: ['Real Estate & Infrastructure', 'Corporate Law', 'Mining & Steel', 'Heavy Engineering'],
      businessBn: ['রিয়েল এস্টেট ও নির্মাণ', 'কর্পোরেট আইন', 'খনিজ ও ইস্পাত', 'ভারী প্রকৌশল'],
      nameRecs: [32, 41, 59, 24, 42],
      remedyEn: 'Essential to align personal and business name with Mercury (5) or Venus (6) to bridge Sun-Saturn friction.',
      remedyBn: 'সূর্য ও শনির সংঘাত নিরাময়ে নাম বুধ (৫) বা শুক্রের (৬) শুভ কম্পনে রাখা অপরিহার্য।'
    },
    '5x6': {
      titleEn: 'Lakshmi-Kuber Commercial Apex', titleBn: 'লক্ষ্মী-কুবের বাণিজ্যিক যোগ',
      themesEn: 'Supreme trade acumen infused with Venusian luxury appeal. Magnet for immense wealth, networking and market leadership.',
      themesBn: 'বুধের ব্যবসা ও শুক্রের আকর্ষণের অপূর্ব মেলবন্ধন। অফুরন্ত অর্থ, যোগাযোগ ও বৈভবের অধিকারী।',
      luckyNums: [5, 6, 1], luckyDaysEn: '5, 14, 23 and 6, 15, 24 dates', luckyDaysBn: '৫, ১৪, ২৩ এবং ৬, ১৫, ২৪ তারিখ',
      unluckyDaysEn: 'Dates summing to 8 (Saturn heavy)', unluckyDaysBn: '৮ সংবলিত বিলম্বকারী তারিখ',
      colorsEn: ['Emerald Green', 'Soft White', 'Sky Blue'], colorsBn: ['পান্না সবুজ', 'সাদা', 'আকাশি নীল'],
      cautionEn: ['Dark Charcoal', 'Dull Brown'], cautionBn: ['গাঢ় ছাই', 'মলিন খয়েরি'],
      gemsEn: ['Emerald', 'Diamond'], gemsBn: ['পান্না', 'হীরে'],
      businessEn: ['Luxury Trade & E-Commerce', 'Media & Entertainment', 'Jewelry', 'Financial Brokerage'],
      businessBn: ['বিলাসপণ্য ব্যবসা', 'মিডিয়া ও বিনোদন', 'অলঙ্কার শিল্প', 'শেয়ার ও ব্রোকারেজ'],
      nameRecs: [24, 32, 33, 42, 51],
      remedyEn: 'Maintain transparent bookkeeping and donate green pulses on Wednesdays to amplify prosperity.',
      remedyBn: 'হিসাবপত্র স্বচ্ছ রাখুন এবং বুধবারে সবুজ মুগ ডাল দান করে ধনপ্রবাহ আরো বৃদ্ধি করুন।'
    }
  };

  if (matrixOverrides[key]) {
    const o = matrixOverrides[key];
    return {
      combinationKey: key,
      mulank, bhagyank,
      planetaryPairingEn: `${m.planetEn} + ${b.planetEn}`,
      planetaryPairingBn: `${m.planetBn} + ${b.planetBn}`,
      synthesisTitleEn: o.titleEn,
      synthesisTitleBn: o.titleBn,
      characterThemesEn: o.themesEn,
      characterThemesBn: o.themesBn,
      luckyNumbers: o.luckyNums,
      luckyDaysPatternEn: o.luckyDaysEn,
      luckyDaysPatternBn: o.luckyDaysBn,
      unluckyDaysPatternEn: o.unluckyDaysEn,
      unluckyDaysPatternBn: o.unluckyDaysBn,
      luckyColoursEn: o.colorsEn,
      luckyColoursBn: o.colorsBn,
      cautionColoursEn: o.cautionEn,
      cautionColoursBn: o.cautionBn,
      gemsEn: o.gemsEn,
      gemsBn: o.gemsBn,
      businessThemesEn: o.businessEn,
      businessThemesBn: o.businessBn,
      nameNumberRecommendations: o.nameRecs,
      remedialGuidanceEn: o.remedyEn,
      remedialGuidanceBn: o.remedyBn
    };
  }

  // Algorithmic synthesis for other matrix pairs
  const hasSaturn = mulank === 8 || bhagyank === 8;
  const isVenus = mulank === 6 || bhagyank === 6;
  const isMercury = mulank === 5 || bhagyank === 5;
  const luckyNums = hasSaturn ? [5, 6, 3] : [1, 5, 6];
  const nameRecs = hasSaturn ? [32, 41, 59, 24, 42] : [19, 37, 46, 24, 33, 42];

  return {
    combinationKey: key,
    mulank, bhagyank,
    planetaryPairingEn: `${m.planetEn} + ${b.planetEn}`,
    planetaryPairingBn: `${m.planetBn} + ${b.planetBn}`,
    synthesisTitleEn: `${m.planetEn.split(' ')[0]} × ${b.planetEn.split(' ')[0]} Synthesis`,
    synthesisTitleBn: `${m.planetBn.split(' ')[0]} × ${b.planetBn.split(' ')[0]} সমন্বয়`,
    characterThemesEn: `Synthesizes the core personality of Mulank ${mulank} (${m.planetEn}) with the destiny direction of Bhagyank ${bhagyank} (${b.planetEn}). Governed by classical matrix laws.`,
    characterThemesBn: `মূলাঙ্ক ${mulank} (${m.planetBn})-এর স্বভাবের সাথে ভাগ্যাঙ্ক ${bhagyank} (${b.planetBn})-এর ভাগ্যপথের মেলবন্ধন। শাস্ত্রীয় নিয়ম অনুযায়ী ফলাফল নির্ধারিত হয়।`,
    luckyNumbers: luckyNums,
    luckyDaysPatternEn: `${luckyNums.join(', ')} series calendar dates`,
    luckyDaysPatternBn: `${luckyNums.join(', ')} সিরিজের শুভ দিন`,
    unluckyDaysPatternEn: hasSaturn ? '8, 17, 26 series dates' : 'Clashing enemy numbers',
    unluckyDaysPatternBn: hasSaturn ? '৮, ১৭, ২৬ তারিখের শনি বিলম্ব' : 'সংঘাতপূর্ণ শত্রু সংখ্যা',
    luckyColoursEn: isVenus ? ['White', 'Light Blue', 'Pink'] : isMercury ? ['Emerald Green', 'Turquoise'] : ['Gold', 'Yellow', 'Copper'],
    luckyColoursBn: isVenus ? ['সাদা', 'আকাশি নীল', 'গোলাপী'] : isMercury ? ['পান্না সবুজ', 'ফিরোজা'] : ['সোনালী', 'হলুদ', 'তামাটে'],
    cautionColoursEn: ['Black', 'Dull Charcoal'],
    cautionColoursBn: ['কালো', 'মলিন ছাই'],
    gemsEn: [m.gemstoneEn, b.gemstoneEn],
    gemsBn: [m.gemstoneBn, b.gemstoneBn],
    businessThemesEn: isMercury ? ['Trading', 'Brokerage', 'Tech', 'Marketing'] : ['Executive Management', 'Finance', 'Consulting'],
    businessThemesBn: isMercury ? ['ট্রেডিং', 'ব্রোকারেজ', 'প্রযুক্তি', 'মার্কেটিং'] : ['প্রশাসনিক পরিচালনা', 'অর্থনৈতিক ক্ষেত্র', 'পরামর্শদাতা'],
    nameNumberRecommendations: nameRecs,
    remedialGuidanceEn: `Tune your name spelling compound to ${nameRecs.slice(0, 3).join(', ')} to activate maximum harmonious vibrations.`,
    remedialGuidanceBn: `নামের বানান কম্পাউন্ডকে ${nameRecs.slice(0, 3).join(', ')}-এর শুভ কম্পনে রূপান্তর করে পূর্ণ ফল লাভ করুন।`
  };
}

// 5. SECTION A: Lo-Shu Missing Number Crystal Master (Strictly Distinct)
const LO_SHU_MISSING_CRYSTALS = {
  1: {
    number: 1,
    crystal: 'Garnet / Rhodolite',
    isBracelet: false,
    focusEn: 'Courage, self-confidence, initiative, leadership and self-expression.',
    focusBn: 'সাহস, আত্মবিশ্বাস, নিজস্ব উদ্যোগ, নেতৃত্ব ও স্বতঃস্ফূর্ত আত্মপ্রকাশ।',
    guidanceEn: 'Use as missing-1 crystal layer. Reconnects personal initiative and leadership authority.',
    guidanceBn: '১ সংখ্যার ঘাটতি পূরণের প্রধান ক্রিস্টাল। এটি নেতৃত্ব ও আত্মবিশ্বাস জাগ্রত করে।'
  },
  2: {
    number: 2,
    crystal: 'Clear Quartz Bracelet',
    isBracelet: true,
    focusEn: 'Emotional balance, sensitivity, cooperation, relationships and receptivity.',
    focusBn: 'মানসিক ভারসাম্য, সংবেদনশীলতা, সহযোগিতা, সম্পর্ক এবং গ্রহণযোগ্যতা।',
    guidanceEn: 'Use as missing-2 bracelet layer. Heals mental fluctuations and relationship harmony.',
    guidanceBn: '২ সংখ্যার ঘাটতি পূরণের প্রধান ব্রেসলেট। মানসিক দোলাচল দূর করে মধুর সম্পর্ক গড়ে তোলে।'
  },
  3: {
    number: 3,
    crystal: 'Citrine Bracelet',
    isBracelet: true,
    focusEn: 'Learning, wisdom, creativity, communication, optimism and growth.',
    focusBn: 'জ্ঞান আহরণ, প্রজ্ঞা, সৃষ্টিশীলতা, বাকপটুতা, আশাবাদ ও সার্বিক উন্নতি।',
    guidanceEn: 'Use as missing-3 bracelet layer. Activates Jupiterian growth and optimistic learning.',
    guidanceBn: '৩ সংখ্যার ঘাটতি পূরণের প্রধান ব্রেসলেট। বৃহস্পতির প্রভাবে বিদ্যা ও সৃজনশীল বৃদ্ধি আনে।'
  },
  4: {
    number: 4,
    crystal: 'Amethyst / Lapis Lazuli',
    isBracelet: false,
    focusEn: 'Discipline, structure, organization, practical thinking and stability.',
    focusBn: 'শৃঙ্খলা, সাংগঠনিক দক্ষতা, বাস্তববাদী চিন্তাভাবনা ও জীবনে স্থিরতা।',
    guidanceEn: 'Use either crystal as missing-4 layer. Establishes long-term grounding and orderly systems.',
    guidanceBn: '৪ সংখ্যার ঘাটতি পূরণের প্রধান ক্রিস্টাল। জীবনে শৃঙ্খলা ও ধারাবাহিক স্থিতিশীলতা আনে।'
  },
  5: {
    number: 5,
    crystal: 'Green Aventurine Bracelet',
    isBracelet: true,
    focusEn: 'Balance, adaptability, communication, opportunity, growth and money-flow orientation.',
    focusBn: 'ভারসাম্য, অভিযোজন ক্ষমতা, যোগাযোগ, নতুন সুযোগ, আর্থিক সমৃদ্ধি ও অর্থপ্রবাহ।',
    guidanceEn: 'Use as missing-5 bracelet layer. Stabilizes Brahmasthan and opens commercial cash flow.',
    guidanceBn: '৫ সংখ্যার ঘাটতি পূরণের প্রধান ব্রেসলেট। ব্রহ্মস্থান ও বুধের প্রভাবে অবাধ অর্থপ্রবাহ সৃষ্টি করে।'
  },
  6: {
    number: 6,
    crystal: 'Rose Quartz / Carnelian',
    isBracelet: false,
    focusEn: 'Family harmony, love, relationships, comfort, creativity and emotional warmth.',
    focusBn: 'পারিবারিক শান্তি, ভালোবাসা, মধুর সম্পর্ক, আরাম-আয়েশ, নান্দনিকতা ও উষ্ণতা।',
    guidanceEn: 'Use as missing-6 layer. Inspires Venusian grace, romantic warmth and luxury assets.',
    guidanceBn: '৬ সংখ্যার ঘাটতি পূরণের প্রধান ক্রিস্টাল। শুক্রের ঘাটতি দূর করে বিলাসিতা ও গৃহসুখ আকর্ষণ করে।'
  },
  7: {
    number: 7,
    crystal: 'Amethyst / Clear Quartz',
    isBracelet: false,
    focusEn: 'Intuition, inner wisdom, spiritual awareness, calmness and introspection.',
    focusBn: 'অন্তর্দৃষ্টি, অন্তর্জ্ঞান, আধ্যাত্মিক চেতনা, প্রশান্তি ও আত্মানুসন্ধান।',
    guidanceEn: 'Use as missing-7 layer. Calms restless minds and sharpens intuitive perception.',
    guidanceBn: '৭ সংখ্যার ঘাটতি পূরণের প্রধান ক্রিস্টাল। মনঃসংযোগ ও দিব্য অন্তর্দৃষ্টি উন্মোচন করে।'
  },
  8: {
    number: 8,
    crystal: 'Black Obsidian Bracelet',
    isBracelet: true,
    focusEn: 'Grounding, protection, stability, discipline, resilience and material balance.',
    focusBn: 'স্থিরতা, নেতিবাচক শক্তি থেকে সুরক্ষা, শৃঙ্খলা, সহনশীলতা ও পার্থিব ভারসাম্য।',
    guidanceEn: 'Use as missing-8 bracelet layer. Provides powerful shielding, patience and asset stability.',
    guidanceBn: '৮ সংখ্যার ঘাটতি পূরণের প্রধান ব্রেসলেট। ধৈর্য, স্থাবর সম্পত্তি ও সুরক্ষা দান করে।'
  },
  9: {
    number: 9,
    crystal: 'Red Jasper Bracelet',
    isBracelet: true,
    focusEn: 'Courage, energy, activity, completion, visibility and constructive action.',
    focusBn: 'সাহসিকতা, শারীরিক তেজ, কর্মতৎপরতা, কাজ সমাপ্তি, খ্যাতি ও গঠনমূলক পদক্ষেপ।',
    guidanceEn: 'Use as missing-9 bracelet layer. Ignites vitality, public courage and task completion.',
    guidanceBn: '৯ সংখ্যার ঘাটতি পূরণের প্রধান ব্রেসলেট। আত্মবিশ্বাস ও পরাক্রম বৃদ্ধি করে অসমাপ্ত কাজ শেষ করায়।'
  }
};

// 5b. Comprehensive Lo-Shu Missing Number Remedies (Colour, Crystal, Rudraksha, Direction, Spiritual, Donation, Mantras)
const LOSHU_REMEDIES = {
  1: {
    number: 1,
    focus: 'Water + Sun + Red/Orange',
    focusBn: 'জল তত্ত্ব + সূর্য + লাল/কমলা রং',
    purpose: 'Self-expression, confidence, planning and career-related energy.',
    purposeBn: 'আত্মপ্রকাশ, আত্মবিশ্বাস, পরিকল্পনা ও কর্মজীবনের অগ্রগতি।',
    crystal: 'Garnet / Rhodolite',
    directionEn: 'North',
    directionBn: 'উত্তর দিক',
    items: [
      'Place a fountain or aquarium in the North direction of the home.',
      'Tie a red thread on the right wrist.',
      'Worship the Surya Yantra.',
      'Wear orange-coloured clothing on Sunday.',
      'Practice Sun-related spiritual activities or show respect to the Sun.'
    ],
    itemsBn: [
      'বাড়ির উত্তর দিকে একটি ছোট জলের ফোয়ারা বা অ্যাকোয়ারিয়াম রাখুন।',
      'ডান কব্জিতে লাল সুতো (মৌলি) ধারণ করুন।',
      'নিয়মিত সূর্য যন্ত্রের উপাসনা করুন।',
      'রবিবারে কমলা বা জাফরান রঙের পোশাক পরিধান করুন।',
      'সূর্য প্রণাম করুন এবং পিতাকে শ্রদ্ধা ও সম্মান প্রদর্শন করুন।'
    ],
    categories: {
      directionEn: 'Place a water fountain or aquarium in North.',
      directionBn: 'উত্তর দিকে জলের ফোয়ারা বা অ্যাকোয়ারিয়াম স্থাপন।',
      colorEn: 'Wear orange clothing on Sunday; tie red thread on right wrist.',
      colorBn: 'রবিবারে কমলা পোশাক ও ডান হাতে লাল সুতো বাঁধা।',
      spiritualEn: 'Surya Yantra worship; Sun salutations and solar respect.',
      spiritualBn: 'সূর্য যন্ত্র উপাসনা ও সূর্য প্রণাম অভ্যাস।',
      crystalEn: 'Garnet / Rhodolite stone.',
      crystalBn: 'গার্নেট বা রোডোনাইট ক্রিস্টাল।'
    }
  },
  2: {
    number: 2,
    focus: 'Moon + Water + Silver + White + Emotional Balance',
    focusBn: 'চন্দ্র + জল + রুপো + সাদা রং + মানসিক ভারসাম্য',
    purpose: 'Emotional sensitivity, patience, relationship/family harmony and mental calmness.',
    purposeBn: 'মানসিক সংবেদনশীলতা, ধৈর্য, পারিবারিক সম্প্রীতি ও মনের প্রশান্তি।',
    crystal: 'Clear Quartz Bracelet / Pearl',
    directionEn: 'South-West',
    directionBn: 'দক্ষিণ-পশ্চিম দিক',
    items: [
      'Keep a mountain picture without water in the South-West direction.',
      'Use a Pearl or crystal mala.',
      'Drink water from a silver glass.',
      'Keep a pair of silver swans at home.',
      'Offer water or milk to a Shivling.',
      'Wear white clothes on Monday.',
      'Donate rice, sugar or other white food items.',
      'Keep an earthen pot in the South-West direction.',
      'Spend time in nature.',
      'Practice mindfulness and meditation.'
    ],
    itemsBn: [
      'দক্ষিণ-পশ্চিম দিকে জলবিহীন মাটির পাহাড়ের ছবি রাখুন।',
      'মুক্তো বা স্ফটিকের মালা জপ বা ধারণ করুন।',
      'রুপোর গ্লাসে জল পান করুন।',
      'ঘরে একজোড়া রুপোর রাজহাঁসের প্রতিকৃতি রাখুন।',
      'শিবলিঙ্গে দুধ বা জল নিবেদন করুন।',
      'সোমবারে সাদা বা হালকা ক্রিম রঙের পোশাক পরুন।',
      'চাল, চিনি বা সাদা খাদ্যদ্রব্য দান করুন।',
      'দক্ষিণ-পশ্চিম কোণে মাটির পাত্র রাখুন।',
      'প্রকৃতির সান্নিধ্যে সময় কাটান।',
      'মননশীলতা ও ধ্যান (মেডিটেশন) অভ্যাস করুন।'
    ],
    categories: {
      directionEn: 'Keep an earthen pot or mountain picture without water in South-West.',
      directionBn: 'দক্ষিণ-পশ্চিমে মাটির পাত্র বা জলবিহীন পাহাড়ের ছবি।',
      colorEn: 'Wear white clothes on Monday; drink water from silver glass.',
      colorBn: 'সোমবারে সাদা পোশাক ও রুপোর গ্লাসে জল পান।',
      spiritualEn: 'Offer water/milk to Shivling; practice mindfulness meditation.',
      spiritualBn: 'শিবলিঙ্গে দুধ/জল অর্পণ ও নিয়মিত ধ্যান।',
      donationEn: 'Donate rice, sugar or white food items on Monday.',
      donationBn: 'সোমবারে চাল, চিনি বা সাদা খাদ্যদ্রব্য দান।',
      crystalEn: 'Pearl or Clear Quartz mala.',
      crystalBn: 'মুক্তো বা ক্লিয়ার কোয়ার্টজের স্ফটিক মালা।'
    }
  },
  3: {
    number: 3,
    focus: 'Jupiter/Guru + Wood + Education/Knowledge',
    focusBn: 'বৃহস্পতি/গুরু + কাঠ + শিক্ষা ও জ্ঞানচর্চা',
    purpose: 'Knowledge, confidence, creativity, learning and Guru energy.',
    purposeBn: 'জ্ঞান আহরণ, আত্মবিশ্বাস, সৃষ্টিশীলতা, বিদ্যা ও গুরুর আশীর্বাদ।',
    crystal: 'Citrine Bracelet',
    directionEn: 'East',
    directionBn: 'পূর্ব দিক',
    items: [
      'Keep green plant scenery in the East direction of the home.',
      'Use a Tulsi Mala.',
      'Wear or use a 5 Mukhi Rudraksha.',
      'Use wooden objects at home, such as a wooden table, wooden glass or bamboo.',
      'Respect elderly people and teachers.',
      'Use a saffron tilak on the forehead.',
      'Keep Bamboo, Money Plant or other green plants in the East direction.',
      'Keep a picture of running horses in the East direction.',
      'Use yellow colour on Thursday.',
      'Use a yellow bracelet or thread.'
    ],
    itemsBn: [
      'বাড়ির পূর্ব দিকে সবুজ গাছপালার সুন্দর ছবি রাখুন।',
      'তুলসীর মালা জপ বা পরিধান করুন।',
      '৫ মুখী রুদ্রাক্ষ ধারণ বা ব্যবহার করুন।',
      'কাঠের আসবাব, কাঠের কাপ বা বাঁশের সামগ্রী ব্যবহার করুন।',
      'গুরুজন ও শিক্ষকদের শ্রদ্ধা প্রদর্শন করুন।',
      'কপালে কেশর বা হলুদের তিলক ধারণ করুন।',
      'পূর্ব দিকে লাকি ব্যাম্বু বা মানি প্ল্যান্ট রাখুন।',
      'পূর্ব দেয়ালে সাতটি দৌড়ন্ত ঘোড়ার ছবি রাখুন।',
      'বৃহস্পতিবারে হলুদ রঙের পোশাক পরিধান করুন।',
      'হলুদ সুতো বা হলুদ ব্রেসলেট ব্যবহার করুন।'
    ],
    categories: {
      rudrakshaEn: 'Wear a 5 Mukhi Rudraksha or Tulsi Mala.',
      rudrakshaBn: '৫ মুখী রুদ্রাক্ষ বা তুলসী মালা ধারণ।',
      directionEn: 'Keep green plants (Bamboo) or running horses picture in East.',
      directionBn: 'পূর্ব দিকে সবুজ গাছপালা, ব্যাম্বু বা দৌড়ন্ত ঘোড়ার ছবি।',
      colorEn: 'Wear yellow on Thursday; apply saffron tilak on forehead.',
      colorBn: 'বৃহস্পতিবারে হলুদ পোশাক ও কপালে কেশরের তিলক।',
      spiritualEn: 'Respect elders and Gurus; utilize wooden objects at home.',
      spiritualBn: 'গুরুজনদের শ্রদ্ধা ও কাষ্ঠ উপাদানের ব্যবহার।',
      crystalEn: 'Citrine Bracelet for Jupiterian wisdom.',
      crystalBn: 'সিট্রিন ব্রেসলেট দ্বারা জ্ঞান ও সৌভাগ্য বৃদ্ধি।'
    }
  },
  4: {
    number: 4,
    focus: 'Wood + Greenery + Discipline + Stability',
    focusBn: 'কাঠ + সবুজ প্রকৃতি + শৃঙ্খলা + স্থিতিশীলতা',
    purpose: 'Organisation, discipline, practicality, stability and wealth-related energy balance.',
    purposeBn: 'সাংগঠনিক দক্ষতা, নিয়মনিষ্ঠা, বাস্তববাদিতা ও আর্থিক স্থায়িত্ব।',
    crystal: 'Amethyst / Lapis Lazuli',
    directionEn: 'South-East',
    directionBn: 'দক্ষিণ-পূর্ব দিক',
    items: [
      'Use a Tulsi Mala or 5 Mukhi Rudraksha.',
      'Perform the source-based remedy of donating two coconuts (Do Nariyal Daan).',
      'Keep the home and surroundings clean and organised.',
      'Keep green plants or green scenery in the South-East direction.',
      'Use wooden objects at home.',
      'Use items such as a wooden table, wooden glass or bamboo.',
      'Engage in practical work, gardening, carpentry or similar grounding activities.',
      'Show respect to and help labour/working-class people.'
    ],
    itemsBn: [
      'তুলসী মালা বা ৫ মুখী রুদ্রাক্ষ ব্যবহার করুন।',
      'উৎস-সম্মত প্রতিকার হিসেবে দুটি শুকনো নারকেল দান করুন (দো নারকেল দান)।',
      'বাড়ি ও চারপাশের পরিবেশ সর্বদা পরিষ্কার ও সুশৃঙ্খল রাখুন।',
      'দক্ষিণ-পূর্ব (অগ্নি কোণ) অংশে সবুজ গাছপালা বা প্রাকৃতিক দৃশ্য রাখুন।',
      'ঘরে প্রাকৃতিক কাঠের সামগ্রী ও আসবাবপত্র ব্যবহার করুন।',
      'কাঠের কাপ, টেবিল বা বাঁশের সামগ্রী ব্যবহার করুন।',
      'বাগান করা, হাতের কাজ বা মাটির সাথে যুক্ত কাজে সময় দিন।',
      'শ্রমজীবী ও খেটে খাওয়া মানুষদের সাহায্য ও সম্মান করুন।'
    ],
    categories: {
      rudrakshaEn: 'Wear a 5 Mukhi Rudraksha or Tulsi Mala.',
      rudrakshaBn: '৫ মুখী রুদ্রাক্ষ বা তুলসী মালা ধারণ।',
      donationEn: 'Perform Do Nariyal Daan (donate two coconuts to river/temple).',
      donationBn: 'দুটি নারকেল দান (দো নারকেল দান)।',
      directionEn: 'Keep green plants in South-East; maintain tidy surroundings.',
      directionBn: 'দক্ষিণ-পূর্বে সবুজ গাছপালা ও পরিচ্ছন্ন পরিবেশ।',
      spiritualEn: 'Respect labour/working-class people; practical grounding.',
      spiritualBn: 'শ্রমজীবী মানুষদের সহায়তা ও বাস্তবমুখী সংযম।',
      crystalEn: 'Amethyst / Lapis Lazuli crystal.',
      crystalBn: 'অ্যামেথিস্ট বা ল্যাপিস লাজুলি ক্রিস্টাল।'
    }
  },
  5: {
    number: 5,
    focus: 'Mercury + Communication + Centre of House + Earth/Crystal',
    focusBn: 'বুধ + যোগাযোগ + ব্রহ্মস্থান + পৃথ্বী/স্ফটিক',
    purpose: 'Communication, adaptability, business sense, financial balance and decision-making.',
    purposeBn: 'বাকপটুতা, অভিযোজন, ব্যবসায়িক বুদ্ধি, অর্থপ্রবাহ ও দ্রুত সঠিক সিদ্ধান্ত।',
    crystal: 'Green Aventurine Bracelet / Quartz',
    directionEn: 'Brahmasthan (Centre)',
    directionBn: 'ব্রহ্মস্থান (বাড়ির কেন্দ্রস্থল)',
    items: [
      'Use a Quartz crystal.',
      'Avoid keeping electric or electronic items in the centre of the house.',
      'Keep a mountain picture without water in the centre of the house.',
      'Practice a Mercury mantra.',
      'Use green colour as a balancing colour.',
      'Keep a green handkerchief with you.',
      'Use a crystal bracelet.',
      'Feed green fodder to a cow on Wednesday.',
      'Practise public speaking to improve communication skills.',
      'Practise active listening by paying attention to what others say.',
      'Write your thoughts through writing or journaling.',
      'Use a 5 Mukhi Rudraksha.',
      'Increase flexibility and adaptability through new work, a new hobby or visiting new places.'
    ],
    itemsBn: [
      'স্বচ্ছ কোয়ার্টজ বা স্ফটিক ক্রিস্টাল ব্যবহার করুন।',
      'বাড়ির কেন্দ্রস্থলে (ব্রহ্মস্থানে) বৈদ্যুতিক ও ভারী যন্ত্রপাতি রাখা এড়িয়ে চলুন।',
      'বাড়ির কেন্দ্রস্থলে জলবিহীন মাটির পাহাড়ের ছবি রাখুন।',
      'নিয়মিত বুধের বীজ মন্ত্র জপ করুন।',
      'ভারসাম্য বজায় রাখতে সবুজ রং ব্যবহার করুন।',
      'কাছে একটি সবুজ রুমাল রাখুন।',
      'ক্রিস্টাল ব্রেসলেট পরিধান করুন।',
      'বুধবারে গরুকে সবুজ ঘাস বা পালং শাক খাওয়ান।',
      'যোগাযোগের দক্ষতা বাড়াতে বক্তব্য চর্চা করুন।',
      'অন্যের কথা গভীর মনোযোগ দিয়ে শুনুন (সক্রিয় শ্রবণ)।',
      'নিয়মিত নিজের ভাবনা ডায়েরিতে লিখে রাখুন।',
      '৫ মুখী রুদ্রাক্ষ ধারণ করুন।',
      'নতুন শখ বা নতুন স্থান ভ্রমণের মাধ্যমে মানসিক নমনীয়তা বাড়ান।'
    ],
    categories: {
      directionEn: 'Clear Brahmasthan (centre of house); mountain picture without water.',
      directionBn: 'বাড়ির কেন্দ্রস্থল (ব্রহ্মস্থান) পরিষ্কার রাখুন ও পাহাড়ের ছবি দিন।',
      rudrakshaEn: 'Wear 5 Mukhi Rudraksha; carry a green handkerchief.',
      rudrakshaBn: '৫ মুখী রুদ্রাক্ষ ও সবুজ রুমাল সাথে রাখা।',
      donationEn: 'Feed green fodder or spinach to cows on Wednesday.',
      donationBn: 'বুধবারে গরুকে সবুজ ঘাস বা শাক খাওয়ানো।',
      mantraEn: 'Chant Mercury mantra (“Om Bum Budhaya Namaha”).',
      mantraBn: 'বুধ বীজ মন্ত্র জপ (“ওঁ বং বুধায় নমঃ”)।',
      crystalEn: 'Green Aventurine Bracelet or Quartz crystal.',
      crystalBn: 'গ্রিন অ্যাভেঞ্চুরিন ব্রেসলেট বা কোয়ার্টজ ক্রিস্টাল।'
    }
  },
  6: {
    number: 6,
    focus: 'Venus + Metal/Gold + Family/Luxury Energy',
    focusBn: 'শুক্র + ধাতু/স্বর্ণ + পারিবারিক সৌভাগ্য ও বিলাসিতা',
    purpose: 'Family happiness, marriage, luxury, money, relationships and Venus energy balance.',
    purposeBn: 'পারিবারিক সুখ, দাম্পত্য প্রীতি, বিলাসিতা, অর্থ আকর্ষণ ও শুক্রের শক্তি বৃদ্ধি।',
    crystal: 'Rose Quartz / Carnelian',
    directionEn: 'North-West',
    directionBn: 'উত্তর-পশ্চিম দিক',
    items: [
      'Keep metal coins as a source-based remedy.',
      'Show respect to women.',
      'Gift cosmetics to a married woman.',
      'Keep a 6-rod golden wind chime in the North-West direction.',
      'Use a watch or bracelet with a golden chain/band.',
      'Wear yellow clothes when going for important work.',
      'Use Venus-related white, luxury and family-harmony practices.',
      'Consider the source-based Friday remedy of donating white-related items.'
    ],
    itemsBn: [
      'ধাতব মুদ্রা কাছে রাখুন।',
      'নারীদের সম্মান ও শ্রদ্ধা প্রদর্শন করুন।',
      'কোনো বিবাহিতা নারীকে প্রসাধন সামগ্রী উপহার দিন।',
      'উত্তর-পশ্চিম (বায়ু কোণ) অংশে ৬টি রড বিশিষ্ট সোনালী উইন্ড চাইম ঝুলিয়ে দিন।',
      'সোনালী চেইনের ঘড়ি বা ব্রেসলেট পরিধান করুন।',
      'গুরুত্বপূর্ণ কাজে যাওয়ার সময় হালকা হলুদ বা ক্রিম রঙের পোশাক পরুন।',
      'পারিবারিক সম্প্রীতি ও নান্দনিক পরিচ্ছন্নতা বজায় রাখুন।',
      'শুক্রবারে ক্ষীর, চিনি বা সাদা খাদ্যদ্রব্য দান করুন।'
    ],
    categories: {
      directionEn: 'Hang a 6-rod golden wind chime in North-West direction.',
      directionBn: 'উত্তর-পশ্চিমে ৬-রডের সোনালী উইন্ড চাইম ঝুলানো।',
      donationEn: 'Gift cosmetics to a married woman; donate white food on Friday.',
      donationBn: 'সধবা নারীকে প্রসাধন উপহার ও শুক্রবারে সাদা খাদ্য দান।',
      colorEn: 'Wear golden watch/chain; wear yellow/cream for auspicious works.',
      colorBn: 'সোনালী চেইনের ঘড়ি ও হলুদ/ক্রিম পোশাক পরিধান।',
      spiritualEn: 'Respect women (Stri Samman); cultivate domestic grace.',
      spiritualBn: 'নারীদের সম্মান প্রদর্শন ও গৃহের শ্রী বৃদ্ধি।',
      crystalEn: 'Rose Quartz / Carnelian stone.',
      crystalBn: 'রোজ কোয়ার্টজ বা কার্নেলিয়ান ক্রিস্টাল।'
    }
  },
  7: {
    number: 7,
    focus: 'Ketu/Spirituality + Silver + Dogs',
    focusBn: 'কেতু/আধ্যাত্মিকতা + রুপো + পশুসেবা (কুকুর)',
    purpose: 'Spirituality, intuition, independence, mental peace and obstacle balancing.',
    purposeBn: 'আধ্যাত্মিক চেতনা, অন্তর্দৃষ্টি, মানসিক শান্তি ও বাধা নিরসন।',
    crystal: 'Amethyst / Clear Quartz',
    directionEn: 'West',
    directionBn: 'পশ্চিম দিক',
    items: [
      'Use a watch or bracelet with a silver chain/band.',
      'Keep a 7-rod silver wind chime in the West direction.',
      'Help or feed dogs.',
      'Give bread with jaggery to dogs as a source-based remedy.',
      'Wear white, light blue or light green clothes.',
      'Worship Lord Ganesha.',
      'Chant the Ketu mantra “Om Kem Ketave Namaha” 108 times.',
      'Practise meditation for spiritual growth.',
      'Practise crown chakra meditation.',
      'Observe a Thursday fast as a source-based remedy.'
    ],
    itemsBn: [
      'রুপালী চেইনের ঘড়ি বা ব্রেসলেট ব্যবহার করুন।',
      'পশ্চিম দিকে ৭টি রড বিশিষ্ট রুপালী উইন্ড চাইম ঝুলিয়ে দিন।',
      'কুকুরদের খাবার ও সেবা দিন।',
      'কুকুরকে গুড় মাখানো রুটি খাওয়ান।',
      'সাদা, হালকা নীল বা হালকা সবুজ রঙের পোশাক পরুন।',
      'বিঘ্নহর্তা গণেশজির আরাধনা করুন।',
      'প্রতিদিন ১০৮ বার কেতু মন্ত্র জপ করুন (“ওঁ কেং কেতবে নমঃ”)।',
      'আধ্যাত্মিক উন্নতির জন্য নিয়মিত ধ্যান করুন।',
      'সহস্রার চক্র (Crown Chakra) ধ্যান অভ্যাস করুন।',
      'বৃহস্পতিবারের ব্রত বা উপবাস পালন করুন।'
    ],
    categories: {
      directionEn: 'Hang a 7-rod silver wind chime in West direction.',
      directionBn: 'পশ্চিম দিকে ৭-রডের রুপালী উইন্ড চাইম ঝুলানো।',
      donationEn: 'Feed dogs; offer bread with jaggery to stray dogs.',
      donationBn: 'কুকুরকে গুড় মাখানো রুটি খাওয়ানো।',
      mantraEn: 'Chant Ketu mantra “Om Kem Ketave Namaha” 108 times daily.',
      mantraBn: 'কেতু মন্ত্র জপ (“ওঁ কেং কেতবে নমঃ” ১০৮ বার)।',
      spiritualEn: 'Worship Lord Ganesha; Crown chakra meditation; Thursday fast.',
      spiritualBn: 'শ্রীগণেশ পূজা, সহস্রার চক্র ধ্যান ও বৃহস্পতিবারের ব্রত।',
      crystalEn: 'Amethyst / Clear Quartz for intuition.',
      crystalBn: 'অ্যামেথিস্ট বা ক্লিয়ার কোয়ার্টজ ক্রিস্টাল।'
    }
  },
  8: {
    number: 8,
    focus: 'Saturn + Stability + Financial Discipline + North-East + Charity',
    focusBn: 'শনি + স্থায়িত্ব + আর্থিক শৃঙ্খলা + উত্তর-পূর্ব + মানবসেবা',
    purpose: 'Decision-making, financial stability, discipline, completion of work and long-term stability.',
    purposeBn: 'সঠিক সিদ্ধান্ত গ্রহণ, দীর্ঘস্থায়ী সম্পদ, শৃঙ্খলা, কাজ সমাপ্তি ও স্থায়িত্ব।',
    crystal: 'Black Obsidian Bracelet',
    directionEn: 'North-East',
    directionBn: 'উত্তর-পূর্ব দিক',
    items: [
      'Keep crystals in the North-East direction.',
      'Keep a water-filled Kalash in the North-East direction.',
      'Distribute salty food as a source-based remedy.',
      'Show respect to and help poor, labouring or financially weaker people.',
      'Practise food donation.',
      'Avoid non-vegetarian food on Saturday as a source-based remedy.',
      'Observe a Saturday fast as a source-based remedy.',
      'Keep your surroundings clean and organised.',
      'Maintain discipline and careful decision-making in financial matters.',
      'Keep a Ganga Jal-filled Kalash in the North-East as a source-based remedy.'
    ],
    itemsBn: [
      'উত্তর-পূর্ব (ঈশান কোণ) অংশে স্ফটিক ক্রিস্টাল রাখুন।',
      'উত্তর-পূর্বে জলপূর্ণ বা গঙ্গাজলপূর্ণ মঙ্গল ঘট রাখুন।',
      'নোনতা খাবার দুঃস্থ মানুষদের মধ্যে বিতরণ করুন।',
      'শ্রমজীবী ও অসহায় মানুষদের সহায়তা ও শ্রদ্ধা করুন।',
      'নিয়মিত অন্নদান করুন।',
      'শনিবারে নিরামিষ আহার গ্রহণ করুন।',
      'শনিবারের উপবাস বা শনি মন্দিরে প্রদীপ প্রজ্বলন করুন।',
      'চারপাশ সর্বদা সুসংবদ্ধ ও পরিচ্ছন্ন রাখুন।',
      'আর্থিক সিদ্ধান্তে অপরিসীম সতর্কতা ও শৃঙ্খলা বজায় রাখুন।',
      'উত্তর-পূর্বে পিতল বা তামার পাত্রে গঙ্গাজল স্থাপন করুন।'
    ],
    categories: {
      directionEn: 'Place water-filled or Ganga Jal Kalash and crystals in North-East.',
      directionBn: 'উত্তর-পূর্বে (ঈশান কোণ) গঙ্গাজল ঘট ও ক্রিস্টাল স্থাপন।',
      donationEn: 'Distribute salty food and meals to labourers or needy people.',
      donationBn: 'শ্রমজীবী ও দরিদ্রদের নোনতা খাদ্য ও অন্নদান।',
      spiritualEn: 'Avoid non-veg on Saturday; Saturday fasting; strict financial order.',
      spiritualBn: 'শনিবারে নিরামিষ আহার, শনিবার ব্রত ও আর্থিক শৃঙ্খলা।',
      crystalEn: 'Black Obsidian Bracelet for grounding and resilience.',
      crystalBn: 'ব্ল্যাক অবসিডিয়ান ব্রেসলেট।'
    }
  },
  9: {
    number: 9,
    focus: 'Mars + Fire + Red Colour + Hanuman',
    focusBn: 'মঙ্গল + অগ্নি + লাল রং + বজরংবলী হনুমান',
    purpose: 'Courage, energy, willpower, recognition, fame and action-oriented energy balance.',
    purposeBn: 'সাহসিকতা, শারীরিক তেজ, ইচ্ছাশক্তি, খ্যাতি ও অসমাপ্ত কাজ সমাপ্তকরণ।',
    crystal: 'Red Jasper Bracelet',
    directionEn: 'South',
    directionBn: 'দক্ষিণ দিক',
    items: [
      'Keep a fire picture in the South direction.',
      'Use a red bulb or red light in the South direction.',
      'Tie a red thread on the right wrist.',
      'Visit a Hanuman Temple.',
      'Recite the Hanuman Chalisa.',
      'Donate red lentils (Masoor Dal) on Tuesday.',
      'Use red colour.',
      'Observe a Tuesday fast as a source-based remedy.',
      'Chant “Om Mangalaya Namaha” 108 times.',
      'Use forgiveness, meditation or journaling to balance anger and impulsiveness.'
    ],
    itemsBn: [
      'দক্ষিণ দেয়ালে জ্বলন্ত অগ্নির প্রতীকী ছবি রাখুন।',
      'দক্ষিণ কোণে একটি ছোট লাল রঙের জিরো-ওয়াট বাল্ব জ্বালান।',
      'ডান কব্জিতে লাল সুতো (মৌলি) ধারণ করুন।',
      'নিয়মিত হনুমান মন্দিরে দর্শন করুন।',
      'প্রতিদিন নিষ্ঠার সাথে হনুমান চালিসা পাঠ করুন।',
      'মঙ্গলবারে লাল মসুর ডাল দুঃস্থদের দান করুন।',
      'পোশাকে বা ব্যবহারের সামগ্রীতে লাল রং ব্যবহার করুন।',
      'মঙ্গলবার উপবাস পালন করুন।',
      'মঙ্গল মন্ত্র ১০৮ বার জপ করুন (“ওঁ মঙ্গলায় নমঃ”)।',
      'ক্ষমাশীলতা ও ধ্যানের মাধ্যমে ক্ষোভ ও অধৈর্য নিয়ন্ত্রণ করুন।'
    ],
    categories: {
      directionEn: 'Keep a fire picture or red night bulb in South direction.',
      directionBn: 'দক্ষিণ দিকে অগ্নির ছবি বা লাল মৃদু আলো জ্বালানো।',
      donationEn: 'Donate red lentils (Masoor Dal) on Tuesday.',
      donationBn: 'মঙ্গলবারে লাল মসুর ডাল দান।',
      mantraEn: 'Chant Mars mantra “Om Mangalaya Namaha” 108 times.',
      mantraBn: 'মঙ্গল মন্ত্র জপ (“ওঁ মঙ্গলায় নমঃ” ১০৮ বার)।',
      spiritualEn: 'Recite Hanuman Chalisa; visit Hanuman temple; Tuesday fast.',
      spiritualBn: 'হনুমান চালিসা পাঠ, মঙ্গলবার ব্রত ও হনুমান মন্দির দর্শন।',
      crystalEn: 'Red Jasper Bracelet for vitality and task completion.',
      crystalBn: 'রেড জ্যাসপার ব্রেসলেট।'
    }
  }
};

// 5c. 10-Digit Mobile Position Guide (Reference Software Rule)
const MOBILE_POSITION_GUIDE = [
  { pos: 1, domainEn: 'Self / Personality', domainBn: 'ব্যক্তিত্ব ও আত্ম-পরিচয়' },
  { pos: 2, domainEn: 'Decision-Making', domainBn: 'সিদ্ধান্ত গ্রহণ ও মানসিক গতি' },
  { pos: 3, domainEn: 'Career & Government', domainBn: 'কর্মজীবন ও সরকারি প্রভাব' },
  { pos: 4, domainEn: 'Business Relations', domainBn: 'ব্যবসায়িক যোগাযোগ ও নেটওয়ার্ক' },
  { pos: 5, domainEn: 'Children / Offspring', domainBn: 'সন্তান ও পারিবারিক সৌভাগ্য' },
  { pos: 6, domainEn: 'Family Harmony', domainBn: 'পারিবারিক সম্প্রীতি ও বৈষয়িক সুখ' },
  { pos: 7, domainEn: 'Marriage & Love', domainBn: 'দাম্পত্য ও সম্পর্কের মাধুর্য' },
  { pos: 8, domainEn: 'Health & Vitality', domainBn: 'স্বাস্থ্য ও শারীরিক প্রতিরোধ' },
  { pos: 9, domainEn: 'Public Relations', domainBn: 'জনসংযোগ ও সামাজিক প্রতিষ্ঠা' },
  { pos: 10, domainEn: 'Wealth & Retention', domainBn: 'অর্থ সঞ্চয় ও সম্পদ ধারণ ক্ষমতা' }
];

// 6. SECTION B: Purpose-Based Crystal / Bracelet Recommendations (Strictly Separate Layer)
const PURPOSE_CRYSTALS = [
  { id: 'wealth', purposeEn: 'Wealth & Prosperity', purposeBn: 'অর্থ ও সমৃদ্ধি', crystal: 'Green Aventurine + Citrine', isBracelet: false, useEn: 'Abundance, clearing money blocks and attracting cash flow.', useBn: 'প্রাচুর্য আকর্ষণ, অর্থ উপার্জনের বাধা দূরীকরণ ও ধনপ্রবাহ বৃদ্ধি।' },
  { id: 'relationships', purposeEn: 'Relationships', purposeBn: 'সম্পর্ক ও দাম্পত্য', crystal: 'Rose Quartz Bracelet', isBracelet: true, useEn: 'Love, emotional healing and heart harmony.', useBn: 'ভালোবাসা, আবেগীয় নিরাময় ও হৃদয়ের সম্প্রীতি স্থাপন।' },
  { id: 'career', purposeEn: 'Job Success', purposeBn: 'চাকরিতে পদোন্নতি', crystal: 'Green Aventurine or Citrine Bracelet', isBracelet: true, useEn: 'Confidence, interview success and career growth.', useBn: 'আত্মবিশ্বাস, ইন্টারভিউয়ে সাফল্য ও পদোন্নতি।' },
  { id: 'business', purposeEn: 'Business Growth', purposeBn: 'ব্যবসায়িক বৃদ্ধি', crystal: 'Iron Pyrite', isBracelet: false, useEn: 'Business expansion, commercial protection and cash turnover.', useBn: 'ব্যবসার বিস্তার, ক্ষতি থেকে সুরক্ষা ও জোরালো আর্থিক কম্পন।' },
  { id: 'education', purposeEn: 'Focus & Education', purposeBn: 'মনোযোগ ও শিক্ষা', crystal: 'Lapis Lazuli Bracelet', isBracelet: true, useEn: 'Intellect, memory retention and examination focus.', useBn: 'স্মৃতিশক্তি, মেধা ও পড়াশোনায় গভীর একাগ্রতা।' },
  { id: 'investments', purposeEn: 'Investments', purposeBn: 'বিনিয়োগ ও শেয়ার', crystal: 'Amazonite Bracelet', isBracelet: true, useEn: 'Financial clarity and prudent risk management.', useBn: 'অর্থনৈতিক স্বচ্ছতা ও সঠিক সিদ্ধান্ত গ্রহণের ক্ষমতা।' },
  { id: 'mental_wellness', purposeEn: 'Mental Wellness', purposeBn: 'মানসিক প্রশান্তি', crystal: 'Amethyst Bracelet', isBracelet: true, useEn: 'Inner calm, anxiety relief and balanced sleep.', useBn: 'মানসিক স্থিরতা, দুশ্চিন্তা হ্রাস ও প্রফুল্লতা।' },
  { id: 'protection', purposeEn: 'Protection', purposeBn: 'সুরক্ষা ও কুদৃষ্টি নিবারণ', crystal: 'Black Tourmaline Bracelet', isBracelet: true, useEn: 'Shielding against negative evil eye and psychic drains.', useBn: 'কুদৃষ্টি ও নেতিবাচক শক্তি থেকে বর্মের ন্যায় সুরক্ষা।' },
  { id: 'health', purposeEn: 'Health & Energy', purposeBn: 'স্বাস্থ্য ও প্রাণশক্তি', crystal: '7 Chakra Lava Bracelet', isBracelet: true, useEn: 'Chakra alignment, vitality and physical rejuvenation.', useBn: 'সপ্তচক্রের ভারসাম্য ও শারীরিক উদ্দীপনা।' },
  { id: 'confidence', purposeEn: 'Confidence', purposeBn: 'আত্মবিশ্বাস ও পরাক্রম', crystal: 'Tiger Eye Bracelet', isBracelet: true, useEn: 'Courage, decisive authority and willpower.', useBn: 'অদম্য সাহস, দ্রুত সিদ্ধান্ত গ্রহণ ও ব্যক্তিত্বের তেজ।' }
];

// Map by ID for quick key lookup
PURPOSE_CRYSTALS.forEach(item => {
  PURPOSE_CRYSTALS[item.id] = item;
});

// 7. ROOT CRYSTALS (1-9 Mulank Harmonizers)
const ROOT_CRYSTALS = {
  1: { crystal: 'Citrine / Ruby / Sunstone Bracelet', benefit: 'মানসিক শক্তি, আত্মবিশ্বাস ও নেতৃত্বের তেজ বৃদ্ধি করে।', benefitEn: 'Amplifies personal magnetism, authority and decisive confidence.' },
  2: { crystal: 'Moonstone / Natural Pearl / Selenite', benefit: 'মানসিক স্থিরতা, অন্তর্দৃষ্টি ও আবেগীয় ভারসাম্য দান করে।', benefitEn: 'Fosters deep emotional calmness, intuitive balance and peace.' },
  3: { crystal: 'Yellow Topaz / Citrine Bracelet', benefit: 'জ্ঞান, দূরদর্শিতা ও আধ্যাত্মিক একাগ্রতা বৃদ্ধি করে।', benefitEn: 'Deepens wisdom, philosophical expansion and focus.' },
  4: { crystal: 'Tiger Eye / Hessonite / Smoky Quartz', benefit: 'রাহুর অস্থিরতা দূর করে ও আকস্মিক বিভ্রান্তি থেকে সুরক্ষা দেয়।', benefitEn: 'Grounds erratic thoughts and shields against unforeseen friction.' },
  5: { crystal: 'Green Jade / Green Aventurine Bracelet', benefit: 'যোগাযোগ দক্ষতা, বুদ্ধিমত্তা ও আর্থিক সুযোগ সক্রিয় করে।', benefitEn: 'Sharpens intellectual acumen, business communication and luck.' },
  6: { crystal: 'Rose Quartz / Opal / Diamond Essence', benefit: 'আকর্ষণ ক্ষমতা, নান্দনিক রুচি ও দাম্পত্যে ভালোবাসা বৃদ্ধি করে।', benefitEn: 'Inspires romantic harmony, luxury magnetism and artistic grace.' },
  7: { crystal: 'Amethyst / Clear Quartz Bracelet', benefit: 'মনঃসংযোগ, আত্মানুসন্ধান ও গভীর দিব্য অন্তর্দৃষ্টি উন্মোচন করে।', benefitEn: 'Awakens spiritual tranquility, meditation and analytical precision.' },
  8: { crystal: 'Black Obsidian / Blue Lace Agate Bracelet', benefit: 'ধৈর্য, মানসিক শৃঙ্খলা ও স্থায়ী সম্পদ সুরক্ষায় সহায়ক।', benefitEn: 'Instills steadfast perseverance, grounding and asset protection.' },
  9: { crystal: 'Red Jasper / Carnelian Bracelet', benefit: 'শারীরিক তেজ, সাহস ও অসমাপ্ত কর্ম দ্রুত সম্পন্ন করতে উদ্দীপনা দেয়।', benefitEn: 'Ignites physical vitality, courageous leadership and task execution.' }
};

// 8. NUMEROLOGY SCENTS & AROMA (1-9 Mulank Aromatherapy)
const NUMEROLOGY_SCENTS = {
  1: { scents: 'Sandalwood, Frankincense, Bergamot', benefit: 'রাজকীয় আভা বৃদ্ধি করে এবং আত্মবিশ্বাস ও প্রভাব বিস্তার করে।', benefitEn: 'Enhances regal aura, solar magnetism and mental authority.' },
  2: { scents: 'Jasmine, White Lotus, Lily of the Valley', benefit: 'আভা বা অরা শক্তিশালী করে এবং মানসিক প্রশান্তি ও স্নিগ্ধতা দেয়।', benefitEn: 'Soothes emotional waves and deepens intuitive clarity.' },
  3: { scents: 'Saffron, Cedarwood, Cinnamon', benefit: 'মেধা ও আধ্যাত্মিক চেতনার বিস্তার ঘটায় এবং সৌভাগ্য আকর্ষণ করে।', benefitEn: 'Invigorates wisdom, spiritual elevation and good fortune.' },
  4: { scents: 'Vetiver (Khus), Sandalwood, Eucalyptus', benefit: 'স্নায়ু শান্ত রাখে এবং মানসিক অস্থিরতা ও দ্বিধাদ্বন্দ্ব দূর করে।', benefitEn: 'Grounds nervous energy and balances sudden psychological stress.' },
  5: { scents: 'Peppermint, Lemongrass, Lavender', benefit: 'স্মৃতিশক্তি তীক্ষ্ণ করে ও নতুন ধারণার সাবলীল স্ফুরণ ঘটায়।', benefitEn: 'Refreshes cognitive agility, commercial focus and wit.' },
  6: { scents: 'Damask Rose, Ylang Ylang, Vanilla', benefit: 'প্রেমের অনুরণন ও চারুকলার সৌন্দর্যবোধ অন্তরে জাগ্রত করে।', benefitEn: 'Exudes romantic elegance, interpersonal charm and warmth.' },
  7: { scents: 'Frankincense, Myrrh, Patchouli', benefit: 'গভীর ধ্যান ও অন্তর্মুখী আত্মিক প্রশান্তি আনয়নে অনন্য।', benefitEn: 'Promotes deep meditative absorption and psychic shielding.' },
  8: { scents: 'Blue Lotus, Cedarwood, Patchouli', benefit: 'ভারসাম্য, একাগ্রতা ও দীর্ঘস্থায়ী ধৈর্যশক্তি বৃদ্ধি করে।', benefitEn: 'Nourishes disciplined perseverance, resilience and grounding.' },
  9: { scents: 'Rosemary, Ginger, Clove, Orange', benefit: 'শারীরিক কর্মশক্তি ও প্রাণোচ্ছল উদ্দীপনা পুনরুজ্জীবিত করে।', benefitEn: 'Stimulates vital energetic flow, determination and courage.' }
};

// 9. PLANETARY HEALTH & DIETARY HARMONIZERS (1-9 Mulank Vitality)
const PLANETARY_HEALTH = {
  1: { foods: 'Citrus fruits, ginger, honey, bay leaf, barley', benefit: 'হৃদযন্ত্র ও রক্ত সঞ্চালন সচল রাখতে এবং জীবনীশক্তি বজায় রাখতে সহায়ক।', benefitEn: 'Supports cardiovascular vitality, ocular clarity and solar stamina.' },
  2: { foods: 'Melons, cucumber, coconut water, milk, cabbage', benefit: 'শরীরে জলীয় ভারসাম্য ও পরিপাকতন্ত্র শীতল ও সক্রিয় রাখতে সহায়ক।', benefitEn: 'Balances lymphatic hydration and digestive equilibrium.' },
  3: { foods: 'Turmeric, saffron, apples, figs, almonds, mint', benefit: 'যকৃৎ সুস্থ রাখতে ও স্নায়বিক শক্তি বাড়িয়ে শারীরিক ভারসাম্য বজায় রাখে।', benefitEn: 'Promotes hepatic health, nervous vigor and arterial balance.' },
  4: { foods: 'Spinach, carrot, green sprouts, beetroot, herbal tea', benefit: 'অম্বল ও গ্যাস নিয়ন্ত্রণ করে এবং রক্তের বিষাক্ততা পরিষ্কার করে।', benefitEn: 'Soothes acidity, purifies blood and balances nervous oscillations.' },
  5: { foods: 'Walnuts, green leafy vegetables, oats, chamomile, parsley', benefit: 'মস্তিষ্ক ও স্নায়ুতন্ত্রের সজীবতা ধরে রাখতে বিশেষ উপযোগী।', benefitEn: 'Recharges nervous endurance, vocal clarity and cognitive speed.' },
  6: { foods: 'Pomegranate, almonds, figs, leafy greens, curd', benefit: 'ত্বকের উজ্জ্বলতা ও হরমোনের স্বাভাবিক ভারসাম্য রক্ষা করে।', benefitEn: 'Enhances hormonal harmony, skin radiance and kidney vitality.' },
  7: { foods: 'Green tea, cucumber, cabbage, mushrooms, celery', benefit: 'উদ্বেগমুক্ত ঘুম ও অন্ত্রের স্বাস্থ্য বজায় রাখতে সহায়তা করে।', benefitEn: 'Aids digestive tranquility, lymphatic detox and sound sleep.' },
  8: { foods: 'Black sesame, spinach, dark grapes, barley, buttermilk', benefit: 'হাড় ও সন্ধিস্থলের শক্তি বজায় রাখতে এবং বাতজনিত সমস্যায় সহায়ক।', benefitEn: 'Strengthens bone density, joint flexibility and structural stamina.' },
  9: { foods: 'Garlic, onions, dates, beetroot, tomatoes, ginger', benefit: 'রক্তের লোহিত কণিকা বৃদ্ধি ও পেশির ক্ষিপ্রতা বজায় রাখতে কার্যকর।', benefitEn: 'Boosts hematological vitality, muscle energy and iron reserves.' }
};

// Expose on window for client consumption
if (typeof window !== 'undefined') {
  window.ROOT_CRYSTALS = ROOT_CRYSTALS;
  window.NUMEROLOGY_SCENTS = NUMEROLOGY_SCENTS;
  window.PLANETARY_HEALTH = PLANETARY_HEALTH;
  window.PURPOSE_CRYSTALS = PURPOSE_CRYSTALS;
  window.LOSHU_REMEDIES = LOSHU_REMEDIES;
  window.MOBILE_POSITION_GUIDE = MOBILE_POSITION_GUIDE;
}

// 10. Traditional Disclaimers
const COMBINATION_81_DISCLAIMER = {
  en: 'Traditional Numerology Disclaimer: These 81 combination insights, lucky days, colors, and business sectors reflect classical numerological lore. They are intended as reflective symbolic frameworks and do not constitute clinical, legal, or guaranteed commercial advice.',
  bn: 'ঐতিহ্যগত সংখ্যাতত্ত্ব সতর্কতা: এই ৮১-সংমিশ্রণ বিশ্লেষণ শাস্ত্রীয় নির্দেশিকার অংশ। এগুলো আত্ম-অনুসন্ধানের সহায়ক এবং কোনো চিকিৎসা, আইনি বা আর্থিক ফলাফল নিশ্চিত করার নিশ্চয়তা প্রদান করে না।'
};

const TRADITIONAL_CRYSTAL_DISCLAIMER = {
  en: 'Traditional-Use Disclaimer: Health, mental-wellness, financial, and relationship descriptions are traditional/experiential recommendations within numerology lore, not medical treatment, guaranteed financial outcomes, or scientifically established effects.',
  bn: 'ঐতিহ্যগত সতর্কতা: স্বাস্থ্য, মানসিক প্রশান্তি, আর্থিক ও সম্পর্ক বিষয়ক বর্ণনাগুলি প্রথাগত সংখ্যাতাত্ত্বিক অনুভূতির অংশ; এগুলো কোনো চিকিৎসা পদ্ধতি, নিশ্চিত আর্থিক গ্যারান্টি বা বৈজ্ঞানিকভাবে প্রমাণিত ফল নয়।'
};
