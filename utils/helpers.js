// Helpers para datos y utilidades
module.exports = {
  // Genera un username único usando un número random entre 1 y 9
  generateUniqueUsername(prefix = 'new_user') {
    const randomNum = Math.floor(Math.random() * 9) + 1; // número entre 1 y 9
    return `${prefix}_${randomNum}`;
  },
  // Pausa (preferir waits explícitos)
  sleep: (ms) => new Promise((res) => setTimeout(res, ms)),
};
