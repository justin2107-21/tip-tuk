import React, { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Plus, X } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";

const COLORS = ["#2E7D32", "#F57C00", "#1565C0", "#9C27B0", "#E65100", "#00695C"];

const initialSpendingData = [
  { category: "Vegetables", amount: 450 },
  { category: "Meat", amount: 820 },
  { category: "Rice", amount: 260 },
  { category: "Fish", amount: 380 },
  { category: "Fruits", amount: 195 },
  { category: "Others", amount: 235 },
];

const initialTransactions = [
  { id: 1, date: "Mar 19", emoji: "🥦", item: "Broccoli", amount: 87, qty: "1kg", category: "Vegetables" },
  { id: 2, date: "Mar 19", emoji: "🍗", item: "Chicken (Whole)", amount: 165, qty: "1kg", category: "Meat" },
  { id: 3, date: "Mar 18", emoji: "🍅", item: "Kamatis", amount: 22.50, qty: "0.5kg", category: "Vegetables" },
  { id: 4, date: "Mar 18", emoji: "🧅", item: "Red Onion", amount: 60, qty: "0.5kg", category: "Vegetables" },
  { id: 5, date: "Mar 17", emoji: "🍚", item: "Sinandomeng Rice", amount: 260, qty: "5kg", category: "Rice" },
  { id: 6, date: "Mar 16", emoji: "🐟", item: "Tilapia", amount: 130, qty: "1kg", category: "Fish" },
];

const initialGoals = [
  { id: 1, name: "Emergency Fund", emoji: "🏦", target: 5000, saved: 1200 },
  { id: 2, name: "New Ref", emoji: "🧊", target: 12000, saved: 3500 },
];

const monthlyData = [
  { month: "Oct", spent: 3200 },
  { month: "Nov", spent: 3800 },
  { month: "Dec", spent: 4200 },
  { month: "Jan", spent: 3600 },
  { month: "Feb", spent: 3900 },
  { month: "Mar", spent: 2340 },
];

const txCategoryEmojis: Record<string, string> = {
  Vegetables: "🥬",
  Meat: "🥩",
  Rice: "🍚",
  Fish: "🐟",
  Fruits: "🍎",
  Others: "🛍️",
};

export function BudgetPlannerPage() {
  const [budget, setBudget] = useState(5000);
  const [editBudget, setEditBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState("5000");

  // Goals
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  const [goalsState, setGoalsState] = useState(initialGoals);
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [goalEmoji, setGoalEmoji] = useState("🎯");

  // Transactions
  const [transactions, setTransactions] = useState(initialTransactions);
  const [spendingData, setSpendingData] = useState(initialSpendingData);
  const [addTxOpen, setAddTxOpen] = useState(false);
  const [txItem, setTxItem] = useState("");
  const [txCategory, setTxCategory] = useState("Vegetables");
  const [txAmount, setTxAmount] = useState("");
  const [txDate, setTxDate] = useState("Mar 21");

  const spent = transactions.reduce((s, t) => s + t.amount, 0);
  const remaining = budget - spent;
  const progress = Math.min((spent / budget) * 100, 100);

  const handleAddGoal = () => {
    if (!goalName.trim() || !goalTarget) return;
    setGoalsState([...goalsState, {
      id: Date.now(),
      name: goalName.trim(),
      emoji: goalEmoji,
      target: Number(goalTarget),
      saved: 0,
    }]);
    setGoalName("");
    setGoalTarget("");
    setGoalEmoji("🎯");
    setAddGoalOpen(false);
  };

  const handleAddTransaction = () => {
    if (!txItem.trim() || !txAmount) return;
    const amount = Number(txAmount);
    const newTx = {
      id: Date.now(),
      date: txDate,
      emoji: txCategoryEmojis[txCategory] || "🛍️",
      item: txItem.trim(),
      amount,
      qty: "1 pc",
      category: txCategory,
    };
    setTransactions([newTx, ...transactions]);
    // Update spending chart
    setSpendingData((prev) =>
      prev.map((d) => d.category === txCategory ? { ...d, amount: d.amount + amount } : d)
    );
    setTxItem("");
    setTxAmount("");
    setTxCategory("Vegetables");
    setAddTxOpen(false);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">💰 Budget Planner</h1>
        <p className="text-gray-500 dark:text-[#9E9E9E] text-sm mt-1">Track your grocery spending and savings goals</p>
      </div>

      {/* Budget Summary */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-500 text-sm mb-1">Monthly Budget – March 2026</p>
            {editBudget ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-400">₱</span>
                <input type="number" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)}
                  className="text-2xl font-bold border-b-2 border-green-400 outline-none w-28 dark:bg-transparent dark:text-[#FFFFFF]" />
                <button onClick={() => { setBudget(Number(budgetInput)); setEditBudget(false); }}
                  className="text-xs px-3 py-1 bg-green-600 text-white rounded-lg">Save</button>
              </div>
            ) : (
              <p className="text-3xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">
                ₱{budget.toLocaleString()}
                <button onClick={() => setEditBudget(true)} className="text-xs px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-[#2D2D2D] text-gray-500 font-normal">Edit</button>
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Remaining</p>
            <p className={`text-2xl font-bold ${remaining < budget * 0.2 ? "text-red-500" : "text-green-700"}`}>₱{remaining.toLocaleString("en-PH", { maximumFractionDigits: 0 })}</p>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>₱{spent.toFixed(0)} spent</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="h-3 rounded-full bg-gray-100 dark:bg-[#2D2D2D] overflow-hidden">
            <div className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: progress > 80 ? "#ef4444" : progress > 60 ? "#f59e0b" : "#2E7D32" }} />
          </div>
        </div>
        <p className="text-xs text-gray-400">12 days remaining in March</p>
      </div>

      {/* AI Insights */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-bold text-gray-800 dark:text-[#FFFFFF]">🤖 AI Savings Insights</p>
          <AIBadge />
        </div>
        <AITip>You're spending 20% more on meat this month. Try chicken instead of pork to save ₱500.</AITip>
        <AITip>Based on your basket, switching to local onions could save ₱120 this month.</AITip>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
          <span className="text-xl">🎯</span>
          <p className="text-sm text-purple-800 dark:text-purple-300 flex-1">Set a goal to save ₱1,000 this month?</p>
          <button onClick={() => setAddGoalOpen(true)}
            className="text-xs px-3 py-1.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Set Goal
          </button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
          <h3 className="font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={spendingData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80}>
                {spendingData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `₱${v}`} />
              <Legend formatter={(v) => <span className="text-xs">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
          <h3 className="font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `₱${v.toLocaleString()}`} />
              <Bar dataKey="spent" fill="#2E7D32" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Savings Goals */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-[#FFFFFF]">🎯 Savings Goals</h2>
          <button onClick={() => setAddGoalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
            <Plus size={14} /> Add Goal
          </button>
        </div>
        <div className="space-y-3">
          {goalsState.map((g) => {
            const pct = Math.min((g.saved / g.target) * 100, 100);
            return (
              <div key={g.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{g.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{g.name}</p>
                    <p className="text-sm text-gray-400">₱{g.saved.toLocaleString()} of ₱{g.target.toLocaleString()}</p>
                  </div>
                  <p className="font-bold text-green-700 text-lg">{pct.toFixed(0)}%</p>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 dark:bg-[#2D2D2D] overflow-hidden">
                  <div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-[#FFFFFF]">📋 Recent Purchases</h2>
          <button onClick={() => setAddTxOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors">
            <Plus size={14} /> Add Manual
          </button>
        </div>
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2D2D2D] overflow-hidden">
          {transactions.map((tx, idx) => (
            <div key={tx.id} className={`flex items-center gap-3 px-4 py-3 ${idx !== transactions.length - 1 ? "border-b border-gray-50 dark:border-[#2D2D2D]" : ""}`}>
              <span className="text-2xl">{tx.emoji}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-700 dark:text-[#E0E0E0] text-sm">{tx.item}</p>
                <p className="text-xs text-gray-400">{tx.date} · {tx.qty}</p>
              </div>
              <p className="font-semibold text-gray-700 dark:text-[#E0E0E0]">₱{tx.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Goal Modal */}
      {addGoalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAddGoalOpen(false)}>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-sm w-full p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF]">Add Savings Goal</h3>
              <button onClick={() => setAddGoalOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] block mb-1">Goal Name</label>
                <input
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g. Emergency Fund"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm outline-none focus:border-green-400 dark:bg-[#2D2D2D] dark:text-[#FFFFFF]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] block mb-1">Target Amount (₱)</label>
                <input
                  type="number"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm outline-none focus:border-green-400 dark:bg-[#2D2D2D] dark:text-[#FFFFFF]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] block mb-1">Icon (optional)</label>
                <div className="flex gap-2 flex-wrap">
                  {["🎯", "🏦", "🧊", "🏠", "✈️", "📱", "💍", "🎓"].map((e) => (
                    <button
                      key={e}
                      onClick={() => setGoalEmoji(e)}
                      className={`w-9 h-9 rounded-lg text-xl flex items-center justify-center border-2 transition-colors ${goalEmoji === e ? "border-green-500 bg-green-50" : "border-gray-200 dark:border-gray-600 hover:border-green-300"}`}
                    >{e}</button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleAddGoal}
                disabled={!goalName.trim() || !goalTarget}
                className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Goal ✅
              </button>
              <button onClick={() => setAddGoalOpen(false)} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Transaction Modal */}
      {addTxOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAddTxOpen(false)}>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-sm w-full p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF]">Add Purchase</h3>
              <button onClick={() => setAddTxOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] block mb-1">Item Name</label>
                <input
                  value={txItem}
                  onChange={(e) => setTxItem(e.target.value)}
                  placeholder="e.g. Bangus, Pechay..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm outline-none focus:border-green-400 dark:bg-[#2D2D2D] dark:text-[#FFFFFF]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] block mb-1">Category (optional)</label>
                <select
                  value={txCategory}
                  onChange={(e) => setTxCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-700 dark:text-[#E0E0E0] text-sm outline-none"
                >
                  {["Vegetables", "Meat", "Rice", "Fish", "Fruits", "Others"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] block mb-1">Amount Spent (₱)</label>
                <input
                  type="number"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm outline-none focus:border-green-400 dark:bg-[#2D2D2D] dark:text-[#FFFFFF]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0] block mb-1">Date</label>
                <input
                  value={txDate}
                  onChange={(e) => setTxDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm outline-none focus:border-green-400 dark:bg-[#2D2D2D] dark:text-[#FFFFFF]"
                  placeholder="Mar 21"
                />
              </div>
              <button
                onClick={handleAddTransaction}
                disabled={!txItem.trim() || !txAmount}
                className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Purchase ✅
              </button>
              <button onClick={() => setAddTxOpen(false)} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
