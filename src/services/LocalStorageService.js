const STORAGE_NAME = process.env.REACT_APP_STORAGE_NAME;

function getToken() {
  return localStorage.getItem(STORAGE_NAME);
}

function setToken(token) {
  localStorage.setItem(STORAGE_NAME, token);
}

const LocalStorageService = { getToken, setToken };
export default LocalStorageService;
