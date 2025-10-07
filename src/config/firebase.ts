import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

if (!admin.apps.length) {
  if (!serviceAccountBase64) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_BASE64 is not defined");
  }
  const serviceAccount = JSON.parse(
    Buffer.from(serviceAccountBase64, "base64").toString("utf-8")
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const getDb = () => admin.firestore();
