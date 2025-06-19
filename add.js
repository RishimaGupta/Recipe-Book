// Convert an image file to a Base64 string
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // Built-in JS class to read files

    reader.onload = () => resolve(reader.result); // When read is successful
    reader.onerror = error => reject(error);      // If there's an error

    reader.readAsDataURL(file); // Convert file to base64-encoded string
  });
}

// Event listener for form submission
document.getElementById('addRecipeForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form behavior (page reload)

  // Grab and clean up all form input values
  const name = document.getElementById('recipeName').value.trim();
  const description = document.getElementById('description').value.trim();
  const ingredients = document.getElementById('ingredients').value.split(',').map(i => i.trim());
  const preparation = document.getElementById('preparation').value.trim();
  const prepTime = document.getElementById('prepTime').value;
  const servings = document.getElementById('servings').value;
  const imageFile = document.getElementById('recipeImage').files[0];

  // Check for any missing required fields
  if (!name || !description || !preparation || !ingredients.length || !prepTime || !servings || !imageFile) {
    alert('Please fill in all fields.');
    return;
  }

  // Convert image to base64
  const imageBase64 = await getBase64(imageFile);

  // Create a new recipe object
  const newRecipe = {
    name,
    description,
    ingredients,
    preparation,
    prepTime,
    servings,
    image: imageBase64
  };

  // Load, update, and save the recipe list
  try {
    const db = window.db;
    const addDoc = window.firestoreAddDoc;
    const collection = window.firestoreCollection;

    await addDoc(collection(db, "recipes"), newRecipe);

    alert('Recipe added successfully!');
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 500);
  } 
  catch (error) {
    console.error("Error saving recipe:", error);
    alert("Something went wrong while saving the recipe.");
  }
});
