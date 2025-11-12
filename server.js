// Error handling for missing modules
try {
  var express = require('express');
  var cors = require('cors');
} catch (err) {
  console.error('❌ ERROR: Missing dependencies!');
  console.error('Please run: npm install');
  console.error('Error details:', err.message);
  process.exit(1);
}

const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Verify port is available
console.log('🔍 Starting EduBot server...');
console.log('🔍 Port:', PORT);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve index.html, styles, scripts from data/

// Load university dataset (Vel Tech by default)
const UNIVERSITY_DATA_PATH = process.env.UNIVERSITY_DATA_PATH || path.join(__dirname, 'veltech.json');
let universityData = null;
try {
  const raw = fs.readFileSync(UNIVERSITY_DATA_PATH, 'utf-8');
  universityData = JSON.parse(raw);
  console.log('📚 Loaded university dataset:', UNIVERSITY_DATA_PATH);
} catch (err) {
  console.warn('⚠️  Could not load university dataset:', err.message);
}

// Simple rule-based /api/chat endpoint
app.post('/api/chat', (req, res) => {
  const message = (req.body && req.body.message) ? String(req.body.message).toLowerCase() : '';
  const replyParts = [];
  let confidence = 70;
  const topics = [];

  if (!message) {
    return res.json({ reply: "Please provide a question about admissions, fees, programs or campus facilities.", confidence: 60 });
  }

  if (message.includes('admission')) {
    const uni = universityData && universityData.university;
    replyParts.push(`To apply to ${uni ? uni.name : 'our university'}, typical UG requirements include 10+2 with required percentage and accepted entrance exams (e.g. VTUEEE / JEE).`);
    topics.push('Admission Requirements', 'Application Process');
    confidence = 92;
  } else if (message.includes('fee') || message.includes('tuition')) {
    const fees = universityData && universityData.fees;
    if (fees) {
      // Build a more detailed fee summary from veltech.json
      const lines = [];
      const fmt = (n) => (typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : n);

      if (fees.tuition && fees.tuition.btech && fees.tuition.btech.phases) {
        lines.push('B.Tech Tuition (by VTUEEE phase):');
        const phases = fees.tuition.btech.phases;
        Object.keys(phases).forEach(key => {
          const p = phases[key];
          lines.push(`• ${p.label || key}: Base tuition ${fmt(p.annualTuitionBaseINR || p.annualTuitionFeeINR || p.annualTuitionFee)}, annual programme fee payable ${fmt(p.annualProgrammeFeePayableINR || p.annualProgrammeFeePayable)}.`);
          if (Array.isArray(p.scholarshipSlabs)) {
            lines.push('  Scholarship slabs:');
            p.scholarshipSlabs.forEach(s => {
              lines.push(`   - ${s.mpcAggregate}: ${s.tuitionScholarshipPercent}% → annual tuition ${fmt(s.annualTuitionFeeINR || s.annualTuitionFee || s.annualTuitionFeeINR)} (programme fee ~ ${fmt(s.annualProgrammeFeePayableINR || s.annualProgrammeFeePayable)}).`);
            });
          }
        });
      }

      if (fees.lateralEntryBTech) {
        lines.push('Lateral entry B.Tech (typical categories):');
        Object.keys(fees.lateralEntryBTech).forEach(cat => {
          const c = fees.lateralEntryBTech[cat];
          lines.push(`• ${cat}: ${c.description || ''} — Annual tuition ${fmt(c.annualTuitionINR || c.annualTuition)}; total payable ${fmt(c.totalPayableAnnuallyINR || c.totalPayableAnnually)}.`);
        });
      }

      if (fees.hostel) {
        lines.push(`Hostel: ${typeof fees.hostel === 'string' ? fees.hostel : (fees.hostel.boys || fees.hostel)}`);
      }
      if (fees.mess) lines.push(`Mess: ${fees.mess}`);
      if (fees.otherFees && Array.isArray(fees.otherFees)) {
        lines.push('Other fees and notes:');
        fees.otherFees.forEach(of => lines.push(`• ${of}`));
      }

      if (lines.length === 0) {
        replyParts.push('Tuition varies by program. Please check /fees or contact admissions for exact figures.');
      } else {
        replyParts.push(lines.join('\n'));
      }
    } else {
      replyParts.push('Tuition varies by program. Please check /fees or contact admissions for exact figures.');
    }
    topics.push('Tuition Fees', 'Scholarships');
    confidence = 88;
  } else if (message.includes('scholar') || message.includes('financial')) {
    const sch = universityData && universityData.scholarships;
    if (sch) {
      const meritSch = Array.isArray(sch.merit) ? sch.merit.join('; ') : '';
      const needSch = Array.isArray(sch.need) ? sch.need.join('; ') : '';
      const allSch = [meritSch, needSch].filter(s => s).join('. ') || 'Merit and need-based scholarships available.';
      replyParts.push(`Scholarships: ${allSch}`);
    } else {
      replyParts.push('We offer merit and entrance-based scholarships; contact admissions for details.');
    }
    topics.push('Scholarships');
    confidence = 85;
  } else if (message.includes('campus') || message.includes('student life') || message.includes('life') || message.includes('facility') || message.includes('clubs')) {
    const campus = universityData && universityData.campus;
    const lines = [];
    if (campus && campus.studentLife) {
      const s = campus.studentLife;
      lines.push('Campus & Student Life:');
      if (Array.isArray(s.clubs) && s.clubs.length) lines.push(`• Clubs: ${s.clubs.slice(0,6).join(', ')}${s.clubs.length>6?` and more (${s.clubs.length})`:''}`);
      if (Array.isArray(s.culturalEvents) && s.culturalEvents.length) {
        const ev = s.culturalEvents.map(e=>e.name).join(', ');
        lines.push(`• Major events: ${ev}`);
      }
      if (Array.isArray(s.sports) && s.sports.length) lines.push(`• Sports: ${s.sports.join(', ')}`);
      if (Array.isArray(s.studentServices) && s.studentServices.length) lines.push(`• Services: ${s.studentServices.join(', ')}`);
      if (s.typicalDay) lines.push(`• Typical day: ${s.typicalDay}`);

      // hostel quick summary if available
      if (Array.isArray(campus.hostels) && campus.hostels.length) {
        lines.push('Hostel snapshot:');
        campus.hostels.slice(0,2).forEach(h => {
          const roomTypes = Array.isArray(h.roomTypes) ? h.roomTypes.map(r=>`${r.type} (${r.pricePerYearINR? '₹'+Number(r.pricePerYearINR).toLocaleString('en-IN') : 'Price on request'})`).join('; ') : '';
          lines.push(`  - ${h.name} (${h.gender}) — ${roomTypes}. Distance to classes ~ ${h.distanceToAcademicKm} km.`);
        });
      }

      replyParts.push(lines.join('\n'));
    } else if (campus && campus.facilities) {
      replyParts.push('Campus life includes clubs, cultural events, sports and student services. Facilities include: ' + campus.facilities.slice(0,6).join(', ') + '.');
    } else {
      replyParts.push('Campus life includes clubs, cultural events, sports and student services. See /demo.html for examples.');
    }
    topics.push('Campus Life', 'Clubs & Events', 'Hostel');
    confidence = 92;
  } else if (message.includes('placement') || message.includes('job') || message.includes('career')) {
    const placements = universityData && universityData.placements;
    const lines = [];
    if (placements) {
      lines.push('Placement & Career Information:');
      if (placements.statistics) {
        const s = placements.statistics;
        lines.push(`• Statistics: Average package ${s.averagePackage}, highest ${s.highestPackage}, placement rate ${s.placementRate}, ${s.companies || '180'} companies visited.`);
      }
      if (Array.isArray(placements.topCompanies) && placements.topCompanies.length) {
        lines.push(`• Top recruiters: ${placements.topCompanies.slice(0, 10).join(', ')}`);
      }
      if (Array.isArray(placements.sectors) && placements.sectors.length) {
        lines.push(`• Sectors: ${placements.sectors.join(', ')}`);
      }
      if (placements.placementDrive) {
        const pd = placements.placementDrive;
        lines.push(`• Drive timing: ${pd.timing}. Internships available from semester 5 onwards.`);
        if (pd.contact) lines.push(`• Contact: ${pd.contact}`);
      }
      replyParts.push(lines.join('\n'));
    } else {
      replyParts.push('Vel Tech has a dedicated placement cell that assists students with job placements. The university has tie-ups with various companies and organizes campus recruitment drives. Contact the placement office for more details.');
    }
    topics.push('Placements', 'Career Services');
    confidence = 88;
  } else if (message.includes('program') || message.includes('course') || message.includes('degree') || message.includes('courses list') || message.includes('courses')) {
    const programs = universityData && universityData.programs;
    const lines = [];
    if (programs) {
      // list UG programs
      if (Array.isArray(programs.ug) && programs.ug.length) {
        lines.push('Undergraduate programs:');
        programs.ug.forEach(p => {
          const det = programs.details && programs.details[p];
          if (det) {
            lines.push(`• ${p} — ${det.duration}; intake: ${det.intakePerYear} per year; specializations: ${det.specializations.join(', ')}.`);
          } else {
            lines.push(`• ${p}`);
          }
        });
      }

      // list PG programs
      if (Array.isArray(programs.pg) && programs.pg.length) {
        lines.push('Postgraduate programs:');
        programs.pg.forEach(p => {
          const det = programs.details && programs.details[p];
          if (det) {
            lines.push(`• ${p} — ${det.duration}; intake: ${det.intakePerYear || 'varies'}; ${det.overview || ''}`);
          } else {
            lines.push(`• ${p}`);
          }
        });
      }
      replyParts.push(lines.join('\n'));
    } else {
      replyParts.push('Vel Tech offers B.Tech, M.Tech, MBA, MCA, B.Sc, BBA, and B.Com programs across various specializations. Contact admissions for the full courses list.');
    }
    topics.push('Academic Programs', 'Courses');
    confidence = 90;
  } else if (message.includes('housing') || message.includes('hostel') || message.includes('accommodation') || message.includes('room')) {
    const campus = universityData && universityData.campus;
    const fees = universityData && universityData.fees;
    const lines = [];
    if (campus && Array.isArray(campus.hostels) && campus.hostels.length) {
      lines.push('Hostel accommodation (summary):');
      campus.hostels.forEach(h => {
        const types = Array.isArray(h.roomTypes) ? h.roomTypes.map(r => `${r.type} — ₹${Number(r.pricePerYearINR).toLocaleString('en-IN')}`).join('; ') : '';
        lines.push(`• ${h.name} (${h.gender}) — ${types}. Distance to classes: ~${h.distanceToAcademicKm} km.`);
      });
      if (campus.housingPolicy) lines.push(`Policy: ${campus.housingPolicy}`);
      if (fees && fees.mess) lines.push(`Mess: ${fees.mess}`);
    } else if (fees && fees.hostel) {
      const hostelInfo = typeof fees.hostel === 'string' ? fees.hostel : (fees.hostel.boys || fees.hostel);
      lines.push(`Hostel: ${hostelInfo}. Mess: ${fees.mess || 'INR 45,000 - 60,000 per year'}.`);
    } else {
      lines.push('Hostel accommodation is available. Contact admissions for room types, prices and allotment policy.');
    }
    replyParts.push(lines.join('\n'));
    topics.push('Campus Housing', 'Hostel');
    confidence = 88;
  } else if (message.includes('deadline') || message.includes('date') || message.includes('when')) {
    const admissions = universityData && universityData.admissions;
    if (admissions && admissions.ug && admissions.ug.application && admissions.ug.application.deadlines) {
      const deadlines = admissions.ug.application.deadlines;
      replyParts.push(`Application deadlines: Early - ${deadlines.early || '31 March'}, Regular - ${deadlines.regular || '31 May'}, Late - ${deadlines.late || '30 June'}.`);
    } else {
      replyParts.push('Application deadlines vary by program. Early applications: 31 March, Regular: 31 May, Late: 30 June (subject to availability).');
    }
    topics.push('Application Deadlines', 'Important Dates');
    confidence = 90;
  } else if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('address')) {
    const university = universityData && universityData.university;
    const contacts = universityData && universityData.contacts;
    const lines = [];
    lines.push('Contact Information:');
    if (university && university.contact) {
      const uc = university.contact;
      if (uc.admissionsEmail) lines.push(`• Admissions: ${uc.admissionsEmail}`);
      if (uc.phone) lines.push(`• Phone: ${uc.phone}`);
      if (uc.website) lines.push(`• Website: ${uc.website}`);
    }
    if (contacts) {
      if (contacts.admissions) lines.push(`• Admissions email: ${contacts.admissions}`);
      if (contacts.international) lines.push(`• International students: ${contacts.international}`);
      if (contacts.general) lines.push(`• General: ${contacts.general}`);
    }
    if (university && university.location) {
      const loc = university.location;
      lines.push(`• Address: ${loc.address || 'No. 42, Avadi-Vel Tech Road, Avadi, Chennai - 600062'}`);
      lines.push(`• Location: ${loc.city}, ${loc.state}, ${loc.country}`);
    }
    replyParts.push(lines.join('\n'));
    topics.push('Contact Details', 'University Info');
    confidence = 95;
  } else if (message.includes('facility') || message.includes('facilities') || message.includes('infrastructure') || message.includes('campus facilities')) {
    const campus = universityData && universityData.campus;
    const lines = [];
    lines.push('Campus Facilities:');
    if (campus && Array.isArray(campus.facilities) && campus.facilities.length) {
      lines.push('Available amenities:');
      campus.facilities.forEach(f => lines.push(`• ${f}`));
    } else {
      lines.push('• Modern classrooms and smart labs');
      lines.push('• Central library with digital resources');
      lines.push('• Innovation and incubation centers');
      lines.push('• Wi-Fi enabled campus');
      lines.push('• Sports complex and gym');
      lines.push('• Hostels with dining facilities');
      lines.push('• Cafeterias and food courts');
      lines.push('• Medical and counseling services');
    }
    if (campus) {
      if (campus.transport) lines.push(`• Transport: ${campus.transport}`);
      if (campus.location) lines.push(`• Located in: ${campus.location}`);
    }
    replyParts.push(lines.join('\n'));
    topics.push('Campus Facilities', 'Infrastructure');
    confidence = 92;
  } else {
    replyParts.push("I can help with admissions, fees, scholarships, programs, campus facilities, placements, housing, contacts, and more. Try asking about 'admission requirements', 'tuition for B.Tech CSE', 'placement opportunities', 'campus facilities', or 'contact information'.");
    topics.push('General Help');
    confidence = 70;
  }

  const reply = replyParts.join(' ');
  return res.json({ reply, confidence, topics });
});

// fallback route to serve index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server (listen with automatic retry on EADDRINUSE)
let server = null;
const MAX_PORT_RETRIES = 5;
let _attempts = 0;

function startServer(port) {
  _attempts++;
  server = app.listen(port, () => {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  🚀 EduBot Server is RUNNING!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
    console.log(`  📍 Server URL: http://localhost:${port}`);
    console.log(`  📍 Alternative: http://127.0.0.1:${port}`);
    console.log('');
    console.log('  ⚠️  IMPORTANT:');
    console.log('     • Keep this window OPEN while using the app');
    console.log(`     • Open browser and go to: http://localhost:${port}`);
    console.log('     • Do NOT close this window!');
    console.log('');
    console.log('  🛑 To stop server: Press Ctrl+C');
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('');
  });

  server.on('error', (err) => {
    console.error('');
    console.error('═══════════════════════════════════════════════════════════');
    console.error('  ❌ SERVER ERROR!');
    console.error('═══════════════════════════════════════════════════════════');
    console.error('');
    if (err.code === 'EADDRINUSE') {
      console.error(`  Port ${port} is already in use!`);
      if (_attempts <= MAX_PORT_RETRIES) {
        const nextPort = Number(port) + 1;
        console.error(`  ⚠️  Attempting to start on port ${nextPort} (attempt ${_attempts}/${MAX_PORT_RETRIES})`);
        console.error('');
        // small delay before retrying
        setTimeout(() => startServer(nextPort), 300);
        return;
      }
      console.error('');
      console.error('  💡 Solutions:');
      console.error('     1. Close the other application using this port');
      console.error('     2. Or set a different PORT environment variable before starting the app');
      console.error('        e.g. (PowerShell): $env:PORT=3001; node server.js');
    } else {
      console.error('  Error:', err.message);
      console.error('  Error code:', err.code);
    }
    console.error('');
    console.error('═══════════════════════════════════════════════════════════');
    console.error('');
    process.exit(1);
  });
}

// Start with the configured PORT (number)
startServer(Number(PORT) || 3000);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('');
  console.error('═══════════════════════════════════════════════════════════');
  console.error('  ❌ UNCAUGHT EXCEPTION!');
  console.error('═══════════════════════════════════════════════════════════');
  console.error('');
  console.error('  Error:', err.message);
  console.error('  Stack:', err.stack);
  console.error('');
  console.error('═══════════════════════════════════════════════════════════');
  console.error('');
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('');
  console.error('═══════════════════════════════════════════════════════════');
  console.error('  ❌ UNHANDLED REJECTION!');
  console.error('═══════════════════════════════════════════════════════════');
  console.error('');
  console.error('  Reason:', reason);
  console.error('');
  console.error('═══════════════════════════════════════════════════════════');
  console.error('');
});

// Keep process alive
process.on('SIGINT', () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  🛑 Server is shutting down...');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  server.close(() => {
    console.log('  ✅ Server closed successfully');
    console.log('');
    process.exit(0);
  });
});

// Prevent process from exiting
process.stdin.resume();
