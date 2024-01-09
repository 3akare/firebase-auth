"use client";

import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, GithubProvider, GoogleProvider } from "@/lib/firebase-config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return;
      }

      fetch("/api/login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push("/success");
        }
      });
    });
  }, []);

  function signInWithGoogle() {
    signInWithRedirect(auth, GoogleProvider);
  }
  function signInWithGithub() {
    signInWithRedirect(auth, GithubProvider);
  }

  async function signInWithPassword(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        throw error;
      }
    }
    let idToken;
    if (auth.currentUser) {
      idToken = await auth.currentUser.getIdToken();
    }
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (response.status === 200) {
      router.push("/success");
    }
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center gap-4 flex-col">
      <section className="w-80 flex justify-center items-center gap-4 flex-col border p-4 rounded-md shadow-md">
        <h1 className="text-3xl font-bold justify-self-start">Login in</h1>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            signInWithPassword(email, password);
          }}
        >
          <div className="w-full">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              required
              className="border-2 p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              autoComplete="on"
              required
              className="border-2 p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button className="p-2 bg-green-500 rounded-md text-white ring-offset-1 ring-2 ring-green-500 transition hover:scale-105 active:ring-offset-2">
            Sign Up
          </button>
        </form>
        <hr vocab="ss" className="border-gray-300 w-full" />
        <div className="flex gap-4">
          <button
            className="p-2 bg-yellow-500 rounded-md text-white ring-offset-1 ring-2 ring-yellow-500 transition hover:scale-105 active:ring-offset-2"
            onClick={() => signInWithGoogle()}
          >
            Google
          </button>
          <button
            className="p-2 bg-black rounded-md text-white ring-offset-1 ring-2 ring-black transition hover:scale-105 active:ring-offset-2"
            onClick={() => signInWithGithub()}
          >
            Github
          </button>
        </div>
      </section>
    </main>
  );
}
