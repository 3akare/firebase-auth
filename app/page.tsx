import Button from "./components/Button";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen w-screen">
      <Button href="/login" text="Click to Login" />
    </main>
  );
}
