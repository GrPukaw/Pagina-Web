const winston = require('winston');
const path = require('path');

// ============== CONFIGURACIÓN DE NIVELES ====================

const levels = {
error: 0,
warn: 1,
info: 2,
http: 3,
debug: 4,
};

// ============== COLORES PARA CONSOLA ====================

const colors = {
error: 'red',
warn: 'yellow',
info: 'green',
http: 'magenta',
debug: 'blue',
};

winston.addColors(colors);

// ============== FORMATO DE LOGS ====================

const format = winston.format.combine(
winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
winston.format.colorize({ all: true }),
winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message}`
)
);

// ============== TRANSPORTES (DÓNDE GUARDAR) ====================

const transports = [];

// 1️⃣ Transporte de CONSOLA (siempre activo)
transports.push(
new winston.transports.Console({
    format: format,
})
);

// 2️⃣ Transportes de ARCHIVOS (solo en producción o si se especifica)
if (process.env.NODE_ENV === 'production' || process.env.ENABLE_FILE_LOGGING === 'true') {

  // Crear directorio de logs si no existe
const fs = require('fs');
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

  // Archivo para TODOS los logs
transports.push(
    new winston.transports.File({
    filename: path.join(logsDir, 'all.log'),
    maxsize: 5242880,
    maxFiles: 5,
    format: winston.format.combine(
        winston.format.uncolorize(), // Sin colores en archivos
        winston.format.timestamp(),
        winston.format.json() // JSON para fácil parsing
    )
    })
);

  // Archivo SOLO para errores
transports.push(
    new winston.transports.File({
    filename: path.join(logsDir, 'errors.log'),
      level: 'error', // Solo errores
    maxsize: 5242880,
    maxFiles: 5,
    format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.timestamp(),
        winston.format.json()
    )
    })
);
}

// ============== CREAR LOGGER ====================

const logger = winston.createLogger({
level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
levels,
transports,
});
logger.database = (operation, details) => {
logger.debug(`[DB] ${operation}`, details);
};
logger.auth = (action, userId, success) => {
const level = success ? 'info' : 'warn';
logger[level](`[AUTH] ${action} - Usuario: ${userId} - ${success ? 'Éxito' : 'Fallo'}`);
};
logger.admin = (action, adminId, details) => {
logger.info(`[ADMIN] ${action} - Admin: ${adminId}`, details);
};
logger.security = (event, details) => {
logger.warn(`[SECURITY] ${event}`, details);
};
module.exports = logger;

