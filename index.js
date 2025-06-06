document.getElementById('turnPageArrow').addEventListener('click', () => {
  const page = document.getElementById('coverPage');
  const book = document.getElementById('bookCover');
  const audio = document.getElementById('pageSound');

  // Play sound
  audio.play();

  // Trigger the flip
  page.classList.add('flip');

  // After the flip, hide the book to reveal iframe
  setTimeout(() => {
    book.style.display = 'none';
    // iframe is already underneath, so it will show now
  }, 1000); // Match with your flip duration
});
