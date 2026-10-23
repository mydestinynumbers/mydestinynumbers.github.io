/**
 * ASTRO GOUTAM INC - Mobile Numerology Master (Canonical Rulebook Standalone)
 * Strict implementation of 2-digit pairs (Dhan Yog 29, 37, 73, 92, Top Picks, Negatives),
 * and Terminal 4 Digits Money Retention Engine.
 */

const DHAN_YOG_PAIRS = ['29', '37', '73', '92'];
const PRIMARY_TOP_PICKS = ['19', '57', '75', '91'];
const PRIMARY_NEGATIVE_PAIRS = ['22', '23', '32', '35', '53', '77', '79', '97'];
const MONEY_BLOCK_PAIRS = ['56', '58', '65', '85'];
const TROUBLESOME_PAIRS = [
  '14', '41', '16', '61', '18', '81', '24', '26', '27', '28', '82',
  '34', '42', '43', '44', '45', '46', '47', '48', '54', '62', '64',
  '67', '68', '72', '74', '84', '86', '88', '89', '94', '98'
];

const PAIR_INTERPRETATIONS = {
  '29': {
    category: 'Highly Favourable (Dhan Yog)',
    action: 'Keep / Top Pick',
    descEn: 'Supreme Dhan Yog. Magnetic money attraction, sudden financial opportunities, business expansion.',
    descBn: 'পরম ধনযোগ। তীব্র অর্থ আকর্ষণ, অপ্রত্যাশিত সুযোগ ও দ্রুত ব্যবসায়িক উন্নতি।'
  },
  '37': {
    category: 'Highly Favourable (Dhan Yog)',
    action: 'Keep / Top Pick',
    descEn: 'Supreme Dhan Yog. Jupiter-Ketu wisdom alliance. Divine luck, loyal patronage and unexpected wealth.',
    descBn: 'পরম ধনযোগ। গুরু ও কেতুর সংযোগ। স্বর্গীয় ভাগ্য, বিশ্বস্ত গ্রাহক ও প্রচুর ধনলাভ।'
  },
  '73': {
    category: 'Highly Favourable (Dhan Yog)',
    action: 'Keep / Top Pick',
    descEn: 'Supreme Dhan Yog. Intuitive mastery, research success, occult wisdom and steady cash inflow.',
    descBn: 'পরম ধনযোগ। অন্তর্দৃষ্টি, গবেষণা সাফল্য ও নিয়মিত আর্থিক লাভ।'
  },
  '92': {
    category: 'Highly Favourable (Dhan Yog)',
    action: 'Keep / Top Pick',
    descEn: 'Supreme Dhan Yog. Mars-Moon energy balance. Rapid wealth generation and real estate triumphs.',
    descBn: 'পরম ধনযোগ। মঙ্গল ও চন্দ্রের শুভ প্রভাব। দ্রুত ধনবৃদ্ধি ও স্থাবর সম্পত্তির লাভ।'
  },
  '19': {
    category: 'Highly Favourable (Primary)',
    action: 'Keep / Top Pick',
    descEn: 'Royal Sun-Mars leadership. Supreme authority, public recognition and political influence.',
    descBn: 'সূর্য ও মঙ্গলের রাজকীয় তেজ। সর্বোচ্চ কর্তৃত্ব, যশ ও প্রশাসনিক প্রভাব।'
  },
  '57': {
    category: 'Highly Favourable (Primary)',
    action: 'Keep / Top Pick',
    descEn: 'Mercury-Ketu analytical genius. Outstanding trade acumen, data precision and wealth.',
    descBn: 'বুধ ও কেতুর বুদ্ধিমত্তা। ব্যবসায়িক কৌশল ও দূরদর্শী আর্থিক সিদ্ধান্ত।'
  },
  '75': {
    category: 'Highly Favourable (Primary)',
    action: 'Keep / Top Pick',
    descEn: 'Spiritual and commercial balance. Strong intuition guiding profitable trades.',
    descBn: 'আধ্যাত্মিক ও বাণিজ্যিক ভারসাম্য। লাভজনক ব্যবসা পরিচালনায় তীক্ষ্ণ বুদ্ধি।'
  },
  '91': {
    category: 'Highly Favourable (Primary)',
    action: 'Keep / Top Pick',
    descEn: 'Mars-Sun executive pioneer. Supreme drive, victory over competitors and high status.',
    descBn: 'মঙ্গল ও সূর্যের সংযোগ। অদম্য উদ্যম, শত্রুজয় ও উচ্চ সামাজিক প্রতিষ্ঠা।'
  },
  '14': {
    category: 'Unfavourable (Troublesome)',
    action: 'Avoid / Strictly Prohibited',
    descEn: 'Loan liabilities, legal notices, chronic delays, accident vulnerabilities.',
    descBn: 'ঋণের বোঝা, আইনি নোটিশ, কাজে বিলম্ব ও দুর্ঘটনার ঝুঁকি।'
  },
  '16': {
    category: 'Unfavourable (Troublesome)',
    action: 'Avoid',
    descEn: 'Marital friction, spouse health issues, career instability and sudden setbacks.',
    descBn: 'দাম্পত্য কলহ, জীবনসঙ্গীর স্বাস্থ্যহানি ও কর্মজীবনে আকস্মিক বাধা।'
  },
  '18': {
    category: 'Unfavourable (Troublesome)',
    action: 'Avoid',
    descEn: 'Sun-Saturn clash. Family disputes, court friction and unyielding delays.',
    descBn: 'সূর্য ও শনির সংঘাত। পারিবারিক বিরোধ, আদালতে ঝামেলা ও দীর্ঘ বিলম্ব।'
  },
  '22': {
    category: 'Highly Unfavourable (Primary Negative)',
    action: 'Avoid / Strictly Prohibited',
    descEn: 'Emotional turmoil, heavy anxiety, depressive episodes and indecisiveness.',
    descBn: 'মানসিক চরম অস্থিরতা, গভীর দুশ্চিন্তা ও দোলাচল।'
  },
  '35': {
    category: 'Highly Unfavourable (Primary Negative)',
    action: 'Avoid',
    descEn: 'Sudden financial reversals, broken partnerships and speculative losses.',
    descBn: 'আকস্মিক অর্থহানি, অংশীদারিত্বে ফাটল ও ব্যবসায়িক ক্ষতি।'
  },
  '56': {
    category: 'Unfavourable (Money Block)',
    action: 'Avoid',
    descEn: 'Blocked receivables, delayed client payments and commercial frustration.',
    descBn: 'আটকে থাকা টাকা, দেরিতে পেমেন্ট ও নগদ অর্থের টানাপোড়েন।'
  },
  '58': {
    category: 'Unfavourable (Money Block)',
    action: 'Avoid',
    descEn: 'Mercury-Saturn friction. Constant slow turnover and communication barriers.',
    descBn: 'বুধ ও শনির সংঘাত। ধীরগতির ব্যবসা ও বাণিজ্যে বাধা।'
  }
};

function analyzeTerminal4Digits(cleanMobile) {
  if (cleanMobile.length < 4) return null;
  const raw4 = cleanMobile.substring(cleanMobile.length - 4);
  let sum = 0;
  for (let ch of raw4) sum += parseInt(ch, 10) || 0;
  const root = reduceToSingle(sum) || 1;
  const lastDigit = parseInt(raw4[3], 10);

  const pairs = [];
  let dhan = false;
  let neg = false;
  for (let i = 0; i < 3; i++) {
    const p = raw4.substring(i, i + 2);
    const isDh = DHAN_YOG_PAIRS.includes(p);
    const isTop = PRIMARY_TOP_PICKS.includes(p);
    const isN = PRIMARY_NEGATIVE_PAIRS.includes(p) || MONEY_BLOCK_PAIRS.includes(p) || TROUBLESOME_PAIRS.includes(p);
    if (isDh) dhan = true;
    if (isN) neg = true;
    pairs.push({
      pair: p,
      isDhanYog: isDh,
      isTopPick: isTop,
      isNegative: isN,
      labelEn: isDh ? 'Dhan Yog' : isTop ? 'Top Pick' : isN ? 'Warning Pair' : 'Neutral',
      labelBn: isDh ? 'ধনযোগ' : isTop ? 'উচ্চ শুভ' : isN ? 'সতর্ক জোড়া' : 'নিরপেক্ষ'
    });
  }

  let retention = 75;
  if (dhan) retention += 20;
  if ([5, 6, 9].includes(lastDigit)) retention += 10;
  if (neg) retention -= 25;
  if ([0, 4, 8].includes(lastDigit)) retention -= 15;
  retention = Math.max(25, Math.min(99, retention));

  return {
    rawDigits: raw4,
    totalSum: sum,
    rootVibration: root,
    lastDigit,
    pairs,
    retentionScore: retention,
    verdictEn: retention >= 75
      ? 'Auspicious Financial Retention: Terminal digits lock incoming prosperity and close conversations on magnetic terms.'
      : 'Vulnerable Energy Seal: Ending numbers trigger money leakage or delayed agreement finalizing.',
    verdictBn: retention >= 75
      ? 'উচ্চ ধন ধারণ ক্ষমতা: শেষ সংখ্যাগুলি অর্থ সঞ্চয় ও কথোপকথনের সফল সমাপ্তি নিশ্চিত করে।'
      : 'অর্থ ক্ষরণের ঝুঁকি: শেষ সংখ্যাগুলি আর্থিক স্থায়িত্বে বাধা ও চুক্তি নিষ্পত্তিতে বিলম্ব ঘটায়।'
  };
}

function analyzeMobileNumber(mobileStr) {
  const clean = mobileStr.replace(/\D/g, '');
  let sum = 0;
  for (let ch of clean) sum += parseInt(ch, 10) || 0;
  const root = reduceToSingle(sum) || 1;

  const pairsFound = [];
  let dhanCount = 0;
  let topPickCount = 0;
  let primNegCount = 0;
  let moneyBlockCount = 0;
  let troubleCount = 0;

  for (let i = 0; i < clean.length - 1; i++) {
    const p = clean.substring(i, i + 2);
    const info = PAIR_INTERPRETATIONS[p];
    const isDhan = DHAN_YOG_PAIRS.includes(p);
    const isTop = PRIMARY_TOP_PICKS.includes(p);
    const isNeg = PRIMARY_NEGATIVE_PAIRS.includes(p);
    const isMoney = MONEY_BLOCK_PAIRS.includes(p);
    const isTrouble = TROUBLESOME_PAIRS.includes(p);

    if (isDhan) dhanCount++;
    if (isTop) topPickCount++;
    if (isNeg) primNegCount++;
    if (isMoney) moneyBlockCount++;
    if (isTrouble) troubleCount++;

    if (info) {
      pairsFound.push({
        pair: p,
        category: info.category,
        action: info.action,
        descEn: info.descEn,
        descBn: info.descBn,
        isDhanYog: isDhan,
        isTopPick: isTop,
        isNegative: isNeg || isMoney || isTrouble
      });
    } else if (isTrouble) {
      pairsFound.push({
        pair: p,
        category: 'Unfavourable (Troublesome)',
        action: 'Avoid',
        descEn: 'Volatile vibration causing sudden friction or delayed results.',
        descBn: 'অস্থির কম্পন যা কাজে বাধা ও দেরিতে ফল প্রদান করে।',
        isDhanYog: false,
        isTopPick: false,
        isNegative: true
      });
    }
  }

  const lastDigit = clean.length > 0 ? parseInt(clean[clean.length - 1], 10) : 0;
  let score = 70 + (dhanCount * 14) + (topPickCount * 10) - (primNegCount * 18) - (moneyBlockCount * 12) - (troubleCount * 8);
  if ([5, 6, 9].includes(lastDigit)) score += 6;
  if ([0, 4, 8].includes(lastDigit)) score -= 10;
  score = Math.max(20, Math.min(99, score));

  const terminal4 = analyzeTerminal4Digits(clean);

  return {
    clean,
    totalSum: sum,
    rootVibration: root,
    lastDigit,
    pairsFound,
    dhanCount,
    topPickCount,
    primNegCount,
    moneyBlockCount,
    troubleCount,
    score,
    terminal4,
    verdictEn: score >= 75
      ? 'Highly Harmonious VIP Vibration (Dhan Yog activated)'
      : score >= 50
      ? 'Moderate Vibrational Equilibrium (Selective remedial tuning recommended)'
      : 'Harsh Vibrational Friction Detected (Transition or remedial card advisable)',
    verdictBn: score >= 75
      ? 'অত্যন্ত শুভ ভিআইপি কম্পন (ধনযোগ সক্রিয়)'
      : score >= 50
      ? 'মাঝারি কম্পন (সঠিক প্রতিকারের মাধ্যমে ফল বৃদ্ধি সম্ভব)'
      : 'ক্ষতিকর সংঘাতময় কম্পন (নম্বর পরিবর্তন বা উপযুক্ত প্রতিকার বাঞ্ছনীয়)'
  };
}
