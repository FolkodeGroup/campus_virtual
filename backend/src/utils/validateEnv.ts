/**
 * Definición de variables de entorno requeridas por el backend.
 */
export const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'PORT',
  'NODE_ENV',
];

/**
 * Valida que todas las variables de entorno necesarias estén presentes.
 * Si falta alguna, el proceso se detiene con un error descriptivo.
 */
export const validateEnv = () => {
  const missingVars = REQUIRED_ENV_VARS.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    console.error('\n❌ ERROR: Faltan variables de entorno requeridas:');
    missingVars.forEach((v) => console.error(`   - ${v}`));
    console.error('\nPor favor, verifica tu archivo .env (basado en .env.example).');
    process.exit(1);
  }

  console.log('✅ Variables de entorno validadas con éxito.\n');
};
