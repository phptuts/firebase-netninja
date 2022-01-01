import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSiHg_s_OgA1WlRJvg-3eJBGTO4vh0OiU",
  authDomain: "fir-9-dojo-64737.firebaseapp.com",
  projectId: "fir-9-dojo-64737",
  storageBucket: "fir-9-dojo-64737.appspot.com",
  messagingSenderId: "303398288363",
  appId: "1:303398288363:web:d90c57f8bd33d26700b7ae",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init Services
const db = getFirestore();
const auth = getAuth();

// get reference for collection
const colRef = collection(db, "books");

// queries

const q = query(
  colRef,
  //   where("author", "==", "Dave Berry"),
  orderBy("createdAt")
);

// get collection data
getDocs(q)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    console.log(books, "ordered");
  })
  .catch((err) => console.log(err.message));

// realtime update
const unsubCol = onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  console.log(books, "regular");
});

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// get doc

const docRef = doc(db, "books", "TSRx5n2GG27Me013y56y");

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id, "single doc");
// });

// listener
const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

// signup form
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //   console.log("user created: ", cred.user);
      signupForm.reset();
    })
    .catch((err) => console.log(err.message));
});

// login and logout

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    // .then(() => console.log("user signed out"))
    .catch((err) => console.log(err.message));
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //   console.log("user logged in: ", cred.user);
      loginForm.reset();
    })
    .catch((err) => console.log(err.message));
});

// subscribing to auth change

const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("user status changed:", user);
});

const unsubButton = document.querySelector(".unsub");
unsubButton.addEventListener("click", () => {
  console.log("unsubscribing");
  unsubAuth();
  unsubCol();
  unsubCol();
});
