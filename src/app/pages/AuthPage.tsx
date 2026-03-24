import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useApp } from "../context/AppContext";

export function AuthPage() {
  const navigate = useNavigate();
  const { login, darkMode } = useApp();
  
  const [step, setStep] = useState<"choice" | "login" | "register">("choice");
  const [email, setEmail] = useState("justin.esquita@example.com");
  const [password, setPassword] = useState("123456");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split("@")[0].split(".").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "User";
    login(name, email);
    navigate("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && agreeToTerms) {
      login(fullName, email);
      navigate("/");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? "bg-[#121212]" : "bg-gradient-to-br from-green-50 to-green-100"}`}>
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        {step === "choice" && (
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg">
                <span className="text-4xl">🥬</span>
              </div>
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
              TIPID TUKLAS
            </h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Find the best fresh produce prices near you
            </p>
          </div>
        )}

        {/* Choice Screen */}
        {step === "choice" && (
          <div className="space-y-3">
            <button
              onClick={() => setStep("login")}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              🔐 Sign In
            </button>
            <button
              onClick={() => setStep("register")}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all border-2 ${
                darkMode
                  ? "border-green-600 text-green-400 hover:bg-green-600/10"
                  : "border-green-600 text-green-700 hover:bg-green-50"
              }`}
            >
              📝 Create Account
            </button>
            <p className={`text-center text-xs ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              Demo: Use any email to sign in (no verification needed)
            </p>
          </div>
        )}

        {/* Login Screen */}
        {step === "login" && (
          <div className={`rounded-2xl shadow-2xl p-8 ${darkMode ? "bg-[#1E1E1E]" : "bg-white"}`}>
            <button
              onClick={() => setStep("choice")}
              className={`mb-4 text-sm font-medium transition-colors ${
                darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
              }`}
            >
              ← Back
            </button>

            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Welcome Back! 👋
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  📧 Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      darkMode
                        ? "bg-[#2D2D2D] border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                    placeholder="justin.esquita@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  🔒 Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-9 pr-10 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      darkMode
                        ? "bg-[#2D2D2D] border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4" />
                <label htmlFor="remember" className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-bold transition-all active:scale-95"
              >
                Sign In
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${darkMode ? "border-gray-600" : "border-gray-300"}`}></div>
              </div>
              <div className="relative flex justify-center">
                <span className={`px-2 text-sm ${darkMode ? "bg-[#1E1E1E] text-gray-500" : "bg-white text-gray-500"}`}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button className={`p-2.5 rounded-lg border transition-colors ${darkMode ? "border-gray-600 hover:bg-[#2D2D2D]" : "border-gray-300 hover:bg-gray-50"}`}>
                <span className="text-lg">G</span>
              </button>
              <button className={`p-2.5 rounded-lg border transition-colors ${darkMode ? "border-gray-600 hover:bg-[#2D2D2D]" : "border-gray-300 hover:bg-gray-50"}`}>
                <span className="text-lg">f</span>
              </button>
              <button className={`p-2.5 rounded-lg border transition-colors ${darkMode ? "border-gray-600 hover:bg-[#2D2D2D]" : "border-gray-300 hover:bg-gray-50"}`}>
                <span className="text-lg">𝕏</span>
              </button>
            </div>

            <p className={`text-center text-sm mt-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Don't have an account?{" "}
              <button onClick={() => setStep("register")} className="text-green-600 dark:text-[#81C784] font-semibold hover:underline">
                Sign up
              </button>
            </p>
          </div>
        )}

        {/* Register Screen */}
        {step === "register" && (
          <div className={`rounded-2xl shadow-2xl p-8 ${darkMode ? "bg-[#1E1E1E]" : "bg-white"}`}>
            <button
              onClick={() => setStep("choice")}
              className={`mb-4 text-sm font-medium transition-colors ${
                darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
              }`}
            >
              ← Back
            </button>

            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Create Your Account 🎉
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  👤 Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      darkMode
                        ? "bg-[#2D2D2D] border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  📧 Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      darkMode
                        ? "bg-[#2D2D2D] border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-2 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                  📱 Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      darkMode
                        ? "bg-[#2D2D2D] border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}
                    placeholder="+63 9XX XXX XXXX"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 mt-1"
                />
                <label htmlFor="terms" className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreeToTerms}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-bold transition-all active:scale-95"
              >
                Create Account
              </button>
            </form>

            <p className={`text-center text-sm mt-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Already have an account?{" "}
              <button onClick={() => setStep("login")} className="text-green-600 dark:text-[#81C784] font-semibold hover:underline">
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
