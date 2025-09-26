require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;

const menuRouter = require('./routes/menu');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/menu', menuRouter);

app.get('/', (req, res) => {
  res.redirect('/menu');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  require('./database/db');
});