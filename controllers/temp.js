const { logger } = require('../middleware/logger');

// ⚠️ import if you have model
// const Reminder = require('../models/Reminder');

/* ================= STATIC DATA ================= */

const CENTRES = [
  { id:1, name:'Primary Health Centre Wagholi', address:'Wagholi, Pune, Maharashtra 412207',
    phone:'020-27050123', hours:'Mon–Sat 8:00–16:00', type:'PHC',
    vaccines:['BCG','OPV','Pentavalent','Measles-MR','COVID-19'], lat:18.5793, lng:73.9075 },
  { id:2, name:'Sub-Centre Hadapsar', address:'Hadapsar, Pune, Maharashtra 411028',
    phone:'020-26998765', hours:'Mon–Sat 9:00–15:00', type:'Sub-Centre',
    vaccines:['BCG','OPV','DPT','Measles'], lat:18.5018, lng:73.9366 },
  { id:3, name:'Community Health Centre Khadki', address:'Khadki, Pune, Maharashtra 411003',
    phone:'020-25811234', hours:'Mon–Sun 7:00–19:00', type:'CHC',
    vaccines:['Full NIS Schedule','COVID-19','Influenza','Typhoid'], lat:18.5669, lng:73.8567 },
  { id:4, name:'Urban Health Post Shivajinagar', address:'Shivajinagar, Pune 411005',
    phone:'020-25532100', hours:'Mon–Fri 8:00–17:00', type:'UHP',
    vaccines:['BCG','MMR','Hepatitis B','Typhoid'], lat:18.5308, lng:73.8475 },
  { id:5, name:'District Hospital Vaccination Dept', address:'Sassoon Road, Pune 411001',
    phone:'020-26128000', hours:'Mon–Sat 8:00–14:00', type:'District Hospital',
    vaccines:['All NIS Vaccines','Yellow Fever','Meningitis (Travel)'], lat:18.5195, lng:73.8554 },
];

const SCHEDULE = [
  { age:'At Birth', vaccines:['BCG','OPV-0','Hepatitis B-1'], note:'Given in hospital/health facility' },
  { age:'6 Weeks', vaccines:['OPV-1','Pentavalent-1','Rotavirus-1','IPV-1','PCV-1'], note:'First visit to PHC' },
  { age:'10 Weeks', vaccines:['OPV-2','Pentavalent-2','Rotavirus-2','IPV-2','PCV-2'], note:'' },
  { age:'14 Weeks', vaccines:['OPV-3','Pentavalent-3','Rotavirus-3','IPV-3','PCV-3'], note:'Complete by 16 weeks' },
  { age:'9–12 Months', vaccines:['MR-1','JE-1','Vitamin A-1'], note:'Important milestone' },
  { age:'16–24 Months', vaccines:['DPT Booster-1','OPV Booster','MR-2','JE-2'], note:'Booster doses critical' },
  { age:'5–6 Years', vaccines:['DPT Booster-2'], note:'School entry' },
  { age:'10 Years', vaccines:['Td'], note:'Adolescent booster' },
  { age:'16 Years', vaccines:['Td Booster'], note:'' },
  { age:'Pregnant Women', vaccines:['Td-1','Td-2','IFA + Calcium'], note:'Antenatal care schedule' },
];

/* ================= GET CENTRES ================= */

exports.getCentres = (req, res) => {
  let centres = [...CENTRES];

  if (req.query.type) {
    centres = centres.filter(c =>
      c.type.toLowerCase() === req.query.type.toLowerCase()
    );
  }

  res.json({
    success: true,
    centres,
    total: centres.length
  });
};

/* ================= GET SCHEDULE ================= */

exports.getSchedule = (req, res) => {
  res.json({
    success: true,
    schedule: SCHEDULE
  });
};

/* ================= CREATE REMINDER ================= */

exports.createReminder = async (req, res, next) => {
  try {
    const { email, dob } = req.body;

    if (!email || !dob) {
      return res.status(400).json({
        success: false,
        message: 'Email and date of birth are required.'
      });
    }

    // ⚠️ Uncomment when model exists
    // const reminder = await Reminder.create({ email, dob });

    logger.info(`Reminder created for ${email}`);

    res.json({
      success: true,
      message: 'Reminder created successfully'
      // reminder
    });

  } catch (err) {
    next(err);
  }
};