import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please enter both username/email and password.");
      return;
    }
    setError("");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="username" className="mb-1 block text-gray-700 font-medium">Username or Email</Label>
        <Input
          id="username"
          name="username"
          placeholder="Enter your username or email"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="password" className="mb-1 block text-gray-700 font-medium">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="mt-1 pr-10"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-600 bg-transparent hover:text-gray-600 border-none"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <Button type="submit" className="w-full h-10 rounded-md bg-teal-500 hover:bg-teal-600 text-white font-bold text-base mt-2">Log In</Button>
      <div className="text-center mt-2">
        <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
      </div>
    </form>
  );
};

export default LoginForm; 