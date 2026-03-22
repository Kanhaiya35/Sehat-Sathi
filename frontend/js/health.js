/* ── Sehat Sathi – Health Page ───────────────────────────────────────────── */
'use strict';

const HEALTH_TIPS = [
  '💧 Drink at least 8 glasses of clean boiled water daily to prevent waterborne diseases.',
  '🧼 Wash hands with soap before meals and after using the toilet. This prevents 30% of diarrhoeal diseases.',
  '💉 Ensure all children under 5 are fully vaccinated under Mission Indradhanush. It is free at all PHCs.',
  '🦟 Eliminate stagnant water from coolers, pots, tyres weekly to prevent Dengue and Malaria.',
  '🥗 Include one green vegetable, one dal, and one fruit in daily meals for complete nutrition.',
  '🚶 Walk 30 minutes every day to reduce risk of diabetes, hypertension, and heart disease by 40%.',
  '🏥 Visit your nearest PHC for free annual health checkup. Early detection saves lives.',
  '🤰 Pregnant women should take IFA (Iron + Folic Acid) tablets daily from first trimester to prevent anaemia.',
  '🚭 Tobacco (bidi, gutkha, cigarette) is the leading preventable cause of cancer in India.',
  '😴 Sleep 7-8 hours nightly. Sleep deprivation weakens immunity and increases disease risk.',
  '🌿 Breastfeed exclusively for 6 months. Breast milk protects babies from infections and malnutrition.',
  '📞 Call ASHA/ANM worker for free home visits, health services, and scheme registration assistance.',
];

let tipIndex = 0;

const SYMPTOMS_DB = [
  { id: 'fever',       label: 'Fever / High Temperature' },
  { id: 'chills',      label: 'Chills / Shivering' },
  { id: 'headache',    label: 'Severe Headache' },
  { id: 'cough',       label: 'Cough (persistent)' },
  { id: 'sputum',      label: 'Blood in sputum' },
  { id: 'sweating',    label: 'Night Sweats' },
  { id: 'bodyache',    label: 'Body / Joint / Muscle Pain' },
  { id: 'nausea',      label: 'Nausea / Vomiting' },
  { id: 'rash',        label: 'Skin Rash' },
  { id: 'eye_pain',    label: 'Pain Behind Eyes' },
  { id: 'fatigue',     label: 'Extreme Fatigue / Weakness' },
  { id: 'weight_loss', label: 'Unexplained Weight Loss' },
  { id: 'thirst',      label: 'Excessive Thirst' },
  { id: 'urination',   label: 'Frequent Urination' },
  { id: 'blurred',     label: 'Blurred Vision' },
  { id: 'wound',       label: 'Slow-healing wounds' },
  { id: 'abdomen',     label: 'Abdominal Pain' },
  { id: 'platelet',    label: 'Bleeding (gums/nose)' },
  { id: 'breathless',  label: 'Difficulty Breathing / Shortness of breath' },
  { id: 'diarrhoea',   label: 'Diarrhoea / Watery Stools' },
];

const DISEASE_MAP = {
  Malaria: {
    symptoms: ['fever','chills','headache','sweating','nausea','bodyache','fatigue'],
    color: 'red', icon: '🦟',
    action: 'Go to nearest PHC for FREE Rapid Diagnostic Test (RDT). Treatment is free.',
    helpline: '108',
  },
  Dengue: {
    symptoms: ['fever','headache','eye_pain','rash','bodyache','fatigue','nausea','platelet'],
    color: 'orange', icon: '🦠',
    action: 'Get platelet count tested. Drink ORS. Avoid Aspirin/Ibuprofen. Go to hospital if bleeding occurs.',
    helpline: '108',
  },
  Tuberculosis: {
    symptoms: ['cough','sputum','fever','sweating','weight_loss','fatigue','breathless'],
    color: 'blue', icon: '🫁',
    action: 'Cough lasting >2 weeks must be tested for TB. FREE sputum test &amp; DOTS treatment at all PHCs.',
    helpline: '1800-11-6666',
  },
  Diabetes: {
    symptoms: ['thirst','urination','blurred','wound','fatigue','weight_loss'],
    color: 'purple', icon: '🩸',
    action: 'Free fasting glucose test available at all PHCs under NPCDCS. Lifestyle change can prevent/control it.',
    helpline: '1800-180-1104',
  },
  'Viral Fever / Cold': {
    symptoms: ['fever','headache','bodyache','nausea','fatigue'],
    color: 'yellow', icon: '🤧',
    action: 'Rest, fluids, Paracetamol. See doctor if fever persists >3 days or is very high.',
    helpline: '108',
  },
  Diarrhoea: {
    symptoms: ['diarrhoea','nausea','abdomen','fatigue'],
    color: 'green', icon: '💩',
    action: 'Drink ORS (1 litre water + 1 packet ORS from Anganwadi). See doctor if blood in stool or very weak.',
    helpline: '108',
  },
};

// ── Tab Switching ────────────────────────────────────────────────────────────
function showTab(name) {
  ['diseases','prevention','maternal','schemes','checker'].forEach(t => {
    document.getElementById('sec-' + t)?.classList.toggle('hidden', t !== name);
    const btn = document.getElementById('tab-' + t);
    if (btn) {
      btn.classList.toggle('active-tab', t === name);
      if (t === name) {
        btn.classList.remove('bg-white/15','text-white');
        btn.classList.add('bg-white','text-primary-700');
      } else {
        btn.classList.remove('bg-white','text-primary-700');
        btn.classList.add('bg-white/15','text-white');
      }
    }
  });
  // Update URL hash
  window.location.hash = name;
}

// ── Daily Health Tips ────────────────────────────────────────────────────────
function loadNextTip() {
  tipIndex = (tipIndex + 1) % HEALTH_TIPS.length;
  const el = document.getElementById('dailyTip');
  if (el) el.textContent = HEALTH_TIPS[tipIndex];
}

// ── Eligibility Checker ──────────────────────────────────────────────────────
function checkEligibility() {
  const income     = document.getElementById('income')?.value;
  const caste      = document.getElementById('caste')?.value;
  const ration     = document.getElementById('ration')?.value;
  const occupation = document.getElementById('occupation')?.value;
  const resultBox  = document.getElementById('eligibilityResult');

  if (!income || !caste || !ration || !occupation) {
    alert('Please fill all fields to check eligibility.');
    return;
  }

  let eligible = false;
  let reason   = '';

  // PM-JAY eligibility logic based on SECC criteria
  if (ration === 'antyodaya' || ration === 'bpl') { eligible = true; reason = 'BPL/Antyodaya ration card holders are automatically eligible.'; }
  else if (income === 'low' && ['sc','st'].includes(caste)) { eligible = true; reason = 'Low income SC/ST families qualify under SECC deprivation criteria.'; }
  else if (occupation === 'agriculture' || occupation === 'manual' || occupation === 'tribal' || occupation === 'bonded') { eligible = true; reason = 'Occupational category qualifies under SECC rural deprivation criteria.'; }
  else if (income === 'low' && ration === 'none') { eligible = true; reason = 'Low income families without ration card – apply via PM-JAY grievance portal.'; }

  if (resultBox) {
    resultBox.classList.remove('hidden');
    if (eligible) {
      resultBox.className = 'mt-5 rounded-xl p-5 border-2 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700';
      document.getElementById('eligibilityIcon').textContent  = '✅';
      document.getElementById('eligibilityTitle').textContent = 'Likely Eligible for Ayushman Bharat PM-JAY!';
      document.getElementById('eligibilityTitle').className   = 'text-lg font-bold text-green-700 dark:text-green-400 mb-1';
      document.getElementById('eligibilityText').textContent  = reason;
      document.getElementById('eligibilityLinks').innerHTML   = `
        <p class="font-semibold text-green-700 dark:text-green-400 mb-1">Next Steps:</p>
        <p>1. Call PM-JAY Helpline: <a href="tel:14555" class="font-bold text-primary-600">14555</a></p>
        <p>2. Visit nearest empanelled hospital with Aadhaar</p>
        <p>3. Check online: <a href="https://pmjay.gov.in" target="_blank" rel="noopener" class="text-primary-600 underline">pmjay.gov.in</a></p>`;
    } else {
      resultBox.className = 'mt-5 rounded-xl p-5 border-2 bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700';
      document.getElementById('eligibilityIcon').textContent  = '⚠️';
      document.getElementById('eligibilityTitle').textContent = 'May Not Qualify for PM-JAY';
      document.getElementById('eligibilityTitle').className   = 'text-lg font-bold text-amber-700 dark:text-amber-400 mb-1';
      document.getElementById('eligibilityText').textContent  = 'Based on your inputs you may not meet the PM-JAY criteria. However, many state governments offer additional health schemes.';
      document.getElementById('eligibilityLinks').innerHTML   = `
        <p>• Check State Health Insurance: contact your District CMO office</p>
        <p>• NPCDCS for Diabetes &amp; BP: free at all District Hospitals</p>
        <p>• Call 14555 to confirm – official verification recommended</p>`;
    }
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ── Symptom Checker ──────────────────────────────────────────────────────────
function buildSymptomCheckboxes() {
  const container = document.getElementById('symptomCheckboxes');
  if (!container) return;
  container.innerHTML = SYMPTOMS_DB.map(s => `
    <label class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
      <input type="checkbox" id="sym_${s.id}" value="${s.id}"
        class="w-4 h-4 rounded text-primary-600 border-gray-300 dark:border-gray-600 focus:ring-primary-500">
      <span class="text-sm text-gray-700 dark:text-gray-300">${s.label}</span>
    </label>`).join('');
}

function analyzeSymptoms() {
  const selected  = [...document.querySelectorAll('#symptomCheckboxes input:checked')].map(e => e.value);
  const duration  = document.getElementById('symptomDuration')?.value;
  const container = document.getElementById('symptomResults');
  if (!container) return;

  if (selected.length === 0) {
    container.innerHTML = '<p class="text-red-500 text-sm">Please select at least one symptom.</p>';
    return;
  }

  const DURATION_WEIGHT = { '1': 0.8, '2-3': 0.9, 'week': 1.0, 'weeks': 1.1, 'months': 1.2 };
  const weight = DURATION_WEIGHT[duration] || 1.0;

  const matches = Object.entries(DISEASE_MAP).map(([name, data]) => {
    const matchCount = selected.filter(s => data.symptoms.includes(s)).length;
    const score = matchCount > 0 ? ((matchCount / data.symptoms.length) * 100 * weight) : 0;
    return { name, score: Math.min(score, 100), ...data, matchCount };
  }).filter(m => m.score > 15).sort((a, b) => b.score - a.score);

  if (!matches.length) {
    container.innerHTML = `
      <div class="text-center py-8">
        <div class="text-4xl mb-3">✅</div>
        <p class="font-semibold text-gray-700 dark:text-gray-300">No major disease pattern detected.</p>
        <p class="text-sm text-gray-400 mt-1">Still feeling unwell? Visit your nearest PHC for a proper checkup.</p>
      </div>`;
    return;
  }

  const colorMap = { red:'red', orange:'orange', blue:'blue', purple:'purple', yellow:'yellow', green:'green' };
  container.innerHTML = `
    <p class="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 mb-4">
      ⚠️ These are <strong>possible</strong> conditions based on symptoms. This is NOT a diagnosis. See a doctor.
    </p>
    ${matches.slice(0, 3).map((m, i) => {
      const c = colorMap[m.color] || 'gray';
      return `
      <div class="mb-4 p-4 rounded-xl border bg-${c}-50 dark:bg-${c}-900/20 border-${c}-200 dark:border-${c}-700">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-2xl">${m.icon}</span>
            <span class="font-bold text-gray-800 dark:text-white">${m.name}</span>
            ${i === 0 ? '<span class="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full">Most likely</span>' : ''}
          </div>
          <span class="text-sm font-bold text-${c}-700 dark:text-${c}-400">${Math.round(m.score)}%</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-3">
          <div class="bg-${c}-500 h-1.5 rounded-full" style="width:${m.score}%"></div>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-400">
          <strong>Action:</strong> ${m.action}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          📞 Helpline: <a href="tel:${m.helpline}" class="font-bold text-primary-600">${m.helpline}</a>
        </p>
      </div>`;
    }).join('')}`;
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildSymptomCheckboxes();

  // Daily tip
  const tipEl = document.getElementById('dailyTip');
  if (tipEl) {
    const dayIdx = new Date().getDate() % HEALTH_TIPS.length;
    tipEl.textContent = HEALTH_TIPS[dayIdx];
    tipIndex = dayIdx;
  }

  // Handle URL hash navigation
  const hash = window.location.hash.replace('#', '');
  if (hash && ['diseases','prevention','maternal','schemes','checker'].includes(hash)) {
    showTab(hash);
  }
});