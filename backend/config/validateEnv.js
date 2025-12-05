const crypto = require('crypto');

const requiredVars = {
    common: [
        'MONGODB_URI',
        'JWT_SECRET',
        'PORT',
        'FRONTEND_URL',
        'BACKEND_URL'
    ],
    production: [
        'EMAIL_HOST',
        'EMAIL_PORT',
        'EMAIL_USER',
        'EMAIL_PASS',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET'
    ]
};

const validations = {
    JWT_SECRET: (value) => {
        if (value.length < 32) {
            return 'JWT_SECRET debe tener al menos 32 caracteres para seguridad';
        }
        const weakSecrets = [
            'secret',
            'your_secret_here',
            'changeme',
            '123456789',
            'password',
            'jwr_secret'
        ];
        if (weakSecrets.some(weak => value.toLowerCase().includes(weak))) {
            return 'JWT_SECRET es demasiado débil, por favor elige uno más seguro, genera uno aleatorio con: node -e "console.log(require(\'crypto\').randomBytes(64).toString(\'hex\'))"';
        }
        return null;
    },
    FRONTEND_URL: (value) => {
        try {
            new URL(value);
            return null;
        } catch (error) {
            return 'FRONTEND_URL debe ser una URL válida';
        }
    },
    BACKEND_URL: (value) => {
        try {
            new URL(value);
            return null;
        } catch (error) {
            return 'BACKEND_URL debe ser una URL válida';
        }
    }
};

function validateEnv() {
    console.log('Validando variables de entorno...');
    const env = process.env.NODE_ENV || 'development';
    const errors = [];
    const warnings = [];
    
    const varsToCheck = [
        ...requiredVars.common,
        ...(env === 'production' ? requiredVars.production : [])
    ];
    
    varsToCheck.forEach(varName => {
        const value = process.env[varName];
        if (!value || value.trim() === '') {
            errors.push(`La variable de entorno ${varName} es obligatoria pero no está definida.`);
            return;
        }
        
        if (validations[varName]) {
            const errorMessage = validations[varName](value);
            if (errorMessage) {
                errors.push(`${varName}: ${errorMessage}`);
            }
        }
    });

    const validEnvs = ['development', 'production', 'test'];
    if (!validEnvs.includes(env)) {
        warnings.push(`NODE_ENV tiene un valor inusual: ${env}. Valores comunes son 'development', 'production' o 'test'.`);
    }

    if (env === 'production') {
        if (process.env.FRONTEND_URL?.includes('localhost')) {
            warnings.push('FRONTEND_URL apunta a localhost en producción, asegúrate de que esto es intencional.');
        }

        if (process.env.BACKEND_URL?.includes('localhost')) {
            warnings.push('BACKEND_URL apunta a localhost en producción, asegúrate de que esto es intencional.');
        }
        
        if (!process.env.ALLOWED_ORIGINS) {
            warnings.push('ALLOWED_ORIGINS no está definida en producción, considera configurarla para mayor seguridad.');
        }
    }
    
    if (errors.length > 0) {
        console.error('╔════════════════════════════════════════════╗');
        console.error('║    ERRORES DE CONFIGURACIÓN                ║');
        console.error('╚════════════════════════════════════════════╝\n');
        errors.forEach(error => console.error(error));
        console.error('\n💡 Revisa tu archivo .env y corrige los errores\n');
        process.exit(1);
    }
    
    if (warnings.length > 0) {
        console.warn('╔════════════════════════════════════════════╗');
        console.warn('║    ADVERTENCIAS DE CONFIGURACIÓN           ║');
        console.warn('╚════════════════════════════════════════════╝\n');
        warnings.forEach(warning => console.warn(warning));
        console.warn('');
    }

    console.log('✅ Todas las variables de entorno requeridas están configuradas correctamente.\n');
}

function generateSecureSecret() {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = {
    validateEnv,
    generateSecureSecret
};