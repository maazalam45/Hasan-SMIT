import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore()
const storage = getStorage()

let product_name = document.getElementById("product_name")
let product_description = document.getElementById("product_description")
let product_price = document.getElementById("product_price")
let product_image = document.getElementById("product_image")

let upload = () => {
    return new Promise((resolve, reject) => {
        let files = product_image.files[0]
        console.log(files);
        const ranodomNum = Math.random().toString().slice(2)
        const storageRef = ref(storage, `images/${ranodomNum}`);
        const uploadTask = uploadBytesResumable(storageRef, files);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error.message);
                reject(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
}

window.uploadProd = () => {
    let obj = {
        productName: product_name.value,
        productDescription: product_description.value,
        productPrice: product_price.value,

    }
    console.log(obj);
    upload()
        .then(async res => {
            console.log(res);
            obj.imageUrl = res;
            console.log(obj);
            let reference = collection(db, "products")
            let result = await addDoc(reference, obj)
            window.location.assign("../../index.html")
        })
        .catch(err => {
            console.log(err);
        })
}


