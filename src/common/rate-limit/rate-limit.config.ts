export const rateLimitConfig = {
  // Configuración para registro de whitelist
  whitelist: {
    ttl: 60 * 1000, // 1 minuto en milisegundos
    limit: 3, // 3 intentos por minuto por IP
  },
  
  // Configuración para autenticación
  auth: {
    ttl: 15 * 60 * 1000, // 15 minutos
    limit: 5, // 5 intentos fallidos por 15 minutos
  },
  
  // Configuración global por defecto
  global: {
    ttl: 60 * 1000, // 1 minuto
    limit: 100, // 100 requests por minuto por IP
  }
};
