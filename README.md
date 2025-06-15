# Recipe Book  <br>
## 🔗 Deployed Website  <br>
[https://recipe-book-49599.web.app](https://recipe-book-49599.web.app)<br>

## 📘 Project Overview  <br>
This is a multi-page interactive digital Recipe Book built using only HTML, CSS, and JavaScript — no frameworks or libraries required.  <br>
Users can add, view, and search through their favorite recipes in a stylish and animated book-like interface.<br>

This project uses **Firebase Firestore** to persist recipes across devices and sessions.  <br>
It is deployed using **Firebase Hosting**, making the app accessible from anywhere with an internet connection.<br>

## ✨ Key Features  <br>
- **Animated Opening Page** – Visually engaging page-turn animation simulates a real book opening.  <br>
- **Multi-Page Navigation** – Includes `index.html` (cover), `home.html` (recipe list), and `add.html` (add recipe form).  <br>
- **Add Recipe Form** – Users can input title, description, ingredients, steps, prep time, servings, and an image.  <br>
- **Live Search Functionality** – Instantly filter recipes by name or ingredient.  <br>
- **Recipe Cards with Modal View** – Recipes are displayed as cards; clicking a card opens a modal showing full details with image, ingredients, and steps.   <br>
- **Persistent Cloud Storage** – Recipes are saved in **Firebase Firestore**, making them available across devices.  <br>
- **Smooth Page Transitions** – Delayed navigation and animations enhance the storybook feel.  <br>
- **Firebase Hosting** – The entire app is deployed and served via Firebase’s blazing fast static hosting platform.  <br>

## 🚀 How to Use  <br>
1. **Open the App:** Go to [recipe-book-49599.web.app](https://recipe-book-49599.web.app)  <br>
2. **Turn the Page:** Click the arrow to flip from the cover page to the home page. <br> 
3. **Browse Recipes:** View recipes as cards and click to expand them.  <br>
4. **Search:** Use the search bar to filter by name or ingredient.  <br>
5. **Add a Recipe:** Click “Add New Recipe” → Fill the form → Upload an image → Submit.  <br>
6. **Cloud Sync:** Your recipe is saved in Firebase and accessible on any device.  <br>

## 🛠 Technologies Used  <br>
- **HTML5** – Semantic multi-page layout  <br>
- **CSS3** – Styling, transitions, modal UI, responsiveness  <br>
- **JavaScript (ES6+)** – DOM manipulation, event handling, Firestore integration  <br>
- **Firebase Firestore** – Stores all recipe data in a cloud-hosted NoSQL database  <br>
- **Firebase Hosting** – Deploys and hosts the web app for global access  <br>

## 🧠 Development Highlights  <br>
- **Firebase Integration:** Switched from localStorage to Firestore for persistent, multi-device data access.  <br>
- **Firestore CRUD:** Recipes are created and read using Firebase's Firestore SDK with async/await.  <br>
- **Hosting with CI/CD:** GitHub integration auto-deploys the app to Firebase Hosting on every push.  <br>
- **Realistic Page Flip:** CSS 3D transforms simulate a book page turning animation.  <br>
- **Form Handling & Validation:** JavaScript ensures all required recipe data is collected and validated before saving. <br>
- **Custom Modal System:** No third-party library – everything is built from scratch.  <br>
- **Image Uploads:** Images are converted to Base64 and stored directly in Firestore (as strings).  <br>
- **Scalable Structure:** Modular HTML, CSS, and JS files per page allow easy expansion.<br>
