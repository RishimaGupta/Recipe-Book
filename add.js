function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

function loadRecipes() {
  const stored = localStorage.getItem('recipes');
  return stored ? JSON.parse(stored) : [];
}

function saveRecipes(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

document.getElementById('addRecipeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('recipeName').value.trim();
  const description = document.getElementById('description').value.trim();
  const ingredients = document.getElementById('ingredients').value.split(',').map(i => i.trim());
  const preparation = document.getElementById('preparation').value.trim();
  const prepTime = document.getElementById('prepTime').value;
  const servings = document.getElementById('servings').value;
  const imageFile = document.getElementById('recipeImage').files[0];

  if (!name || !description || !preparation || !ingredients.length || !prepTime || !servings || !imageFile) {
    alert('Please fill in all fields.');
    return;
  }

  const imageBase64 = await getBase64(imageFile);

  const newRecipe = {
    name,
    description,
    ingredients,
    preparation,
    prepTime,
    servings,
    image: imageBase64
  };

  const recipes = loadRecipes();
  recipes.push(newRecipe);
  saveRecipes(recipes);

  alert('Recipe added successfully!');
  document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 500);
});
