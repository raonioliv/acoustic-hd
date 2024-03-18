module.exports = { 
  port: 8081, 
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
    apiKey: process.env.EMAIL_SERVICE_API_KEY || 'mlsn.86f4289fd4d74fb494a5e2142812aca5459fdb7968f4a08c2ffdcb1ebaa8d619',
    customerServiceEmail: process.env.EMAIL_SERVICE_DOMAIN || 'MS_dkkhX0@trial-o65qngk8wr8gwr12.mlsender.net', 
    
  },
  clientBaseUrl: process.env.CLIENT_BASE_URL || 'http://localhost:8080/#', 
}