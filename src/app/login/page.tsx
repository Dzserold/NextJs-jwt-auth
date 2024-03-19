export default function Signup() {
  return (
    <main>
      <h1>Login</h1>
      <form className="flex flex-col max-w-sm gap-2 text-black">
        <input type="text" placeholder="email" name="email" />
        <input
          type="text"
          placeholder="password"
          name="password"
        />
        <button className="text-white bg-blue-950" type="submit">
          Signup
        </button>
      </form>
    </main>
  );
}
