import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore();

window.signUp = () => {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let obj = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then((res) => {
            obj.id = res.user.uid; // Set user ID

            // Remove password before saving to Firestore
            delete obj.password;

            const reference = doc(db, "users", obj.id);
            setDoc(reference, obj)
                .then(() => {
                    localStorage.setItem("user", JSON.stringify(obj)); // Save sanitized user object
                    window.location.replace("../../index.html"); // Redirect to home page
                })
                .catch((err) => {
                    alert(err.message); // Display Firestore error message
                });
        })
        .catch((err) => {
            alert(err.message); // Display sign-up error message
        });
};
