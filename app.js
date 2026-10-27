const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const tabs = [...document.querySelectorAll('.guide-tab')];
const panels = [...document.querySelectorAll('.guide-panel')];

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle('active', item === tab));
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === id));
  });
});

function syncGuideContent() {
  const addPanel = document.querySelector('[data-panel="add"] .guide-copy');
  if (addPanel) {
    const paragraph = addPanel.querySelector('p');
    if (paragraph) {
      paragraph.textContent = 'Apasă „Adaugă piesă” și completează toate câmpurile marcate cu *. Toate informațiile și fotografia sunt obligatorii.';
    }
    const list = addPanel.querySelector('ul');
    if (list) {
      list.innerHTML = '<li>Denumirea și codul piesei trebuie completate corect.</li><li>Locația, zona, linia, utilajul și asset-ul sunt obligatorii.</li><li>Observațiile și fotografia sunt obligatorii înainte de salvare.</li>';
    }
  }

  const reportPanel = document.querySelector('[data-panel="report"] .guide-copy');
  if (reportPanel) {
    const paragraph = reportPanel.querySelector('p');
    if (paragraph) {
      paragraph.textContent = 'Raportul centralizează informațiile într-un Excel profesional, compact și ușor de verificat.';
    }
    const list = reportPanel.querySelector('ul');
    if (list) {
      list.innerHTML = '<li>Tabelul principal păstrează doar informațiile esențiale pentru raportare.</li><li>Coloana Fotografie permite deschiderea rapidă a imaginii asociate piesei.</li><li>Fotografiile sunt păstrate proporțional, fără deformare inutilă.</li>';
    }
  }

  const faqItems = [...document.querySelectorAll('#faq details')];
  const updateFaq = faqItems.find((item) => item.querySelector('summary')?.textContent?.includes('actualizările'));
  if (updateFaq) {
    const answer = updateFaq.querySelector('p');
    if (answer) {
      answer.textContent = 'SpareLog verifică automat dacă există o versiune nouă și te anunță direct în aplicație. Actualizarea se instalează peste versiunea existentă, fără dezinstalare.';
    }
  }
}

syncGuideContent();

async function syncReleaseInfo() {
  try {
    const response = await fetch(`version.json?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) return;

    const release = await response.json();
    const version = String(release.version ?? '').trim();
    const buildNumber = Number(release.build_number);
    const downloadUrl = String(release.download_url ?? '').trim();

    if (!version || !Number.isInteger(buildNumber) || !downloadUrl.startsWith('https://')) {
      return;
    }

    const downloadButton = document.querySelector('#download a.button.light');
    if (downloadButton) {
      downloadButton.href = downloadUrl;
      downloadButton.setAttribute('download', `SpareLog-${version}+${buildNumber}.apk`);
      downloadButton.setAttribute('aria-label', `Descarcă SpareLog ${version} pentru Android`);
    }

    const versionHeading = document.querySelector('#download .closing-card h2');
    if (versionHeading) versionHeading.textContent = `SpareLog ${version}`;

    const downloadIntro = document.querySelector('#download .section-heading p');
    if (downloadIntro) {
      downloadIntro.textContent = `Versiunea oficială curentă pentru Android este SpareLog ${version}. Instalează APK-ul și autentifică-te cu contul tău.`;
    }

    const releaseDescription = document.querySelector('#download .closing-card p');
    if (releaseDescription) {
      releaseDescription.textContent = `Android APK · build ${buildNumber} · semnat pentru actualizări viitoare. La instalare, Android poate solicita permisiunea de a instala aplicații din browserul folosit.`;
    }
  } catch (_) {
    // Păstrăm pagina funcțională chiar dacă manifestul de versiune nu răspunde temporar.
  }
}

syncReleaseInfo();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
