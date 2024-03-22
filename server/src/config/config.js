module.exports = { 
  port: process.env.PORT || 8081, 
  db: { 
    database: process.env.DB_NAME || 'tabtracker',
    user: process.env.DB_USER || 'tabtracker', 
    password: process.env.DB_PASS || 'tabtracker',
    options: { 
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './tabtracker.sqlite'
    }
  }, 
  authentication: { 
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }, 
  email: { 
    apiKey: process.env.EMAIL_SERVICE_API_KEY,
    customerServiceEmail: process.env.EMAIL_SERVICE_DOMAIN , 
    
  },
  clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://localhost:8080/#', 
}