const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Body parser middleware to parse JSON bodies
app.use(bodyParser.json());

// Set the view engine to ejs for templating
app.set('view engine', 'ejs');

// Array to hold bookmarked names
let bookmarks = [];

// Route for the home page
app.get('/', (req, res) => {
  res.render('index', { bookmarks: bookmarks });
});

// Route to get a random name
app.get('/name/:gender', (req, res) => {
  const boyNames = ['Liam', 'Noah', 'Oliver', 'Elijah', 'William'];
  const girlNames = ['Olivia', 'Emma', 'Ava', 'Charlotte', 'Sophia'];
  const { gender } = req.params;
  const nameList = gender === 'boy' ? boyNames : girlNames;
  const randomName = nameList[Math.floor(Math.random() * nameList.length)];
  res.json({ name: randomName });
});

// Route to bookmark a name
app.post('/bookmark', (req, res) => {
  const { name } = req.body;
  if (name && !bookmarks.includes(name)) {
    bookmarks.push(name);
  }
  res.json({ name: name });
});

// Error handling for 404 Not Found
app.use((req, res, next) => {
  res.status(404).render('error', { error: 'Page not found' });
});

// Start the server only if running locally
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
