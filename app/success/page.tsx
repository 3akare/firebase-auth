"use client";
import { auth } from "@/lib/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  async function signOutUser() {
    //Sign out with the Firebase client
    await signOut(auth);

    //Clear the cookies in the server
    const response = await fetch("http://localhost:3000/api/signOut", {
      method: "POST",
    });

    if (response.status === 200) {
      router.push("/login");
    }
  }
  return (
    <main className="w-screen h-screen flex justify-center items-center gap-4 flex-col">
      <h1 className="text-3xl font-bold justify-self-start">Success</h1>
      <button
        className="p-2 bg-red-500 rounded-md text-white ring-offset-1 ring-2 ring-red-500 transition hover:scale-105 active:ring-offset-2"
        onClick={() => signOutUser()}
      >
        Sign Out
      </button>
    </main>
  );
}
