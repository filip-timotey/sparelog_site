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

const apkDownloadUrl = 'https://drive.usercontent.google.com/download?id=1TtSL1sS7wRcAQh5KXLGO6LmrZE0aYaGi&export=download&confirm=t';
const apkDownloadButton = document.querySelector('#download a.button.light');

if (apkDownloadButton) {
  apkDownloadButton.href = apkDownloadUrl;
  apkDownloadButton.setAttribute('download', 'SpareLog-0.5.0+10.apk');
  apkDownloadButton.setAttribute('aria-label', 'Descarcă SpareLog 0.5.0 pentru Android');
}

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
