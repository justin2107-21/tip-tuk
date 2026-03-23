import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";

interface Message {
  id: number;
  from: "user" | "ai";
  text: string;
}

const quickReplies = [
  "What's the cheapest vegetable today?",
  "Set alert for chicken below ₱150/kg",
  "Suggest a recipe with eggplant",
  "Show me my budget",
];

const aiResponses: Record<string, string> = {
  vegetable: "🥦 Today's cheapest vegetables: Kangkong ₱25/kg, Sitaw ₱35/kg, and Ampalaya ₱40/kg. All are 🟢 MURA today!",
  chicken: "✅ Alert set! You'll be notified when Chicken drops below ₱150/kg. Current price: ₱165/kg at Kamuning Market.",
  eggplant: "🍆 Eggplant Recipe: Tortang Talong! 2 pcs eggplant, 2 eggs, salt & pepper. Grill eggplant, peel skin, dip in egg and fry. Only ₱48 total cost per serving!",
  budget: "💰 Your budget this month: ₱5,000 set, ₱2,340 spent (47%). You're on track! 🤖 AI Tip: Buy veggies on Tuesday when prices are lowest.",
  default: "🤖 Kumusta! I'm Presyo AI. I can help you find cheap prices, set alerts, suggest recipes, and track your budget. Anong gusto mo malaman?",
};

function getAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("vegetable") || lower.includes("gulay") || lower.includes("cheapest")) return aiResponses.vegetable;
  if (lower.includes("chicken") || lower.includes("alert") || lower.includes("manok")) return aiResponses.chicken;
  if (lower.includes("eggplant") || lower.includes("recipe") || lower.includes("talong")) return aiResponses.eggplant;
  if (lower.includes("budget") || lower.includes("gastos")) return aiResponses.budget;
  return aiResponses.default;
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "ai", text: "🤖 Kumusta! I'm Presyo AI. Ask me about prices, recipes, or your budget!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg: Message = { id: Date.now() + 1, from: "ai", text: getAIResponse(text) };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #7B1FA2, #9C27B0)" }}
        aria-label="Open AI Chat"
      >
        {open ? <X size={22} className="text-white" /> : <span className="text-2xl">🤖</span>}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-36 md:bottom-24 right-4 md:right-6 z-50 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ height: "420px", background: "#fff" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "linear-gradient(135deg, #7B1FA2, #9C27B0)" }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Presyo AI</p>
              <p className="text-purple-200 text-xs">Your smart price assistant</p>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-400"></div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  msg.from === "user"
                    ? "bg-green-600 text-white rounded-br-sm"
                    : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          <div className="flex gap-1.5 px-3 py-2 overflow-x-auto bg-white border-t border-gray-100">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => sendMessage(qr)}
                className="flex-shrink-0 text-xs px-2.5 py-1.5 rounded-full border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors whitespace-nowrap"
              >
                {qr.length > 22 ? qr.slice(0, 22) + "…" : qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex gap-2 px-3 py-2 border-t border-gray-100 bg-white"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-200 outline-none focus:border-purple-400 bg-gray-50"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "#9C27B0" }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
