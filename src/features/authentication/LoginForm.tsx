import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    if (!email || !password) return;
    console.log(`email: ${email}, password: ${password}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <h2 className="text-xl font-bold text-center text-blue_gray-100 mb-6">
        LOGIN
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border-none  rounded-md text-blue_gray-200 bg-blue_gray-300"
          />
        </div>
        <div>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border-none  rounded-md text-blue_gray-200 bg-blue_gray-300"
          />
        </div>
        <div className="text-center text-sm text-blue_gray-200">
          Forgot password ? &nbsp;
          <Link to="/reset" className="text-blue_main-100 hover:underline">
            Recover it now
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue_main-100 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
