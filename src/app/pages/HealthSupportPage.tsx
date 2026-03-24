import React, { useState } from "react";
import { ChevronDown, Mail, Phone, MessageSquare } from "lucide-react";

export function HealthSupportPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: "1",
      q: "How do I add items to my basket?",
      a: "Click the 'Add to Basket' button on any product card in the SM Markets section. You can adjust quantities in your basket before checkout.",
    },
    {
      id: "2",
      q: "Can I compare prices across different stores?",
      a: "Yes! In SM Markets, select a product and you'll see prices from all available store locations. The AI Comparison Badge shows savings opportunities.",
    },
    {
      id: "3",
      q: "How accurate is the AI Fuel Forecast?",
      a: "Our AI analyzes historical trends and market data. Forecasts are typically 80-90% accurate for the next 7 days. Fuel prices change daily based on crude oil rates.",
    },
    {
      id: "4",
      q: "What's included in my free 7-day trial?",
      a: "Full access to all features: SM Markets, Fuel prices, EV charging, Seasonal Calendar, Budget Planner, Community Tips, and Waste Reduction guides.",
    },
    {
      id: "5",
      q: "How do I track my budget?",
      a: "Visit the Budget Planner page to set monthly spending targets. The Smart Dashboard shows real-time progress and overspending alerts.",
    },
    {
      id: "6",
      q: "Can I search for EV charging stations near me?",
      a: "Yes! The EV page has an interactive map with 9+ charging operators. Search by location or filter by network (GCash Charging, Charge+, etc.).",
    },
    {
      id: "7",
      q: "How do I report a technical issue?",
      a: "Use the Contact Support form below or email us at support@tipidtuklas.com. We typically respond within 24 hours.",
    },
    {
      id: "8",
      q: "Is my personal data safe?",
      a: "Yes. We use industry-standard encryption and never share your data. Your basket and preferences are stored securely on your device.",
    },
  ];

  const contactMethods = [
    { icon: Mail, label: "Email", value: "support@tipidtuklas.com", href: "mailto:support@tipidtuklas.com" },
    { icon: Phone, label: "Phone", value: "+63 (2) 8123-4567", href: "tel:+63281234567" },
    { icon: MessageSquare, label: "Chat", value: "Live chat available", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0A0A0A] dark:to-[#1A1A1A] pb-32 pt-24">
      {/* Container */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">🆘 Health & Support</h1>
          <p className="text-gray-600 dark:text-gray-400">Find answers and get help with Tipid Tuklas</p>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-4 py-3 flex items-center justify-between font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors"
                >
                  <span className="text-left text-sm">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 ml-2 transition-transform ${expandedFAQ === faq.id ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-4 py-3 bg-white dark:bg-[#0A0A0A] text-gray-700 dark:text-gray-300 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <a
                  key={idx}
                  href={method.href}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#1E1E1E] hover:shadow-lg dark:hover:shadow-lg/20 hover:border-green-500 dark:hover:border-green-500 transition-all text-center"
                >
                  <Icon size={24} className="mx-auto mb-2 text-green-600 dark:text-[#81C784]" />
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{method.label}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{method.value}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Message</label>
              <textarea
                placeholder="How can we help you?"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 dark:bg-[#2E7D32] text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-[#1B5E20] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Social Media & Links */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            Follow us on <a href="#" className="font-semibold hover:underline">Facebook</a>, <a href="#" className="font-semibold hover:underline">Twitter</a>, and <a href="#" className="font-semibold hover:underline">Instagram</a> for updates and tips
          </p>
        </div>
      </div>
    </div>
  );
}
