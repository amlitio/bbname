const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const boyNames = ['Liam', 'Noah', 'Oliver', 'Elijah', 'William'];
const girlNames = ['Olivia', 'Emma', 'Ava', 'Charlotte', 'Sophia'];
let bookmarks = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { bookmarks });
});

app.get('/name/:gender', (req, res) => {
  const { gender } = req.params;
  const nameList = gender === 'boy' ? boyNames : girlNames;
  const randomName = nameList[Math.floor(Math.random() * nameList.length)];
  res.json({ name: randomName });
});

app.post('/bookmark', (req, res) => {
  const { name } = req.body;
  if (!bookmarks.includes(name)) {
    bookmarks.push(name);
  }
  res.json({ name });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
