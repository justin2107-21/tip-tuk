import React, { useState } from "react";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, darkMode } = useApp();
  const [step, setStep] = useState<"login" | "register" | "switch">("login");
  const [email, setEmail] = useState("justin.esquita@example.com");
  const [password, setPassword] = useState("123456");
  const [fullName, setFullName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split("@")[0].split(".").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "User";
    login(name, email);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && agreeToTerms) {
      login(fullName, email || `${fullName.toLowerCase().replace(" ", ".")}@example.com`);
      onClose();
    }
  };

  const handleSwitchAccount = (accountName: string) => {
    const accountEmail = accountName === "Justin Esquita" ? "justin.esquita@example.com" : "justin.21@example.com";
    login(accountName, accountEmail);
    setStep("login");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[1100] flex items-center justify-center p-4 overflow-y-auto">
      <div className={`${darkMode ? "bg-[#1E1E1E]" : "bg-white"} rounded-2xl shadow-2xl max-w-md w-full my-10`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          {step === "login" && (
            <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">🔐 Welcome Back to Anopresyo</h3>
          )}
          {step === "register" && (
            <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">📝 Create Your Anopresyo Account</h3>
          )}
          {step === "switch" && (
            <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">🔄 Switch Account</h3>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6 max-h-[80vh] overflow-y-auto">
          
          {/* LOGIN FORM */}
          {step === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📧 Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="justin.esquita@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🔒 Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label className="text-sm text-gray-600 dark:text-gray-400">Remember me</label>
              </div>

              <div className="text-right">
                <button type="button" className="text-sm text-green-600 dark:text-[#81C784] hover:underline">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                LOG IN
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setStep("register")}
                    className="text-green-600 dark:text-[#81C784] font-semibold hover:underline"
                  >
                    Sign up here
                  </button>
                </p>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#1E1E1E] text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button type="button" className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2D2D2D]">
                  <span className="text-lg">G</span>
                </button>
                <button type="button" className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2D2D2D]">
                  <span className="text-lg">f</span>
                </button>
                <button type="button" className="p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-[#2D2D2D]">
                  <span className="text-lg">𝕏</span>
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {step === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">👤 Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📧 Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📱 Mobile Number (Optional)</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+63 9XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🔒 Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🔒 Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 mt-1"
                />
                <label className="text-xs text-gray-600 dark:text-gray-400">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                disabled={!agreeToTerms}
                className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
              >
                CREATE ACCOUNT
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setStep("login")}
                    className="text-green-600 dark:text-[#81C784] font-semibold hover:underline"
                  >
                    Log in here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* SWITCH ACCOUNT */}
          {step === "switch" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select an account to continue as:</p>
              <button
                onClick={() => handleSwitchAccount("Justin Esquita")}
                className="w-full p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">J</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Justin Esquita</p>
                    <p className="text-xs text-gray-500">justin.esquita@example.com</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleSwitchAccount("Justin")}
                className="w-full p-4 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">J</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Justin</p>
                    <p className="text-xs text-gray-500">justin.21@example.com</p>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
