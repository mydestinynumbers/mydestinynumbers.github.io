/**
 * ASTRO GOUTAM INC - Client Controller (Standalone Reference Application)
 * Strict implementation of 81-Combination Engine, Lo-Shu Missing Crystals (Section A),
 * Purpose Crystals (Section B), and Mobile Master with Terminal 4 Digits.
 */

let currentLang = 'en';
let lastActiveUserData = null;
let currentHoraryQueryKey = 'general_wish';
let currentHoraryData = null;

// Attached Google Apps Script Webhook URL for Google Sheet
const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbySsrIQMih0DboKujNZRdtIHLc_9epziUX5D7Pe96A-U_pfXLbevp24uMPnEEW_-UG5/exec';

function showFormError(msg) {
  let errBox = document.getElementById('formErrorBanner');
  if (!errBox) {
    errBox = document.createElement('div');
    errBox.id = 'formErrorBanner';
    errBox.style.cssText = 'background:rgba(225,29,72,0.22); border:1.5px solid #f43f5e; color:#fecdd3; padding:0.75rem 1rem; border-radius:0.75rem; margin-bottom:1.25rem; font-size:0.85rem; display:flex; align-items:center; gap:0.5rem; box-shadow:0 4px 14px rgba(0,0,0,0.4);';
    const form = document.getElementById('astroForm');
    if (form && form.parentNode) {
      form.parentNode.insertBefore(errBox, form);
    }
  }
  errBox.innerHTML = `⚠️ <span>${esc(msg)}</span>`;
  errBox.style.display = 'flex';
  errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function clearFormError() {
  const errBox = document.getElementById('formErrorBanner');
  if (errBox) errBox.style.display = 'none';
}

document.getElementById('langToggle')?.addEventListener('click', function () {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  this.innerText = currentLang === 'en' ? 'EN / বাংলা' : 'বাংলা / EN';
  
  // Real-time update of Horary card without page reload or submit
  if (currentHoraryData && document.getElementById('horaryPrashnaCard')) {
    const cardEl = document.getElementById('horaryPrashnaCard');
    const newHtml = renderHoraryQuery(currentHoraryData, currentLang === 'bn');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHtml;
    if (tempDiv.firstElementChild) {
      cardEl.parentNode.replaceChild(tempDiv.firstElementChild, cardEl);
    }
  }

  // Real-time update of 4-Pillar Blueprint without page reload or submit
  if (lastActiveUserData && document.getElementById('consolidatedRemediesCard')) {
    const cardEl = document.getElementById('consolidatedRemediesCard');
    const isBn = currentLang === 'bn';
    const innerRemedies = renderConsolidatedRemedies(
      { mulank: lastActiveUserData.mulank, bhagyank: lastActiveUserData.bhagyank },
      lastActiveUserData.comb81,
      lastActiveUserData.selectedConcerns,
      isBn
    );
    cardEl.outerHTML = `
      <div id="consolidatedRemediesCard" class="metric-card consolidated-remedies-card" style="margin-bottom:1.5rem; border:2px solid #dfb15b; background:rgba(2,32,25,0.85);">
        <div style="border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:0.5rem; margin-bottom:1rem;">
          <span style="font-size:0.7rem; color:#fef08a; font-family:'Cinzel',serif; text-transform:uppercase;">
            ${isBn ? 'সার্বিক প্রতিকার স্তম্ভ · ৪-পিলার সমন্বয়' : 'Harmonizing Matrix · 4-Pillar Cosmic Blueprint'}
          </span>
          <h3 class="crystal-title" style="font-size:1.3rem; margin-top:0.2rem;">
            ${isBn ? '৪-স্তম্ভ সার্বিক প্রতিকার ও শুভ কম্পন নির্দেশনা' : '4-Pillar Harmonizing Blueprint (Crystals, Gems, Scents & Diet)'}
          </h3>
          <p style="font-size:0.75rem; color:#a7f3d0;">
            ${isBn ? 'আপনার জন্মতারিখ ও মূলাঙ্ক-ভাগ্যাঙ্কের কম্পন অনুযায়ী ক্রিস্টাল, রত্ন, সুগন্ধি ও খাদ্য প্রতিবিধান।' : 'Precision vibration alignment covering lucky crystals, planetary gemstones, sacred scents, and dietary harmonizers.'}
          </p>
        </div>
        ${innerRemedies}
      </div>
    `;
  }
});

const sampleBtn = document.getElementById('btnFillSample');
if (sampleBtn) {
  sampleBtn.addEventListener('click', function () {
    document.getElementById('fullName').value = 'Rajesh Sharma';
    document.getElementById('day').value = '28';
    document.getElementById('month').value = '5';
    document.getElementById('year').value = '1988';
    document.getElementById('mobile').value = '9830129237';
    document.getElementById('profession').value = 'Business & Entrepreneurship';
    document.getElementById('companyName').value = 'Stellar Apex Global Ventures';
    document.getElementById('vehicleDigits').value = '5427';
    document.getElementById('astroForm').dispatchEvent(new Event('submit'));
  });
}

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderConsolidatedRemedies(d, combo, purposes, isBn){
  if (typeof isBn === 'undefined') {
    isBn = (typeof currentLang !== 'undefined' && currentLang === 'bn');
  }
  const rootCryst = (window.ROOT_CRYSTALS && window.ROOT_CRYSTALS[d.mulank]) || {};
  const luckyGems = combo.lucky_gems || 'Yellow Sapphire / Blue Sapphire (as per expert recommendation)';
  const scent = (window.NUMEROLOGY_SCENTS && window.NUMEROLOGY_SCENTS[d.mulank]) || {};
  const health = (window.PLANETARY_HEALTH && window.PLANETARY_HEALTH[d.mulank]) || {};

  let purposeListBN = [];
  let purposeListEN = [];
  if(purposes && purposes.length){
    purposes.forEach(p => {
      const pc = (window.PURPOSE_CRYSTALS && window.PURPOSE_CRYSTALS[p]) ||
                 (typeof PURPOSE_CRYSTALS !== 'undefined' && PURPOSE_CRYSTALS[p]) ||
                 (typeof p === 'object' ? p : null);
      if(pc){
        purposeListBN.push(`• <b>${esc(pc.purposeBn || pc.id || p)}:</b> <span style="color:#ffd700;">${esc(pc.crystal || pc.crystalOrBracelet)}</span>`);
        purposeListEN.push(`• <b>${esc(pc.purposeEn || pc.id || p)}:</b> <span style="color:#ffd700;">${esc(pc.crystal || pc.crystalOrBracelet)}</span>`);
      }
    });
  }

  if (isBn) {
    return `
      <div style="padding: 4px 0;">
        <!-- BENGALI HORIZONTAL BLUEPRINT -->
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
            <span style="background:rgba(212,175,55,0.2); color:#ffd700; font-size:11px; font-weight:900; padding:3px 10px; border-radius:15px; border:1px solid #ffd700;">বাংলা সংস্করণ</span>
            <span style="color:#ffffff; font-size:15px; font-weight:800;">১. বাংলা ভাষায় সার্বিক প্রতিকার ও শুভ নির্দেশনা (4-Pillar Harmonizing Blueprint)</span>
          </div>
          <p style="color:#cbd5e1; font-size:13px; margin-bottom:12px;">
            আপনার জন্মতারিখ (মূলাঙ্ক ${d.mulank}, ভাগ্যাঙ্ক ${d.bhagyank}) অনুযায়ী ৪টি মূল প্রতিকারের স্তম্ভ:
          </p>
          <div class="remedy-horizontal-grid">
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">🔮 Lucky Crystals &amp; Bracelets</div>
                <div class="remedy-col-val">${esc(rootCryst.crystal || 'Citrine / Clear Quartz')}</div>
                <div class="remedy-col-desc">${esc(rootCryst.benefit || 'মানসিক শক্তি ও আত্মবিশ্বাস বৃদ্ধি করে।')}</div>
              </div>
              ${purposeListBN.length ? `<div style="margin-top:10px; font-size:11.5px; border-top:1px dashed rgba(212,175,55,0.3); padding-top:6px;"><b style="color:#ffd700;">লক্ষ্যভিত্তিক:</b><br>${purposeListBN.join('<br>')}</div>` : ''}
            </div>
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">💍 Auspicious Gemstone</div>
                <div class="remedy-col-val">${esc(luckyGems)}</div>
                <div class="remedy-col-desc">শুভ বার ও তিথিতে উপযুক্ত ধাতুতে পরিধান করলে গ্রহের শক্তি বৃদ্ধি পায়।</div>
              </div>
            </div>
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">🌸 Lucky Scents &amp; Aroma</div>
                <div class="remedy-col-val">${esc(scent.scents || 'Sandalwood, Rose, Jasmine')}</div>
                <div class="remedy-col-desc">${esc(scent.benefit || 'আভা বা অরা শক্তিশালী করে এবং মানসিক শান্তি দেয়।')}</div>
              </div>
            </div>
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">🌿 Dietary Harmonizers</div>
                <div class="remedy-col-val" style="font-size:13.5px;">${esc(health.foods || 'Herbal tea, citrus, ginger, barley')}</div>
                <div class="remedy-col-desc">শারীরিক ভারসাম্য ও জীবনীশক্তি বজায় রাখতে সহায়ক।</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    return `
      <div style="padding: 4px 0;">
        <!-- ENGLISH HORIZONTAL BLUEPRINT -->
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
            <span style="background:rgba(212,175,55,0.2); color:#ffd700; font-size:11px; font-weight:900; padding:3px 10px; border-radius:15px; border:1px solid #ffd700;">ENGLISH EDITION</span>
            <span style="color:#ffffff; font-size:15px; font-weight:800;">2. Complete Remedial Harmonizing Blueprint (4-Pillar Analysis)</span>
          </div>
          <p style="color:#cbd5e1; font-size:13px; margin-bottom:12px;">
            Comprehensive 4-pillar harmonization based on Mulank ${d.mulank} and Bhagyank ${d.bhagyank}:
          </p>
          <div class="remedy-horizontal-grid">
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">🔮 Lucky Crystals &amp; Bracelets</div>
                <div class="remedy-col-val">${esc(rootCryst.crystal || 'Citrine / Clear Quartz')}</div>
                <div class="remedy-col-desc">${esc(rootCryst.benefitEn || 'Amplifies personal magnetism and mental focus.')}</div>
              </div>
              ${purposeListEN.length ? `<div style="margin-top:10px; font-size:11.5px; border-top:1px dashed rgba(212,175,55,0.3); padding-top:6px;"><b style="color:#ffd700;">Focus Remedies:</b><br>${purposeListEN.join('<br>')}</div>` : ''}
            </div>
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">💍 Auspicious Gemstone</div>
                <div class="remedy-col-val">${esc(luckyGems)}</div>
                <div class="remedy-col-desc">Wear in auspicious metal on planetary ruling day for maximum vibration.</div>
              </div>
            </div>
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">🌸 Lucky Scents &amp; Aroma</div>
                <div class="remedy-col-val">${esc(scent.scents || 'Sandalwood, Rose, Jasmine')}</div>
                <div class="remedy-col-desc">${esc(scent.benefitEn || 'Enhances positive aura and mental clarity.')}</div>
              </div>
            </div>
            <div class="remedy-col-card">
              <div>
                <div class="remedy-col-title">🌿 Dietary Harmonizers</div>
                <div class="remedy-col-val" style="font-size:13.5px;">${esc(health.foods || 'Herbal tea, citrus, ginger, barley')}</div>
                <div class="remedy-col-desc">${esc(health.benefitEn || 'Supports physical vigor and planetary biological alignment.')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * ASTRO-HORARY PRASHNA ENGINE (Instant Horary Query & House Triad Analysis)
 * Performs real-time time-based astronomical-horary evaluation using:
 * - Query moment (Hours, Minutes, Seconds, Day of week)
 * - Question Archetype & Primary House Lord (Karya Bhava)
 * - Supporting House (Sahaya Bhava)
 * - Resolution & Fruit House (Phala / Siddhi Bhava)
 * - Lagna & Sub-Lord Numerical Reductions
 */
const HORARY_QUESTIONS = {
  career_job: {
    id: 'career_job',
    titleEn: 'Job Promotion / Career Advancement Query',
    titleBn: 'কর্মজীবন ও পদোন্নতি বিষয়ক প্রশ্ন',
    houses: [10, 6, 11], // 10th (Karma/Authority), 6th (Service/Competitive Victory), 11th (Fulfillment of Gains)
    primaryHouse: 10,
    supportingHouse: 6,
    resolutionHouse: 11,
    focusEn: 'Professional elevation, interview breakthrough, authority, and recognition.',
    focusBn: 'পেশাগত উন্নতি, ইন্টারভিউতে সাফল্য, পদোন্নতি ও সামাজিক সম্মান।'
  },
  financial_gain: {
    id: 'financial_gain',
    titleEn: 'Financial Liquidity & Debt Recovery Query',
    titleBn: 'আর্থিক স্বচ্ছলতা ও বকেয়া অর্থ উদ্ধার প্রশ্ন',
    houses: [2, 11, 5], // 2nd (Dhana), 11th (Labha), 5th (Purva Punya/Windfall)
    primaryHouse: 2,
    supportingHouse: 11,
    resolutionHouse: 5,
    focusEn: 'Monetary inflow, asset liquidity, clearing bad loans, and steady wealth accumulation.',
    focusBn: 'অর্থপ্রবাহ, পাওনা টাকা ফেরত, আর্থিক স্থায়িত্ব ও নতুন আয়ের উৎস সৃষ্টি।'
  },
  business_success: {
    id: 'business_success',
    titleEn: 'Business Expansion & Partnership Query',
    titleBn: 'ব্যবসায়িক উদ্যোগ ও অংশীদারি প্রশ্ন',
    houses: [7, 10, 11], // 7th (Business/Partners), 10th (Commerce/Trade), 11th (Profit realization)
    primaryHouse: 7,
    supportingHouse: 10,
    resolutionHouse: 11,
    focusEn: 'New venture viability, commercial alliances, vendor agreements, and trade expansion.',
    focusBn: 'নতুন ব্যবসার সূচনা, অংশীদারি চুক্তি, পণ্য বিক্রয় ও ব্যবসায়িক মুনাফা অর্জন।'
  },
  marriage_love: {
    id: 'marriage_love',
    titleEn: 'Marriage Proposal & Romantic Harmony Query',
    titleBn: 'বিবাহ প্রস্তাব ও দাম্পত্য সম্পর্ক প্রশ্ন',
    houses: [7, 2, 11], // 7th (Spouse/Union), 2nd (Family additions), 11th (Joyful fulfillment)
    primaryHouse: 7,
    supportingHouse: 2,
    resolutionHouse: 11,
    focusEn: 'Matrimonial proposal confirmation, emotional bonding, and domestic concord.',
    focusBn: 'বিবাহ সম্বন্ধ স্থির হওয়া, পারিবারিক সম্মতি ও দীর্ঘস্থায়ী প্রেমের সম্পর্ক।'
  },
  travel_relocation: {
    id: 'travel_relocation',
    titleEn: 'Foreign Travel & Relocation Query',
    titleBn: 'বিদেশ যাত্রা ও স্থান পরিবর্তন প্রশ্ন',
    houses: [9, 3, 12], // 9th (Long distance/Fortune), 3rd (Movement), 12th (Foreign soil)
    primaryHouse: 9,
    supportingHouse: 3,
    resolutionHouse: 12,
    focusEn: 'Visa clearance, immigration approvals, foreign university/job assignments.',
    focusBn: 'ভিসা ও পাসপোর্ট সংক্রান্ত অনুমোদন, স্থানান্তর ও দূরবর্তী স্থানে ভাগ্যোন্নয়ন।'
  },
  health_recovery: {
    id: 'health_recovery',
    titleEn: 'Health Recovery & Vitality Query',
    titleBn: 'শারীরিক আরোগ্য ও স্বাস্থ্য পুনরুদ্ধার প্রশ্ন',
    houses: [1, 5, 11], // 1st (Vital body), 5th (Recovery/Cure), 11th (Victory over disease)
    primaryHouse: 1,
    supportingHouse: 5,
    resolutionHouse: 11,
    focusEn: 'Cellular revitalization, diagnosis accuracy, medical recovery, and longevity.',
    focusBn: 'রোগমুক্তি, সঠিক চিকিৎসা নির্বাচন, মানসিক শান্তি ও শারীরিক তেজ পুনরুদ্ধার।'
  },
  property_asset: {
    id: 'property_asset',
    titleEn: 'Real Estate & Property Deal Query',
    titleBn: 'জমি, বাড়ি ও স্থাবর সম্পত্তি ক্রয় প্রশ্ন',
    houses: [4, 11, 2], // 4th (Land/Vehicle), 11th (Gain), 2nd (Financing/Asset)
    primaryHouse: 4,
    supportingHouse: 11,
    resolutionHouse: 2,
    focusEn: 'Clear land title, home loan approval, possession handover, and vastu suitability.',
    focusBn: 'জায়গা-জমির দলিল নিষ্পত্তি, গৃহঋণ প্রাপ্তি ও নির্বিঘ্নে সম্পত্তি লাভ।'
  },
  court_dispute: {
    id: 'court_dispute',
    titleEn: 'Legal Dispute & Competitive Victory Query',
    titleBn: 'আইনি মামলা ও বিরোধ নিষ্পত্তি প্রশ্ন',
    houses: [6, 1, 11], // 6th (Litigation/Opponents), 1st (Personal strength), 11th (Victory)
    primaryHouse: 6,
    supportingHouse: 1,
    resolutionHouse: 11,
    focusEn: 'Court litigation closure, competitive edge over rivals, arbitration success.',
    focusBn: 'আইনি জয়, প্রতিপক্ষের ওপর প্রাধান্য বিস্তার ও সমঝোতার মাধ্যমে বিরোধের অবসান।'
  },
  general_wish: {
    id: 'general_wish',
    titleEn: 'Heartfelt Endeavor & Wish Manifestation Query',
    titleBn: 'মনস্কামনা পূরণ ও সিদ্ধি লাভ প্রশ্ন',
    houses: [11, 9, 1], // 11th (Siddhi), 9th (Bhagya), 1st (Self)
    primaryHouse: 11,
    supportingHouse: 9,
    resolutionHouse: 1,
    focusEn: 'Realization of heartfelt aspirations, serendipitous breaks, and karmic timing.',
    focusBn: 'আকাঙ্ক্ষিত স্বপ্নপূরণ, ভাগ্যের অকস্মাৎ সহায়তা ও শুভ শক্তির জাগরণ।'
  }
};

const HOUSE_LORE = {
  1: { nameEn: '1st House (Tanu Bhava)', nameBn: '১ম ভাব (তনু ভাব)', planetEn: 'Sun & Mars', planetBn: 'সূর্য ও মঙ্গল', energyEn: 'Vitality, Willpower & Decisiveness', energyBn: 'শারীরিক তেজ, ইচ্ছাশক্তি ও সংকল্প' },
  2: { nameEn: '2nd House (Dhana Bhava)', nameBn: '২য় ভাব (ধন ভাব)', planetEn: 'Jupiter & Venus', planetBn: 'বৃহস্পতি ও শুক্র', energyEn: 'Liquid Assets & Family Accord', energyBn: 'সঞ্চিত ধন ও পারিবারিক ঐক্য' },
  3: { nameEn: '3rd House (Sahaja Bhava)', nameBn: '৩য় ভাব (সহজ ভাব)', planetEn: 'Mars & Mercury', planetBn: 'মঙ্গল ও বুধ', energyEn: 'Valour, Initiative & Short Travel', energyBn: 'উদ্যম, ক্ষিপ্রতা ও যোগাযোগ' },
  4: { nameEn: '4th House (Sukha Bhava)', nameBn: '৪র্থ ভাব (সুখ ভাব)', planetEn: 'Moon & Venus', planetBn: 'চন্দ্র ও শুক্র', energyEn: 'Domestic Peace & Fixed Assets', energyBn: 'গৃহসুখ, স্থাবর সম্পত্তি ও স্থায়িত্ব' },
  5: { nameEn: '5th House (Putra Bhava)', nameBn: '৫ম ভাব (পুত্র ও বুদ্ধি ভাব)', planetEn: 'Jupiter & Sun', planetBn: 'বৃহস্পতি ও সূর্য', energyEn: 'Creative Intellect & Divine Grace', energyBn: 'প্রজ্ঞা, পূর্বপুণ্য ও শুভ বুদ্ধি' },
  6: { nameEn: '6th House (Shatru Bhava)', nameBn: '৬ষ্ঠ ভাব (রিপু ও রোগ ভাব)', planetEn: 'Mars & Saturn', planetBn: 'মঙ্গল ও শনি', energyEn: 'Competitive Victory & Effort', energyBn: 'প্রতিযোগিতায় বিজয় ও অধ্যবসায়' },
  7: { nameEn: '7th House (Kalatra Bhava)', nameBn: '৭ম ভাব (কলত্র ভাব)', planetEn: 'Venus & Mercury', planetBn: 'শুক্র ও বুধ', energyEn: 'Partnership & Commercial Contracts', energyBn: 'অংশীদারি, গ্রাহক ও দাম্পত্য' },
  8: { nameEn: '8th House (Ayur Bhava)', nameBn: '৮ম ভাব (আয়ু ভাব)', planetEn: 'Saturn & Rahu', planetBn: 'শনি ও রাহু', energyEn: 'Transformation & Sudden Shifts', energyBn: 'গূঢ় রূপান্তর ও পরিবর্তন' },
  9: { nameEn: '9th House (Bhagya Bhava)', nameBn: '৯ম ভাব (ভাগ্য ভাব)', planetEn: 'Jupiter & Sun', planetBn: 'বৃহস্পতি ও সূর্য', energyEn: 'Fortune, Righteousness & Expansion', energyBn: 'দৈব কৃপা, ধর্ম ও ভাগ্যোন্নতি' },
  10: { nameEn: '10th House (Karma Bhava)', nameBn: '১০ম ভাব (কর্ম ভাব)', planetEn: 'Sun, Saturn & Mercury', planetBn: 'সূর্য, শনি ও বুধ', energyEn: 'Authority, Career & Social Status', energyBn: 'প্রশাসনিক নেতৃত্ব, কর্ম ও যশ' },
  11: { nameEn: '11th House (Labha Bhava)', nameBn: '১১শ ভাব (লাভ ভাব)', planetEn: 'Jupiter & Saturn', planetBn: 'বৃহস্পতি ও শনি', energyEn: 'Fulfillment, Net Profits & Success', energyBn: 'চূড়ান্ত মনস্কামনা পূরণ ও সিদ্ধি' },
  12: { nameEn: '12th House (Vyaya Bhava)', nameBn: '১২শ ভাব (ব্যয় ও মোক্ষ ভাব)', planetEn: 'Saturn & Ketu', planetBn: 'শনি ও কেতু', energyEn: 'Foreign Shore, Detachment & Release', energyBn: 'দূরবর্তী স্থান, ত্যাগ ও আধ্যাত্মিকতা' }
};

function calculateHoraryAnalysis(queryKey, userMulank, userBhagyank) {
  const q = HORARY_QUESTIONS[queryKey] || HORARY_QUESTIONS.general_wish;
  const now = new Date();
  const hrs = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();

  // Prashna Lagna Degree equivalent calculation: (Hours * 60 + Minutes) mod 360
  const totalMinutes = hrs * 60 + mins;
  const timeRoot = reduceToSingle(hrs + mins + secs);
  const prashnaSeed = reduceToSingle(totalMinutes + (userMulank || 1) + (userBhagyank || 1));

  // Determine Primary, Supporting, and Resolution House Vibrations
  const h1 = q.primaryHouse;
  const h2 = q.supportingHouse;
  const h3 = q.resolutionHouse;

  // House Strengths calculated dynamically from real time roots
  const score1 = ((hrs * 7 + h1 * 9 + secs) % 25) + 75; // 75-99%
  const score2 = ((mins * 5 + h2 * 11 + timeRoot) % 25) + 72; // 72-96%
  const score3 = ((prashnaSeed * 13 + h3 * 7 + mins) % 26) + 74; // 74-99%

  const compositeScore = Math.round((score1 * 0.4) + (score2 * 0.3) + (score3 * 0.3));

  let verdictEn = '';
  let verdictBn = '';
  let statusBadge = '';
  let adviceEn = '';
  let adviceBn = '';

  if (compositeScore >= 88) {
    statusBadge = 'PROMPT_FAVORABLE';
    verdictEn = 'Highly Favorable (Uttama Siddhi) · Rapid Positive Manifestation';
    verdictBn = 'পরম অনুকূল (উত্তম সিদ্ধি) · দ্রুত শুভ ফল প্রাপ্তির যোগ';
    adviceEn = 'Planetary house triad indicates seamless alignment. Take decisive action within the next 3 to 11 days with full confidence.';
    adviceBn = 'গ্রহীয় ভাবত্রয় অত্যন্ত শক্তিশালী। পরবর্তী ৩ থেকে ১১ দিনের মধ্যে ইতিবাচক পদক্ষেপ গ্রহণ করুন, সাফল্য অবধারিত।';
  } else if (compositeScore >= 78) {
    statusBadge = 'FAVORABLE_EFFORT';
    verdictEn = 'Favorable through Structured Effort · Steady Forward Progress';
    verdictBn = 'অনুকূল ফলপ্রসূ · সুশৃঙ্খল চেষ্টার মাধ্যমে সাফল্য';
    adviceEn = 'Progress is guaranteed; minor delays or negotiations in the supporting house are easily cleared through steady follow-through.';
    adviceBn = 'অগ্রগতি নিশ্চিত; ছোটখাটো বাধা বা বিলম্ব থাকলে তা ধৈর্য ও সঠিক আলোচনার মাধ্যমে সহজেই সমাধান হবে।';
  } else {
    statusBadge = 'CAUTION_REMEDY';
    verdictEn = 'Guarded Outcome · Requires Strategic Timing & Remedial Grounding';
    verdictBn = 'সতর্ক পদক্ষেপ আবশ্যক · সঠিক সময় ও প্রতিকার সহযোগে শুভ ফল';
    adviceEn = 'Wait for planetary shifts before signing binding documents; reinforce the governing house remedies before final commitment.';
    adviceBn = 'চূড়ান্ত চুক্তির আগে আরও কিছুটা সময় নিন; সংশ্লিষ্ট ভাবের শুভ প্রতিকার ধারণ করে অগ্রসর হওয়া যুক্তিযুক্ত।';
  }

  const timeFormatted = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return {
    query: q,
    timeFormatted,
    prashnaSeed,
    timeRoot,
    compositeScore,
    statusBadge,
    verdictEn,
    verdictBn,
    adviceEn,
    adviceBn,
    triad: [
      {
        roleEn: '1. Primary Subject House (Karya Bhava)',
        roleBn: '১. প্রধান কার্য ভাব (Karya Bhava)',
        houseNum: h1,
        details: HOUSE_LORE[h1],
        score: score1,
        statusEn: score1 >= 85 ? 'Strongly Fortified' : 'Active & Responsive',
        statusBn: score1 >= 85 ? 'বলিষ্ঠ ও সক্রিয়' : 'অনুকূল প্রতিক্রিয়াশীল'
      },
      {
        roleEn: '2. Supporting Sustaining House (Sahaya Bhava)',
        roleBn: '২. সহায়ক পোষণ ভাব (Sahaya Bhava)',
        houseNum: h2,
        details: HOUSE_LORE[h2],
        score: score2,
        statusEn: score2 >= 85 ? 'Highly Harmonious' : 'Supportive Flow',
        statusBn: score2 >= 85 ? 'দৃঢ় সহায়তাকারী' : 'স্থিতিশীল সহায়ক'
      },
      {
        roleEn: '3. Final Resolution House (Phala / Siddhi Bhava)',
        roleBn: '৩. ফলপ্রসূ পরিণতি ভাব (Siddhi Bhava)',
        houseNum: h3,
        details: HOUSE_LORE[h3],
        score: score3,
        statusEn: score3 >= 85 ? 'Victory & Completion' : 'Satisfactory Outcome',
        statusBn: score3 >= 85 ? 'পূর্ণ সিদ্ধি ও সফলতা' : 'সন্তোষজনক সমাপ্তি'
      }
    ]
  };
}

function renderHoraryQuery(horaryData, isBn) {
  if (!horaryData) return '';

  const q = horaryData.query || HORARY_QUESTIONS[horaryData.queryKey] || HORARY_QUESTIONS.general_wish;
  const isEn = !isBn;
  const currentKey = q.id || 'general_wish';

  return `
    <div id="horaryPrashnaCard" class="metric-card" style="margin-bottom:1.5rem; border:2px solid #dfb15b; background:rgba(2,32,25,0.95); box-shadow:0 8px 25px rgba(0,0,0,0.5);">
      <!-- Header -->
      <div style="border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:0.75rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
            <span style="background:rgba(212,175,55,0.2); color:#ffd700; font-size:10px; font-weight:800; padding:2px 8px; border-radius:12px; border:1px solid #ffd700; text-transform:uppercase;">
              ${isEn ? 'Astro-Horary Prashna' : 'বৈদিক প্রশ্ন কুষ্ঠি (হোয়ারারি)'}
            </span>
            <span style="color:#a7f3d0; font-size:11px; font-family:monospace;">
              ${isEn ? 'Query Moment' : 'প্রশ্নের সময়'}: ${horaryData.timeFormatted} (Seed: ${horaryData.prashnaSeed})
            </span>
            <span style="background:#02241d; color:#dfb15b; font-size:10.5px; padding:2px 7px; border-radius:10px; border:1px solid rgba(223,177,91,0.4);">
              ${isEn ? 'ENGLISH EDITION' : 'বাংলা সংস্করণ'}
            </span>
          </div>
          <h3 class="crystal-title" style="font-size:1.25rem; margin-top:0.25rem;">
            ${isEn ? q.titleEn : q.titleBn}
          </h3>
          <p style="font-size:0.75rem; color:#d1fae5; margin-top:0.2rem;">
            ${isEn ? q.focusEn : q.focusBn}
          </p>

          <!-- Interactive Question Switcher & Real-time Recalculate -->
          <div style="margin-top:0.75rem; display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
            <label style="font-size:0.75rem; color:#fef08a; font-weight:600; font-family:'Cinzel',serif;">
              ${isEn ? 'Ask Another Question:' : 'প্রশ্ন পরিবর্তন করুন:'}
            </label>
            <select id="cardHorarySelect" onchange="window.updateHoraryInCard(this.value)" style="background:#011e17; color:#ffd700; border:1.5px solid rgba(223,177,91,0.6); border-radius:6px; padding:4px 8px; font-size:0.78rem; outline:none; cursor:pointer; font-weight:600; max-width:320px;">
              <option value="general_wish" ${currentKey === 'general_wish' ? 'selected' : ''}>${isEn ? '🌟 General Wish Fulfillment' : '🌟 সাধারণ মনস্কামনা পূরণ'}</option>
              <option value="career_job" ${currentKey === 'career_job' ? 'selected' : ''}>${isEn ? '💼 Job / Promotion / Career' : '💼 চাকরি ও কর্মজীবন'}</option>
              <option value="financial_gain" ${currentKey === 'financial_gain' ? 'selected' : ''}>${isEn ? '💰 Financial Growth & Debt Recovery' : '💰 ধনলাভ ও বকেয়া অর্থ উদ্ধার'}</option>
              <option value="business_success" ${currentKey === 'business_success' ? 'selected' : ''}>${isEn ? '📈 Business Expansion & Venture' : '📈 নতুন ব্যবসা ও অংশীদারি'}</option>
              <option value="marriage_love" ${currentKey === 'marriage_love' ? 'selected' : ''}>${isEn ? '💍 Marriage & Romantic Harmony' : '💍 বিবাহ ও সম্পর্ক'}</option>
              <option value="travel_relocation" ${currentKey === 'travel_relocation' ? 'selected' : ''}>${isEn ? '✈️ Foreign Travel & Visa' : '✈️ বিদেশ যাত্রা ও ভিসা'}</option>
              <option value="health_recovery" ${currentKey === 'health_recovery' ? 'selected' : ''}>${isEn ? '🌿 Health Recovery & Vitality' : '🌿 রোগমুক্তি ও সুস্বাস্থ্য'}</option>
              <option value="property_asset" ${currentKey === 'property_asset' ? 'selected' : ''}>${isEn ? '🏛️ Property & Real Estate Deal' : '🏛️ জমি-বাড়ি ও স্থাবর সম্পত্তি'}</option>
              <option value="court_dispute" ${currentKey === 'court_dispute' ? 'selected' : ''}>${isEn ? '⚖️ Legal Dispute & Victory' : '⚖️ আইনি বিরোধ ও মামলা জয়'}</option>
            </select>
            <button type="button" onclick="window.refreshHoraryMoment()" style="background:#043327; color:#a7f3d0; border:1px solid #10b981; border-radius:6px; padding:4px 10px; font-size:0.75rem; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:4px; box-shadow:0 2px 6px rgba(0,0,0,0.3);">
              ↻ ${isEn ? 'Recalculate Moment' : 'সময় পুনর্গণনা'}
            </button>
          </div>
        </div>

        <div style="background:#011e17; border:2px solid #dfb15b; border-radius:0.75rem; padding:0.6rem 1.25rem; text-align:center;">
          <span style="font-size:0.65rem; color:#fef08a; text-transform:uppercase; display:block; font-family:monospace;">
            ${isEn ? 'Siddhi Probability' : 'সিদ্ধি সম্ভাবনা সূচক'}
          </span>
          <span style="font-size:1.6rem; font-weight:800; color:#ffd700; font-family:'Cinzel',serif;">
            ${horaryData.compositeScore}%
          </span>
        </div>
      </div>

      <!-- Verdict Banner -->
      <div style="background:rgba(1,27,21,0.85); border:1px solid rgba(223,177,91,0.35); border-radius:0.75rem; padding:0.85rem 1rem; margin-bottom:1.2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.4rem;">
          <strong style="color:#dfb15b; font-size:0.95rem; font-family:'Cinzel',serif;">
            ${isEn ? '✨ Instant Horary Verdict:' : '✨ তাৎক্ষণিক প্রশ্ন ফলাফল:'}
          </strong>
          <span style="background:${horaryData.compositeScore >= 88 ? 'rgba(16,185,129,0.25)' : 'rgba(217,119,6,0.25)'}; color:${horaryData.compositeScore >= 88 ? '#6ee7b7' : '#fde047'}; border:1px solid ${horaryData.compositeScore >= 88 ? '#10b981' : '#d97706'}; font-size:0.75rem; font-weight:700; padding:2px 10px; border-radius:12px;">
            ${isEn ? horaryData.verdictEn : horaryData.verdictBn}
          </span>
        </div>
        <p style="color:#fef08a; font-size:0.82rem; line-height:1.45; margin:0;">
          <b>${isEn ? 'Key Action Guidance:' : 'প্রধান পরামর্শ'}:</b> ${isEn ? horaryData.adviceEn : horaryData.adviceBn}
        </p>
      </div>

      <!-- House Breakdown Triad -->
      <div>
        <h4 style="color:#ffd700; font-size:0.85rem; font-family:'Cinzel',serif; margin-bottom:0.65rem; text-transform:uppercase; letter-spacing:0.5px;">
          ${isEn ? '🏛️ 3-House Astrological Triad Evaluation (Karya, Sahaya & Siddhi)' : '🏛️ ৩-স্তম্ভ ভাব বিশ্লেষণ (কার্য, সহায়ক ও সিদ্ধি ভাব)'}
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem;">
          ${horaryData.triad.map(t => `
            <div style="background:#011a14; border:1px solid rgba(223,177,91,0.3); border-radius:0.65rem; padding:0.85rem; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                  <span style="font-size:0.7rem; color:#fef08a; font-weight:700;">
                    ${isEn ? t.roleEn : t.roleBn}
                  </span>
                  <span style="background:rgba(223,177,91,0.2); color:#ffd700; font-size:0.68rem; font-weight:700; padding:1px 6px; border-radius:8px;">
                    ${t.score}%
                  </span>
                </div>
                <strong style="color:#ffffff; font-size:0.95rem; display:block; margin-bottom:0.25rem;">
                  ${isEn ? (t.details ? t.details.nameEn : ('House ' + t.houseNum)) : (t.details ? t.details.nameBn : (t.houseNum + ' ভাব'))}
                </strong>
                <p style="color:#a7f3d0; font-size:0.75rem; margin-bottom:0.35rem; line-height:1.35;">
                  <b>${isEn ? 'Planetary Influences' : 'অধিপতি গ্রহ'}:</b> ${isEn ? (t.details ? t.details.planetEn : 'Natural Lord') : (t.details ? t.details.planetBn : 'অধিপতি')}
                </p>
                <p style="color:#d1fae5; font-size:0.74rem; line-height:1.4;">
                  ${isEn ? (t.details ? t.details.energyEn : '') : (t.details ? t.details.energyBn : '')}
                </p>
              </div>
              <div style="margin-top:0.65rem; padding-top:0.4rem; border-top:1px dashed rgba(223,177,91,0.2); font-size:0.7rem; color:#dfb15b; font-weight:600;">
                ✓ ${isEn ? t.statusEn : t.statusBn}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

window.updateHoraryInCard = function(queryKey) {
  currentHoraryQueryKey = queryKey || 'general_wish';
  const mulank = lastActiveUserData ? lastActiveUserData.mulank : 1;
  const bhagyank = lastActiveUserData ? lastActiveUserData.bhagyank : 1;
  currentHoraryData = calculateHoraryAnalysis(currentHoraryQueryKey, mulank, bhagyank);
  const cardEl = document.getElementById('horaryPrashnaCard');
  if (cardEl) {
    const newHtml = renderHoraryQuery(currentHoraryData, currentLang === 'bn');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = newHtml;
    if (tempDiv.firstElementChild) {
      cardEl.parentNode.replaceChild(tempDiv.firstElementChild, cardEl);
    }
  }
};

window.refreshHoraryMoment = function() {
  window.updateHoraryInCard(currentHoraryQueryKey);
};

document.getElementById('astroForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const isBn = currentLang === 'bn';
  const name = document.getElementById('fullName').value.trim();
  const day = parseInt(document.getElementById('day').value, 10);
  const month = parseInt(document.getElementById('month').value, 10);
  const year = parseInt(document.getElementById('year').value, 10);
  const mobile = document.getElementById('mobile').value.trim();
  const profession = document.getElementById('profession').value;
  const company = (document.getElementById('companyName')?.value || '').trim();
  const vehicle = (document.getElementById('vehicleDigits')?.value || '').trim();

  clearFormError();

  if (!name) {
    showFormError(isBn ? 'অনুগ্রহ করে আপনার সম্পূর্ণ নাম লিখুন।' : 'Please enter your Full Name.');
    return;
  }
  if (!mobile || mobile.replace(/\D/g, '').length < 10) {
    showFormError(isBn ? 'অনুগ্রহ করে ১০ ডিজিটের সঠিক মোবাইল নম্বর লিখুন।' : 'Please enter a valid 10-digit mobile number.');
    return;
  }
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    showFormError(isBn ? 'অনুগ্রহ করে জন্ম তারিখের দিন, মাস ও বছর প্রদান করুন।' : 'Please enter your complete Date of Birth (Day, Month, Year).');
    return;
  }
  if (!profession) {
    showFormError(isBn ? 'অনুগ্রহ করে আপনার পেশা নির্বাচন করুন।' : 'Please select your Profession.');
    return;
  }

  const agreePrivacy = document.getElementById('agreePrivacyPolicy')?.checked;
  if (!agreePrivacy) {
    showFormError(isBn
      ? 'রিপোর্ট তৈরি করতে অনুগ্রহ করে "I agree to store my details for consultation as per Privacy Policy" চেক বক্সে টিক দিন।'
      : 'Please tick the checkbox: "I agree to store my details for consultation as per Privacy Policy" to generate report.');
    const warnEl = document.getElementById('privacyWarningText');
    if (warnEl) warnEl.style.display = 'block';
    document.getElementById('agreePrivacyPolicy')?.focus();
    return;
  }

  // Partner DOB (optional)
  const pDay = parseInt(document.getElementById('pDay')?.value, 10);
  const pMonth = parseInt(document.getElementById('pMonth')?.value, 10);
  const pYear = parseInt(document.getElementById('pYear')?.value, 10);

  // Selected Concerns
  const selectedConcerns = Array.from(document.querySelectorAll('input[name="concerns"]:checked')).map(cb => cb.value);

  // 1. Mulank & Bhagyank
  const mulank = reduceToSingle(day);
  const bhagyank = reduceToSingle(day + month + year);

  // 2. 81 Mulank x Bhagyank Combination Master Engine
  const comb81 = get81Combination(mulank, bhagyank);

  // 3. Chaldean Name Analysis
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  let nameCompound = 0;
  const letterBreakdown = [];
  for (let ch of cleanName) {
    const val = CHALDEAN_MAP[ch] || 0;
    letterBreakdown.push({ ch, val });
    nameCompound += val;
  }
  const nameRoot = reduceToSingle(nameCompound);
  const nameOccult = COMPOUND_NUMBERS[nameCompound] || {
    titleEn: `Planetary Compound ${nameCompound}`,
    titleBn: `সংখ্যাতত্ত্ব কম্পাউন্ড ${nameCompound}`,
    verdictEn: 'Balanced',
    verdictBn: 'নিরপেক্ষ',
    textEn: `Resonates with planetary root ${nameRoot} (${PLANET_DATA[nameRoot]?.planetEn || 'Neutral'}). Harmonious alignment encouraged.`,
    textBn: `মূলাঙ্ক ${nameRoot}-এর সাথে সংযুক্ত। শুভ শক্তি বজায় রাখুন।`
  };

  // 4. Mobile Numerology Scan & Terminal 4 Digits
  const mob = analyzeMobileNumber(mobile);

  // 5. Dual Lo-Shu Grid (Birth vs DOB + Mobile)
  const birthCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const combinedCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  const birthDigits = `${day}${month}${year}${mulank}${bhagyank}`;
  for (let ch of birthDigits) {
    const n = parseInt(ch, 10);
    if (n >= 1 && n <= 9) {
      birthCounts[n]++;
      combinedCounts[n]++;
    }
  }

  for (let ch of mob.clean) {
    const n = parseInt(ch, 10);
    if (n >= 1 && n <= 9) combinedCounts[n]++;
  }

  const missingBirth = [];
  for (let i = 1; i <= 9; i++) {
    if (birthCounts[i] === 0) missingBirth.push(i);
  }

  // Lo-Shu Layout Rows: 4-9-2, 3-5-7, 8-1-6
  const gridRows = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  function renderGridHtml(countsObj, isCombined) {
    let html = '';
    for (let row of gridRows) {
      for (let num of row) {
        const c = countsObj[num];
        const isHealed = isCombined && birthCounts[num] === 0 && c > 0;
        const cellClass = c === 0 ? 'lo-shu-cell missing' : isHealed ? 'lo-shu-cell healed' : 'lo-shu-cell';
        html += `<div class="${cellClass}">${c > 0 ? Array(c).fill(num).join('') : '—'}</div>`;
      }
    }
    return html;
  }

  const birthGridHtml = renderGridHtml(birthCounts, false);
  const combinedGridHtml = renderGridHtml(combinedCounts, true);

  // 6. Section A: Missing Crystals (Strictly based on Missing Numbers 1-9)
  const missingCrystalsList = missingBirth.map(num => LO_SHU_MISSING_CRYSTALS[num]).filter(Boolean);

  // 7. Section B: Purpose-Based Crystals (Completely separate from Missing Numbers)
  const purposeCrystalsList = PURPOSE_CRYSTALS.filter(p => selectedConcerns.includes(p.id) || selectedConcerns.length === 0);

  // 4-Pillar Consolidated Harmonizing Blueprint
  comb81.lucky_gems = (comb81.gemsEn && comb81.gemsEn.length) ? comb81.gemsEn.join(' / ') : 'Yellow Sapphire / Blue Sapphire (as per expert recommendation)';
  const consolidatedRemediesHtml = renderConsolidatedRemedies({ mulank, bhagyank }, comb81, selectedConcerns, isBn);

  // Cache user data for instant real-time language toggling
  lastActiveUserData = {
    name, day, month, year, mobile, profession, company, vehicle,
    pDay, pMonth, pYear, selectedConcerns, mulank, bhagyank, comb81
  };

  // 7b. Astro-Horary Prashna (Instant Query & House Triad Analysis)
  // If user selected a specific question, analyze that; otherwise default to general wish & endeavor
  const horaryQueryKey = document.getElementById('horaryQuerySelect')?.value || 'general_wish';
  currentHoraryQueryKey = horaryQueryKey;
  const horaryAnalysis = calculateHoraryAnalysis(horaryQueryKey, mulank, bhagyank);
  currentHoraryData = horaryAnalysis;
  const horaryHtml = renderHoraryQuery(horaryAnalysis, isBn);

  // 8. Optional Integrations
  let companyHtml = '';
  if (company) {
    const cleanComp = company.toUpperCase().replace(/[^A-Z]/g, '');
    let compSum = 0;
    for (let ch of cleanComp) compSum += CHALDEAN_MAP[ch] || 0;
    const compRoot = reduceToSingle(compSum);
    companyHtml = `
      <div class="metric-card" style="margin-top:1rem;">
        <h4 style="color:#dfb15b; font-size:1rem; margin-bottom:0.25rem;">${isBn ? 'বাণিজ্যিক ব্র্যান্ড কম্পাউন্ড' : 'Business Brand Compound'}: ${company}</h4>
        <p style="font-size:0.85rem; color:#fff;">Compound: <strong>${compSum}</strong> ➔ Vibration: <strong>${compRoot}</strong></p>
        <p style="font-size:0.75rem; color:#a7f3d0; margin-top:0.25rem;">
          ${compRoot === 1 || compRoot === 5 || compRoot === 6
            ? (isBn ? 'অত্যন্ত শুভ বাণিজ্যিক ব্র্যান্ড স্পন্দন।' : 'Highly Auspicious commercial vibration for turnover.')
            : (isBn ? 'সঠিক ব্র্যান্ডিং পরামর্শের মাধ্যমে আরো বৃদ্ধি সম্ভব।' : 'Consider fine-tuning branding compound for maximum market reach.')}
        </p>
      </div>
    `;
  }

  let partnerHtml = '';
  if (pDay && pMonth && pYear) {
    const pMulank = reduceToSingle(pDay);
    const pBhagyank = reduceToSingle(pDay + pMonth + pYear);
    const isFriendly = PLANET_DATA[mulank]?.friendlyNumbers.includes(pMulank);
    partnerHtml = `
      <div class="metric-card" style="margin-top:1rem;">
        <h4 style="color:#dfb15b; font-size:1rem; margin-bottom:0.25rem;">${isBn ? 'জীবনসঙ্গী সামঞ্জস্য বিচার' : 'Soulmate Partner Compatibility'}</h4>
        <p style="font-size:0.85rem; color:#fff;">Partner Mulank: <strong>${pMulank}</strong> · Partner Bhagyank: <strong>${pBhagyank}</strong></p>
        <p style="font-size:0.75rem; color:${isFriendly ? '#a7f3d0' : '#fecdd3'}; margin-top:0.25rem;">
          ${isFriendly
            ? (isBn ? 'পরস্পর মিত্র সংখ্যার শুভ সমন্বয়। পারস্পরিক শ্রদ্ধা ও সম্প্রীতি বিরাজ করবে।' : 'Natural harmonic resonance between Mulank vibrations. Promotes mutual respect and prosperity.')
            : (isBn ? 'পরস্পরের প্রতি সহানুভূতি ও ধৈর্যশীল বোঝাপড়ার মাধ্যমে সম্পর্ক সুন্দর রাখা সম্ভব।' : 'Dynamic pairing requiring conscious communication and balanced emotional pacing.')}
        </p>
      </div>
    `;
  }

  // 8b. Compute 5 Core Score Cards
  const mPlanet = PLANET_DATA[mulank] || PLANET_DATA[1];
  const bPlanet = PLANET_DATA[bhagyank] || PLANET_DATA[1];
  let mbScore = 72;
  let mbLevel = 'mid';
  let mbBadge = isBn ? 'নিরপেক্ষ ভারসাম্য' : 'Neutral Resonance';
  let mbDetail = isBn ? `মূলাঙ্ক ${mulank} (${mPlanet.planetBn}) ও ভাগ্যাঙ্ক ${bhagyank} (${bPlanet.planetBn})-এর মধ্যে ভারসাম্যপূর্ণ সম্পর্ক।` : `Root ${mulank} (${mPlanet.planetEn}) & Destiny ${bhagyank} (${bPlanet.planetEn}) maintain steady resonance.`;

  if (mulank === bhagyank) {
    mbScore = 96;
    mbLevel = 'good';
    mbBadge = isBn ? 'পরম একাত্মতা' : 'Divine Synchronicity';
    mbDetail = isBn ? `উভয়েই একই গ্রহ (${mPlanet.planetBn})-এর অধীন। চিন্তা ও জীবনের উদ্দেশ্য সম্পূর্ণ একাত্ম।` : `Identical planetary master vibration (${mPlanet.planetEn}). Instincts and destiny vibrate in synchronicity.`;
  } else if (mPlanet.friendlyNumbers.includes(bhagyank) && bPlanet.friendlyNumbers.includes(mulank)) {
    mbScore = 92;
    mbLevel = 'good';
    mbBadge = isBn ? 'মিত্র গ্রহ সমন্বয়' : 'Harmonic Alliance';
    mbDetail = isBn ? `${mPlanet.planetBn} ও ${bPlanet.planetBn}-এর মধ্যে পারস্পরিক মিত্রতা। সহজাত প্রবৃত্তি বাহ্যিক সাফল্য আনে।` : `Mutual planetary friendship between ${mPlanet.planetEn} and ${bPlanet.planetEn}. Inner impulses support outer success.`;
  } else if (mPlanet.friendlyNumbers.includes(bhagyank) || bPlanet.friendlyNumbers.includes(mulank)) {
    mbScore = 84;
    mbLevel = 'good';
    mbBadge = isBn ? 'অনুকূল সম্পর্ক' : 'Favorable Affinity';
    mbDetail = isBn ? `অনুকূল গ্রহীয় স্পন্দন। মানসিক স্থায়িত্ব ও কর্মক্ষেত্রে সন্তোষজনক অগ্রগতির লক্ষণ।` : `One-way friendly planetary resonance with solid grounding.`;
  } else if (mPlanet.enemyNumbers.includes(bhagyank) || bPlanet.enemyNumbers.includes(mulank)) {
    mbScore = 48;
    mbLevel = 'bad';
    mbBadge = isBn ? 'কার্মিক সংঘাত' : 'Karmic Tension';
    mbDetail = isBn ? `${mPlanet.planetBn} ও ${bPlanet.planetBn}-এর মধ্যে গ্রহীয় বৈপরীত্য। প্রতিকার কাম্য।` : `Planetary friction between ${mPlanet.planetEn} and ${bPlanet.planetEn}. Remedial balancing advised.`;
  }

  // 2. Mobile Luck
  const mobCardScore = mob.score;
  const mobLevel = mobCardScore >= 80 ? 'good' : mobCardScore >= 60 ? 'mid' : 'bad';
  const mobBadge = mobCardScore >= 80
    ? (mob.dhanCount > 0 ? (isBn ? 'মহা ধন যোগ সমৃদ্ধ' : 'Dhan Yog Blessed') : (isBn ? 'শুভ কম্পন' : 'Auspicious Vibration'))
    : mobCardScore >= 60
    ? (isBn ? 'ভারসাম্যপূর্ণ' : 'Balanced Energy')
    : (isBn ? 'প্রতিকার প্রয়োজন' : 'Karmic Remedy Advised');
  const mobDetail = isBn
    ? `মোট যোগফল: ${mob.totalSum} ➔ রুট: ${mob.rootVibration} · ধন যোগ: ${mob.dhanCount || 0}টি · শেষ ৪-সংখ্যা রিটেনশন: ${mob.terminal4 ? mob.terminal4.retentionScore : 'N/A'}%`
    : `Total Sum: ${mob.totalSum} ➔ Root: ${mob.rootVibration} · Dhan Yog pairs: ${mob.dhanCount || 0} · Terminal 4 Retention: ${mob.terminal4 ? mob.terminal4.retentionScore : 'N/A'}%`;

  // 3. Name ↔ DOB
  let nameScore = 75;
  const isFriendlyM = mPlanet.friendlyNumbers.includes(nameRoot) || nameRoot === mulank;
  const isFriendlyB = bPlanet.friendlyNumbers.includes(nameRoot) || nameRoot === bhagyank;
  if (isFriendlyM && isFriendlyB) nameScore = 94;
  else if (isFriendlyM || isFriendlyB) nameScore = 84;
  else if (mPlanet.enemyNumbers.includes(nameRoot) || bPlanet.enemyNumbers.includes(nameRoot)) nameScore = 48;
  else nameScore = 68;

  const nameLevel = nameScore >= 80 ? 'good' : nameScore >= 60 ? 'mid' : 'bad';
  const nameBadge = nameScore >= 80
    ? (isBn ? 'পরম সামঞ্জস্যপূর্ণ' : 'Super Compatible')
    : nameScore >= 60
    ? (isBn ? 'সুষম কম্পন' : 'Harmonious Balance')
    : (isBn ? 'বানান সমন্বয় কাম্য' : 'Spelling Tune Advised');
  const nameDetail = isBn
    ? `নাম কম্পাউন্ড: ${nameCompound} (${nameOccult.titleBn || 'শুভ'}) ➔ রুট: ${nameRoot}। মূলাঙ্ক ও ভাগ্যাঙ্কের সাথে মিল।`
    : `Name Compound: ${nameCompound} (${nameOccult.titleEn || 'Balanced'}) ➔ Root: ${nameRoot}. Evaluated against Mulank ${mulank} and Bhagyank ${bhagyank}.`;

  // 4. Vehicle Number Luck (Conditional)
  let vehicleCardHtml = '';
  if (vehicle) {
    const vDigits = vehicle.replace(/\D/g, '');
    let vSum = 0;
    for (let ch of vDigits) vSum += parseInt(ch, 10) || 0;
    const vRoot = reduceToSingle(vSum) || 1;
    let vScore = 75;
    if ([1, 3, 5, 6, 7, 9].includes(vRoot)) vScore += 10;
    if ([4, 8].includes(vRoot)) vScore -= 15;
    if (mPlanet.friendlyNumbers.includes(vRoot) || vRoot === mulank) vScore += 10;
    else if (mPlanet.enemyNumbers.includes(vRoot)) vScore -= 14;
    vScore = Math.max(30, Math.min(99, vScore));

    const vLevel = vScore >= 80 ? 'good' : vScore >= 60 ? 'mid' : 'bad';
    const vBadge = vScore >= 80
      ? (isBn ? 'শুভ ও সুরক্ষিত' : 'Auspicious Shield')
      : vScore >= 60
      ? (isBn ? 'নিরাপদ ও মধ্যম' : 'Safe & Moderate')
      : (isBn ? 'প্রতিকার প্রয়োজন' : 'Remedy Advised');
    const vDetail = isBn
      ? `ডিজিট [${vDigits}] ➔ কম্পাউন্ড: ${vSum}, রুট: ${vRoot}। মূলাঙ্ক ${mulank} এবং নিরাপদ যাতায়াত সমন্বয়।`
      : `Digits [${vDigits}] ➔ Compound: ${vSum}, Root: ${vRoot}. Road transit harmony with founder chart.`;

    vehicleCardHtml = `
      <div class="score-card ${vLevel}">
        <div>
          <div class="score-card-header">
            <div>
              <div class="score-card-title">🚗 ${isBn ? 'যানবাহন নম্বর সৌভাগ্য সূচক' : 'VEHICLE NUMBER LUCK'}</div>
              <span class="score-badge">${vBadge}</span>
            </div>
            <div class="score-radial">
              <span class="score-radial-val">${vScore}%</span>
              <span class="score-radial-lvl">${vLevel}</span>
            </div>
          </div>
          <div class="score-bar-bg"><div class="score-bar-fill" style="width:${vScore}%;"></div></div>
          <p class="score-desc">
            ${isBn
              ? 'আপনার পেশা এবং ব্যক্তিগত জন্মছকের সাথে যানবাহনের শেষ ৪-সংখ্যার শক্তির সামঞ্জস্য বিচার করে নিরাপদ যাত্রা ও সৌভাগ্য নির্ণয় করে।'
              : 'Analyzes the vibration of your vehicle\'s last 4 digits to determine whether its energetic frequency aligns harmoniously with your profession and personal birth chart.'}
          </p>
        </div>
        <div class="score-diagnostics">
          <strong>${isBn ? 'গাণিতিক বিশ্লেষণ' : 'Analytical Diagnostics'}</strong>
          <span>${vDetail}</span>
        </div>
      </div>
    `;
  }

  // 5. Company Name Matching (Conditional)
  let companyCardHtml = '';
  if (company) {
    const cleanComp = company.toUpperCase().replace(/[^A-Z]/g, '');
    let cSum = 0;
    for (let ch of cleanComp) cSum += CHALDEAN_MAP[ch] || 0;
    const cRoot = reduceToSingle(cSum) || 1;
    let cScore = 72;
    if ([1, 5, 6].includes(cRoot)) cScore += 16;
    if (mPlanet.friendlyNumbers.includes(cRoot) || cRoot === mulank) cScore += 10;
    else if (mPlanet.enemyNumbers.includes(cRoot)) cScore -= 15;
    cScore = Math.max(30, Math.min(99, cScore));

    const cLevel = cScore >= 80 ? 'good' : cScore >= 60 ? 'mid' : 'bad';
    const cBadge = cScore >= 80
      ? (isBn ? 'বাণিজ্যিক শীর্ষ' : 'Commercial Zenith')
      : cScore >= 60
      ? (isBn ? 'সম্ভাবনাময় বৃদ্ধি' : 'Growth Potential')
      : (isBn ? 'ব্র্যান্ড সমন্বয় কাম্য' : 'Brand Alignment Advised');
    const cDetail = isBn
      ? `ব্র্যান্ড: ${company} ➔ কম্পাউন্ড: ${cSum}, রুট: ${cRoot}। উদ্যোক্তার চার্টের সাথে বাণিজ্যিক স্পন্দন সমন্বয়।`
      : `Brand: ${company} ➔ Compound: ${cSum}, Root: ${cRoot}. Commercial market harmony with founder chart.`;

    companyCardHtml = `
      <div class="score-card ${cLevel}">
        <div>
          <div class="score-card-header">
            <div>
              <div class="score-card-title">🏢 ${isBn ? 'বাণিজ্যিক প্রতিষ্ঠান নাম সমন্বয়' : 'COMPANY NAME MATCHING'}</div>
              <span class="score-badge">${cBadge}</span>
            </div>
            <div class="score-radial">
              <span class="score-radial-val">${cScore}%</span>
              <span class="score-radial-lvl">${cLevel}</span>
            </div>
          </div>
          <div class="score-bar-bg"><div class="score-bar-fill" style="width:${cScore}%;"></div></div>
          <p class="score-desc">
            ${isBn
              ? 'আপনার জন্মতারিখের বিপরীতে ব্যবসা বা বাণিজ্যিক ব্র্যান্ড নামের ক্যালডিয়ান কম্পাউন্ড স্কোর মূল্যায়ন করে বাণিজ্যিক বৃদ্ধি, আর্থিক স্থিতিশীলতা ও ব্র্যান্ডের সাফল্য পরিমাপ করে।'
              : 'Evaluates your business or corporate name\'s Chaldean numerological compound score against your birth date to measure its potential for commercial growth, financial stability, and brand success.'}
          </p>
        </div>
        <div class="score-diagnostics">
          <strong>${isBn ? 'গাণিতিক বিশ্লেষণ' : 'Analytical Diagnostics'}</strong>
          <span>${cDetail}</span>
        </div>
      </div>
    `;
  }

  // Auto-Sync Intake details to attached Google Sheet
  try {
    fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: name,
        fullName: name,
        mobile: mobile,
        phone: mobile,
        dob: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
        dateOfBirth: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
        day: day,
        month: month,
        year: year,
        profession: profession,
        companyName: company || '',
        company: company || '',
        vehicleDigits: vehicle || '',
        vehicleNo: vehicle || '',
        concerns: selectedConcerns.join(', '),
        mulank: mulank,
        mulankPlanet: mPlanet?.name || '',
        bhagyank: bhagyank,
        bhagyankPlanet: bPlanet?.name || '',
        nameCompound: nameCompound,
        source: 'Standalone Dossier Intake Submission',
        timestamp: new Date().toLocaleString()
      })
    }).catch(function() {});
  } catch(err) {}

  // 9. Render Master Report
  const rep = document.getElementById('reportSection');
  rep.style.display = 'block';

  rep.innerHTML = `
    <div class="card report-grid">
      <!-- Report Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:1rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <span style="font-size:0.75rem; color:#fef08a; font-family:'Cinzel',serif; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:0.25rem;">
            ASTRO GOUTAM INC · Consultant: Gouotam Dutta · ${isBn ? 'শাস্ত্রীয় মহাজাগতিক প্রতিবেদন' : 'Chaldean Dossier'}
          </span>
          <h2 class="gold-title" style="font-size:2rem; margin:0.2rem 0;">${name}</h2>
          <p style="font-size:0.85rem; color:#a7f3d0;">
            DOB: ${day}/${month}/${year} · Mobile: ${mobile} · ${profession}
          </p>
          <p style="font-size:0.75rem; color:#d1fae5; margin-top:0.25rem;">
            Chamber: 33/31 Jyotish Roy Road, New Alipore, Kolkata - 700053, West Bengal · Helpline: +91 90517 59636
          </p>
        </div>
        <div style="background:#022019; border:2px solid #dfb15b; padding:0.75rem 1.5rem; border-radius:1rem; text-align:center;">
          <span style="font-size:0.7rem; color:#fef08a; display:block;">${isBn ? 'মহাজাগতিক সমন্বয় সূচক' : 'Cosmic Harmony Index'}</span>
          <strong style="font-size:1.8rem; color:#dfb15b;">${mob.score}%</strong>
        </div>
      </div>

      <!-- Quick Actions Bar (Top) -->
      <div class="no-print" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin:1rem 0 1.5rem 0; padding:0.75rem 1rem; background:rgba(3,35,27,0.7); border:1px solid rgba(223,177,91,0.3); border-radius:0.75rem;">
        <button onclick="window.print()" class="btn-pdf">
          <svg class="btn-pdf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          <span>${isBn ? '🖨️ প্রিন্ট / সেভ পিডিএফ রিপোর্ট' : 'Print / Save PDF Report'}</span>
        </button>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <a href="tel:+919051759636" class="btn-gold" style="font-size:0.8rem; padding:0.5rem 1rem; text-decoration:none;">
            📞 +91 90517 59636
          </a>
          <a href="https://wa.me/919051759636?text=Hello%20Gouotam%20Dutta%2C%20I%20need%20Numerology%20consultation" target="_blank" class="btn-whatsapp" style="font-size:0.8rem; padding:0.5rem 1rem; text-decoration:none;">
            💬 WhatsApp
          </a>
        </div>
      </div>

      <!-- 5 CORE SCORE CARDS SECTION -->
      <div class="score-cards-section">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:0.75rem;">
          <div>
            <span style="font-size:0.7rem; color:#fef08a; font-family:'Cinzel',serif; text-transform:uppercase; letter-spacing:1px; display:block;">
              ${isBn ? 'মূল ডায়াগনস্টিক মেট্রিক সুইট' : 'CORE DIAGNOSTIC METRIC SUITE'}
            </span>
            <h3 style="color:#dfb15b; font-size:1.3rem; margin:0.2rem 0; font-family:'Cinzel',serif;">
              ${isBn ? '৫টি মূল সংখ্যাতত্ত্ব স্কোর কার্ড' : '5 Core Vibrational Score Cards'}
            </h3>
          </div>
          <div style="font-size:0.75rem; color:#a7f3d0;">
            <span style="color:#34d399;">● ≥80% ${isBn ? 'পরম শুভ' : 'Optimal'}</span> ·
            <span style="color:#fbbf24;">● 60-79% ${isBn ? 'মধ্যম' : 'Balanced'}</span> ·
            <span style="color:#fb7185;">● &lt;60% ${isBn ? 'প্রতিকার্য' : 'Caution'}</span>
          </div>
        </div>

        <div class="score-cards-grid">
          <!-- 1. Mulank ↔ Bhagyank -->
          <div class="score-card ${mbLevel}">
            <div>
              <div class="score-card-header">
                <div>
                  <div class="score-card-title">✨ ${isBn ? 'মূলাঙ্ক ↔ ভাগ্যাঙ্ক সামঞ্জস্য' : 'MULANK ↔ BHAGYANK'}</div>
                  <span class="score-badge">${mbBadge}</span>
                </div>
                <div class="score-radial">
                  <span class="score-radial-val">${mbScore}%</span>
                  <span class="score-radial-lvl">${mbLevel}</span>
                </div>
              </div>
              <div class="score-bar-bg"><div class="score-bar-fill" style="width:${mbScore}%;"></div></div>
              <p class="score-desc">
                ${isBn
                  ? 'আপনার মূলাঙ্ক (Root Number) এবং ভাগ্যাঙ্ক (Destiny Number)-এর মধ্যকার গ্রহগত মিত্রতা ও কম্পনশীল সাদৃশ্য বিচার করে আপনার মানসিক স্থায়িত্ব ও জীবনের স্বাভাবিক গতি নির্দেশ করে।'
                  : 'Evaluates the planetary friendship and vibrational harmony between your Root Number (Mulank) and Destiny Number (Bhagyank), reflecting your core psychological alignment and natural life flow.'}
              </p>
            </div>
            <div class="score-diagnostics">
              <strong>${isBn ? 'গাণিতিক বিশ্লেষণ' : 'Analytical Diagnostics'}</strong>
              <span>${mbDetail}</span>
            </div>
          </div>

          <!-- 2. Mobile Number Luck -->
          <div class="score-card ${mobLevel}">
            <div>
              <div class="score-card-header">
                <div>
                  <div class="score-card-title">📱 ${isBn ? 'মোবাইল নম্বর সৌভাগ্য সূচক' : 'MOBILE NUMBER LUCK'}</div>
                  <span class="score-badge">${mobBadge}</span>
                </div>
                <div class="score-radial">
                  <span class="score-radial-val">${mobCardScore}%</span>
                  <span class="score-radial-lvl">${mobLevel}</span>
                </div>
              </div>
              <div class="score-bar-bg"><div class="score-bar-fill" style="width:${mobCardScore}%;"></div></div>
              <p class="score-desc">
                ${isBn
                  ? 'আপনার জন্মতারিখের বিপরীতে ১০-সংখ্যার মোবাইল নম্বরের সামগ্রিক রুট স্পন্দন, শেষ ৪-সংখ্যার অর্থ আকর্ষণ এবং অভ্যন্তরীণ ২-ডিজিটের জোড়া (ধন যোগ ২৯, ৩৭, ৭৩, ৯২ ইত্যাদি) বিচার করে সৌভাগ্য নির্ণয় করে।'
                  : 'Measures the overall compatibility of your 10-digit mobile number by analyzing its total root vibration, last 4-digit manifestation, and internal 2-digit pair synergies against your date of birth.'}
              </p>
            </div>
            <div class="score-diagnostics">
              <strong>${isBn ? 'গাণিতিক বিশ্লেষণ' : 'Analytical Diagnostics'}</strong>
              <span>${mobDetail}</span>
            </div>
          </div>

          <!-- 3. Name ↔ DOB -->
          <div class="score-card ${nameLevel}">
            <div>
              <div class="score-card-header">
                <div>
                  <div class="score-card-title">🛡️ ${isBn ? 'নাম ↔ জন্মতারিখ সামঞ্জস্য' : 'NAME ↔ DOB COMPATIBILITY'}</div>
                  <span class="score-badge">${nameBadge}</span>
                </div>
                <div class="score-radial">
                  <span class="score-radial-val">${nameScore}%</span>
                  <span class="score-radial-lvl">${nameLevel}</span>
                </div>
              </div>
              <div class="score-bar-bg"><div class="score-bar-fill" style="width:${nameScore}%;"></div></div>
              <p class="score-desc">
                ${isBn
                  ? 'আপনার সম্পূর্ণ নামের ক্যালডিয়ান কম্পাউন্ড ও রুট সংখ্যা আপনার জন্মছকের (মূলাঙ্ক ও ভাগ্যাঙ্ক) সাথে কতটা সংগতিপূর্ণ তা পরিমাপ করে আপনার ব্যক্তিগত ভাগ্যোন্নয়নে নামের প্রভাব নির্দেশ করে।'
                  : 'Measures the Chaldean numerological compatibility between your full name\'s compound/root number and your birth chart, highlighting how your name vibration supports your personal destiny.'}
              </p>
            </div>
            <div class="score-diagnostics">
              <strong>${isBn ? 'গাণিতিক বিশ্লেষণ' : 'Analytical Diagnostics'}</strong>
              <span>${nameDetail}</span>
            </div>
          </div>

          <!-- 4. Vehicle Number Luck (Conditional) -->
          ${vehicleCardHtml}

          <!-- 5. Company Name Matching (Conditional) -->
          ${companyCardHtml}
        </div>
      </div>

      <!-- Mulank & Bhagyank -->
      <div class="report-grid-2">
        <div class="metric-card">
          <div class="metric-header">
            <span style="font-size:0.75rem; color:#dfb15b; text-transform:uppercase; font-family:'Cinzel',serif;">
              ${isBn ? 'মূলাঙ্ক (জন্ম সংখ্যা)' : 'Mulank (Day Number)'}
            </span>
            <span class="metric-num">${mulank}</span>
          </div>
          <p style="font-size:0.9rem; color:#fff; font-weight:bold;">${isBn ? PLANET_DATA[mulank].planetBn : PLANET_DATA[mulank].planetEn}</p>
          <p style="font-size:0.75rem; color:#a7f3d0; margin-top:0.35rem;">
            ${isBn ? 'শুভ রত্ন' : 'Gemstone'}: ${isBn ? PLANET_DATA[mulank].gemstoneBn : PLANET_DATA[mulank].gemstoneEn} ·
            ${isBn ? 'শুভ রং' : 'Lucky Colors'}: ${(isBn ? PLANET_DATA[mulank].luckyColorsBn : PLANET_DATA[mulank].luckyColorsEn).join(', ')}
          </p>
        </div>

        <div class="metric-card">
          <div class="metric-header">
            <span style="font-size:0.75rem; color:#dfb15b; text-transform:uppercase; font-family:'Cinzel',serif;">
              ${isBn ? 'ভাগ্যাঙ্ক (জীবন পথ সংখ্যা)' : 'Bhagyank (Life Path Number)'}
            </span>
            <span class="metric-num">${bhagyank}</span>
          </div>
          <p style="font-size:0.9rem; color:#fff; font-weight:bold;">${isBn ? PLANET_DATA[bhagyank].planetBn : PLANET_DATA[bhagyank].planetEn}</p>
          <p style="font-size:0.75rem; color:#a7f3d0; margin-top:0.35rem;">
            ${isBn ? 'উপাস্য দেব/দেবী' : 'Deity'}: ${isBn ? PLANET_DATA[bhagyank].deityBn : PLANET_DATA[bhagyank].deityEn} ·
            ${isBn ? 'উপযুক্ত ক্ষেত্র' : 'Career'}: ${(isBn ? PLANET_DATA[bhagyank].careersBn : PLANET_DATA[bhagyank].careersEn).slice(0, 2).join(', ')}
          </p>
        </div>
      </div>

      <!-- 81 MULANK x BHAGYANK MASTER COMBINATION ENGINE -->
      <div class="metric-card" style="margin-bottom:1.5rem; border:2px solid #dfb15b;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:0.75rem;">
          <div>
            <span style="font-size:0.7rem; color:#fef08a; text-transform:uppercase; font-family:'Cinzel',serif;">
              ${isBn ? '৮১-সমন্বয় মাস্টার মেট্রিক্স' : '81-Combination Master Matrix'}
            </span>
            <h3 style="color:#dfb15b; font-size:1.3rem; margin:0.2rem 0; font-family:'Cinzel',serif;">
              ${isBn ? comb81.synthesisTitleBn : comb81.synthesisTitleEn}
            </h3>
            <span style="font-size:0.8rem; color:#a7f3d0;">
              ${isBn ? comb81.planetaryPairingBn : comb81.planetaryPairingEn} (${comb81.combinationKey})
            </span>
          </div>
          <span class="badge-dhan" style="font-size:0.85rem;">M${mulank} × B${bhagyank}</span>
        </div>

        <p style="font-size:0.85rem; color:#d1fae5; line-height:1.6; margin:0.75rem 0;">
          ${isBn ? comb81.characterThemesBn : comb81.characterThemesEn}
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; font-size:0.75rem; margin-top:0.75rem;">
          <div style="background:#011d16; padding:0.6rem; border-radius:0.5rem;">
            <strong style="color:#fef08a; display:block;">${isBn ? 'শুভ সংখ্যা' : 'Lucky Numbers'}:</strong>
            ${comb81.luckyNumbers.join(', ')} (${isBn ? comb81.luckyDaysPatternBn : comb81.luckyDaysPatternEn})
          </div>
          <div style="background:#011d16; padding:0.6rem; border-radius:0.5rem;">
            <strong style="color:#fef08a; display:block;">${isBn ? 'শুভ নাম কম্পাউন্ড' : 'Recommended Name Compounds'}:</strong>
            ${comb81.nameNumberRecommendations.slice(0, 5).join(', ')}
          </div>
          <div style="background:#011d16; padding:0.6rem; border-radius:0.5rem;">
            <strong style="color:#fef08a; display:block;">${isBn ? 'শুভ রং ও রত্ন' : 'Lucky Colors & Gems'}:</strong>
            ${(isBn ? comb81.luckyColoursBn : comb81.luckyColoursEn).join(', ')} · ${(isBn ? comb81.gemsBn : comb81.gemsEn).join(', ')}
          </div>
          <div style="background:#011d16; padding:0.6rem; border-radius:0.5rem;">
            <strong style="color:#f87171; display:block;">${isBn ? 'সতর্কতার দিন' : 'Caution Patterns'}:</strong>
            ${isBn ? comb81.unluckyDaysPatternBn : comb81.unluckyDaysPatternEn}
          </div>
        </div>

        <div style="background:#032018; padding:0.75rem; border-radius:0.5rem; margin-top:0.75rem; font-size:0.75rem;">
          <strong style="color:#dfb15b; display:block; margin-bottom:0.2rem;">${isBn ? 'প্রথাগত প্রতিকার বিধান' : 'Traditional Remedial Guidance'}:</strong>
          ${isBn ? comb81.remedialGuidanceBn : comb81.remedialGuidanceEn}
        </div>

        <div class="disclaimer-box">
          ${isBn ? COMBINATION_81_DISCLAIMER.bn : COMBINATION_81_DISCLAIMER.en}
        </div>
      </div>

      <!-- CHALDEAN NAME ANALYSIS -->
      <div class="metric-card" style="margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(223,177,91,0.2); padding-bottom:0.5rem;">
          <h3 style="color:#dfb15b; font-size:1.1rem; font-family:'Cinzel',serif;">
            ${isBn ? 'ক্যালডিয়ান নাম বিশ্লেষণ' : 'Chaldean Name Analysis'}: ${cleanName}
          </h3>
          <span style="font-size:0.85rem; color:#fef08a;">
            Compound: <strong>${nameCompound}</strong> ➔ Root: <strong>${nameRoot}</strong>
          </span>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:0.3rem; margin:0.75rem 0;">
          ${letterBreakdown.map(item => `
            <span style="background:#043327; border:1px solid rgba(223,177,91,0.3); padding:0.2rem 0.5rem; border-radius:0.3rem; font-size:0.75rem;">
              <strong>${item.ch}</strong>: ${item.val}
            </span>
          `).join('')}
        </div>
        <div style="background:#011b15; padding:0.75rem; border-radius:0.5rem; margin-top:0.5rem;">
          <strong style="color:#dfb15b; font-size:0.85rem;">${isBn ? nameOccult.titleBn : nameOccult.titleEn} (${isBn ? nameOccult.verdictBn : nameOccult.verdictEn})</strong>
          <p style="font-size:0.8rem; color:#d1fae5; margin-top:0.25rem; line-height:1.5;">
            ${isBn ? (nameOccult.occultDetailBn || nameOccult.textBn) : (nameOccult.occultDetailEn || nameOccult.textEn)}
          </p>
        </div>
      </div>

      <!-- MOBILE NUMEROLOGY MASTER -->
      <div class="metric-card" style="margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(223,177,91,0.2); padding-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <h3 style="color:#dfb15b; font-size:1.1rem; font-family:'Cinzel',serif;">
              ${isBn ? 'মোবাইল সংখ্যাতত্ত্ব মাস্টার' : 'Mobile Numerology Master'}: ${mob.clean}
            </h3>
            <p style="font-size:0.8rem; color:#a7f3d0;">
              Total Sum: <strong>${mob.totalSum}</strong> ➔ Root: <strong>${mob.rootVibration}</strong> · Last Digit: <strong>${mob.lastDigit}</strong>
            </p>
          </div>
          <span class="badge-dhan">${isBn ? mob.verdictBn : mob.verdictEn}</span>
        </div>

        <!-- 2-Digit consecutive pairs -->
        <div style="margin:1rem 0;">
          <strong style="font-size:0.8rem; color:#fef08a; display:block; margin-bottom:0.5rem;">
            ${isBn ? 'পরপর ২-ডিজিট জোড়া বিশ্লেষণ (Dhan Yog ও সতর্ক জোড়া)' : 'Consecutive 2-Digit Pairs Analysis (Dhan Yog & Warnings)'}:
          </strong>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.5rem;">
            ${mob.pairsFound.length > 0 ? mob.pairsFound.map(p => `
              <div style="background:#011b15; border:1px solid ${p.isDhanYog ? '#dfb15b' : p.isNegative ? '#f43f5e' : 'rgba(223,177,91,0.2)'}; padding:0.6rem; border-radius:0.5rem; font-size:0.75rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                  <strong style="color:${p.isDhanYog ? '#dfb15b' : '#fff'}; font-size:0.9rem;">Pair [${p.pair}]</strong>
                  <span class="${p.isDhanYog ? 'badge-dhan' : p.isNegative ? 'badge-neg' : 'badge-dhan'}" style="font-size:0.65rem;">
                    ${p.category}
                  </span>
                </div>
                <p style="color:#a7f3d0; margin-top:0.2rem;">${isBn ? p.descBn : p.descEn}</p>
              </div>
            `).join('') : '<p style="font-size:0.75rem; color:#a7f3d0;">Standard balanced numerical flow.</p>'}
          </div>
        </div>

        <!-- Terminal 4 Digits -->
        ${mob.terminal4 ? `
          <div style="background:#011d16; border:1px solid rgba(223,177,91,0.3); padding:0.85rem; border-radius:0.75rem; margin-top:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <strong style="color:#dfb15b; font-size:0.9rem;">
                  ${isBn ? 'শেষ ৪-ডিজিট অর্থ ধারণ ক্ষমতা বিশ্লেষণ' : 'Terminal 4 Digits Retention Engine'}: [${mob.terminal4.rawDigits}]
                </strong>
                <p style="font-size:0.75rem; color:#a7f3d0;">
                  Compound: <strong>${mob.terminal4.totalSum}</strong> ➔ Root: <strong>${mob.terminal4.rootVibration}</strong>
                </p>
              </div>
              <span class="badge-dhan" style="font-size:0.85rem;">Retention: ${mob.terminal4.retentionScore}%</span>
            </div>
            <p style="font-size:0.8rem; color:#d1fae5; margin-top:0.5rem; line-height:1.4;">
              ${isBn ? mob.terminal4.verdictBn : mob.terminal4.verdictEn}
            </p>
          </div>
        ` : ''}
      </div>

      <!-- DUAL LO-SHU GRID -->
      <div style="margin:2rem 0;">
        <h3 style="color:#dfb15b; font-family:'Cinzel',serif; font-size:1.3rem; text-align:center; margin-bottom:0.5rem;">
          ${isBn ? 'দ্বৈত লো-শু গ্রিড তুলনা' : 'Dual Lo-Shu Grid Architecture'}
        </h3>
        <p style="text-align:center; font-size:0.8rem; color:#a7f3d0; margin-bottom:1.5rem;">
          ${isBn ? 'জন্ম ছক বনাম মোবাইল নম্বর দ্বারা সক্রিয় ও ঘাটতি পূরণ ছক' : 'Comparing Pure Birth Grid vs. Mobile Infused Bridge Grid (Healed cells highlighted)'}
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; max-width:600px; margin:0 auto;">
          <div style="text-align:center;">
            <h4 style="color:#fef08a; font-size:0.9rem; margin-bottom:0.5rem; font-family:'Cinzel',serif;">
              ${isBn ? '১. জন্ম লো-শু ছক' : '1. Birth Lo-Shu Grid'}
            </h4>
            <div class="lo-shu-grid">${birthGridHtml}</div>
            <span style="font-size:0.7rem; color:#a7f3d0;">${isBn ? 'অনুপস্থিত সংখ্যা' : 'Missing Numbers'}: ${missingBirth.join(', ') || 'None'}</span>
          </div>

          <div style="text-align:center;">
            <h4 style="color:#dfb15b; font-size:0.9rem; margin-bottom:0.5rem; font-family:'Cinzel',serif;">
              ${isBn ? '২. মোবাইল দ্বারা সক্রিয় ছক' : '2. DOB + Mobile Grid'}
            </h4>
            <div class="lo-shu-grid">${combinedGridHtml}</div>
            <span style="font-size:0.7rem; color:#fef08a;">${isBn ? 'সবুজ ঘর: মোবাইল দ্বারা পূর্ণ' : 'Green cells: Healed by Mobile bridge'}</span>
          </div>
        </div>
      </div>

      <!-- SECTION A: LO-SHU MISSING NUMBER CRYSTALS & BRACELETS (STRICT CANONICAL STANDARD) -->
      <div class="metric-card" style="margin-bottom:1.5rem; border:2px solid #dfb15b;">
        <div style="border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:0.5rem; margin-bottom:1rem;">
          <span style="font-size:0.7rem; color:#fef08a; font-family:'Cinzel',serif; text-transform:uppercase;">
            ${isBn ? 'বিভাগ ক (Section A) · শাস্ত্রীয় লো-শু নিয়ম' : 'Section A · Canonical Missing Number Standard'}
          </span>
          <h3 class="crystal-title" style="font-size:1.3rem; margin-top:0.2rem;">
            ${isBn ? 'অনুপস্থিত সংখ্যা নিরামক ক্রিস্টাল ও ব্রেসলেট' : 'Missing Number Healing Crystals & Bracelets'}
          </h3>
          <p style="font-size:0.75rem; color:#a7f3d0;">
            ${isBn ? 'শুধুমাত্র জন্ম ছকের ঘাটতি সংখ্যার ভিত্তিতে নির্ধারিত (উদ্দেশ্যভিত্তিক নির্বাচন থেকে সম্পূর্ণ স্বতন্ত্র)।' : 'Strictly determined by missing birth grid numbers. Kept completely separate from purpose-based recommendations.'}
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.75rem;">
          ${missingCrystalsList.length > 0 ? missingCrystalsList.map(item => {
            const tr = (typeof LOSHU_REMEDIES !== 'undefined' && LOSHU_REMEDIES[item.number]) ? LOSHU_REMEDIES[item.number] : null;
            const cats = tr ? tr.categories : null;
            return `
            <div class="crystal-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <span class="badge-dhan" style="font-size:0.7rem;">Missing #${item.number}</span>
                <span style="font-size:0.7rem; color:#a7f3d0;">${item.isBracelet ? 'Bracelet' : 'Crystal'}</span>
              </div>
              <strong style="color:#dfb15b; font-size:1rem; display:block;">${item.crystal}</strong>
              <p style="font-size:0.75rem; color:#fef08a; margin:0.35rem 0;">
                <strong>${isBn ? 'প্রথাগত প্রভাব' : 'Traditional Focus'}:</strong> ${isBn ? item.focusBn : item.focusEn}
              </p>
              <p style="font-size:0.75rem; color:#d1fae5; line-height:1.4;">
                ${isBn ? item.guidanceBn : item.guidanceEn}
              </p>

              ${cats ? `
                <div style="margin-top:0.6rem; padding-top:0.5rem; border-top:1px dashed rgba(223,177,91,0.25); font-size:0.72rem; line-height:1.4;">
                  ${cats.rudrakshaEn ? `<div style="margin-bottom:3px;"><b style="color:#fef08a;">📿 ${isBn ? 'রুদ্রাক্ষ' : 'Rudraksha'}:</b> <span style="color:#d1fae5;">${isBn ? cats.rudrakshaBn : cats.rudrakshaEn}</span></div>` : ''}
                  ${cats.mantraEn ? `<div style="margin-bottom:3px;"><b style="color:#fef08a;">🕉️ ${isBn ? 'মন্ত্র' : 'Mantra'}:</b> <span style="color:#fde047; font-family:monospace;">${isBn ? cats.mantraBn : cats.mantraEn}</span></div>` : ''}
                  ${cats.donationEn ? `<div style="margin-bottom:3px;"><b style="color:#fef08a;">🤲 ${isBn ? 'দান' : 'Donation'}:</b> <span style="color:#d1fae5;">${isBn ? cats.donationBn : cats.donationEn}</span></div>` : ''}
                  ${cats.spiritualEn ? `<div style="margin-bottom:3px;"><b style="color:#fef08a;">✨ ${isBn ? 'আধ্যাত্মিক' : 'Spiritual'}:</b> <span style="color:#d1fae5;">${isBn ? cats.spiritualBn : cats.spiritualEn}</span></div>` : ''}
                  ${cats.colorEn ? `<div style="margin-bottom:3px;"><b style="color:#fef08a;">🎨 ${isBn ? 'রঙের প্রতিকার' : 'Color Cure'}:</b> <span style="color:#d1fae5;">${isBn ? cats.colorBn : cats.colorEn}</span></div>` : ''}
                </div>
              ` : ''}
            </div>
            `;
          }).join('') : '<p style="font-size:0.8rem; color:#a7f3d0; padding:1rem;">All numbers present in chart! No missing numbers detected.</p>'}
        </div>
      </div>

      <!-- SECTION B: PURPOSE-BASED CRYSTAL & BRACELET RECOMMENDATIONS (COMPLETELY INDEPENDENT) -->
      <div class="metric-card" style="margin-bottom:1.5rem; border:1px solid rgba(223,177,91,0.5);">
        <div style="border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:0.5rem; margin-bottom:1rem;">
          <span style="font-size:0.7rem; color:#fef08a; font-family:'Cinzel',serif; text-transform:uppercase;">
            ${isBn ? 'বিভাগ খ (Section B) · স্বাধীন প্রয়োগ' : 'Section B · Independent Life-Goal Layer'}
          </span>
          <h3 class="crystal-title" style="font-size:1.3rem; margin-top:0.2rem;">
            ${isBn ? 'উদ্দেশ্য ও আকাঙ্ক্ষা ভিত্তিক ক্রিস্টাল নির্দেশিকা' : 'Goal & Purpose-Based Crystal / Bracelet Guide'}
          </h3>
          <p style="font-size:0.75rem; color:#a7f3d0;">
            ${isBn ? 'ব্যবহারকারীর নির্বাচিত জীবনের লক্ষ্য অনুযায়ী সাজানো। ঘাটতি প্রতিকার থেকে সম্পূর্ণ পৃথক।' : 'Aligned directly with user selected life goals and ambitions. Completely independent from the missing-number remedy.'}
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.75rem;">
          ${purposeCrystalsList.map(p => `
            <div class="crystal-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <span class="badge-dhan" style="font-size:0.7rem;">${isBn ? p.purposeBn : p.purposeEn}</span>
                <span style="font-size:0.7rem; color:#a7f3d0;">${p.isBracelet ? 'Bracelet' : 'Crystal'}</span>
              </div>
              <strong style="color:#dfb15b; font-size:1rem; display:block;">${p.crystal}</strong>
              <p style="font-size:0.75rem; color:#d1fae5; line-height:1.4; margin-top:0.35rem;">
                ${isBn ? p.useBn : p.useEn}
              </p>
            </div>
          `).join('')}
        </div>

        <div class="disclaimer-box">
          ${isBn ? TRADITIONAL_CRYSTAL_DISCLAIMER.bn : TRADITIONAL_CRYSTAL_DISCLAIMER.en}
        </div>
      </div>

      <!-- OPTIONAL BRANDING & PARTNER SECTIONS -->
      ${companyHtml || partnerHtml ? `
        <div style="margin-bottom:1.5rem;">
          ${companyHtml}
          ${partnerHtml}
        </div>
      ` : ''}

      <!-- 4-PILLAR CONSOLIDATED HARMONIZING BLUEPRINT (ABSOLUTE LAST CARD BEFORE CONSULTANCY CTA) -->
      <div id="consolidatedRemediesCard" class="metric-card consolidated-remedies-card" style="margin-bottom:1.5rem; border:2px solid #dfb15b; background:rgba(2,32,25,0.85);">
        <div style="border-bottom:1px solid rgba(223,177,91,0.3); padding-bottom:0.5rem; margin-bottom:1rem;">
          <span style="font-size:0.7rem; color:#fef08a; font-family:'Cinzel',serif; text-transform:uppercase;">
            ${isBn ? 'সার্বিক প্রতিকার স্তম্ভ · ৪-পিলার সমন্বয়' : 'Harmonizing Matrix · 4-Pillar Cosmic Blueprint'}
          </span>
          <h3 class="crystal-title" style="font-size:1.3rem; margin-top:0.2rem;">
            ${isBn ? '৪-স্তম্ভ সার্বিক প্রতিকার ও শুভ কম্পন নির্দেশনা' : '4-Pillar Harmonizing Blueprint (Crystals, Gems, Scents & Diet)'}
          </h3>
          <p style="font-size:0.75rem; color:#a7f3d0;">
            ${isBn ? 'আপনার জন্মতারিখ ও মূলাঙ্ক-ভাগ্যাঙ্কের কম্পন অনুযায়ী ক্রিস্টাল, রত্ন, সুগন্ধি ও খাদ্য প্রতিবিধান।' : 'Precision vibration alignment covering lucky crystals, planetary gemstones, sacred scents, and dietary harmonizers.'}
          </p>
        </div>
        ${consolidatedRemediesHtml}
      </div>

      <!-- ASTRO-HORARY PRASHNA (INSTANT QUERY & HOUSE ANALYSIS - FINAL REPORT SECTION) -->
      ${horaryHtml}

      <!-- DIRECT ACTIONS & CONSULTANCY DESK -->
      <div style="text-align:center; margin-top:2rem; padding:1.5rem 1rem; border-top:1px solid rgba(223,177,91,0.3); background:rgba(2,34,27,0.7); border-radius:1rem; border:1px solid rgba(223,177,91,0.4);">
        <h4 style="color:#dfb15b; font-family:'Cinzel',serif; font-size:1.2rem; margin-bottom:0.35rem;">ASTRO GOUTAM INC · 1-on-1 Consultation</h4>
        <p style="color:#fef08a; font-size:0.85rem; margin-bottom:0.25rem;">
          <strong>${isBn ? 'প্রধান পরামর্শক' : 'Principal Consultant'}:</strong> Gouotam Dutta
        </p>
        <p style="color:#a7f3d0; font-size:0.8rem; margin-bottom:0.85rem;">
          <strong>${isBn ? 'চেম্বার' : 'Chamber Address'}:</strong> 33/31 Jyotish Roy Road, New Alipore, Kolkata - 700053, West Bengal
        </p>
          <button onclick="window.print()" class="btn-pdf">
            <svg class="btn-pdf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>${isBn ? '🖨️ প্রিন্ট / পিডিএফ রিপোর্ট সংরক্ষণ' : 'Print / Save PDF Report'}</span>
          </button>
          <a href="tel:+919051759636" class="btn-gold" style="font-size:0.85rem; padding:0.6rem 1.25rem; text-decoration:none;">
            ${isBn ? '📞 সরাসরি কল: +91 90517 59636' : '📞 Direct Call: +91 90517 59636'}
          </a>
          <a href="https://wa.me/919051759636?text=Hello%20Gouotam%20Dutta%2C%20I%20need%20Numerology%20consultation" target="_blank" class="btn-whatsapp" style="font-size:0.85rem; padding:0.6rem 1.25rem; text-decoration:none;">
            ${isBn ? '💬 হোয়াটসঅ্যাপে বুকিং করুন' : '💬 WhatsApp Consultation'}
          </a>
        </div>
      </div>
    </div>
  `;

  rep.scrollIntoView({ behavior: 'smooth' });
});
