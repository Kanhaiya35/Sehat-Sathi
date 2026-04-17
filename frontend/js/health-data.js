/* ── Sehat Sathi – Health Page Card Data (All Languages) ────── */
'use strict'

const HEALTH_DATA = {

  /* ════════════════════════════ ENGLISH ════════════════════════════ */
  en: {

    diseases: [
      {
        id: 'malaria',
        name: 'Malaria',
        subtitle: 'Mosquito-borne parasitic disease (Plasmodium)',
        color: 'red',
        symptoms:   ['High fever with chills','Severe headache','Cyclic sweating (48–72 hrs)','Nausea & vomiting','Fatigue & anemia','Muscle / body ache'],
        prevention: ['Use ITN (treated nets)','Apply repellent cream','Drain stagnant water','Wear full-sleeve clothes','Indoor Residual Spraying'],
        treatment:  ['Free ACT drugs at PHC','Rapid Diagnostic Test (RDT)','Blood smear microscopy','Complete full course','Do NOT self-medicate'],
        emergency:  'Emergency: Very high fever >104°F | Unconsciousness | Seizures → Call 108'
      },
      {
        id: 'dengue',
        name: 'Dengue Fever',
        subtitle: 'Aedes aegypti mosquito viral infection',
        color: 'orange',
        symptoms:   ['Sudden high fever (104°F)','Severe headache','Pain behind eyes','Skin rash (3–5 days)','Joint & muscle pain','Low platelet count'],
        prevention: ['Remove all standing water','Cover water storage pots','Use mosquito nets daily','Aedes bites in daytime','Larvicide in containers'],
        treatment:  ['Abdominal pain','Persistent vomiting','Bleeding gums / nose','Blood in vomit / stool','→ Hospital immediately'],
        treatLabel: 'Danger Signs',
        emergency:  'No antiviral. Rest + fluids + paracetamol. Avoid Ibuprofen & Aspirin.'
      },
      {
        id: 'tb',
        name: 'Tuberculosis (TB)',
        subtitle: 'Bacterial airborne infection (Mycobacterium tuberculosis)',
        color: 'blue',
        symptoms:   ['Cough lasting >2 weeks','Blood-streaked sputum','Evening low-grade fever','Drenching night sweats','Unexplained weight loss','Extreme fatigue'],
        prevention: ['BCG vaccine at birth','Good ventilation at home','Cover mouth when coughing','Avoid overcrowding','Test close contacts'],
        treatment:  ['DOTS therapy (6 months)','Free drugs at all PHCs','Nikshay: ₹500/month DBT','TB-Free India by 2025 goal','Helpline: 1800-11-6666'],
        treatLabel: 'Free Treatment',
        emergency:  'TB is curable! Incomplete treatment causes Drug-Resistant TB (MDR-TB). Complete the full course.'
      },
      {
        id: 'diabetes',
        name: 'Diabetes (Madhumeh)',
        subtitle: 'Chronic metabolic condition – Type 1, Type 2, Gestational',
        color: 'purple',
        symptoms:   ['Frequent urination','Excessive thirst & hunger','Blurred vision','Slow-healing wounds','Numbness/tingling in feet','Unexplained weight loss'],
        prevention: ['Low sugar, low fat diet','30 min daily exercise','Maintain healthy weight','Quit tobacco & alcohol','Regular glucose test'],
        treatment:  ['Free insulin at NPCDCS','Metformin (generic, cheap)','Foot care daily','HbA1c every 3 months','Eye & kidney checkup yearly'],
        treatLabel: 'Management',
        emergency:  'NPCDCS: Free screening & treatment at District Hospitals. Helpline: 1800-180-1104'
      }
    ],

    diseasesCompact: [
      { name: 'Typhoid',             items: ['Sustained high fever (103–104°F)','Headache, weakness, stomach pain','Contaminated food / water','Free Widal test at PHC'] },
      { name: 'Jaundice (Hepatitis A/E)', items: ['Yellow skin & eyes (icterus)','Dark urine, pale stools','Contaminated drinking water','Boil water, Hepatitis A vaccine'] },
      { name: 'Diarrhea / Cholera',  items: ['Watery stools, dehydration','Vomiting, sunken eyes','ORS + Zinc treatment','Free ORS packets at Anganwadi'] }
    ],

    sym_label:  'Symptoms',
    prev_label: 'Prevention',
    trt_label:  'Treatment',

    prevention: [
      { title: 'Safe Drinking Water',     items: ['✅ Boil water for at least 1 minute','✅ Use chlorine tablets (govt. free)','✅ Use ORS for diarrhoea','✅ Cover stored water containers','❌ Don\'t drink from open wells'] },
      { title: 'Hand Hygiene',            items: ['✅ Wash with soap for 20 seconds','✅ Before eating & cooking','✅ After toilet use','✅ After handling animals','❌ Don\'t touch face with dirty hands'] },
      { title: 'Sanitation (Swachh Bharat)', items: ['✅ Use household toilet always','✅ IHHL toilet free for BPL families','✅ Dispose solid waste properly','✅ Keep surroundings clean','❌ No open defecation (ODF India)'] },
      { title: 'Balanced Nutrition',      items: ['✅ Seasonal fruits & vegetables','✅ Dal, rice, roti – daily','✅ Iron-rich foods during pregnancy','✅ Iodised salt only','❌ Limit junk food & sugary drinks'] },
      { title: 'Daily Exercise',          items: ['✅ 30 min walking / yoga daily','✅ Prevents BP, diabetes, obesity','✅ Cycling, farming also counts','✅ Good for mental health too','❌ Avoid sedentary lifestyle'] },
      { title: 'Tobacco & Alcohol Free',  items: ['❌ Tobacco → TB, lung cancer, oral cancer','❌ Alcohol → liver disease, family harm','✅ Quit helpline: 1800-11-2356 (iQuit)','✅ Free NRT patches at PHC','✅ Tobacco cessation clinics free'] },
      { title: 'Sleep & Mental Health',   items: ['✅ 7–8 hours of sleep nightly','✅ Regular sleep & wake time','✅ Meditation / deep breathing','✅ iCall helpline: 9152987821','✅ Vandrevala: 1860-2662-345'] },
      { title: 'Mosquito Control',        items: ['✅ Sleep under ITN net nightly','✅ Drain stagnant water weekly','✅ Wear full-sleeve clothes at dusk','✅ Use govt-distributed repellents','❌ Don\'t allow water stagnate >7 days'] },
      { title: 'Regular Health Checkups', items: ['✅ Annual BP & sugar screening','✅ Free at all govt. health centres','✅ ABHA Health ID for records','✅ Eye check every 2 years','✅ Cancer screening (Ayushman)'] }
    ],

    daily_tip_label: '💡 Daily Health Tip',
    next_tip_label:  'Next Tip →',

    schemes: [
      { name: 'Ayushman Bharat PM-JAY',  sub: 'Pradhan Mantri Jan Arogya Yojana',   desc: '₹5 lakh cover per family per year. 50 crore people. Cashless at 24,000+ hospitals. 1,929 procedures covered.', badge1: 'Pre-existing', badge1v: 'Covered Day 1', badge2: 'Helpline', badge2v: '14555', color: 'primary' },
      { name: 'Mission Indradhanush',     sub: 'National Immunization Mission',       desc: 'Full immunisation for 2 crore+ children & pregnant women. 12 vaccine-preventable diseases. Free at all PHC/CHC.', extra: ['✅ BCG, DPT, Polio, MMR, Hep-B, JE + more','✅ Intensified Mission Indradhanush (IMI 5.0)'], color: 'blue' },
      { name: 'PMMVY – Maternity Benefit',sub: 'Pradhan Mantri Matru Vandana Yojana',desc: '₹5,000 cash in 3 installments for first live birth. Direct bank transfer. Register through Anganwadi/ASHA.', extra: ['✅ ₹1,000 on registration | ₹2,000 at 6 months | ₹2,000 after delivery'], color: 'pink' },
      { name: 'Nikshay Poshan Yojana',    sub: 'TB Patient Nutritional Support',     desc: '₹500/month during TB treatment. Free DOTS medication. Aadhaar-linked DBT to patient account.', helpline: '1800-11-6666', color: 'teal' },
      { name: 'NPCDCS (NCD Programme)',   sub: 'Non-Communicable Diseases Control',  desc: 'Free screening & treatment for Diabetes, Hypertension, Cancer, CVD at all District Hospitals.', helpline: '1800-180-1104', color: 'purple' },
      { name: 'RBSK – Child Health Screening', sub: 'Rashtriya Bal Swasthya Karyakram', desc: 'Free health screening for 0–18 years. 4D defects covered. Free treatment up to ₹1 lakh via DEIC.', extra: ['✅ School & Anganwadi screening','✅ Free corrective surgeries included'], color: 'amber' }
    ],

    eligibility_title:  'Scheme Finder',
    eligibility_sub:    'Based on SECC 2011 criteria. Check if your family qualifies for ₹5 lakh health coverage.',
    el_income_label:    'Annual Family Income',
    el_income_opt:      ['Select income range','Below ₹1 Lakh per year','₹1 – ₹2.5 Lakh per year','Above ₹2.5 Lakh per year'],
    el_caste_label:     'Caste Category',
    el_caste_opt:       ['Select category','SC – Scheduled Caste','ST – Scheduled Tribe','OBC – Other Backward Class','General'],
    el_ration_label:    'Ration Card Type',
    el_ration_opt:      ['Select type','Antyodaya (AAY) – Poorest of poor','BPL – Below Poverty Line','APL – Above Poverty Line','No Ration Card'],
    el_occ_label:       'Occupation / Livelihood',
    el_occ_opt:         ['Select occupation','Daily wage agricultural labourer','Manual scavenger','Primitive tribal group','Legally released bonded labourer','Construction / brick kiln worker','Domestic worker / household help','Rag picker / street vendor','Salaried / Business / Other'],
    el_state_label:      'State/Union Territory',
    el_state_opt:        ['Select state/UT','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'],
    el_check_btn:       'Check My Eligibility →',
    helpline_label:     'Helpline',
  },

  /* ════════════════════════════ HINDI ════════════════════════════ */
  hi: {

    diseases: [
      {
        id: 'malaria', name: 'मलेरिया',
        subtitle: 'मच्छर जनित परजीवी रोग (प्लाज्मोडियम)',
        color: 'red',
        symptoms:   ['तेज बुखार और कंपकंपी','गंभीर सिरदर्द','चक्रीय पसीना (48–72 घंटे)','मतली और उल्टी','थकान और रक्ताल्पता','मांसपेशियों में दर्द'],
        prevention: ['ITN (उपचारित मच्छरदानी) का उपयोग करें','रिपेलेंट क्रीम लगाएं','रुके पानी को हटाएं','पूरी आस्तीन के कपड़े पहनें','घर के अंदर अवशिष्ट छिड़काव'],
        treatment:  ['PHC पर मुफ्त ACT दवाएं','रैपिड डायग्नोस्टिक टेस्ट (RDT)','ब्लड स्मियर माइक्रोस्कोपी','पूरा कोर्स पूरा करें','स्व-दवा न करें'],
        emergency:  'आपातकाल: बहुत तेज बुखार >104°F | बेहोशी | दौरे → 108 पर कॉल करें'
      },
      {
        id: 'dengue', name: 'डेंगू बुखार',
        subtitle: 'एडीज एजिप्टी मच्छर वायरल संक्रमण',
        color: 'orange',
        symptoms:   ['अचानक तेज बुखार (104°F)','गंभीर सिरदर्द','आंखों के पीछे दर्द','त्वचा पर चकत्ते (3–5 दिन)','जोड़ों और मांसपेशियों में दर्द','प्लेटलेट्स कम होना'],
        prevention: ['सभी खड़े पानी को हटाएं','पानी के बर्तन ढककर रखें','रोजाना मच्छरदानी का उपयोग करें','एडीज दिन में काटता है','कंटेनरों में लार्वानाशक डालें'],
        treatment:  ['पेट दर्द','लगातार उल्टी','मसूड़ों/नाक से खून','उल्टी/मल में खून','→ तुरंत अस्पताल जाएं'],
        treatLabel: 'खतरे के संकेत',
        emergency:  'कोई एंटीवायरल नहीं। आराम + तरल पदार्थ + पैरासिटामोल। इबुप्रोफेन और एस्पिरिन से बचें।'
      },
      {
        id: 'tb', name: 'तपेदिक (टीबी)',
        subtitle: 'जीवाणु वायुजनित संक्रमण (माइकोबैक्टीरियम ट्यूबरकुलोसिस)',
        color: 'blue',
        symptoms:   ['2 सप्ताह से अधिक खांसी','खून वाले बलगम','शाम को हल्का बुखार','रात में पसीना','अस्पष्ट वजन घटना','अत्यधिक थकान'],
        prevention: ['जन्म पर BCG टीका','घर में अच्छा वेंटिलेशन','खांसते समय मुंह ढकें','भीड़-भाड़ से बचें','करीबी संपर्कों की जांच करें'],
        treatment:  ['DOTS थेरेपी (6 महीने)','सभी PHC पर मुफ्त दवाएं','निक्षय: ₹500/माह DBT','2025 तक टीबी-मुक्त भारत लक्ष्य','हेल्पलाइन: 1800-11-6666'],
        treatLabel: 'मुफ्त इलाज',
        emergency:  'टीबी ठीक हो सकती है! अधूरा इलाज दवा-प्रतिरोधी टीबी (MDR-TB) का कारण बनता है।'
      },
      {
        id: 'diabetes', name: 'मधुमेह (शुगर)',
        subtitle: 'पुरानी चयापचय स्थिति – टाइप 1, टाइप 2, गर्भकालीन',
        color: 'purple',
        symptoms:   ['बार-बार पेशाब आना','अत्यधिक प्यास और भूख','धुंधली दृष्टि','धीरे ठीक होने वाले घाव','पैरों में सुन्नपन/झुनझुनाहट','अस्पष्ट वजन घटना'],
        prevention: ['कम चीनी, कम वसा वाला भोजन','30 मिनट रोजाना व्यायाम','स्वस्थ वजन बनाए रखें','तंबाकू और शराब छोड़ें','नियमित ग्लूकोज परीक्षण'],
        treatment:  ['NPCDCS में मुफ्त इंसुलिन','मेटफॉर्मिन (सस्ती जेनेरिक)','रोजाना पैरों की देखभाल','हर 3 महीने HbA1c','साल में एक बार आंख और किडनी जांच'],
        treatLabel: 'प्रबंधन',
        emergency:  'NPCDCS: जिला अस्पतालों में मुफ्त जांच और इलाज। हेल्पलाइन: 1800-180-1104'
      }
    ],

    diseasesCompact: [
      { name: 'टाइफाइड',          items: ['लगातार तेज बुखार (103–104°F)','सिरदर्द, कमजोरी, पेट दर्द','दूषित भोजन / पानी','PHC पर मुफ्त वाइडल टेस्ट'] },
      { name: 'पीलिया (हेपेटाइटिस A/E)', items: ['पीली त्वचा और आंखें','गहरा पेशाब, हल्के मल','दूषित पेयजल','पानी उबालें, हेपेटाइटिस A टीका'] },
      { name: 'दस्त / हैजा',      items: ['पानी जैसे मल, निर्जलीकरण','उल्टी, धंसी हुई आंखें','ORS + जिंक उपचार','आंगनवाड़ी में मुफ्त ORS पैकेट'] }
    ],

    sym_label:  'लक्षण',
    prev_label: 'बचाव',
    trt_label:  'इलाज',

    prevention: [
      { title: 'सुरक्षित पेयजल',        items: ['✅ पानी को कम से कम 1 मिनट उबालें','✅ क्लोरीन टेबलेट का उपयोग करें (सरकारी मुफ्त)','✅ दस्त के लिए ORS का उपयोग करें','✅ संग्रहीत पानी के बर्तनों को ढकें','❌ खुले कुएं का पानी न पिएं'] },
      { title: 'हाथ की स्वच्छता',       items: ['✅ 20 सेकंड तक साबुन से हाथ धोएं','✅ खाने से पहले और पकाते समय','✅ शौचालय उपयोग के बाद','✅ जानवरों को छूने के बाद','❌ गंदे हाथों से चेहरा न छुएं'] },
      { title: 'स्वच्छता (स्वच्छ भारत)', items: ['✅ हमेशा घरेलू शौचालय का उपयोग करें','✅ BPL परिवारों के लिए IHHL शौचालय मुफ्त','✅ ठोस कचरे का उचित निपटान करें','✅ आसपास साफ रखें','❌ खुले में शौच नहीं (ODF भारत)'] },
      { title: 'संतुलित पोषण',          items: ['✅ मौसमी फल और सब्जियां','✅ दाल, चावल, रोटी – रोजाना','✅ गर्भावस्था में आयरन युक्त भोजन','✅ केवल आयोडाइज्ड नमक','❌ जंक फूड और मीठे पेय सीमित करें'] },
      { title: 'दैनिक व्यायाम',         items: ['✅ रोजाना 30 मिनट चलना/योग','✅ BP, मधुमेह, मोटापे से बचाव','✅ साइकिल चलाना, खेती भी गिनती है','✅ मानसिक स्वास्थ्य के लिए भी अच्छा','❌ बैठे रहने से बचें'] },
      { title: 'तंबाकू और शराब मुक्त',  items: ['❌ तंबाकू → टीबी, फेफड़े का कैंसर','❌ शराब → लीवर रोग, परिवार को नुकसान','✅ छोड़ने हेल्पलाइन: 1800-11-2356','✅ PHC पर मुफ्त NRT पैच','✅ तंबाकू छोड़ने के क्लीनिक मुफ्त'] },
      { title: 'नींद और मानसिक स्वास्थ्य', items: ['✅ रात में 7–8 घंटे की नींद','✅ नियमित सोने और जागने का समय','✅ ध्यान / गहरी सांस लेना','✅ iCall हेल्पलाइन: 9152987821','✅ Vandrevala: 1860-2662-345'] },
      { title: 'मच्छर नियंत्रण',        items: ['✅ रात को ITN मच्छरदानी के नीचे सोएं','✅ हर हफ्ते रुका हुआ पानी निकालें','✅ शाम को पूरी आस्तीन के कपड़े पहनें','✅ सरकारी रिपेलेंट का उपयोग करें','❌ 7 दिन से अधिक पानी न रुकने दें'] },
      { title: 'नियमित स्वास्थ्य जांच',  items: ['✅ वार्षिक BP और ब्लड शुगर जांच','✅ सभी सरकारी स्वास्थ्य केंद्रों पर मुफ्त','✅ रिकॉर्ड के लिए ABHA हेल्थ ID','✅ हर 2 साल में आंखों की जांच','✅ आयुष्मान के तहत कैंसर स्क्रीनिंग'] }
    ],

    daily_tip_label: '💡 आज का स्वास्थ्य सुझाव',
    next_tip_label:  'अगला सुझाव →',

    schemes: [
      { name: 'आयुष्मान भारत PM-JAY',   sub: 'प्रधानमंत्री जन आरोग्य योजना',    desc: 'प्रति परिवार प्रति वर्ष ₹5 लाख कवर। 50 करोड़ लोग। 24,000+ अस्पतालों में कैशलेस। 1,929 प्रक्रियाएं।', badge1: 'पूर्व रोग', badge1v: 'पहले दिन से', badge2: 'हेल्पलाइन', badge2v: '14555', color: 'primary' },
      { name: 'मिशन इंद्रधनुष',         sub: 'राष्ट्रीय टीकाकरण मिशन',            desc: '2 करोड़+ बच्चों और गर्भवती महिलाओं का पूर्ण टीकाकरण। 12 वैक्सीन-रोकथाम योग्य बीमारियां। सभी PHC/CHC पर मुफ्त।', extra: ['✅ BCG, DPT, पोलियो, MMR, हेप-B, JE + अन्य','✅ इंटेंसिफाइड मिशन इंद्रधनुष (IMI 5.0)'], color: 'blue' },
      { name: 'PMMVY – मातृत्व लाभ',    sub: 'प्रधानमंत्री मातृ वंदना योजना',   desc: 'पहले जीवित बच्चे के लिए 3 किस्तों में ₹5,000 नकद। सीधे बैंक खाते में। आंगनवाड़ी/ASHA के माध्यम से आवेदन।', extra: ['✅ नामांकन पर ₹1,000 | 6 महीने पर ₹2,000 | प्रसव के बाद ₹2,000'], color: 'pink' },
      { name: 'निक्षय पोषण योजना',      sub: 'TB रोगी पोषण सहायता',             desc: 'टीबी उपचार के दौरान ₹500/माह। मुफ्त DOTS दवा। आधार-लिंक्ड DBT।', helpline: '1800-11-6666', color: 'teal' },
      { name: 'NPCDCS (NCD कार्यक्रम)', sub: 'गैर-संचारी रोग नियंत्रण',         desc: 'जिला अस्पतालों में मधुमेह, उच्च रक्तचाप, कैंसर की मुफ्त जांच और इलाज।', helpline: '1800-180-1104', color: 'purple' },
      { name: 'RBSK – बाल स्वास्थ्य',   sub: 'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम', desc: '0–18 वर्ष के लिए मुफ्त स्वास्थ्य जांच। DEIC के माध्यम से ₹1 लाख तक मुफ्त इलाज।', extra: ['✅ स्कूल और आंगनवाड़ी स्क्रीनिंग','✅ मुफ्त सुधारात्मक सर्जरी शामिल'], color: 'amber' }
    ],

    eligibility_title: 'योजना खोजें',
    eligibility_sub:   'SECC 2011 मानदंडों के आधार पर। जांचें कि क्या आपका परिवार ₹5 लाख स्वास्थ्य कवरेज के लिए योग्य है।',
    el_income_label:   'वार्षिक पारिवारिक आय',
    el_income_opt:     ['आय सीमा चुनें','₹1 लाख प्रति वर्ष से कम','₹1 – ₹2.5 लाख प्रति वर्ष','₹2.5 लाख प्रति वर्ष से अधिक'],
    el_caste_label:    'जाति वर्ग',
    el_caste_opt:      ['वर्ग चुनें','SC – अनुसूचित जाति','ST – अनुसूचित जनजाति','OBC – अन्य पिछड़ा वर्ग','सामान्य'],
    el_ration_label:   'राशन कार्ड प्रकार',
    el_ration_opt:     ['प्रकार चुनें','अंत्योदय (AAY) – सबसे गरीब','BPL – गरीबी रेखा से नीचे','APL – गरीबी रेखा से ऊपर','कोई राशन कार्ड नहीं'],
    el_occ_label:      'व्यवसाय / आजीविका',
    el_occ_opt:        ['व्यवसाय चुनें','दैनिक मजदूर कृषि मजदूर','हाथ से मैला ढोने वाला','आदिम जनजातीय समूह','कानूनी रूप से मुक्त बंधुआ मजदूर','निर्माण / ईंट-भट्ठा मजदूर','घरेलू कामगार / घर में सहायक','कूड़ा बीनने वाला / रेहड़ी-पटरी वाला','वेतनभोगी / व्यवसाय / अन्य'],
     el_state_label:      'State/Union Territory',
    el_state_opt:        ['Select state/UT','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'],
    el_check_btn:      'मेरी पात्रता जांचें →',
    helpline_label:    'हेल्पलाइन',
  },

  /* ════════════════════════════ MARATHI ════════════════════════════ */
  mr: {

    diseases: [
      { id:'malaria', name:'मलेरिया', subtitle:'डास-जनित परजीवी रोग (प्लाझमोडियम)', color:'red',
        symptoms:['तीव्र ताप आणि थंडी वाजणे','तीव्र डोकेदुखी','चक्रीय घाम (48–72 तास)','मळमळ आणि उलटी','थकवा आणि अनिमिया','स्नायू / शरीर दुखणे'],
        prevention:['ITN (उपचारित मच्छरदाणी) वापरा','रिपेलेंट क्रीम लावा','साचलेले पाणी काढा','पूर्ण बाह्यांचे कपडे घाला','घरातील अवशिष्ट फवारणी'],
        treatment:['PHC वर मोफत ACT औषधे','जलद निदान चाचणी (RDT)','रक्त स्मीअर सूक्ष्मदर्शन','पूर्ण कोर्स पूर्ण करा','स्व-उपचार करू नका'],
        emergency:'आणीबाणी: खूप तेज ताप >104°F | बेशुद्धी | दौरे → 108 वर कॉल करा' },
      { id:'dengue', name:'डेंग्यू ताप', subtitle:'एडीस एजिप्टी डासांचा विषाणू संसर्ग', color:'orange',
        symptoms:['अचानक तेज ताप (104°F)','तीव्र डोकेदुखी','डोळ्यांमागे वेदना','त्वचेवर पुरळ (3–5 दिवस)','सांधे आणि स्नायू दुखणे','प्लेटलेट कमी होणे'],
        prevention:['सर्व साचलेले पाणी काढा','पाण्याचे भांडे झाकून ठेवा','रोज मच्छरदाणी वापरा','एडीस दिवसा चावतो','कंटेनरमध्ये लार्व्हानाशक घाला'],
        treatment:['पोटदुखी','सतत उलटी','हिरड्या/नाकातून रक्त','उलटी/मलात रक्त','→ ताबडतोब रुग्णालयात जा'],
        treatLabel:'धोक्याचे संकेत',
        emergency:'अँटीव्हायरल नाही. आराम + द्रव + पॅरासिटामॉल. इबुप्रोफेन आणि ऍस्पिरिन टाळा.' },
      { id:'tb', name:'क्षयरोग (TB)', subtitle:'जीवाणूजन्य वायुजनित संसर्ग (मायकोबॅक्टेरियम ट्यूबरक्युलोसिस)', color:'blue',
        symptoms:['2 आठवड्यांपेक्षा जास्त खोकला','रक्तमिश्रित थुंकी','संध्याकाळी सौम्य ताप','रात्री भरपूर घाम','अस्पष्ट वजन कमी होणे','अत्यंत थकवा'],
        prevention:['जन्माच्या वेळी BCG लस','घरात चांगले वायुवीजन','खोकताना तोंड झाका','गर्दी टाळा','जवळच्या संपर्कांची तपासणी करा'],
        treatment:['DOTS थेरपी (6 महिने)','सर्व PHC वर मोफत औषधे','निक्षय: ₹500/महिना DBT','2025 पर्यंत TB-मुक्त भारत ध्येय','हेल्पलाइन: 1800-11-6666'],
        treatLabel:'मोफत उपचार',
        emergency:'TB बरा होतो! अपूर्ण उपचारामुळे औषध-प्रतिरोधक TB (MDR-TB) होतो. पूर्ण कोर्स घ्या.' },
      { id:'diabetes', name:'मधुमेह (साखर)', subtitle:'दीर्घकालीन चयापचय स्थिती – टाइप 1, टाइप 2, गर्भकालीन', color:'purple',
        symptoms:['वारंवार लघवी होणे','अति तहान आणि भूक','अंधुक दिसणे','हळू बरे होणारे जखमा','पायांमध्ये सुन्नपणा/मुंग्या','अस्पष्ट वजन कमी'],
        prevention:['कमी साखर, कमी चरबीयुक्त आहार','रोज 30 मिनिटे व्यायाम','निरोगी वजन राखा','तंबाखू व दारू सोडा','नियमित ग्लुकोज चाचणी'],
        treatment:['NPCDCS मध्ये मोफत इन्सुलिन','मेटफॉर्मिन (स्वस्त जेनेरिक)','रोज पायांची काळजी','दर 3 महिन्यांनी HbA1c','वार्षिक डोळे व किडनी तपासणी'],
        treatLabel:'व्यवस्थापन',
        emergency:'NPCDCS: जिल्हा रुग्णालयांमध्ये मोफत तपासणी. हेल्पलाइन: 1800-180-1104' }
    ],

    diseasesCompact: [
      { name:'टायफॉइड', items:['सतत तेज ताप (103–104°F)','डोकेदुखी, अशक्तपणा, पोटदुखी','दूषित अन्न / पाणी','PHC वर मोफत वाइडल चाचणी'] },
      { name:'कावीळ (हिपॅटायटिस A/E)', items:['पिवळी त्वचा आणि डोळे','गडद लघवी, फिकट मल','दूषित पेयजल','पाणी उकळा, हिपॅटायटिस A लस'] },
      { name:'जुलाब / कॉलरा', items:['पाण्यासारखे जुलाब, निर्जलीकरण','उलटी, खोल गेलेले डोळे','ORS + झिंक उपचार','अंगणवाडीत मोफत ORS पॅकेट'] }
    ],

    sym_label:'लक्षणे', prev_label:'प्रतिबंध', trt_label:'उपचार',

    prevention: [
      { title:'सुरक्षित पेयजल', items:['✅ पाणी किमान 1 मिनिट उकळा','✅ क्लोरीन टॅब्लेट वापरा (सरकारी मोफत)','✅ जुलाबासाठी ORS वापरा','✅ साठवलेल्या पाण्याचे भांडे झाका','❌ उघड्या विहिरीचे पाणी पिऊ नका'] },
      { title:'हात स्वच्छता', items:['✅ 20 सेकंद साबणाने हात धुवा','✅ जेवण्यापूर्वी आणि स्वयंपाकात','✅ शौचालयानंतर','✅ प्राण्यांना स्पर्श केल्यानंतर','❌ घाणेरड्या हातांनी चेहरा स्पर्श करू नका'] },
      { title:'स्वच्छता (स्वच्छ भारत)', items:['✅ नेहमी घरचे शौचालय वापरा','✅ BPL कुटुंबांसाठी IHHL मोफत','✅ घनकचरा योग्य प्रकारे विल्हेवाट लावा','✅ परिसर स्वच्छ ठेवा','❌ उघड्यावर शौच करू नका (ODF भारत)'] },
      { title:'संतुलित पोषण', items:['✅ मोसमी फळे आणि भाज्या','✅ डाळ, भात, भाकरी – दररोज','✅ गर्भारपणात लोहयुक्त आहार','✅ फक्त आयोडाइज्ड मीठ','❌ जंक फूड आणि गोड पेये कमी करा'] },
      { title:'दैनंदिन व्यायाम', items:['✅ रोज 30 मिनिटे चालणे/योग','✅ BP, मधुमेह, लठ्ठपणा रोखतो','✅ सायकलिंग, शेती देखील गणना होते','✅ मानसिक आरोग्यासाठी देखील चांगले','❌ बसून राहणे टाळा'] },
      { title:'तंबाखू आणि दारू मुक्त', items:['❌ तंबाखू → TB, फुफ्फुस कर्करोग','❌ दारू → यकृत रोग, कुटुंबाला हानी','✅ सोडण्याची हेल्पलाइन: 1800-11-2356','✅ PHC वर मोफत NRT पॅच','✅ तंबाखू सोडणे क्लिनिक मोफत'] },
      { title:'झोप आणि मानसिक आरोग्य', items:['✅ रात्री 7–8 तास झोप','✅ नियमित झोपण्याची आणि उठण्याची वेळ','✅ ध्यान / दीर्घ श्वास','✅ iCall हेल्पलाइन: 9152987821','✅ Vandrevala: 1860-2662-345'] },
      { title:'डास नियंत्रण', items:['✅ रात्री ITN मच्छरदाणीखाली झोपा','✅ दर आठवड्याला साचलेले पाणी काढा','✅ संध्याकाळी पूर्ण बाह्यांचे कपडे घाला','✅ सरकारी रिपेलेंट वापरा','❌ 7 दिवसांपेक्षा जास्त पाणी साचू देऊ नका'] },
      { title:'नियमित आरोग्य तपासणी', items:['✅ वार्षिक BP आणि साखर तपासणी','✅ सर्व सरकारी आरोग्य केंद्रांवर मोफत','✅ रेकॉर्डसाठी ABHA हेल्थ ID','✅ दर 2 वर्षांनी डोळ्यांची तपासणी','✅ आयुष्मान अंतर्गत कर्करोग स्क्रीनिंग'] }
    ],

    daily_tip_label:'💡 आजचा आरोग्य सल्ला', next_tip_label:'पुढील सल्ला →',

    schemes: [
      { name:'आयुष्मान भारत PM-JAY', sub:'प्रधानमंत्री जन आरोग्य योजना', desc:'दरवर्षी प्रति कुटुंब ₹5 लाख कव्हर. 50 कोटी लोक. 24,000+ रुग्णालयांमध्ये रोखमुक्त उपचार.', badge1:'जुने आजार', badge1v:'पहिल्या दिवसापासून', badge2:'हेल्पलाइन', badge2v:'14555', color:'primary' },
      { name:'मिशन इंद्रधनुष', sub:'राष्ट्रीय लसीकरण मोहीम', desc:'2 कोटी+ मुले व गर्भवती महिलांचे पूर्ण लसीकरण. 12 लस-प्रतिबंधित रोग. सर्व PHC/CHC वर मोफत.', extra:['✅ BCG, DPT, पोलिओ, MMR, हेप-B, JE + अधिक','✅ इंटेन्सिफाइड मिशन इंद्रधनुष (IMI 5.0)'], color:'blue' },
      { name:'PMMVY – मातृत्व लाभ', sub:'प्रधानमंत्री मातृ वंदना योजना', desc:'पहिल्या जिवंत बाळासाठी 3 हप्त्यांमध्ये ₹5,000. थेट बँक खात्यात. आंगणवाडी/ASHA द्वारे अर्ज करा.', extra:['✅ नोंदणीवर ₹1,000 | 6 महिन्यांत ₹2,000 | प्रसूतीनंतर ₹2,000'], color:'pink' },
      { name:'निक्षय पोषण योजना', sub:'TB रुग्ण पोषण आधार', desc:'TB उपचारादरम्यान ₹500/महिना. मोफत DOTS औषध. आधार-लिंक्ड DBT.', helpline:'1800-11-6666', color:'teal' },
      { name:'NPCDCS (NCD कार्यक्रम)', sub:'असंसर्गजन्य रोग नियंत्रण', desc:'जिल्हा रुग्णालयांमध्ये मधुमेह, उच्च रक्तदाब, कर्करोगाची मोफत तपासणी.', helpline:'1800-180-1104', color:'purple' },
      { name:'RBSK – बाल आरोग्य तपासणी', sub:'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम', desc:'0–18 वयोगटासाठी मोफत आरोग्य तपासणी. DEIC द्वारे ₹1 लाखापर्यंत मोफत उपचार.', extra:['✅ शाळा आणि अंगणवाडी स्क्रीनिंग','✅ मोफत सुधारात्मक शस्त्रक्रिया समाविष्ट'], color:'amber' }
    ],

    eligibility_title:'योजना शोधक', eligibility_sub:'SECC 2011 निकषांवर आधारित. तुमचे कुटुंब ₹5 लाख आरोग्य कव्हरेजसाठी पात्र आहे का ते तपासा.',
    el_income_label:'वार्षिक कौटुंबिक उत्पन्न', el_income_opt:['उत्पन्न श्रेणी निवडा','₹1 लाख प्रतिवर्षापेक्षा कमी','₹1 – ₹2.5 लाख प्रतिवर्ष','₹2.5 लाखपेक्षा जास्त'],
    el_caste_label:'जाती प्रवर्ग', el_caste_opt:['प्रवर्ग निवडा','SC – अनुसूचित जाती','ST – अनुसूचित जमाती','OBC – इतर मागास वर्ग','सामान्य'],
    el_ration_label:'रेशन कार्ड प्रकार', el_ration_opt:['प्रकार निवडा','अंत्योदय (AAY)','BPL – दारिद्र्यरेषेखाली','APL – दारिद्र्यरेषेवर','रेशन कार्ड नाही'],
    el_occ_label:'व्यवसाय / उपजीविका', el_occ_opt:['व्यवसाय निवडा','दैनिक मजुरी शेतमजूर','हाताने मैला साफ करणारा','आदिम जमाती समूह','बंधमुक्त कामगार','बांधकाम / विटभट्टी कामगार','घरकाम करणारा','कचरा गोळा करणारा / फेरीवाला','पगारदार / व्यवसाय / इतर'],
    el_state_label:'State/Union Territory', el_state_opt:['Select state/UT','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'],
    el_check_btn:'माझी पात्रता तपासा →', helpline_label:'हेल्पलाइन',
  },

  /* ════════════════════════════ TAMIL ════════════════════════════ */
  ta: {
    diseases: [
      { id:'malaria', name:'மலேரியா', subtitle:'கொசு மூலம் பரவும் ஒட்டுண்ணி நோய் (பிளாஸ்மோடியம்)', color:'red',
        symptoms:['அதிக காய்ச்சல் மற்றும் நடுக்கம்','கடுமையான தலைவலி','சுழற்சி வியர்வை (48–72 மணி)','குமட்டல் மற்றும் வாந்தி','சோர்வு மற்றும் இரத்த சோகை','தசை வலி'],
        prevention:['ITN (சிகிச்சை செய்யப்பட்ட கொசு வலை)','விரட்டும் கிரீம் தடவுங்கள்','தேங்கிய நீரை வடிக்கட்டுங்கள்','முழு கை ஆடை அணியுங்கள்','உள்ளக மீதி தெளிப்பு'],
        treatment:['PHC-ல் இலவச ACT மருந்துகள்','விரைவான நோய் கண்டறிதல் சோதனை','இரத்த படர்மா நுண்ணோக்கி','முழு படிப்பை முடியுங்கள்','சுய-மருந்து எடுக்கவேண்டாம்'],
        emergency:'அவசரம்: மிக அதிக காய்ச்சல் >104°F | மயக்கம் | வலிப்பு → 108 அழைக்கவும்' },
      { id:'dengue', name:'டெங்கு காய்ச்சல்', subtitle:'ஏடிஸ் ஈஜிப்டி கொசு வைரஸ் தொற்று', color:'orange',
        symptoms:['திடீர் அதிக காய்ச்சல் (104°F)','கடுமையான தலைவலி','கண்களுக்கு பின்னால் வலி','தோல் தடிப்புகள் (3–5 நாட்கள்)','மூட்டு மற்றும் தசை வலி','குறைந்த தட்டணு எண்ணிக்கை'],
        prevention:['அனைத்து தேங்கிய நீரை அகற்றுங்கள்','நீர் சேமிப்பு பாத்திரங்களை மூடுங்கள்','தினமும் கொசு வலை பயன்படுத்துங்கள்','ஏடிஸ் பகலில் கடிக்கிறது','கொள்கலன்களில் லார்விசைட்'],
        treatment:['வயிற்று வலி','தொடர் வாந்தி','ஈறு/மூக்கில் இரத்தம்','வாந்தி/மலத்தில் இரத்தம்','→ உடனடியாக மருத்துவமனை'],
        treatLabel:'ஆபத்து அறிகுறிகள்',
        emergency:'ஆன்டிவைரல் இல்லை. ஓய்வு + திரவம் + பாராசிட்டமால். இபுப்ரோஃபன் & ஆஸ்பிரின் தவிர்க்கவும்.' },
      { id:'tb', name:'காசநோய் (TB)', subtitle:'பாக்டீரியா காற்று மூலம் பரவும் தொற்று', color:'blue',
        symptoms:['>2 வாரங்கள் இருமல்','இரத்தமான சளி','மாலையில் சுரம்','இரவில் அதிக வியர்வை','விவரிக்க முடியாத எடை இழப்பு','தீவிர சோர்வு'],
        prevention:['பிறப்பில் BCG தடுப்பூசி','வீட்டில் நல்ல காற்றோட்டம்','இருமும்போது வாயை மூடுங்கள்','கூட்டத்தை தவிர்க்கவும்','நெருங்கிய தொடர்புகளை சோதிக்கவும்'],
        treatment:['DOTS சிகிச்சை (6 மாதங்கள்)','அனைத்து PHC-ல் இலவச மருந்துகள்','நிக்ஷய்: ₹500/மாதம் DBT','2025-ல் TB-இல்லாத இந்தியா','ஹெல்ப்லைன்: 1800-11-6666'],
        treatLabel:'இலவச சிகிச்சை',
        emergency:'TB குணமாகும்! முழுமையற்ற சிகிச்சை மருந்து-எதிர்ப்பு TB-க்கு வழிவகுக்கும். முழு படிப்பை முடியுங்கள்.' },
      { id:'diabetes', name:'நீரிழிவு நோய்', subtitle:'நாள்பட்ட வளர்சிதைமாற்ற நிலை – வகை 1, வகை 2, கர்ப்பகால', color:'purple',
        symptoms:['அடிக்கடி சிறுநீர் போகுதல்','அதிகப்படியான தாகம் மற்றும் பசி','மங்கலான பார்வை','மெதுவாக குணமாகும் காயங்கள்','கால்களில் மரமம்/கூச்சம்','விவரிக்க முடியாத எடை இழப்பு'],
        prevention:['குறைந்த சர்க்கரை, குறைந்த கொழுப்பு உணவு','30 நிமிடம் தினசரி உடற்பயிற்சி','ஆரோக்கியமான எடை பராமரிக்கவும்','புகையிலை மற்றும் ஆல்கஹால் விடுங்கள்','வழக்கமான குளுக்கோஸ் சோதனை'],
        treatment:['NPCDCS-ல் இலவச இன்சுலின்','மெட்ஃபார்மின் (மலிவான பொதுவான)','தினசரி கால் பராமரிப்பு','3 மாதங்களுக்கு ஒருமுறை HbA1c','ஆண்டுக்கு ஒருமுறை கண் மற்றும் சிறுநீரக பரிசோதனை'],
        treatLabel:'மேலாண்மை',
        emergency:'NPCDCS: மாவட்ட மருத்துவமனைகளில் இலவச சோதனை. ஹெல்ப்லைன்: 1800-180-1104' }
    ],
    diseasesCompact: [
      { name:'டைஃபாய்டு', items:['தொடர் அதிக காய்ச்சல் (103–104°F)','தலைவலி, பலவீனம், வயிற்று வலி','மாசுபட்ட உணவு / நீர்','PHC-ல் இலவச வைடல் சோதனை'] },
      { name:'மஞ்சள் காமாலை (ஹெபடைட்டிஸ் A/E)', items:['மஞ்சள் நிற தோல் மற்றும் கண்கள்','இருண்ட சிறுநீர், வெளிர் மலம்','மாசுபட்ட குடிநீர்','நீரை கொதிக்கவையுங்கள், ஹெபடைட்டிஸ் A தடுப்பூசி'] },
      { name:'வயிற்றுப்போக்கு / காலரா', items:['நீரான மலம், நீரிழப்பு','வாந்தி, மூழ்கிய கண்கள்','ORS + ஜிங்க் சிகிச்சை','அங்கன்வாடியில் இலவச ORS தொகுப்புகள்'] }
    ],
    sym_label:'அறிகுறிகள்', prev_label:'தடுப்பு', trt_label:'சிகிச்சை',
    prevention: [
      { title:'பாதுகாப்பான குடிநீர்', items:['✅ குறைந்தது 1 நிமிடம் நீரை கொதிக்கவையுங்கள்','✅ குளோரின் மாத்திரைகள் பயன்படுத்துங்கள்','✅ வயிற்றுப்போக்கிற்கு ORS','✅ சேமித்த நீரை மூடி வையுங்கள்','❌ திறந்த கிணற்று நீர் குடிக்கவேண்டாம்'] },
      { title:'கை சுகாதாரம்', items:['✅ 20 வினாடிகள் சோப்பால் கழுவுங்கள்','✅ சாப்பிடுவதற்கு முன் & சமைக்கும்போது','✅ கழிவறை பயன்பாட்டிற்கு பிறகு','✅ விலங்குகளை தொட்ட பிறகு','❌ அழுக்கான கைகளால் முகத்தை தொடவேண்டாம்'] },
      { title:'சுகாதாரம் (சுவச்ச பாரத்)', items:['✅ எப்போதும் வீட்டு கழிவறை பயன்படுத்துங்கள்','✅ BPL குடும்பங்களுக்கு IHHL இலவசம்','✅ திடக்கழிவை சரியாக அகற்றுங்கள்','✅ சுற்றுப்புறத்தை சுத்தமாக வையுங்கள்','❌ வெளியில் மலம் கழிக்கவேண்டாம்'] },
      { title:'சீரான ஊட்டச்சத்து', items:['✅ பருவகால பழங்கள் & காய்கறிகள்','✅ பருப்பு, சோறு, ரொட்டி – தினமும்','✅ கர்ப்பத்தில் இரும்புச்சத்து உணவுகள்','✅ ஆயோடைஸ் உப்பு மட்டும்','❌ ஜங்க் உணவு & இனிப்பு பானங்கள் குறைக்கவும்'] },
      { title:'தினசரி உடற்பயிற்சி', items:['✅ 30 நிமிடம் நடை/யோகா தினமும்','✅ BP, நீரிழிவு, உடல்பருமன் தடுக்கிறது','✅ சைக்கிள், விவசாயமும் கணக்கு','✅ மன ஆரோக்கியத்திற்கும் நல்லது','❌ உட்கார்ந்திருக்கும் வாழ்க்கை தவிர்க்கவும்'] },
      { title:'புகையிலை & ஆல்கஹால் இல்லாமல்', items:['❌ புகையிலை → TB, நுரையீரல் புற்றுநோய்','❌ ஆல்கஹால் → கல்லீரல் நோய்','✅ விடுவதற்கான ஹெல்ப்லைன்: 1800-11-2356','✅ PHC-ல் இலவச NRT இணைப்புகள்','✅ புகையிலை நிறுத்தும் கிளினிக்கள் இலவசம்'] },
      { title:'தூக்கம் & மனநலம்', items:['✅ இரவில் 7–8 மணி நேரம் தூக்கம்','✅ வழக்கமான தூக்கம் & விழிப்பு நேரம்','✅ தியானம் / ஆழமான சுவாசம்','✅ iCall ஹெல்ப்லைன்: 9152987821','✅ Vandrevala: 1860-2662-345'] },
      { title:'கொசு கட்டுப்பாடு', items:['✅ இரவில் ITN வலையில் தூங்குங்கள்','✅ வாராந்திரம் தேங்கிய நீரை வடிக்கட்டுங்கள்','✅ மாலையில் முழு கை ஆடை அணியுங்கள்','✅ அரசு விரட்டும் திரவம் பயன்படுத்துங்கள்','❌ 7 நாட்களுக்கும் மேல் நீர் தேங்க விடாதீர்கள்'] },
      { title:'வழக்கமான உடல் பரிசோதனை', items:['✅ ஆண்டு BP & சர்க்கரை சோதனை','✅ அனைத்து அரசு சுகாதார மையங்களில் இலவசம்','✅ பதிவுகளுக்கு ABHA ஹெல்த் ID','✅ 2 ஆண்டுகளுக்கு ஒருமுறை கண் பரிசோதனை','✅ ஆயுஷ்மான் கீழ் புற்றுநோய் திரையிடல்'] }
    ],
    daily_tip_label:'💡 இன்றைய சுகாதார குறிப்பு', next_tip_label:'அடுத்த குறிப்பு →',
    schemes: [
      { name:'ஆயுஷ்மான் பாரத் PM-JAY', sub:'பிரதான் மந்திரி ஜன் ஆரோக்கியா யோஜனா', desc:'குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் கவரேஜ். 50 கோடி மக்கள். 24,000+ மருத்துவமனைகளில் பண-இல்லா சிகிச்சை.', badge1:'முன்பிருந்த நோய்', badge1v:'முதல் நாளிலிருந்து', badge2:'ஹெல்ப்லைன்', badge2v:'14555', color:'primary' },
      { name:'மிஷன் இந்திரதனுஷ்', sub:'தேசிய தடுப்பூசி திட்டம்', desc:'2 கோடி+ குழந்தைகள் & கர்ப்பிணி பெண்களுக்கு முழு தடுப்பூசி. 12 தடுக்கக்கூடிய நோய்கள். அனைத்து PHC/CHC-ல் இலவசம்.', extra:['✅ BCG, DPT, போலியோ, MMR, ஹெப்-B, JE + மேலும்','✅ தீவிரப்படுத்தப்பட்ட மிஷன் இந்திரதனுஷ் (IMI 5.0)'], color:'blue' },
      { name:'PMMVY – மகப்பேறு நலன்', sub:'பிரதான் மந்திரி மாதிரு வந்தன யோஜனா', desc:'முதல் உயிருள்ள பிறப்புக்கு 3 தவணைகளில் ₹5,000. நேரடி வங்கி பரிமாற்றம். அங்கன்வாடி/ASHA மூலம் பதிவு செய்யுங்கள்.', extra:['✅ பதிவில் ₹1,000 | 6 மாதத்தில் ₹2,000 | பிரசவத்திற்கு பிறகு ₹2,000'], color:'pink' },
      { name:'நிக்ஷய் போஷன் யோஜனா', sub:'TB நோயாளி ஊட்டச்சத்து ஆதரவு', desc:'TB சிகிச்சையில் ₹500/மாதம். இலவச DOTS மருந்து. ஆதார்-இணைக்கப்பட்ட DBT.', helpline:'1800-11-6666', color:'teal' },
      { name:'NPCDCS (NCD திட்டம்)', sub:'தொற்றா நோய்கள் கட்டுப்பாடு', desc:'மாவட்ட மருத்துவமனைகளில் நீரிழிவு, உயர் இரத்த அழுத்தம், புற்றுநோய் இலவச திரையிடல் & சிகிச்சை.', helpline:'1800-180-1104', color:'purple' },
      { name:'RBSK – குழந்தை சுகாதார திரையிடல்', sub:'ராஷ்ட்ரிய பால் சுவாஸ்த்ய காரியக்ரம்', desc:'0–18 வயதிற்கு இலவச சுகாதார திரையிடல். DEIC மூலம் ₹1 லட்சம் வரை இலவச சிகிச்சை.', extra:['✅ பள்ளி & அங்கன்வாடி திரையிடல்','✅ இலவச திருத்திய அறுவை சிகிச்சைகள் சேர்க்கப்பட்டுள்ளன'], color:'amber' }
    ],
    eligibility_title:'திட்டம் கண்டுபிடிப்பான்', eligibility_sub:'SECC 2011 அளவுகோல்களின் அடிப்படையில். உங்கள் குடும்பம் ₹5 லட்சம் சுகாதார கவரேஜிற்கு தகுதியுடையதா என சோதிக்கவும்.',
    el_income_label:'ஆண்டு குடும்ப வருமானம்', el_income_opt:['வருமான வரம்பை தேர்ந்தெடுங்கள்','₹1 லட்சத்திற்கும் குறைவு','₹1 – ₹2.5 லட்சம்','₹2.5 லட்சத்திற்கும் அதிகம்'],
    el_caste_label:'சாதி பிரிவு', el_caste_opt:['பிரிவை தேர்ந்தெடுங்கள்','SC – பட்டியல் சாதி','ST – பட்டியல் பழங்குடி','OBC – பிற பின்தங்கிய வகுப்பு','பொது'],
    el_ration_label:'ரேஷன் அட்டை வகை', el_ration_opt:['வகையை தேர்ந்தெடுங்கள்','அந்தோதய (AAY)','BPL – வறுமை கோட்டிற்கு கீழ்','APL – வறுமை கோட்டிற்கு மேல்','ரேஷன் அட்டை இல்லை'],
    el_occ_label:'தொழில் / வாழ்வாதாரம்', el_occ_opt:['தொழிலை தேர்ந்தெடுங்கள்','தினக்கூலி விவசாயி','கையால் கழிவு நீக்குபவர்','ஆதிவாசி குழு','கட்டாயமிழந்த தொழிலாளர்','கட்டுமான / செங்கல் சூளை தொழிலாளர்','வீட்டு வேலையாள்','குப்பை பொறுக்குபவர் / தெரு வியாபாரி','சம்பள / வியாபாரம் / மற்றவை'],
    el_state_label:'State/Union Territory',
    el_state_opt:['Select state/UT','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'],
    el_check_btn:'என் தகுதியை சோதிக்கவும் →', helpline_label:'ஹெல்ப்லைன்',
  },

  /* ════════════════════════════ BENGALI ════════════════════════════ */
  bn: {
    diseases: [
      { id:'malaria', name:'ম্যালেরিয়া', subtitle:'মশা-বাহিত পরজীবী রোগ (প্লাজমোডিয়াম)', color:'red',
        symptoms:['তীব্র জ্বর ও কাঁপুনি','তীব্র মাথাব্যথা','চক্রাকার ঘাম (৪৮–৭২ ঘণ্টা)','বমি বমি ভাব ও বমি','ক্লান্তি ও রক্তাল্পতা','পেশী / শরীরে ব্যথা'],
        prevention:['ITN (পরিচারিত মশারি) ব্যবহার করুন','রিপেলেন্ট ক্রিম লাগান','স্থির পানি সরিয়ে দিন','পুরো হাতা পোশাক পরুন','ঘরের ভেতর অবশিষ্ট স্প্রে'],
        treatment:['PHC-তে বিনামূল্যে ACT ওষুধ','দ্রুত রোগ নির্ণয় পরীক্ষা (RDT)','রক্ত স্মিয়ার মাইক্রোস্কোপি','পুরো কোর্স শেষ করুন','নিজে নিজে ওষুধ খাবেন না'],
        emergency:'জরুরি: খুব বেশি জ্বর >104°F | অজ্ঞান | খিঁচুনি → ১০৮ নম্বরে ফোন করুন' },
      { id:'dengue', name:'ডেঙ্গু জ্বর', subtitle:'এডিস ইজিপ্টি মশার ভাইরাস সংক্রমণ', color:'orange',
        symptoms:['হঠাৎ তীব্র জ্বর (104°F)','তীব্র মাথাব্যথা','চোখের পেছনে ব্যথা','ত্বকে ফুসকুড়ি (৩–৫ দিন)','জয়েন্ট ও পেশী ব্যথা','প্লেটলেট কমে যাওয়া'],
        prevention:['সব স্থির পানি সরান','পানির পাত্র ঢেকে রাখুন','প্রতিদিন মশারি ব্যবহার করুন','এডিস দিনে কামড়ায়','পাত্রে লার্ভানাশক'],
        treatment:['পেটে ব্যথা','বারবার বমি','মাড়ি/নাক থেকে রক্ত','বমি/মলে রক্ত','→ তাৎক্ষণিক হাসপাতাল'],
        treatLabel:'বিপদের লক্ষণ',
        emergency:'অ্যান্টিভাইরাল নেই। বিশ্রাম + তরল + প্যারাসিটামল। আইবুপ্রোফেন ও অ্যাসপিরিন এড়িয়ে চলুন।' },
      { id:'tb', name:'যক্ষ্মা (টিবি)', subtitle:'ব্যাকটেরিয়া বায়ুবাহিত সংক্রমণ (মাইকোব্যাক্টেরিয়াম টিউবারকিউলোসিস)', color:'blue',
        symptoms:['>২ সপ্তাহ কাশি','রক্তমিশ্রিত কফ','সন্ধ্যায় হালকা জ্বর','রাতে ঘাম','অস্পষ্ট ওজন কমা','অত্যধিক ক্লান্তি'],
        prevention:['জন্মের সময় BCG টিকা','বাড়িতে ভালো বায়ুচলাচল','কাশির সময় মুখ ঢাকুন','ভিড় এড়িয়ে চলুন','ঘনিষ্ঠ যোগাযোগকারীদের পরীক্ষা করুন'],
        treatment:['DOTS থেরাপি (৬ মাস)','সব PHC-তে বিনামূল্যে ওষুধ','নিক্ষয়: ₹৫০০/মাস DBT','২০২৫ সালের মধ্যে টিবি-মুক্ত ভারত','হেল্পলাইন: 1800-11-6666'],
        treatLabel:'বিনামূল্যে চিকিৎসা',
        emergency:'টিবি নিরাময়যোগ্য! অসম্পূর্ণ চিকিৎসা ড্রাগ-প্রতিরোধী টিবি (MDR-TB) ঘটায়। পুরো কোর্স শেষ করুন।' },
      { id:'diabetes', name:'ডায়াবেটিস (মধুমেহ)', subtitle:'দীর্ঘস্থায়ী বিপাকীয় অবস্থা – টাইপ ১, টাইপ ২, গর্ভকালীন', color:'purple',
        symptoms:['ঘন ঘন প্রস্রাব','অতিরিক্ত তৃষ্ণা ও ক্ষুধা','ঝাপসা দৃষ্টি','ধীরে সারে এমন ক্ষত','পায়ে অসাড়তা/ঝিনঝিন','অস্পষ্ট ওজন কমা'],
        prevention:['কম চিনি, কম চর্বির খাবার','৩০ মিনিট দৈনিক ব্যায়াম','সুস্থ ওজন বজায় রাখুন','তামাক ও মদ ছাড়ুন','নিয়মিত গ্লুকোজ পরীক্ষা'],
        treatment:['NPCDCS-এ বিনামূল্যে ইনসুলিন','মেটফর্মিন (সস্তা জেনেরিক)','প্রতিদিন পায়ের যত্ন','প্রতি ৩ মাসে HbA1c','বার্ষিক চোখ ও কিডনি পরীক্ষা'],
        treatLabel:'ব্যবস্থাপনা',
        emergency:'NPCDCS: জেলা হাসপাতালে বিনামূল্যে স্ক্রিনিং। হেল্পলাইন: 1800-180-1104' }
    ],
    diseasesCompact: [
      { name:'টাইফয়েড', items:['ধারাবাহিক উচ্চ জ্বর (103–104°F)','মাথাব্যথা, দুর্বলতা, পেটব্যথা','দূষিত খাবার / পানি','PHC-তে বিনামূল্যে উইডাল পরীক্ষা'] },
      { name:'জন্ডিস (হেপাটাইটিস A/E)', items:['হলুদ ত্বক ও চোখ','গাঢ় প্রস্রাব, ফ্যাকাশে মল','দূষিত পানীয় জল','পানি ফোটান, হেপাটাইটিস A টিকা'] },
      { name:'ডায়রিয়া / কলেরা', items:['পানির মতো মল, পানিশূন্যতা','বমি, ডোবা চোখ','ORS + জিঙ্ক চিকিৎসা','অঙ্গনওয়াড়িতে বিনামূল্যে ORS'] }
    ],
    sym_label:'লক্ষণ', prev_label:'প্রতিরোধ', trt_label:'চিকিৎসা',
    prevention: [
      { title:'নিরাপদ পানীয় জল', items:['✅ ন্যূনতম ১ মিনিট পানি ফোটান','✅ ক্লোরিন ট্যাবলেট ব্যবহার করুন (সরকারি বিনামূল্যে)','✅ ডায়রিয়ার জন্য ORS','✅ সঞ্চিত পানির পাত্র ঢাকুন','❌ খোলা কূপের পানি পান করবেন না'] },
      { title:'হাত পরিষ্কার', items:['✅ ২০ সেকেন্ড সাবান দিয়ে হাত ধুন','✅ খাওয়ার আগে ও রান্নার সময়','✅ শৌচাগার ব্যবহারের পরে','✅ পশু স্পর্শ করার পরে','❌ নোংরা হাতে মুখ স্পর্শ করবেন না'] },
      { title:'স্বাস্থ্যবিধি (স্বচ্ছ ভারত)', items:['✅ সবসময় বাড়ির শৌচাগার ব্যবহার করুন','✅ BPL পরিবারের জন্য IHHL বিনামূল্যে','✅ কঠিন বর্জ্য সঠিকভাবে নিষ্পত্তি করুন','✅ পরিবেশ পরিষ্কার রাখুন','❌ খোলা মলত্যাগ না (ODF ভারত)'] },
      { title:'সুষম পুষ্টি', items:['✅ মৌসুমি ফল ও সবজি','✅ ডাল, ভাত, রুটি – প্রতিদিন','✅ গর্ভাবস্থায় আয়রনসমৃদ্ধ খাবার','✅ শুধু আয়োডাইজড লবণ','❌ জাঙ্ক ফুড ও মিষ্টি পানীয় সীমিত করুন'] },
      { title:'দৈনিক ব্যায়াম', items:['✅ ৩০ মিনিট হাঁটা/যোগব্যায়াম প্রতিদিন','✅ BP, ডায়াবেটিস, স্থূলতা প্রতিরোধ করে','✅ সাইকেল চালানো, কৃষিকাজও গণনা হয়','✅ মানসিক স্বাস্থ্যের জন্যও ভালো','❌ আসীন জীবনযাপন এড়িয়ে চলুন'] },
      { title:'তামাক ও মদমুক্ত', items:['❌ তামাক → যক্ষ্মা, ফুসফুসের ক্যান্সার','❌ মদ → লিভার রোগ, পারিবারিক ক্ষতি','✅ ছাড়ার হেল্পলাইন: 1800-11-2356','✅ PHC-তে বিনামূল্যে NRT প্যাচ','✅ তামাক বন্ধের ক্লিনিক বিনামূল্যে'] },
      { title:'ঘুম ও মানসিক স্বাস্থ্য', items:['✅ রাতে ৭–৮ ঘণ্টা ঘুম','✅ নিয়মিত ঘুমানো ও জাগার সময়','✅ ধ্যান / গভীর শ্বাস','✅ iCall হেল্পলাইন: 9152987821','✅ Vandrevala: 1860-2662-345'] },
      { title:'মশা নিয়ন্ত্রণ', items:['✅ রাতে ITN মশারির নিচে ঘুমান','✅ সাপ্তাহিক স্থির পানি নিষ্কাশন','✅ সন্ধ্যায় পুরো হাতা পোশাক পরুন','✅ সরকারি রিপেলেন্ট ব্যবহার করুন','❌ ৭ দিনের বেশি পানি জমতে দেবেন না'] },
      { title:'নিয়মিত স্বাস্থ্য পরীক্ষা', items:['✅ বার্ষিক BP ও রক্তে শর্করা পরীক্ষা','✅ সব সরকারি স্বাস্থ্য কেন্দ্রে বিনামূল্যে','✅ রেকর্ডের জন্য ABHA হেলথ ID','✅ প্রতি ২ বছরে চোখ পরীক্ষা','✅ আয়ুষ্মানের অধীনে ক্যান্সার স্ক্রিনিং'] }
    ],
    daily_tip_label:'💡 আজকের স্বাস্থ্য পরামর্শ', next_tip_label:'পরবর্তী পরামর্শ →',
    schemes: [
      { name:'আয়ুষ্মান ভারত PM-JAY', sub:'প্রধানমন্ত্রী জন আরোগ্য যোজনা', desc:'পরিবারপ্রতি বছরে ₹৫ লক্ষ কভারেজ। ৫০ কোটি মানুষ। ২৪,০০০+ হাসপাতালে নগদহীন চিকিৎসা।', badge1:'পূর্ববর্তী রোগ', badge1v:'প্রথম দিন থেকে', badge2:'হেল্পলাইন', badge2v:'14555', color:'primary' },
      { name:'মিশন ইন্দ্রধনুষ', sub:'জাতীয় টিকাদান মিশন', desc:'২ কোটি+ শিশু ও গর্ভবতী মহিলার সম্পূর্ণ টিকাদান। ১২টি ভ্যাকসিন-প্রতিরোধযোগ্য রোগ। সব PHC/CHC-তে বিনামূল্যে।', extra:['✅ BCG, DPT, পোলিও, MMR, হেপ-B, JE + আরও','✅ ইন্টেনসিফাইড মিশন ইন্দ্রধনুষ (IMI 5.0)'], color:'blue' },
      { name:'PMMVY – মাতৃত্ব সুবিধা', sub:'প্রধানমন্ত্রী মাতৃ বন্দনা যোজনা', desc:'প্রথম জীবিত সন্তানের জন্য ৩ কিস্তিতে ₹৫,০০০। সরাসরি ব্যাংকে। অঙ্গনওয়াড়ি/ASHA-র মাধ্যমে নিবন্ধন করুন।', extra:['✅ নিবন্ধনে ₹১,০০০ | ৬ মাসে ₹২,০০০ | প্রসবের পরে ₹২,০০০'], color:'pink' },
      { name:'নিক্ষয় পোষণ যোজনা', sub:'টিবি রোগীর পুষ্টি সহায়তা', desc:'টিবি চিকিৎসায় ₹৫০০/মাস। বিনামূল্যে DOTS ওষুধ। আধার-লিঙ্কড DBT।', helpline:'1800-11-6666', color:'teal' },
      { name:'NPCDCS (NCD কর্মসূচি)', sub:'অ-সংক্রামক রোগ নিয়ন্ত্রণ', desc:'জেলা হাসপাতালে ডায়াবেটিস, উচ্চ রক্তচাপ, ক্যান্সারের বিনামূল্যে স্ক্রিনিং।', helpline:'1800-180-1104', color:'purple' },
      { name:'RBSK – শিশু স্বাস্থ্য স্ক্রিনিং', sub:'রাষ্ট্রীয় বাল স্বাস্থ্য কার্যক্রম', desc:'০–১৮ বছরের জন্য বিনামূল্যে স্বাস্থ্য স্ক্রিনিং। DEIC-এর মাধ্যমে ₹১ লক্ষ পর্যন্ত বিনামূল্যে চিকিৎসা।', extra:['✅ স্কুল ও অঙ্গনওয়াড়ি স্ক্রিনিং','✅ বিনামূল্যে সংশোধনমূলক অস্ত্রোপচার অন্তর্ভুক্ত'], color:'amber' }
    ],
    eligibility_title:'স্কিম ফাইন্ডার', eligibility_sub:'SECC 2011 মানদণ্ডের উপর ভিত্তি করে। আপনার পরিবার ₹৫ লক্ষ স্বাস্থ্য কভারেজের যোগ্য কিনা পরীক্ষা করুন।',
    el_income_label:'বার্ষিক পারিবারিক আয়', el_income_opt:['আয়ের পরিসীমা বেছে নিন','₹১ লক্ষের নিচে','₹১ – ₹২.৫ লক্ষ','₹২.৫ লক্ষের উপরে'],
    el_caste_label:'জাতি বিভাগ', el_caste_opt:['বিভাগ বেছে নিন','SC – তফসিলি জাতি','ST – তফসিলি উপজাতি','OBC – অন্যান্য অনগ্রসর শ্রেণী','সাধারণ'],
    el_ration_label:'রেশন কার্ডের ধরন', el_ration_opt:['ধরন বেছে নিন','অন্ত্যোদয় (AAY)','BPL – দারিদ্র্যসীমার নিচে','APL – দারিদ্র্যসীমার উপরে','রেশন কার্ড নেই'],
    el_occ_label:'পেশা / জীবিকা', el_occ_opt:['পেশা বেছে নিন','দৈনিক মজুর কৃষি শ্রমিক','হাতে ময়লা পরিষ্কারকারী','আদিবাসী গোষ্ঠী','মুক্ত বন্ধন শ্রমিক','নির্মাণ / ইট ভাটা শ্রমিক','গৃহকর্মী','ভাঙারি কুড়ানো / হকার','বেতনভোগী / ব্যবসা / অন্য'],
    el_state_label:'State/Union Territory',
    el_state_opt: ['Select state/UT','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'],
    el_check_btn:'আমার যোগ্যতা পরীক্ষা করুন →', helpline_label:'হেল্পলাইন',
  }
}