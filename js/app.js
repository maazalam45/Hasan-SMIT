import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABXqdjKb0eIC6hns3XduVNOfRFkoVyv4E",
    authDomain: "shopping-mania-ecebd.firebaseapp.com",
    projectId: "shopping-mania-ecebd",
    storageBucket: "shopping-mania-ecebd.appspot.com",
    messagingSenderId: "412607740061",
    appId: "1:412607740061:web:f270f66dbfb310c7dc7c74",
    measurementId: "G-1BD47K3C5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore()


let loginLink = document.getElementById("login");
let uploadLink = document.getElementById("upload");
let signupLink = document.getElementById("signup");
let logoutBtn = document.getElementById("logout");


onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        localStorage.removeItem("user");
    }
    navDis();
});



window.logout = () => {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    }).catch((error) => {
        alert(error.message);
    });
}

function navDis() {
    if (localStorage.getItem("user") !== null) {
        loginLink.style.display = "none";
        signupLink.style.display = "none";
        uploadLink.className = "text-gray-900 hover:text-purple-600";
        logoutBtn.className = "text-gray-900 hover:text-purple-600";
    } else {
        loginLink.className = "text-gray-900 hover:text-purple-600"
        signupLink.className = "text-gray-900 hover:text-purple-600"
        uploadLink.style.display = "none";
        logoutBtn.style.display = "none";
    }
}

let productContent = document.getElementById("productContent")

let products = []
let getData = async () => {
    const reference = collection(db, "products");
    const res = await getDocs(reference)
    console.log(res);
    res.forEach((doc) => {
        let obj = {
            ...doc.data()
        }
        products.push(obj)
        console.log(products);
        let { imageUrl, productDescription, productName, productPrice } = obj
        productContent.innerHTML +=
            `
            <div id="productContent" class="bg-gray-100 p-6 rounded-lg shadow-md">
            <img
            src="${imageUrl}"
            alt="Product Image"
            class="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            ${productName}
          </h3>
          <p class="text-gray-600 mb-2">
            ${productDescription}
          </p>
          <p class="text-xl font-bold text-gray-900 mb-4">Rs.${productPrice}</p>
          <a
            href="#"
            class="block text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >View Details</a
          >
          </div>
       `
    })

}
getData()