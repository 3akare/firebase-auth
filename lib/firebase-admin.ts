import { initializeApp, cert, getApps } from "firebase-admin/app";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    privateKey: process.env.ADMIN_PRIVATE_KEY?.replace(/\n/g, "\n") as string,
    clientEmail: process.env.ADMIN_CLIENT_EMAIL as string,
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
