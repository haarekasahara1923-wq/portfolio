/* ===================================================
   TANUSHKA SHUKLA PORTFOLIO — app.js
   Full SPA: Router + Data + Pages + Admin + Resume
   =================================================== */

'use strict';

/* ─── DEFAULT DATA ───────────────────────────────── */
const DEFAULT_DATA = {
  profile: {
    name:       'Tanushka Shukla',
    dob:        '05 Oct 2007',
    gender:     'Female',
    father:     'Mr. Pramod Shukla',
    mother:     'Mrs. Sunita Shukla',
    phone:      '8770232663',
    email:      'shukladev558@gmail.com',
    address:    'Vaishnavi Dham, Aditya Puram, Gwalior',
    role:       'BSc CS Student & Aspiring Developer',
    bio:        'I am Tanushka Shukla, a passionate and ambitious student currently pursuing BSc in Computer Science. I believe in the power of technology to transform lives and am dedicated to building a strong foundation in computing, problem-solving, and digital innovation. With a curious mind and a drive for excellence, I constantly seek opportunities to learn, grow, and contribute meaningfully to the tech world.',
    photo:      null,
    signature:  null,
  },
  education: [
    {
      id: 'edu-1',
      period:  '2024 – Present',
      title:   'Bachelor of Science (Computer Science)',
      sub:     'Currently Pursuing',
      desc:    'Pursuing BSc Computer Science with focus on programming, algorithms, data structures, and modern software development practices.',
      icon:    '🎓'
    },
    {
      id: 'edu-2',
      period:  '2022 – 2024',
      title:   'Higher Secondary Education (12th)',
      sub:     'Passout – Science Stream',
      desc:    'Completed 12th grade with Science stream, developing strong analytical and logical thinking skills.',
      icon:    '📚'
    },
    {
      id: 'edu-3',
      period:  '2020 – 2022',
      title:   'Secondary Education (10th)',
      sub:     'Passed with Distinction',
      desc:    'Successfully completed secondary education with excellent academic performance.',
      icon:    '🏫'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      icon:  '🏆',
      title: 'Academic Excellence Award',
      date:  '2024',
      desc:  'Recognized for outstanding academic performance and dedication to studies.'
    },
    {
      id: 'ach-2',
      icon:  '💻',
      title: 'Programming Enthusiast',
      date:  '2024',
      desc:  'Self-taught multiple programming languages and frameworks during leisure time.'
    },
    {
      id: 'ach-3',
      icon:  '📖',
      title: 'Avid Reader',
      date:  'Ongoing',
      desc:  'Consistently reads books across genres, enriching knowledge and perspective.'
    }
  ],
  gallery: [],
  hobbies: [
    { id: 'hob-1', icon: '📚', name: 'Reading Books', desc: 'Exploring worlds through literature' },
    { id: 'hob-2', icon: '💻', name: 'Coding',        desc: 'Building digital solutions' },
    { id: 'hob-3', icon: '🎨', name: 'Art & Creativity', desc: 'Expressing through visual arts' },
    { id: 'hob-4', icon: '🎵', name: 'Music',         desc: 'Enjoying melodies and rhythm' },
    { id: 'hob-5', icon: '✈️', name: 'Traveling',     desc: 'Exploring new places & cultures' },
    { id: 'hob-6', icon: '🌿', name: 'Nature Walks',  desc: 'Connecting with nature' }
  ],
  experience: [
    {
      id: 'exp-1',
      period:  'Present',
      title:   'Fresher',
      sub:     'Actively seeking opportunities',
      desc:    'As a fresh graduate with strong academic background and passion for technology, I am eager to apply my knowledge in real-world settings and contribute to innovative projects.',
      icon:    '🚀'
    }
  ],
  research: [
    {
      id: 'res-1',
      badge:   'Academic',
      title:   'Impact of Technology on Modern Education',
      abstract: 'A study exploring how digital tools and e-learning platforms are transforming the educational landscape, with focus on student engagement and learning outcomes.',
      year:    '2024',
      type:    'Research Paper'
    }
  ],
  contact_submissions: []
};

/* ─── DATA LAYER ─────────────────────────────────── */
const DB_KEY = 'tanushka_portfolio_v1';

function loadData() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const stored = JSON.parse(raw);
    // Merge top-level keys from default (for new keys added later)
    return Object.assign({}, JSON.parse(JSON.stringify(DEFAULT_DATA)), stored);
  } catch(e) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

let DB = loadData();

function genId(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2,7);
}

/* ─── ROUTER ─────────────────────────────────────── */
const PAGES = ['home','about','education','achievements','gallery','hobbies','experience','research','contact','admin','resume'];

function getHash() {
  return (location.hash || '#home').replace('#','');
}

function navigate(page) {
  location.hash = page;
}

function router() {
  const page = getHash();
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) {
      el.classList.toggle('active', p === page);
    }
  });
  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  document.querySelectorAll('.nav-drawer-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  // Render page
  renderPage(page);
  // Close mobile drawer
  closeMobileNav();
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage(page) {
  switch(page) {
    case 'home':        renderHome(); break;
    case 'about':       renderAbout(); break;
    case 'education':   renderEducation(); break;
    case 'achievements':renderAchievements(); break;
    case 'gallery':     renderGallery(); break;
    case 'hobbies':     renderHobbies(); break;
    case 'experience':  renderExperience(); break;
    case 'research':    renderResearch(); break;
    case 'contact':     renderContact(); break;
    case 'admin':       renderAdmin(); break;
    case 'resume':      renderResumePage(); break;
  }
}

/* ─── TOAST ──────────────────────────────────────── */
function toast(msg, type='success') {
  const container = document.getElementById('toast-container');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type] || '✅'}</span><span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

/* ─── MOBILE NAV ─────────────────────────────────── */
function closeMobileNav() {
  document.getElementById('hamburger')?.classList.remove('open');
  document.getElementById('nav-drawer')?.classList.remove('open');
}

/* ─── PHOTO READER ───────────────────────────────── */
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ─── PAGE: HOME ─────────────────────────────────── */
function renderHome() {
  const p = DB.profile;
  const photoHtml = p.photo
    ? `<img src="${p.photo}" alt="${p.name}">`
    : `<span class="hero-photo-placeholder">👩‍🎓</span>`;

  document.getElementById('page-home').innerHTML = `
    <div class="hero">
      <div class="particles" id="particles-home"></div>
      <div class="hero-inner container">
        <div class="hero-content">
          <div class="hero-label">✨ Welcome to my Portfolio</div>
          <h1 class="hero-name">
            <span class="gradient-text">${escHtml(p.name)}</span>
          </h1>
          <p class="hero-subtitle">
            <span>${escHtml(p.role)}</span><br>
            Passionate about Technology · Driven by Curiosity · Inspired by Knowledge
          </p>
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-num">${DB.achievements.length}</div>
              <div class="hero-stat-label">Achievements</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-num">${DB.hobbies.length}</div>
              <div class="hero-stat-label">Hobbies</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-num">${DB.education.length}</div>
              <div class="hero-stat-label">Degrees</div>
            </div>
          </div>
          <div class="hero-actions">
            <button class="btn btn-primary" onclick="navigate('about')">✨ Know Me Better</button>
            <button class="btn btn-outline" onclick="navigate('contact')">📩 Get In Touch</button>
            <button class="btn btn-ghost" onclick="navigate('resume')">📄 View Resume</button>
          </div>
        </div>
        <div class="hero-photo-wrap">
          <div class="hero-photo-frame">
            <div class="hero-photo">${photoHtml}</div>
          </div>
          <div class="glass-card hero-info-card">
            <div class="hero-info-row">
              <span class="hero-info-icon">📅</span>
              <div><div class="hero-info-label">Date of Birth</div><div class="hero-info-value">${escHtml(p.dob)}</div></div>
            </div>
            <div class="hero-info-row">
              <span class="hero-info-icon">📍</span>
              <div><div class="hero-info-label">Location</div><div class="hero-info-value">${escHtml(p.address)}</div></div>
            </div>
            <div class="hero-info-row">
              <span class="hero-info-icon">📧</span>
              <div><div class="hero-info-label">Email</div><div class="hero-info-value" style="font-size:0.78rem">${escHtml(p.email)}</div></div>
            </div>
            <div class="hero-info-row">
              <span class="hero-info-icon">📱</span>
              <div><div class="hero-info-label">Phone</div><div class="hero-info-value">${escHtml(p.phone)}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  createParticles('particles-home', 20);
}

function createParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random()*100}%;
      width: ${1+Math.random()*3}px;
      height: ${1+Math.random()*3}px;
      animation-duration: ${8+Math.random()*12}s;
      animation-delay: ${Math.random()*10}s;
      opacity: ${0.05+Math.random()*0.15};
    `;
    container.appendChild(p);
  }
}

/* ─── PAGE: ABOUT ────────────────────────────────── */
function renderAbout() {
  const p = DB.profile;
  const photoHtml = p.photo
    ? `<img src="${p.photo}" alt="${p.name}">`
    : `<span style="font-size:4rem">👩‍🎓</span>`;

  document.getElementById('page-about').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Who I Am</div>
          <h2 class="section-title gradient-text">About Me</h2>
          <div class="divider"></div>
        </div>
        <div class="about-grid">
          <div>
            <div class="glass-card about-photo-card">
              <div class="about-photo">${photoHtml}</div>
              <div class="about-name">${escHtml(p.name)}</div>
              <div class="about-role">${escHtml(p.role)}</div>
              <ul class="about-info-list">
                <li class="about-info-item"><span class="icon">📅</span><div><span class="about-info-key">Date of Birth</span><span class="about-info-val">${escHtml(p.dob)}</span></div></li>
                <li class="about-info-item"><span class="icon">⚧</span><div><span class="about-info-key">Gender</span><span class="about-info-val">${escHtml(p.gender)}</span></div></li>
                <li class="about-info-item"><span class="icon">👨‍👩‍👧</span><div><span class="about-info-key">Father</span><span class="about-info-val">${escHtml(p.father)}</span></div></li>
                <li class="about-info-item"><span class="icon">👩‍👧</span><div><span class="about-info-key">Mother</span><span class="about-info-val">${escHtml(p.mother)}</span></div></li>
                <li class="about-info-item"><span class="icon">📱</span><div><span class="about-info-key">Phone</span><span class="about-info-val">${escHtml(p.phone)}</span></div></li>
                <li class="about-info-item"><span class="icon">📧</span><div><span class="about-info-key">Email</span><span class="about-info-val" style="font-size:0.8rem">${escHtml(p.email)}</span></div></li>
                <li class="about-info-item"><span class="icon">📍</span><div><span class="about-info-key">Address</span><span class="about-info-val">${escHtml(p.address)}</span></div></li>
              </ul>
            </div>
          </div>
          <div class="about-content">
            <div class="glass-card about-bio">
              <h3 style="margin-bottom:16px;font-family:'Playfair Display',serif">My Story</h3>
              <p>${escHtml(p.bio)}</p>
            </div>
            <div class="about-highlights">
              <div class="glass-card highlight-card">
                <div class="highlight-icon">🎓</div>
                <div class="highlight-num">BSc CS</div>
                <div class="highlight-label">Currently Pursuing</div>
              </div>
              <div class="glass-card highlight-card">
                <div class="highlight-icon">📚</div>
                <div class="highlight-num">${DB.hobbies.length}+</div>
                <div class="highlight-label">Hobbies & Interests</div>
              </div>
              <div class="glass-card highlight-card">
                <div class="highlight-icon">🏆</div>
                <div class="highlight-num">${DB.achievements.length}+</div>
                <div class="highlight-label">Achievements</div>
              </div>
              <div class="glass-card highlight-card">
                <div class="highlight-icon">🌟</div>
                <div class="highlight-num">100%</div>
                <div class="highlight-label">Dedication</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ─── PAGE: EDUCATION ────────────────────────────── */
function renderEducation() {
  const items = DB.education;
  const itemsHtml = items.length === 0
    ? emptyState('📚', 'No education entries yet.')
    : items.map(item => `
      <div class="glass-card timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-period">${escHtml(item.period)}</div>
        <div class="timeline-title">${item.icon || '🎓'} ${escHtml(item.title)}</div>
        <div class="timeline-sub">${escHtml(item.sub)}</div>
        <p class="timeline-desc">${escHtml(item.desc)}</p>
      </div>
    `).join('');

  document.getElementById('page-education').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Academic Journey</div>
          <h2 class="section-title gradient-text">Education</h2>
          <div class="divider"></div>
          <p class="section-desc">My academic background and educational milestones that have shaped my knowledge and skills.</p>
        </div>
        <div class="timeline">${itemsHtml}</div>
      </div>
    </section>
  `;
}

/* ─── PAGE: ACHIEVEMENTS ─────────────────────────── */
function renderAchievements() {
  const items = DB.achievements;
  const itemsHtml = items.length === 0
    ? emptyState('🏆', 'No achievements added yet.')
    : items.map(item => `
      <div class="glass-card achievement-card">
        <span class="achievement-icon">${item.icon || '🏆'}</span>
        <div class="achievement-title">${escHtml(item.title)}</div>
        <div class="achievement-date">${escHtml(item.date)}</div>
        <p class="achievement-desc">${escHtml(item.desc)}</p>
      </div>
    `).join('');

  document.getElementById('page-achievements').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Milestones</div>
          <h2 class="section-title gradient-text">Achievements</h2>
          <div class="divider"></div>
          <p class="section-desc">Recognitions, accomplishments, and milestones that mark my journey of growth.</p>
        </div>
        <div class="achievements-grid">${itemsHtml}</div>
      </div>
    </section>
  `;
}

/* ─── PAGE: GALLERY ──────────────────────────────── */
function renderGallery() {
  const items = DB.gallery;
  const itemsHtml = items.length === 0
    ? emptyState('🖼️', 'No photos in gallery yet. Add some from the Admin Panel!')
    : items.map((item, i) => `
      <div class="gallery-item" onclick="openLightbox(${i})">
        <img src="${item.src}" alt="${escHtml(item.caption || 'Photo')}">
        <div class="gallery-overlay">🔍</div>
      </div>
    `).join('');

  document.getElementById('page-gallery').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Memories</div>
          <h2 class="section-title gradient-text">Photo Gallery</h2>
          <div class="divider"></div>
          <p class="section-desc">A visual journey through my life, memories, and experiences.</p>
        </div>
        <div class="gallery-grid">${itemsHtml}</div>
      </div>
    </section>
  `;
}

function openLightbox(index) {
  const items = DB.gallery;
  if (!items[index]) return;
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = items[index].src;
  lb.classList.add('open');
}

/* ─── PAGE: HOBBIES ──────────────────────────────── */
function renderHobbies() {
  const items = DB.hobbies;
  const itemsHtml = items.length === 0
    ? emptyState('🎯', 'No hobbies added yet.')
    : items.map(item => `
      <div class="glass-card hobby-card">
        <span class="hobby-icon">${item.icon || '⭐'}</span>
        <div class="hobby-name">${escHtml(item.name)}</div>
        <div class="hobby-desc">${escHtml(item.desc || '')}</div>
      </div>
    `).join('');

  document.getElementById('page-hobbies').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header centered">
          <div class="section-label">Passions</div>
          <h2 class="section-title gradient-text">Hobbies & Interests</h2>
          <div class="divider"></div>
          <p class="section-desc">The activities and passions that bring joy, creativity, and balance to my life.</p>
        </div>
        <div class="hobbies-grid">${itemsHtml}</div>
      </div>
    </section>
  `;
}

/* ─── PAGE: EXPERIENCE ───────────────────────────── */
function renderExperience() {
  const items = DB.experience;
  const itemsHtml = items.length === 0
    ? emptyState('💼', 'No experience entries yet.')
    : items.map(item => `
      <div class="glass-card timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-period">${escHtml(item.period)}</div>
        <div class="timeline-title">${item.icon || '💼'} ${escHtml(item.title)}</div>
        <div class="timeline-sub">${escHtml(item.sub)}</div>
        <p class="timeline-desc">${escHtml(item.desc)}</p>
      </div>
    `).join('');

  document.getElementById('page-experience').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Work History</div>
          <h2 class="section-title gradient-text">Experience</h2>
          <div class="divider"></div>
          <p class="section-desc">My professional journey and work experiences that are building my career.</p>
        </div>
        <div class="timeline">${itemsHtml}</div>
      </div>
    </section>
  `;
}

/* ─── PAGE: RESEARCH ─────────────────────────────── */
function renderResearch() {
  const items = DB.research;
  const itemsHtml = items.length === 0
    ? emptyState('🔬', 'No research works added yet.')
    : items.map(item => `
      <div class="glass-card research-card">
        <div class="research-badge"><span class="badge badge-primary">${escHtml(item.badge || 'Research')}</span></div>
        <div class="research-title">${escHtml(item.title)}</div>
        <p class="research-abstract">${escHtml(item.abstract)}</p>
        <div class="research-meta">
          <span>📅 ${escHtml(item.year)}</span>
          <span>📄 ${escHtml(item.type)}</span>
        </div>
      </div>
    `).join('');

  document.getElementById('page-research').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Academic Works</div>
          <h2 class="section-title gradient-text">Research Works</h2>
          <div class="divider"></div>
          <p class="section-desc">Academic research, papers, and intellectual contributions to my field of study.</p>
        </div>
        <div class="research-grid">${itemsHtml}</div>
      </div>
    </section>
  `;
}

/* ─── PAGE: CONTACT ──────────────────────────────── */
function renderContact() {
  const p = DB.profile;
  document.getElementById('page-contact').innerHTML = `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Reach Out</div>
          <h2 class="section-title gradient-text">Contact Me</h2>
          <div class="divider"></div>
          <p class="section-desc">I'd love to hear from you! Feel free to reach out for collaborations, questions, or just to say hello.</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="glass-card contact-card">
              <div class="contact-icon">📧</div>
              <div><div class="contact-label">Email</div><div class="contact-value">${escHtml(p.email)}</div></div>
            </div>
            <div class="glass-card contact-card">
              <div class="contact-icon">📱</div>
              <div><div class="contact-label">Phone</div><div class="contact-value">${escHtml(p.phone)}</div></div>
            </div>
            <div class="glass-card contact-card">
              <div class="contact-icon">📍</div>
              <div><div class="contact-label">Address</div><div class="contact-value">${escHtml(p.address)}</div></div>
            </div>
            <div class="glass-card contact-card">
              <div class="contact-icon">👩</div>
              <div><div class="contact-label">Name</div><div class="contact-value">${escHtml(p.name)}</div></div>
            </div>
          </div>
          <div class="glass-card contact-form-card">
            <h3>Send a Message 💌</h3>
            <form id="contact-form" onsubmit="submitContactForm(event)">
              <div class="form-group">
                <label for="cf-name">Your Name</label>
                <input type="text" id="cf-name" placeholder="Enter your name" required>
              </div>
              <div class="form-group">
                <label for="cf-email">Your Email</label>
                <input type="email" id="cf-email" placeholder="Enter your email" required>
              </div>
              <div class="form-group">
                <label for="cf-subject">Subject</label>
                <input type="text" id="cf-subject" placeholder="What's this about?">
              </div>
              <div class="form-group">
                <label for="cf-msg">Message</label>
                <textarea id="cf-msg" placeholder="Write your message here..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">
                📤 Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function submitContactForm(e) {
  e.preventDefault();
  const sub = {
    id:      genId('msg'),
    name:    document.getElementById('cf-name').value,
    email:   document.getElementById('cf-email').value,
    subject: document.getElementById('cf-subject').value,
    message: document.getElementById('cf-msg').value,
    date:    new Date().toLocaleDateString('en-IN')
  };
  DB.contact_submissions.push(sub);
  saveData(DB);
  e.target.reset();
  toast('Message sent successfully! 💌');
}

/* ─── ADMIN ──────────────────────────────────────── */
let adminUnlocked = false;
let currentAdminSection = 'profile';

function renderAdmin() {
  if (!adminUnlocked) {
    renderPasswordGate();
    return;
  }
  renderAdminPanel();
}

function renderPasswordGate() {
  document.getElementById('page-admin').innerHTML = `
    <div class="password-gate">
      <div class="glass-card password-card">
        <span class="password-icon">🔐</span>
        <h2 class="gradient-text">Admin Access</h2>
        <p>Enter the admin password to manage your portfolio content.</p>
        <div class="form-group">
          <input type="password" id="admin-pass-input" placeholder="Enter password..."
            onkeydown="if(event.key==='Enter')checkAdminPass()">
        </div>
        <div class="password-error" id="pass-error">❌ Incorrect password. Please try again.</div>
        <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px" onclick="checkAdminPass()">
          🔓 Unlock Admin Panel
        </button>
      </div>
    </div>
  `;
  setTimeout(() => document.getElementById('admin-pass-input')?.focus(), 100);
}

function checkAdminPass() {
  const val = document.getElementById('admin-pass-input')?.value;
  if (val === 'tanushka2007') {
    adminUnlocked = true;
    renderAdminPanel();
    toast('Admin panel unlocked! 🎉');
  } else {
    document.getElementById('pass-error')?.classList.add('show');
    document.getElementById('admin-pass-input').value = '';
  }
}

function renderAdminPanel() {
  const sections = [
    { id: 'profile',      icon: '👤', label: 'Profile' },
    { id: 'photos',       icon: '📷', label: 'Photos' },
    { id: 'education',    icon: '🎓', label: 'Education' },
    { id: 'achievements', icon: '🏆', label: 'Achievements' },
    { id: 'gallery',      icon: '🖼️', label: 'Gallery' },
    { id: 'hobbies',      icon: '🎯', label: 'Hobbies' },
    { id: 'experience',   icon: '💼', label: 'Experience' },
    { id: 'research',     icon: '🔬', label: 'Research' },
    { id: 'messages',     icon: '📩', label: 'Messages' },
  ];

  const menuHtml = sections.map(s => `
    <li>
      <button class="admin-menu-item ${currentAdminSection===s.id?'active':''}"
        onclick="switchAdminSection('${s.id}')">
        <span class="admin-menu-icon">${s.icon}</span> ${s.label}
      </button>
    </li>
  `).join('');

  document.getElementById('page-admin').innerHTML = `
    <div class="container" style="padding-top:40px;padding-bottom:80px">
      <div class="admin-header">
        <h1>⚙️ <span class="gradient-text">Admin Panel</span></h1>
        <button class="btn btn-outline btn-sm" onclick="lockAdmin()">🔒 Lock Panel</button>
      </div>
      <div class="admin-sections">
        <div class="admin-sidebar">
          <div class="glass-card" style="padding:16px">
            <ul class="admin-menu">${menuHtml}</ul>
          </div>
        </div>
        <div class="admin-content" id="admin-content">
          ${renderAdminSection(currentAdminSection)}
        </div>
      </div>
    </div>
  `;
}

function switchAdminSection(id) {
  currentAdminSection = id;
  document.querySelectorAll('.admin-menu-item').forEach(b => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase().includes(id) || b.onclick?.toString().includes(`'${id}'`));
  });
  // Re-render buttons properly
  document.querySelectorAll('.admin-menu-item').forEach(b => b.classList.remove('active'));
  event.currentTarget?.classList.add('active');
  document.getElementById('admin-content').innerHTML = renderAdminSection(id);
}

function lockAdmin() {
  adminUnlocked = false;
  renderPasswordGate();
  toast('Admin panel locked. 🔒');
}

function renderAdminSection(id) {
  switch(id) {
    case 'profile':      return adminProfileSection();
    case 'photos':       return adminPhotosSection();
    case 'education':    return adminListSection('education',    'Education',    ['period','title','sub','desc','icon']);
    case 'achievements': return adminListSection('achievements', 'Achievements', ['icon','title','date','desc']);
    case 'gallery':      return adminGallerySection();
    case 'hobbies':      return adminListSection('hobbies',      'Hobbies',      ['icon','name','desc']);
    case 'experience':   return adminListSection('experience',   'Experience',   ['period','title','sub','desc','icon']);
    case 'research':     return adminListSection('research',     'Research',     ['badge','title','abstract','year','type']);
    case 'messages':     return adminMessagesSection();
    default: return '';
  }
}

/* Admin: Profile ── */
function adminProfileSection() {
  const p = DB.profile;
  return `
    <div class="admin-section active" id="admin-profile">
      <div class="admin-section-header">
        <div class="admin-section-title">Edit Profile</div>
        <button class="btn btn-primary btn-sm" onclick="saveProfileForm()">💾 Save Changes</button>
      </div>
      <div class="glass-card" style="padding:28px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          ${adminField('Full Name','profile-name',p.name,'text')}
          ${adminField('Date of Birth','profile-dob',p.dob,'text')}
          ${adminField('Gender','profile-gender',p.gender,'text')}
          ${adminField('Role / Title','profile-role',p.role,'text')}
          ${adminField('Father Name','profile-father',p.father,'text')}
          ${adminField('Mother Name','profile-mother',p.mother,'text')}
          ${adminField('Phone','profile-phone',p.phone,'text')}
          ${adminField('Email','profile-email',p.email,'email')}
        </div>
        ${adminField('Address','profile-address',p.address,'text','col-span-2')}
        <div class="form-group" style="margin-top:4px">
          <label>Bio</label>
          <textarea id="profile-bio" style="min-height:100px;width:100%;padding:12px 16px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--text);font-family:Inter,sans-serif;resize:vertical;outline:none">${escHtml(p.bio)}</textarea>
        </div>
      </div>
    </div>
  `;
}

function adminField(label, id, value, type='text', extra='') {
  return `
    <div class="form-group" style="${extra==='col-span-2'?'grid-column:1/-1':''}">
      <label for="${id}">${label}</label>
      <input type="${type}" id="${id}" value="${escHtml(value||'')}" 
        style="width:100%;padding:12px 16px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--text);font-family:Inter,sans-serif;outline:none">
    </div>
  `;
}

function saveProfileForm() {
  DB.profile.name    = document.getElementById('profile-name')?.value    || DB.profile.name;
  DB.profile.dob     = document.getElementById('profile-dob')?.value     || DB.profile.dob;
  DB.profile.gender  = document.getElementById('profile-gender')?.value  || DB.profile.gender;
  DB.profile.role    = document.getElementById('profile-role')?.value    || DB.profile.role;
  DB.profile.father  = document.getElementById('profile-father')?.value  || DB.profile.father;
  DB.profile.mother  = document.getElementById('profile-mother')?.value  || DB.profile.mother;
  DB.profile.phone   = document.getElementById('profile-phone')?.value   || DB.profile.phone;
  DB.profile.email   = document.getElementById('profile-email')?.value   || DB.profile.email;
  DB.profile.address = document.getElementById('profile-address')?.value || DB.profile.address;
  DB.profile.bio     = document.getElementById('profile-bio')?.value     || DB.profile.bio;
  saveData(DB);
  toast('Profile saved! ✅');
}

/* Admin: Photos ── */
function adminPhotosSection() {
  const p = DB.profile;
  return `
    <div class="admin-section active" id="admin-photos">
      <div class="admin-section-header">
        <div class="admin-section-title">Profile Photo & Signature</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
        <div class="glass-card" style="padding:28px">
          <h4 style="margin-bottom:16px">📷 Profile Photo</h4>
          ${p.photo ? `<img src="${p.photo}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid var(--primary);display:block;margin:0 auto 16px">` : ''}
          <div class="upload-area" id="photo-upload-area" onclick="document.getElementById('photo-file').click()">
            <div class="upload-icon">📁</div>
            <div class="upload-text">Click or drag image here<br><small style="opacity:0.6">JPG, PNG, GIF — Max 5MB</small></div>
          </div>
          <input type="file" id="photo-file" accept="image/*" style="display:none" onchange="uploadPhoto(this,'profile')">
          ${p.photo ? `<button class="btn btn-danger btn-sm" style="margin-top:12px;width:100%;justify-content:center" onclick="removePhoto('profile')">🗑️ Remove Photo</button>` : ''}
        </div>
        <div class="glass-card" style="padding:28px">
          <h4 style="margin-bottom:16px">✍️ Signature</h4>
          ${p.signature ? `<img src="${p.signature}" style="max-height:80px;display:block;margin:0 auto 16px;border-bottom:1px solid var(--glass-border);padding-bottom:8px;filter:invert(1) brightness(0.9)">` : ''}
          <div class="upload-area" id="sig-upload-area" onclick="document.getElementById('sig-file').click()">
            <div class="upload-icon">✒️</div>
            <div class="upload-text">Click to upload signature image<br><small style="opacity:0.6">PNG with transparent bg works best</small></div>
          </div>
          <input type="file" id="sig-file" accept="image/*" style="display:none" onchange="uploadPhoto(this,'signature')">
          ${p.signature ? `<button class="btn btn-danger btn-sm" style="margin-top:12px;width:100%;justify-content:center" onclick="removePhoto('signature')">🗑️ Remove Signature</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

async function uploadPhoto(input, type) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast('File too large! Max 5MB', 'error'); return; }
  try {
    const b64 = await readFileAsBase64(file);
    if (type === 'profile')   DB.profile.photo     = b64;
    if (type === 'signature') DB.profile.signature = b64;
    saveData(DB);
    toast(`${type === 'profile' ? 'Photo' : 'Signature'} uploaded! ✅`);
    switchAdminSection('photos');
  } catch(e) { toast('Upload failed!', 'error'); }
}

function removePhoto(type) {
  if (type === 'profile')   DB.profile.photo     = null;
  if (type === 'signature') DB.profile.signature = null;
  saveData(DB);
  toast('Removed successfully.');
  switchAdminSection('photos');
}

/* Admin: Gallery Section ── */
function adminGallerySection() {
  const items = DB.gallery;
  const listHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-state-icon">🖼️</div><div class="empty-state-text">No photos yet</div></div>`
    : items.map((item,i) => `
      <div class="admin-list-item">
        <img src="${item.src}" style="width:56px;height:56px;border-radius:8px;object-fit:cover">
        <div class="admin-list-item-info">
          <div class="admin-list-item-title">${escHtml(item.caption || 'Photo '+(i+1))}</div>
        </div>
        <div class="admin-list-item-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteGalleryItem('${item.id}')">🗑️ Delete</button>
        </div>
      </div>
    `).join('');

  return `
    <div class="admin-section active">
      <div class="admin-section-header">
        <div class="admin-section-title">Gallery Photos</div>
        <button class="btn btn-primary btn-sm" onclick="document.getElementById('gallery-upload-input').click()">➕ Add Photos</button>
      </div>
      <input type="file" id="gallery-upload-input" accept="image/*" multiple style="display:none" onchange="uploadGalleryPhotos(this)">
      <div class="admin-list">${listHtml}</div>
    </div>
  `;
}

async function uploadGalleryPhotos(input) {
  const files = Array.from(input.files);
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) continue;
    const b64 = await readFileAsBase64(file);
    DB.gallery.push({ id: genId('gal'), src: b64, caption: file.name.replace(/\.[^.]+$/,'') });
  }
  saveData(DB);
  toast(`${files.length} photo(s) added! 📸`);
  document.getElementById('admin-content').innerHTML = renderAdminSection('gallery');
}

function deleteGalleryItem(id) {
  if (!confirm('Delete this photo?')) return;
  DB.gallery = DB.gallery.filter(g => g.id !== id);
  saveData(DB);
  toast('Photo deleted.');
  document.getElementById('admin-content').innerHTML = renderAdminSection('gallery');
}

/* Admin: Generic List Section ── */
function adminListSection(key, label, fields) {
  const items = DB[key] || [];
  const listHtml = items.length === 0
    ? `<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-text">No ${label.toLowerCase()} entries yet.</div></div>`
    : items.map(item => `
      <div class="admin-list-item">
        ${item.icon ? `<span style="font-size:1.5rem">${item.icon}</span>` : ''}
        <div class="admin-list-item-info">
          <div class="admin-list-item-title">${escHtml(item.title || item.name || item.badge || 'Entry')}</div>
          <div class="admin-list-item-sub">${escHtml(item.sub || item.date || item.year || item.period || '')}</div>
        </div>
        <div class="admin-list-item-actions">
          <button class="btn btn-ghost btn-sm" onclick="openEditModal('${key}','${item.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteItem('${key}','${item.id}')">🗑️</button>
        </div>
      </div>
    `).join('');

  return `
    <div class="admin-section active">
      <div class="admin-section-header">
        <div class="admin-section-title">${label}</div>
        <button class="btn btn-primary btn-sm" onclick="openAddModal('${key}')">➕ Add ${label}</button>
      </div>
      <div class="admin-list">${listHtml}</div>
    </div>
  `;
}

function deleteItem(key, id) {
  if (!confirm('Delete this item?')) return;
  DB[key] = DB[key].filter(i => i.id !== id);
  saveData(DB);
  toast('Deleted successfully.');
  document.getElementById('admin-content').innerHTML = renderAdminSection(key);
}

/* Admin: Messages ── */
function adminMessagesSection() {
  const msgs = DB.contact_submissions || [];
  const listHtml = msgs.length === 0
    ? `<div class="empty-state"><div class="empty-state-icon">📩</div><div class="empty-state-text">No messages yet.</div></div>`
    : msgs.map(m => `
      <div class="admin-list-item" style="flex-direction:column;align-items:flex-start;gap:8px">
        <div style="display:flex;justify-content:space-between;width:100%;align-items:center">
          <div>
            <div class="admin-list-item-title">${escHtml(m.name)} — ${escHtml(m.subject||'(No subject)')}</div>
            <div class="admin-list-item-sub">📧 ${escHtml(m.email)} · 📅 ${escHtml(m.date)}</div>
          </div>
          <button class="btn btn-danger btn-sm" onclick="deleteMsg('${m.id}')">🗑️</button>
        </div>
        <p style="color:var(--text-muted);font-size:0.88rem;line-height:1.6;margin:0">${escHtml(m.message)}</p>
      </div>
    `).join('');

  return `
    <div class="admin-section active">
      <div class="admin-section-header">
        <div class="admin-section-title">Contact Messages (${msgs.length})</div>
      </div>
      <div class="admin-list">${listHtml}</div>
    </div>
  `;
}

function deleteMsg(id) {
  DB.contact_submissions = DB.contact_submissions.filter(m => m.id !== id);
  saveData(DB);
  toast('Message deleted.');
  document.getElementById('admin-content').innerHTML = renderAdminSection('messages');
}

/* ─── MODAL for Add / Edit ───────────────────────── */
const FIELD_LABELS = {
  icon: 'Icon (emoji)', title: 'Title', name: 'Name', period: 'Period',
  sub: 'Subtitle', desc: 'Description', date: 'Date / Year', year: 'Year',
  type: 'Type', badge: 'Badge', abstract: 'Abstract / Summary'
};

function openAddModal(key) {
  const fields = getFieldsForKey(key);
  showModal('Add Entry', fields, {}, (data) => {
    data.id = genId(key);
    DB[key].push(data);
    saveData(DB);
    toast('Entry added! ✅');
    document.getElementById('admin-content').innerHTML = renderAdminSection(key);
  });
}

function openEditModal(key, id) {
  const item = DB[key].find(i => i.id === id);
  if (!item) return;
  const fields = getFieldsForKey(key);
  showModal('Edit Entry', fields, item, (data) => {
    const idx = DB[key].findIndex(i => i.id === id);
    if (idx > -1) DB[key][idx] = Object.assign({}, item, data);
    saveData(DB);
    toast('Entry updated! ✅');
    document.getElementById('admin-content').innerHTML = renderAdminSection(key);
  });
}

function getFieldsForKey(key) {
  const map = {
    education:    ['icon','period','title','sub','desc'],
    achievements: ['icon','title','date','desc'],
    hobbies:      ['icon','name','desc'],
    experience:   ['icon','period','title','sub','desc'],
    research:     ['badge','title','abstract','year','type'],
  };
  return map[key] || ['title','desc'];
}

function showModal(title, fields, defaults, onSave) {
  const fieldsHtml = fields.map(f => {
    const label = FIELD_LABELS[f] || f;
    const val   = escHtml(defaults[f] || '');
    const isTextarea = ['desc','abstract','bio'].includes(f);
    return `
      <div class="form-group">
        <label for="modal-field-${f}">${label}</label>
        ${isTextarea
          ? `<textarea id="modal-field-${f}" placeholder="${label}" style="width:100%;padding:12px 16px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--text);font-family:Inter,sans-serif;min-height:80px;resize:vertical;outline:none">${val}</textarea>`
          : `<input type="text" id="modal-field-${f}" value="${val}" placeholder="${label}" style="width:100%;padding:12px 16px;border-radius:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:var(--text);font-family:Inter,sans-serif;outline:none">`
        }
      </div>
    `;
  }).join('');

  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = fieldsHtml;
  document.getElementById('modal-save-btn').onclick = () => {
    const data = {};
    fields.forEach(f => {
      const el = document.getElementById('modal-field-' + f);
      if (el) data[f] = el.value;
    });
    onSave(data);
    closeModal();
  };
  document.getElementById('main-modal').classList.add('open');
}

function closeModal() {
  document.getElementById('main-modal').classList.remove('open');
}

/* ─── RESUME PAGE ────────────────────────────────── */
let currentTemplate = 1;

function renderResumePage() {
  document.getElementById('page-resume').innerHTML = `
    <div class="resume-builder-header container">
      <div class="section-label" style="text-align:center">Download</div>
      <h2 class="section-title gradient-text" style="text-align:center">Resume Builder</h2>
      <div class="divider" style="margin:16px auto 32px"></div>
      <div class="template-selector">
        <button class="template-btn ${currentTemplate===1?'active':''}" onclick="selectTemplate(1)">
          <span class="tb-icon">🟣</span>
          <span class="tb-name">Violet Gradient</span>
          <span class="tb-style">Modern split layout</span>
        </button>
        <button class="template-btn ${currentTemplate===2?'active':''}" onclick="selectTemplate(2)">
          <span class="tb-icon">⚫</span>
          <span class="tb-name">Executive Dark</span>
          <span class="tb-style">Bold with gold accents</span>
        </button>
        <button class="template-btn ${currentTemplate===3?'active':''}" onclick="selectTemplate(3)">
          <span class="tb-icon">📜</span>
          <span class="tb-name">Classic Serif</span>
          <span class="tb-style">Elegant editorial</span>
        </button>
      </div>
      <div class="resume-actions">
        <button class="btn btn-primary" onclick="printResume()">🖨️ Print / Save as PDF</button>
        <button class="btn btn-outline" onclick="navigate('admin')">✏️ Edit Content</button>
      </div>
    </div>
    <div class="resume-preview-wrap">
      <div id="resume-print-area">
        ${buildResumeHTML(currentTemplate)}
      </div>
    </div>
    <div style="height:80px"></div>
  `;
}

function selectTemplate(n) {
  currentTemplate = n;
  document.querySelectorAll('.template-btn').forEach((b,i) => b.classList.toggle('active', i+1 === n));
  document.getElementById('resume-print-area').innerHTML = buildResumeHTML(n);
}

function printResume() {
  window.print();
}

function buildResumeHTML(template) {
  const p   = DB.profile;
  const edu = DB.education;
  const ach = DB.achievements;
  const exp = DB.experience;
  const hob = DB.hobbies;
  const res = DB.research;

  const photoEl = p.photo
    ? `<img src="${p.photo}" alt="${p.name}">`
    : `<span style="font-size:2.5rem;opacity:0.5">👩‍🎓</span>`;
  const sigEl = p.signature
    ? `<img src="${p.signature}" alt="Signature" class="rt${template}-signature">`
    : `<div style="height:40px;width:120px;border-bottom:2px solid currentColor;margin:0 auto"></div>`;

  if (template === 1) return buildTemplate1(p, edu, ach, exp, hob, res, photoEl, sigEl);
  if (template === 2) return buildTemplate2(p, edu, ach, exp, hob, res, photoEl, sigEl);
  return buildTemplate3(p, edu, ach, exp, hob, res, photoEl, sigEl);
}

function edusHtml_rt1(edu) {
  return edu.map(e => `
    <div class="rt1-entry">
      <div class="rt1-entry-title">${escHtml(e.title)}</div>
      <div class="rt1-entry-sub">${escHtml(e.sub)}</div>
      <div class="rt1-entry-date">${escHtml(e.period)}</div>
      <div class="rt1-entry-desc">${escHtml(e.desc)}</div>
    </div>
  `).join('');
}

function buildTemplate1(p, edu, ach, exp, hob, res, photoEl, sigEl) {
  return `
  <div class="resume-doc resume-template-1">
    <div class="rt1-header">
      <div class="rt1-photo">${photoEl}</div>
      <div class="rt1-header-info">
        <div class="rt1-name">${escHtml(p.name)}</div>
        <div class="rt1-role">${escHtml(p.role)}</div>
        <div class="rt1-contacts">
          <div class="rt1-contact-item">📧 ${escHtml(p.email)}</div>
          <div class="rt1-contact-item">📱 ${escHtml(p.phone)}</div>
          <div class="rt1-contact-item">📍 ${escHtml(p.address)}</div>
        </div>
      </div>
      <div class="rt1-signature-wrap">
        ${sigEl}
        <div class="rt1-sig-label">Signature</div>
      </div>
    </div>
    <div class="rt1-sidebar">
      <div class="rt1-section-title">Personal Info</div>
      <div class="rt1-info-item"><div class="rt1-info-key">Date of Birth</div><div class="rt1-info-val">${escHtml(p.dob)}</div></div>
      <div class="rt1-info-item"><div class="rt1-info-key">Gender</div><div class="rt1-info-val">${escHtml(p.gender)}</div></div>
      <div class="rt1-info-item"><div class="rt1-info-key">Father</div><div class="rt1-info-val">${escHtml(p.father)}</div></div>
      <div class="rt1-info-item"><div class="rt1-info-key">Mother</div><div class="rt1-info-val">${escHtml(p.mother)}</div></div>

      <div class="rt1-section-title" style="margin-top:20px">Hobbies</div>
      ${hob.map(h => `<span class="rt1-hobby-tag">${h.icon} ${escHtml(h.name)}</span>`).join('')}

      ${res.length > 0 ? `
        <div class="rt1-section-title" style="margin-top:20px">Research</div>
        ${res.map(r => `<div class="rt1-info-item"><div class="rt1-info-val" style="font-size:0.78rem">${escHtml(r.title)}</div><div class="rt1-info-key">${escHtml(r.year)}</div></div>`).join('')}
      ` : ''}
    </div>
    <div class="rt1-main">
      ${p.bio ? `
        <div class="rt1-main-section">
          <div class="rt1-main-title">🌟 About Me</div>
          <p style="font-size:0.85rem;color:#555;line-height:1.7">${escHtml(p.bio)}</p>
        </div>
      ` : ''}
      <div class="rt1-main-section">
        <div class="rt1-main-title">🎓 Education</div>
        ${edu.map(e => `
          <div class="rt1-entry">
            <div class="rt1-entry-title">${escHtml(e.title)}</div>
            <div class="rt1-entry-sub">${escHtml(e.sub)}</div>
            <div class="rt1-entry-date">${escHtml(e.period)}</div>
            <div class="rt1-entry-desc">${escHtml(e.desc)}</div>
          </div>
        `).join('')}
      </div>
      ${exp.length > 0 ? `
        <div class="rt1-main-section">
          <div class="rt1-main-title">💼 Experience</div>
          ${exp.map(e => `
            <div class="rt1-entry">
              <div class="rt1-entry-title">${escHtml(e.title)}</div>
              <div class="rt1-entry-sub">${escHtml(e.sub)}</div>
              <div class="rt1-entry-date">${escHtml(e.period)}</div>
              <div class="rt1-entry-desc">${escHtml(e.desc)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      ${ach.length > 0 ? `
        <div class="rt1-main-section">
          <div class="rt1-main-title">🏆 Achievements</div>
          ${ach.map(a => `
            <div class="rt1-entry">
              <div class="rt1-entry-title">${a.icon} ${escHtml(a.title)}</div>
              <div class="rt1-entry-date">${escHtml(a.date)}</div>
              <div class="rt1-entry-desc">${escHtml(a.desc)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  </div>`;
}

function buildTemplate2(p, edu, ach, exp, hob, res, photoEl, sigEl) {
  return `
  <div class="resume-doc resume-template-2">
    <div class="rt2-header">
      <div>
        <div class="rt2-name">${escHtml(p.name)}</div>
        <div class="rt2-role">${escHtml(p.role)}</div>
        <div class="rt2-contacts">
          <div class="rt2-contact-item">📧 ${escHtml(p.email)}</div>
          <div class="rt2-contact-item">📱 ${escHtml(p.phone)}</div>
          <div class="rt2-contact-item">📍 ${escHtml(p.address)}</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
        <div class="rt2-photo">${photoEl}</div>
        <div class="rt2-signature-wrap">
          ${sigEl}
          <div class="rt2-sig-line"></div>
          <div class="rt2-sig-label">Signature</div>
        </div>
      </div>
    </div>
    <div class="rt2-body">
      <div class="rt2-sidebar">
        <div class="rt2-section-title">Personal Info</div>
        <div class="rt2-info-item"><div class="rt2-info-key">Date of Birth</div><div class="rt2-info-val">${escHtml(p.dob)}</div></div>
        <div class="rt2-info-item"><div class="rt2-info-key">Gender</div><div class="rt2-info-val">${escHtml(p.gender)}</div></div>
        <div class="rt2-info-item"><div class="rt2-info-key">Father</div><div class="rt2-info-val">${escHtml(p.father)}</div></div>
        <div class="rt2-info-item"><div class="rt2-info-key">Mother</div><div class="rt2-info-val">${escHtml(p.mother)}</div></div>
        <div class="rt2-section-title" style="margin-top:20px">Hobbies</div>
        ${hob.map(h => `<span class="rt2-hobby-tag">${h.icon} ${escHtml(h.name)}</span>`).join('')}
        ${res.length > 0 ? `
          <div class="rt2-section-title" style="margin-top:20px">Research</div>
          ${res.map(r=>`<div class="rt2-info-item"><div class="rt2-info-val" style="font-size:0.78rem">${escHtml(r.title)}</div><div class="rt2-info-key">${escHtml(r.year)}</div></div>`).join('')}
        ` : ''}
      </div>
      <div class="rt2-main">
        ${p.bio ? `
          <div class="rt2-main-section">
            <div class="rt2-main-title">Profile</div>
            <p style="font-size:0.82rem;color:#8876a8;line-height:1.7">${escHtml(p.bio)}</p>
          </div>
        ` : ''}
        <div class="rt2-main-section">
          <div class="rt2-main-title">Education</div>
          ${edu.map(e => `
            <div class="rt2-entry">
              <div class="rt2-entry-title">${escHtml(e.title)}</div>
              <div class="rt2-entry-sub">${escHtml(e.sub)}</div>
              <div class="rt2-entry-date">${escHtml(e.period)}</div>
              <div class="rt2-entry-desc">${escHtml(e.desc)}</div>
            </div>
          `).join('')}
        </div>
        ${exp.length > 0 ? `
          <div class="rt2-main-section">
            <div class="rt2-main-title">Experience</div>
            ${exp.map(e => `
              <div class="rt2-entry">
                <div class="rt2-entry-title">${escHtml(e.title)}</div>
                <div class="rt2-entry-sub">${escHtml(e.sub)}</div>
                <div class="rt2-entry-date">${escHtml(e.period)}</div>
                <div class="rt2-entry-desc">${escHtml(e.desc)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${ach.length > 0 ? `
          <div class="rt2-main-section">
            <div class="rt2-main-title">Achievements</div>
            ${ach.map(a => `
              <div class="rt2-entry">
                <div class="rt2-entry-title">${a.icon} ${escHtml(a.title)}</div>
                <div class="rt2-entry-date">${escHtml(a.date)}</div>
                <div class="rt2-entry-desc">${escHtml(a.desc)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  </div>`;
}

function buildTemplate3(p, edu, ach, exp, hob, res, photoEl, sigEl) {
  return `
  <div class="resume-doc resume-template-3">
    <div class="rt3-header">
      <div>
        <div class="rt3-name">${escHtml(p.name)}</div>
        <div class="rt3-role">${escHtml(p.role)}</div>
        <div class="rt3-contacts">
          <div class="rt3-contact-item">📧 ${escHtml(p.email)}</div>
          <div class="rt3-contact-item">📱 ${escHtml(p.phone)}</div>
          <div class="rt3-contact-item">📍 ${escHtml(p.address)}</div>
        </div>
      </div>
      <div class="rt3-photo-sig">
        <div class="rt3-photo">${photoEl}</div>
        ${sigEl}
        <div class="rt3-sig-line"></div>
        <div class="rt3-sig-label">Signature</div>
      </div>
    </div>
    <div class="rt3-body">
      <div class="rt3-sidebar">
        <div class="rt3-section-title">Personal</div>
        <div class="rt3-info-item"><div class="rt3-info-key">Date of Birth</div><div class="rt3-info-val">${escHtml(p.dob)}</div></div>
        <div class="rt3-info-item"><div class="rt3-info-key">Gender</div><div class="rt3-info-val">${escHtml(p.gender)}</div></div>
        <div class="rt3-info-item"><div class="rt3-info-key">Father</div><div class="rt3-info-val">${escHtml(p.father)}</div></div>
        <div class="rt3-info-item"><div class="rt3-info-key">Mother</div><div class="rt3-info-val">${escHtml(p.mother)}</div></div>
        <div class="rt3-section-title" style="margin-top:20px">Hobbies</div>
        ${hob.map(h => `<div class="rt3-hobby-tag">${escHtml(h.name)}</div>`).join('')}
        ${res.length > 0 ? `
          <div class="rt3-section-title" style="margin-top:20px">Research</div>
          ${res.map(r=>`<div class="rt3-info-item"><div class="rt3-info-val" style="font-size:0.78rem">${escHtml(r.title)}</div></div>`).join('')}
        ` : ''}
      </div>
      <div class="rt3-main">
        ${p.bio ? `
          <div class="rt3-main-section">
            <div class="rt3-main-title">Profile</div>
            <div class="rt3-entry"><div class="rt3-entry-desc">${escHtml(p.bio)}</div></div>
          </div>
        ` : ''}
        <div class="rt3-main-section">
          <div class="rt3-main-title">Education</div>
          ${edu.map(e => `
            <div class="rt3-entry">
              <div class="rt3-entry-title">${escHtml(e.title)}</div>
              <div class="rt3-entry-sub">${escHtml(e.sub)}</div>
              <div class="rt3-entry-date">${escHtml(e.period)}</div>
              <div class="rt3-entry-desc">${escHtml(e.desc)}</div>
            </div>
          `).join('')}
        </div>
        ${exp.length > 0 ? `
          <div class="rt3-main-section">
            <div class="rt3-main-title">Experience</div>
            ${exp.map(e => `
              <div class="rt3-entry">
                <div class="rt3-entry-title">${escHtml(e.title)}</div>
                <div class="rt3-entry-sub">${escHtml(e.sub)}</div>
                <div class="rt3-entry-date">${escHtml(e.period)}</div>
                <div class="rt3-entry-desc">${escHtml(e.desc)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${ach.length > 0 ? `
          <div class="rt3-main-section">
            <div class="rt3-main-title">Achievements</div>
            ${ach.map(a => `
              <div class="rt3-entry">
                <div class="rt3-entry-title">${a.icon} ${escHtml(a.title)}</div>
                <div class="rt3-entry-date">${escHtml(a.date)}</div>
                <div class="rt3-entry-desc">${escHtml(a.desc)}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  </div>`;
}

/* ─── HELPERS ────────────────────────────────────── */
function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function emptyState(icon, text) {
  return `<div class="empty-state"><div class="empty-state-icon">${icon}</div><div class="empty-state-text">${text}</div></div>`;
}

/* ─── INIT ───────────────────────────────────────── */
window.addEventListener('hashchange', router);

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hamburger menu
  document.getElementById('hamburger')?.addEventListener('click', function() {
    this.classList.toggle('open');
    document.getElementById('nav-drawer')?.classList.toggle('open');
  });

  // Lightbox close
  document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this || e.target.id === 'lightbox-close-btn') {
      this.classList.remove('open');
    }
  });

  // Modal close on overlay click
  document.getElementById('main-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  // Initial route
  router();
});
