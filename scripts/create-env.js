const fs = require('fs');

const envFile = `
INFURA_URL=${process.env.INFURA_KEY}
NODE_ENV=production
`;

fs.writeFileSync('./.env', envFile);
