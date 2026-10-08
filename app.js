const menuButton=document.querySelector('.menu-button');
const mobileNav=document.querySelector('.mobile-nav');

if(menuButton&&mobileNav){
  menuButton.addEventListener('click',()=>{
    const open=menuButton.getAttribute('aria-expanded')==='true';
    menuButton.setAttribute('aria-expanded',String(!open));
    mobileNav.hidden=open;
  });
  mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    mobileNav.hidden=true;
    menuButton.setAttribute('aria-expanded','false');
  }));
}

function setupGuide(){
  const tabsWrap=document.querySelector('.guide-tabs');
  const firstPanel=document.querySelector('.guide-panel');
  if(!tabsWrap||!firstPanel)return;

  const registerTab=document.createElement('button');
  registerTab.className='guide-tab active';
  registerTab.dataset.tab='register';
  registerTab.textContent='1. Creează cont';
  tabsWrap.prepend(registerTab);

  const registerPanel=document.createElement('div');
  registerPanel.className='guide-panel active';
  registerPanel.dataset.panel='register';
  registerPanel.innerHTML=`
    <div class="guide-visual">
      <div class="form-mock">
        <label>Nume complet</label><div>Andrei Popescu</div>
        <label>E-mail de serviciu</label><div>andrei.popescu@companie.ro</div>
        <label>Parolă</label><div>••••••••••</div>
        <div class="fake-button">Creează cont</div>
      </div>
    </div>
    <div class="guide-copy">
      <span class="guide-number">01</span>
      <h3>Creează contul cu adresa de serviciu</h3>
      <p>Dacă nu ai încă un cont SpareLog, alege „Creează cont” și înregistrează-te cu datele tale reale de serviciu. Contul este individual și va fi folosit pentru identificarea corectă a înregistrărilor tale.</p>
      <ul>
        <li><strong>Folosește adresa de e-mail a companiei</strong>, nu o adresă personală, atunci când ai una disponibilă.</li>
        <li>Introdu numele și prenumele reale, exact cum vrei să apară în evidențele echipei.</li>
        <li>Alege o parolă de minimum 8 caractere și confirm-o corect.</li>
        <li>Nu crea cont în numele unui coleg și nu folosi un cont comun pentru mai multe persoane.</li>
        <li>Dacă aplicația îți cere confirmarea adresei, verifică e-mailul de serviciu și urmează mesajul de confirmare înainte de autentificare.</li>
      </ul>
    </div>`;
  firstPanel.parentNode.insertBefore(registerPanel,firstPanel);

  const originalTabs=[...tabsWrap.querySelectorAll('.guide-tab')].filter(t=>t.dataset.tab!=='register');
  const labels=['2. Autentificare','3. Adaugă piesă','4. Fotografie','5. Progres','6. Raport'];
  originalTabs.forEach((tab,index)=>{
    if(labels[index])tab.textContent=labels[index];
    tab.classList.remove('active');
  });

  const originalPanels=[...document.querySelectorAll('.guide-panel')].filter(p=>p.dataset.panel!=='register');
  originalPanels.forEach((panel,index)=>{
    panel.classList.remove('active');
    const number=panel.querySelector('.guide-number');
    if(number)number.textContent=String(index+2).padStart(2,'0');
  });

  const tabs=[...document.querySelectorAll('.guide-tab')];
  const panels=[...document.querySelectorAll('.guide-panel')];
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    const id=tab.dataset.tab;
    tabs.forEach(t=>t.classList.toggle('active',t===tab));
    panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===id));
  }));
}

setupGuide();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}),{threshold:.12});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();