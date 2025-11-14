export const loggerConfig = {
  // Configuración de niveles de log
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
  },
  
  // Configuración de archivos de log
  files: {
    error: 'logs/error.log',
    combined: 'logs/combined.log',
    users: 'logs/users.log',
    auth: 'logs/auth.log',
    invitations: 'logs/invitations.log',
  },
  
  // Configuración de formato de fecha
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  
  // Configuración de retención de logs (en días)
  retention: {
    error: 30,
    combined: 14,
    users: 90,
    auth: 60,
    invitations: 30,
  }
};
