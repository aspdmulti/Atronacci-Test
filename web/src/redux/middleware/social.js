import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { userLogin } from "@/redux/middleware/user";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const gProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export const signInWithGoogle = (dispatch) => {
  signInWithPopup(auth, gProvider)
    .then((result) => {
      const email = result.user.email;
      const name = result.user.displayName;
      const password = "";
      const social = "google";
      dispatch(userLogin({ email, password, name, social }));
    })
    .catch((error) => {
      console.error(error);
    });
};

export const signInWithFb = (dispatch) => {
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      const email = result.user.email;
      const name = result.user.displayName;
      const password = "";
      const social = "fb";
      console.log(result);
      // dispatch(userLogin({ email, password, name, social }));
    })
    .catch((error) => {
      console.error(error);
    });
};
