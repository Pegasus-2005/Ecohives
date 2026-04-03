import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Import the image from the assets folder using the relative path
import bgImage from "../assets/Gemini_Generated_Image_lmpf5blmpf5blmpf.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      login(data.user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center lg:justify-end overflow-hidden">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Dark/Gradient Overlay to make text readable against the background */}
      <div className="absolute inset-0 z-0 bg-black/30 lg:bg-gradient-to-r lg:from-transparent lg:via-black/40 lg:to-black/70" />

      {/* Form Container - Pushed to the right using lg:mr-24 */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-0 lg:mr-24 xl:mr-32">
        <div className="bg-white/20 backdrop-blur-md p-8 sm:rounded-3xl shadow-2xl border border-white/30">
          <div className="flex justify-center items-center mb-6">
            <div className="h-16 w-16 bg-white/30 rounded-2xl flex items-center justify-center border border-white/40 shadow-sm backdrop-blur-lg">
              <Leaf className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <h2 className="text-center text-2xl font-extrabold text-white mb-2 shadow-sm">
            Create a new account
          </h2>
          <p className="text-center text-sm text-gray-200 mb-8">
            Or{" "}
            <Link to="/login" className="font-bold text-yellow-400 hover:text-yellow-300 transition-colors underline">
              sign in to your account
            </Link>
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/80 backdrop-blur-sm border border-red-200 text-white px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-white mb-1.5 shadow-sm">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-white/40 rounded-xl shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent sm:text-sm bg-white/10 text-white backdrop-blur-sm transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1.5 shadow-sm">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-white/40 rounded-xl shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent sm:text-sm bg-white/10 text-white backdrop-blur-sm transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1.5 shadow-sm">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-white/40 rounded-xl shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent sm:text-sm bg-white/10 text-white backdrop-blur-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transition-all transform active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}