const app = require('./app');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config();
(async () => {
  const PORT = process.env.PORT || 4444;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ....`);
  });
})();
