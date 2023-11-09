document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.getElementById('generateName');
  const nameDisplay = document.getElementById('nameDisplay');
  const bookmarks = document.getElementById('bookmarks');

  generateBtn.addEventListener('click', function() {
    fetch('/name')
      .then(response => response.json())
      .then(data => {
        nameDisplay.textContent = data.name;
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.textContent = 'Bookmark';
        bookmarkBtn.onclick = function() {
          const bookmark = document.createElement('div');
          bookmark.textContent = data.name;
          bookmarks.appendChild(bookmark);
        };
        nameDisplay.appendChild(bookmarkBtn);
      });
  });
});
