// ---------------- Light/Dark Mode ----------------------------
const mode = document.querySelector('button.mode');
const body = document.querySelector('body');

const getCurrentMode = () => {
  let currentMode = null;
  if (body.classList.contains('light')) {
    currentMode = 'light';
  } else if (body.classList.contains('dark')) {
    currentMode = 'dark';
  }
  return currentMode;
};

const toggleMainClass = () => {
  const current = getCurrentMode();
  body.classList.remove('light', 'dark');
  if (current === 'light') {
    body.classList.add('dark');
  } else if (current === 'dark') {
    body.classList.add('light');
  }
};

const toggleMode = (e) => {
  toggleMainClass();
};

mode.addEventListener('click', toggleMode);
// ---------------- Light/Dark Mode End ----------------------------

