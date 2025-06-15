// Add click event to the arrow button to flip the cover page
document.getElementById('turnPageArrow').addEventListener('click', () => {
  const page = document.getElementById('coverPage');  // The page to flip
  const book = document.getElementById('bookCover'); // The container to hide after flip
  const audio = document.getElementById('pageSound'); // Page turn sound

  // Play page turn sound effect
  audio.play();

  // Add 'flip' class to trigger CSS transform animation
  page.classList.add('flip');

  // After animation duration, hide the book to reveal iframe below
  setTimeout(() => {
    book.style.display = 'none';
  }, 1000); // Match this delay to the CSS transition duration
});