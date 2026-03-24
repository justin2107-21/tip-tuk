import React, { useState } from "react";
import { Check, X, AlertCircle, XCircle } from "lucide-react";

export function SubscriptionPage() {
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsType, setTermsType] = useState<"terms" | "privacy">("terms");
  const trialDaysRemaining = 3;
  const userCurrentPlan = "Free";

  const freeFeatures = [
    { name: "View all prices", included: true },
    { name: "Basic basket (up to 10 items)", included: true },
    { name: "Community reports", included: true },
    { name: "Basic budget tracker", included: true },
    { name: "7-day price history", included: true },
    { name: "Limited price alerts (5 per month)", included: false },
    { name: "AI price forecasts", included: false },
    { name: "Ad-free experience", included: false },
    { name: "Recipe generator", included: false },
    { name: "Export reports (PDF)", included: false },
    { name: "Early access to new features", included: false },
  ];

  const premiumFeatures = [
    { name: "View all prices", included: true },
    { name: "Unlimited basket items", included: true },
    { name: "Community reports", included: true },
    { name: "Advanced budget tracker", included: true },
    { name: "30-day price history", included: true },
    { name: "Unlimited price alerts", included: true },
    { name: "30-day AI price forecasts", included: true },
    { name: "Ad-free experience", included: true },
    { name: "Recipe generator", included: true },
    { name: "Export reports (PDF)", included: true },
    { name: "Early access to new features", included: true },
  ];

  const paymentMethods = [
    { name: "GCash", icon: "💱" },
    { name: "PayMongo", icon: "💳" },
    { name: "Credit Card", icon: "🏦" },
    { name: "Debit Card", icon: "💰" },
  ];

  const faqs = [
    { q: "Can I cancel anytime?", a: "Yes, cancel anytime. No long-term contracts." },
    { q: "What after 7-day trial?", a: "You'll be charged ₱50/mo unless you cancel beforehand." },
    { q: "How do I access AI forecasts?", a: "Available on Fuel page & SM Markets once Premium is active." },
    { q: "Can I export reports?", a: "Yes, Premium members can export as PDF." },
    { q: "Is annual cheaper?", a: "Yes! ₱500/year saves ₱100 vs monthly billing." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0A0A0A] dark:to-[#1A1A1A] pb-12">
      {/* Trial Banner - NO SPACE from navbar */}
      {showTrialBanner && userCurrentPlan === "Free" && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800 px-4 py-2">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <AlertCircle size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-200 truncate">
                <strong>Your 7-day free trial ends in {trialDaysRemaining} days.</strong> Upgrade to continue enjoying premium features.
              </p>
            </div>
            <button onClick={() => setShowTrialBanner(false)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex-shrink-0">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Container - Compact Layout */}
      <div className={`max-w-4xl mx-auto px-3 sm:px-4 ${showTrialBanner ? "pt-20" : "pt-24"}`}>
        {/* Header - Compact */}
        <div className="text-center mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">Upgrade to Premium</h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Unlimited alerts, AI forecasts, ad-free, and more.</p>
          {userCurrentPlan && (
            <p className="text-xs text-gray-500 mt-1">Currently on <strong className="text-green-600 dark:text-[#81C784]">{userCurrentPlan} Plan</strong></p>
          )}
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Free */}
          <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-[#1E1E1E]">
            <div className="mb-3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Free</h3>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-1">₱0<span className="text-xs text-gray-500">/mo</span></p>
            </div>
            <button className="w-full py-2 rounded-lg font-semibold text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-3">
              Current Plan
            </button>
            <div className="space-y-2">
              {freeFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  {f.included ? (
                    <Check size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X size={14} className="text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs ${f.included ? "text-gray-800 dark:text-gray-100" : "text-gray-400 dark:text-gray-600 line-through"}`}>
                    {f.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="border-3 border-green-500 rounded-xl p-4 bg-white dark:bg-[#1E1E1E] shadow-lg shadow-green-500/20 relative">
            <div className="absolute -top-2.5 right-3 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">⭐ Most Popular</div>
            <div className="mb-3">
              <h3 className="text-2xl font-bold text-green-600 dark:text-[#81C784]">Premium</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">₱50<span className="text-xs text-gray-500">/mo</span></p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">or ₱500/yr (save ₱100)</p>
            </div>
              <div className="mb-3 p-2 bg-green-50 dark:bg-[#1B5E20]/30 border border-green-200 dark:border-[#2E7D32]/50 rounded-lg">
              <p className="text-xs text-green-800 dark:text-[#81C784] font-semibold">✨ Free 7 days, cancel anytime</p>
            </div>
            <button className="w-full py-2 rounded-lg font-semibold text-xs bg-green-600 hover:bg-green-700 text-white mb-3">
              Start Free Trial
            </button>
            <div className="space-y-2">
              {premiumFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  {f.included ? (
                    <Check size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X size={14} className="text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs ${f.included ? "text-gray-800 dark:text-gray-100 font-medium" : "text-gray-400 dark:text-gray-600 line-through"}`}>
                    {f.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Annual Savings */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 mb-5 text-center">
          <p className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-300">
            💰 Annual Plan: ₱500/year <span className="text-green-600 dark:text-[#81C784]">Save ₱100</span>
          </p>
        </div>

        {/* Quick Comparison Table */}
        <div className="mb-5 overflow-x-auto">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Quick Comparison</h2>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-2 py-1.5 text-left font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Feature</th>
                <th className="px-2 py-1.5 text-center font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">Free</th>
                <th className="px-2 py-1.5 text-center font-bold text-green-600 dark:text-[#81C784] border border-gray-200 dark:border-gray-700">Premium</th>
              </tr>
            </thead>
            <tbody>
              {freeFeatures.slice(0, 6).map((f, i) => (
                <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-2 py-1.5 text-xs font-medium text-gray-800 dark:text-gray-200">{f.name}</td>
                  <td className="px-2 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    {f.included ? <Check size={14} className="text-green-500 mx-auto" /> : <X size={14} className="text-gray-300 dark:text-gray-600 mx-auto" />}
                  </td>
                  <td className="px-2 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    {premiumFeatures[i]?.included ? <Check size={14} className="text-green-500 mx-auto" /> : <X size={14} className="text-gray-300 dark:text-gray-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-5">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-2 text-center">Payment Options</h3>
          <div className="grid grid-cols-4 gap-2">
            {paymentMethods.map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-2 bg-white dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-lg">{m.icon}</span>
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center line-clamp-1">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-5">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-2">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {faqs.map((faq, i) => (
              <div key={i} className="p-2.5 bg-white dark:bg-[#1E1E1E] rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white text-xs mb-1">{faq.q}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Signals & Links */}
        <div className="bg-green-50 dark:bg-[#1B5E20]/30 border border-green-200 dark:border-[#2E7D32]/50 rounded-lg p-3 text-center">
          <p className="text-xs text-green-900 dark:text-[#81C784] mb-1.5">
            ✓ Cancel anytime | 🔒 Secure | 📱 All devices
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            By subscribing, you agree to our{" "}
            <button onClick={() => { setShowTermsModal(true); setTermsType("terms"); }} className="text-green-600 dark:text-[#81C784] hover:underline font-semibold">
              Terms
            </button>{" "}
            and{" "}
            <button onClick={() => { setShowTermsModal(true); setTermsType("privacy"); }} className="text-green-600 dark:text-[#81C784] hover:underline font-semibold">
              Privacy
            </button>
          </p>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1E1E]">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {termsType === "terms" ? "Terms & Conditions" : "Privacy Policy"}
              </h2>
              <button onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <XCircle size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 space-y-4">
              {termsType === "terms" ? (
                <>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. Service Terms</h3>
                    <p>Anopresyo Premium provides unlimited price alerts, AI forecasts, ad-free experience, and export features. Your subscription auto-renews monthly or annually based on your selection.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Cancellation</h3>
                    <p>Cancel anytime through your account settings. No penalties or long-term contracts. Refunds are not available for partial months.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. Billing</h3>
                    <p>You authorize recurring charges to your payment method. Charges appear as "ANOPRESYO" on your statement.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">4. Modifications</h3>
                    <p>We may update pricing with 30 days notice. Changes take effect at your next billing cycle.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">5. Availability</h3>
                    <p>Services provided "as-is" without warranties. Anopresyo reserves the right to suspend access for violations.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. Data Collection</h3>
                    <p>We collect account info, payment details, and usage data to provide and improve our services. All data is encrypted and secure.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Data Usage</h3>
                    <p>Your data is used to show personalized prices, alerts, and recommendations. We never sell your information to third parties.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. Security</h3>
                    <p>We use industry-standard SSL encryption to protect your information. Payment data is handled by PCI-compliant processors (PayMongo, GCash).</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">4. Cookies & Tracking</h3>
                    <p>We use cookies to remember preferences and track usage analytics. You can disable cookies in your browser settings.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">5. Your Rights</h3>
                    <p>You can request, update, or delete your data anytime by contacting support@anopresyo.com. Deletion may affect your account access.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">6. Contact Us</h3>
                    <p>For privacy concerns, email: privacy@anopresyo.com or call +63 (2) 8123-4567</p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1E1E]">
              <button onClick={() => setShowTermsModal(false)} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-sm">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
