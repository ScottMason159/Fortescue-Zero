const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const reportDetails = [...document.querySelectorAll('.report-accordion')];
document.querySelector('[data-expand-all]')?.addEventListener('click', () => reportDetails.forEach(item => item.open = true));
document.querySelector('[data-collapse-all]')?.addEventListener('click', () => reportDetails.forEach(item => item.open = false));

const search = document.getElementById('register-search');
const priority = document.getElementById('priority-filter');
const type = document.getElementById('type-filter');
const rows = [...document.querySelectorAll('#closeout-table tbody tr')];
const noResults = document.getElementById('no-results');

function filterRegister() {
  const term = (search?.value || '').trim().toLowerCase();
  const selectedPriority = priority?.value || '';
  const selectedType = type?.value || '';
  let visible = 0;
  rows.forEach(row => {
    const cells = row.cells;
    const matchesText = !term || row.textContent.toLowerCase().includes(term);
    const matchesPriority = !selectedPriority || cells[0].textContent.trim() === selectedPriority;
    const matchesType = !selectedType || cells[1].textContent.trim() === selectedType;
    const show = matchesText && matchesPriority && matchesType;
    row.hidden = !show;
    if (show) visible += 1;
  });
  if (noResults) noResults.hidden = visible !== 0;
}
[search, priority, type].forEach(control => control?.addEventListener('input', filterRegister));
document.getElementById('reset-filters')?.addEventListener('click', () => {
  search.value = '';
  priority.value = '';
  type.value = '';
  filterRegister();
  search.focus();
});
