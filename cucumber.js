module.exports = {
  default: [
    // Orden explícito de ejecución de features
    'features/auth-signup.feature',
    'features/login.feature',
    'features/home.feature',
    'features/cart.feature',
    'features/purchase.feature',
    // Step definitions y hooks
    '--require', 'features/step_definitions/*.js',
    '--require', 'features/support/*.js',
    // Formato de salida
    '--format', 'progress',
    '--format', 'json:reports/cucumber_report.json',
    // Otras opciones útiles
  // '--publish-quiet', // No publica resultados en cucumber.io
    //'--fail-fast',     // Detiene en el primer fallo
    '--tags', 'not @skip' // Ejecuta todos menos los marcados como @skip
  ]
};
