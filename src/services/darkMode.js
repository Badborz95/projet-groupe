import { ref } from 'vue';

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Initialise selon le cookie
const isDarkMode = ref(getCookie('dark-mode') === 'active');

// Met à jour la classe body selon l'état
function updateBodyClass() {
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode');
    setCookie('dark-mode', 'active', 365);
  } else {
    document.body.classList.remove('dark-mode');
    setCookie('dark-mode', 'inactive', 365);
  }
}

// Applique la classe au chargement
updateBodyClass();

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  updateBodyClass();
};

export { isDarkMode, toggleDarkMode };