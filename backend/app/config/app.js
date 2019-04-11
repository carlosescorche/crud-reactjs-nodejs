// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 8080;


// ============================
//  app permitida
// ============================
process.env.FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000'


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/crud_users'
} else {
    urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB;
