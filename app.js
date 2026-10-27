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
