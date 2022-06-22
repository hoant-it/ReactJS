const sqlConfig = {
  user: 'sa',
  password: 'Dbw@c0aL',
  database: 'wacoal',
  server: '192.168.79.201',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

module.exports = sqlConfig;
