# Firebase 9 Course By NetNinja

## Initialize Firebase

```js
import { initializeApp } from "firebase/app";

const config = { /* your config */ }

initializeApp(config);
```

## How to get docs in a collection

```js
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";

const db = getFirestore();
const colRef = collection(db, "books");
getDocs(colRef).then((snapshot) => {
    const docs = snapshot.docs;
    docs.map(d => {
    	return {
	   ...d.data(), // get json data
	   id: d.id
	}
    })
});
```

## How to get a single doc


```js
import {
  getFirestore,
  getDoc,
  doc
} from "firebase/firestore";

const db = getFirestore();
const docRef = doc(db, "books", "firebase_id");
getDoc(docRef).then((doc) => {
  console.log(doc.data(), doc.id, "single doc");
});
```

## How to create a doc

```js

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";


const db = getFirestore();
const colRef = collection(db, "books");


addDoc(colRef, {
    title: "example title",
    author: "example author",
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
```

### TODO come back tomorrow and fix this

## How to update a doc


## How to query a doc


## How to login


## How to logout 


## How to listen for auth events


## How to unsub from listeners
