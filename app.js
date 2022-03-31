const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
express.urlencoded({ extended: true });

// settings database
const db = require('./app/models');

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //     useCreateIndex: true,
  })
  .then(() => {
    console.log('Database connected');
  }).catch((err) => {
    console.log('Cannot connect to the Database', err);
    process.exit();
  });

// routing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to express server222asd' });
});

require('./app/routes/post.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);
// running server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
