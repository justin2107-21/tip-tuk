import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Camera, X, ChevronDown } from "lucide-react";
import { AIBadge } from "../components/AIBadge";
import { LeafletMap } from "../components/maps/LeafletMap";
import { useApp } from "../context/AppContext";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Comment {
  user: string;
  initials: string;
  text: string;
  time: string;
  color: string;
}

interface Report {
  id: number;
  user: string;
  initials: string;
  badge: string | null;
  emoji: string;
  item: string;
  price: number;
  market: string;
  distance: string;
  timeAgo: string;
  verified: boolean;
  upvotes: number;
  comments: Comment[];
  color: string;
  isNew?: boolean;
  isPending?: boolean;
}

interface MapPinData {
  id: string;
  label: string;
  item: string;
  price: string;
  timeAgo: string;
  verified: boolean;
  lat: number;
  lng: number;
  emoji?: string;
  region: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const mapPins: MapPinData[] = [
  { id: "kamuning",  label: "Kamuning Market",       item: "🥦 Broccoli",     price: "₱87/kg",  timeAgo: "2 hours ago", verified: true,  lat: 14.6326, lng: 121.0227, emoji: "🥦", region: "Metro Manila" },
  { id: "cubao",     label: "Cubao Market",           item: "🧄 Bawang",       price: "₱260/kg", timeAgo: "6 hours ago", verified: false, lat: 14.5887, lng: 121.0472, emoji: "🧄", region: "Metro Manila" },
  { id: "farmers",   label: "Farmer's Market, QC",   item: "🍅 Kamatis",      price: "₱40/kg",  timeAgo: "4 hours ago", verified: true,  lat: 14.6235, lng: 121.0389, emoji: "🍅", region: "Metro Manila" },
  { id: "pasig",     label: "Pasig Public Market",    item: "🍗 Chicken",      price: "₱165/kg", timeAgo: "1 hour ago",  verified: true,  lat: 14.5647, lng: 121.1022, emoji: "🍗", region: "Metro Manila" },
  { id: "makati",    label: "Makati Central Market",  item: "🥩 Pork Liempo",  price: "₱285/kg", timeAgo: "8 hours ago", verified: true,  lat: 14.5620, lng: 121.0092, emoji: "🥩", region: "Metro Manila" },
  { id: "taguig",    label: "Taguig/BGC Market",      item: "🥬 Kangkong",     price: "₱25/kg",  timeAgo: "3 hours ago", verified: true,  lat: 14.5450, lng: 121.0621, emoji: "🥬", region: "Metro Manila" },
  { id: "cebu",      label: "Cebu City Public Market", item: "🍌 Saging",      price: "₱45/kg",  timeAgo: "5 hours ago", verified: true,  lat: 10.3157, lng: 123.8854, emoji: "🍌", region: "Cebu City" },
  { id: "davao",     label: "Davao City Market",      item: "🥒 Pipino",       price: "₱35/kg",  timeAgo: "7 hours ago", verified: true,  lat: 7.1278, lng: 125.5419, emoji: "🥒", region: "Davao City" },
  { id: "iloilo",    label: "Iloilo City Central",    item: "🥬 Alugbati",     price: "₱30/kg",  timeAgo: "3 hours ago", verified: true,  lat: 10.6992, lng: 122.5598, emoji: "🥬", region: "Iloilo City" },
  { id: "baguio",    label: "Baguio Public Market",   item: "🌽 Mais",         price: "₱55/kg",  timeAgo: "2 hours ago", verified: true,  lat: 16.4023, lng: 120.5960, emoji: "🌽", region: "Baguio City" },
];

const initialReports: Report[] = [
  {
    id: 1, user: "Maria S.", initials: "MS", badge: "Top Contributor",
    emoji: "🥦", item: "Broccoli", price: 87, market: "Kamuning Market",
    distance: "1.2 km", timeAgo: "2 hrs ago", verified: true, upvotes: 24,
    isNew: false, isPending: false,
    comments: [
      { user: "Jose R.",  initials: "JR", text: "Confirmed! Just bought this earlier.",       time: "1 hr ago",   color: "#F57C00" },
      { user: "Ana L.",   initials: "AL", text: "Cheaper than Divisoria right now!",          time: "45 min ago", color: "#9C27B0" },
      { user: "Pedro M.", initials: "PM", text: "Thanks for reporting! Heading there now.",   time: "20 min ago", color: "#1565C0" },
    ],
    color: "#2E7D32",
  },
  {
    id: 2, user: "Jose R.", initials: "JR", badge: "Verified Buyer",
    emoji: "🍅", item: "Kamatis", price: 40, market: "Farmer's Market, QC",
    distance: "2.5 km", timeAgo: "4 hrs ago", verified: true, upvotes: 18,
    isNew: false, isPending: false,
    comments: [
      { user: "Maria S.", initials: "MS", text: "Great deal! AI confirmed this is 20% below average.", time: "3 hrs ago", color: "#2E7D32" },
      { user: "Nena T.",  initials: "NT", text: "Sakto! Tamang-tama for dinuguan.",                    time: "2 hrs ago", color: "#00695C" },
    ],
    color: "#F57C00",
  },
  {
    id: 3, user: "Ana L.", initials: "AL", badge: null,
    emoji: "🧄", item: "Bawang", price: 260, market: "Cubao Market",
    distance: "3.1 km", timeAgo: "6 hrs ago", verified: false, upvotes: 8,
    isNew: false, isPending: false,
    comments: [
      { user: "Pedro M.", initials: "PM", text: "Still expensive but better than SM.", time: "5 hrs ago", color: "#1565C0" },
    ],
    color: "#9C27B0",
  },
  {
    id: 4, user: "Pedro M.", initials: "PM", badge: "Top Contributor",
    emoji: "🥩", item: "Pork Liempo", price: 285, market: "Marikina Market",
    distance: "4.0 km", timeAgo: "8 hrs ago", verified: true, upvotes: 31,
    isNew: false, isPending: false,
    comments: [
      { user: "Maria S.", initials: "MS", text: "Best price this week! Going tomorrow.",      time: "7 hrs ago", color: "#2E7D32" },
      { user: "Jose R.",  initials: "JR", text: "AI tip: prices usually rise on Fridays.",    time: "6 hrs ago", color: "#F57C00" },
      { user: "Cora B.",  initials: "CB", text: "Confirmed ₱285 — galing!",                  time: "4 hrs ago", color: "#E65100" },
    ],
    color: "#1565C0",
  },
];

const initialLeaderboard = [
  { rank: 1, name: "Maria S.", points: 1240, badge: "🥇" },
  { rank: 2, name: "Pedro M.", points: 980,  badge: "🥈" },
  { rank: 3, name: "Jose R.",  points: 845,  badge: "🥉" },
  { rank: 4, name: "Nena T.",  points: 720,  badge: "⭐" },
  { rank: 5, name: "Cora B.",  points: 610,  badge: "⭐" },
];

const itemOptions  = ["🥦 Broccoli", "🍅 Kamatis", "🧄 Bawang", "🥩 Pork", "🍗 Chicken", "🐟 Isda", "🥬 Kangkong", "🍌 Saging", "Other"];
const marketOptions = ["Kamuning Market", "Farmer's Market, QC", "Cubao Market", "Marikina Market", "Pasig Market", "Makati Market", "Divisoria", "Other"];
const regions = ["All", "Metro Manila", "Cebu City", "Davao City", "Iloilo City", "Baguio City"];

// ─── Metro Manila SVG Map ─────────────────────────────────────────────────────
function MetroManilaMap({ darkMode }: { darkMode: boolean }) {
  const c = {
    bg:        darkMode ? "#0e1a0e" : "#E9F0E6",
    d1:        darkMode ? "#162616" : "#D5E8CC",
    d2:        darkMode ? "#1a2e1a" : "#D8EDD0",
    d3:        darkMode ? "#12201c" : "#DCF0D4",
    stroke:    darkMode ? "#2a3e2a" : "#B0C8A0",
    water:     darkMode ? "#0e1e2e" : "#C0D8EC",
    river:     darkMode ? "#183050" : "#96BCDA",
    grid:      darkMode ? "#162016" : "#D0DCC8",
    road:      darkMode ? "#1e2e1e" : "#BED0AE",
    label:     darkMode ? "#5a8a50" : "#4A7040",
    waterLbl:  darkMode ? "#3a6888" : "#3A7898",
  };

  return (
    <svg viewBox="0 0 600 340" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="600" height="340" fill={c.bg} />

      {/* Grid lines */}
      {[60,120,180,240,300,360,420,480,540].map(x => (
        <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="340" stroke={c.grid} strokeWidth="1" />
      ))}
      {[50,100,150,200,250,300].map(y => (
        <line key={`gy${y}`} x1="0" y1={y} x2="600" y2={y} stroke={c.grid} strokeWidth="1" />
      ))}

      {/* Manila Bay (west) */}
      <path d="M0,70 Q35,130 22,210 Q10,270 35,315 L0,330 Z" fill={c.water} opacity="0.85" />

      {/* Laguna de Bay (SE) */}
      <ellipse cx="572" cy="295" rx="78" ry="55" fill={c.water} opacity="0.85" />

      {/* Valenzuela / Caloocan (upper left) */}
      <polygon points="82,10 215,10 222,95 148,132 82,102" fill={c.d2} stroke={c.stroke} strokeWidth="1.5" />

      {/* Quezon City (large, top center-right) */}
      <polygon points="205,10 495,10 524,168 405,218 302,206 224,155 214,65" fill={c.d1} stroke={c.stroke} strokeWidth="1.5" />

      {/* Marikina (far right) */}
      <polygon points="494,10 560,28 545,168 524,172" fill={c.d3} stroke={c.stroke} strokeWidth="1.5" />

      {/* Manila City (center left) */}
      <polygon points="82,140 224,140 244,182 255,265 204,292 100,280 58,232 60,158" fill={c.d2} stroke={c.stroke} strokeWidth="1.5" />

      {/* San Juan / Mandaluyong */}
      <polygon points="302,206 404,210 418,260 312,270 292,242" fill={c.d1} stroke={c.stroke} strokeWidth="1.5" />

      {/* Pasig */}
      <polygon points="404,178 542,172 546,262 422,268 408,226" fill={c.d3} stroke={c.stroke} strokeWidth="1.5" />

      {/* Makati */}
      <polygon points="255,272 414,265 428,330 278,335 248,306" fill={c.d2} stroke={c.stroke} strokeWidth="1.5" />

      {/* Taguig */}
      <polygon points="428,276 548,265 542,335 438,340" fill={c.d1} stroke={c.stroke} strokeWidth="1.5" />

      {/* Pasay */}
      <polygon points="104,288 248,285 252,335 108,338" fill={c.d3} stroke={c.stroke} strokeWidth="1.5" />

      {/* Pasig River */}
      <path d="M50,196 Q124,188 204,196 Q282,204 364,196 Q442,190 546,200"
        fill="none" stroke={c.river} strokeWidth="7" strokeLinecap="round" opacity="0.9" />

      {/* Main road arteries (dashed) */}
      <line x1="0" y1="140" x2="600" y2="140" stroke={c.road} strokeWidth="2.5" strokeDasharray="5,4" />
      <line x1="300" y1="0"  x2="300" y2="340" stroke={c.road} strokeWidth="2" strokeDasharray="5,4" />
      <line x1="420" y1="0"  x2="420" y2="340" stroke={c.road} strokeWidth="1.5" strokeDasharray="3,6" />

      {/* District labels */}
      <text x="355" y="98"  fill={c.label} fontSize="11" fontWeight="600" textAnchor="middle" opacity="0.9">Quezon City</text>
      <text x="148" y="68"  fill={c.label} fontSize="9"  fontWeight="500" textAnchor="middle" opacity="0.8">Caloocan</text>
      <text x="155" y="222" fill={c.label} fontSize="10" fontWeight="500" textAnchor="middle" opacity="0.8">Manila</text>
      <text x="358" y="245" fill={c.label} fontSize="9"  fontWeight="500" textAnchor="middle" opacity="0.8">Mandaluyong</text>
      <text x="322" y="304" fill={c.label} fontSize="10" fontWeight="500" textAnchor="middle" opacity="0.8">Makati</text>
      <text x="474" y="224" fill={c.label} fontSize="10" fontWeight="500" textAnchor="middle" opacity="0.8">Pasig</text>
      <text x="486" y="308" fill={c.label} fontSize="10" fontWeight="500" textAnchor="middle" opacity="0.8">Taguig</text>
      <text x="175" y="314" fill={c.label} fontSize="9"  fontWeight="500" textAnchor="middle" opacity="0.7">Pasay</text>
      <text x="530" y="190" fill={c.label} fontSize="9"  fontWeight="500" textAnchor="middle" opacity="0.7">Marikina</text>

      {/* Water labels */}
      <text x="18" y="198" fill={c.waterLbl} fontSize="8" fontWeight="500" textAnchor="middle" opacity="0.8"
        transform="rotate(-90,18,198)">Manila Bay</text>
      <text x="270" y="192" fill={c.waterLbl} fontSize="8" fontWeight="400" opacity="0.8">Pasig River</text>
    </svg>
  );
}

// ─── Map Pin Component ────────────────────────────────────────────────────────
function MapPin({
  pin,
  isActive,
  darkMode,
  onToggle,
  onClose,
}: {
  pin: MapPinData;
  isActive: boolean;
  darkMode: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const arrowColor = darkMode ? "#1f2937" : "white";
  const isBelow = pin.tooltipDir === "below";

  return (
    <div className="absolute" style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -50%)", zIndex: isActive ? 30 : 10 }}>
      {/* Pin button — 44×44 tap target */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        aria-label={`Price report at ${pin.label}`}
        className="w-11 h-11 flex items-center justify-center focus:outline-none group"
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-base shadow-lg border-2 border-white
            transition-transform duration-150
            ${isActive ? "scale-125 bg-red-600" : "bg-red-500 group-hover:scale-110 group-hover:bg-red-600"}
          `}
          style={{ boxShadow: "0 3px 10px rgba(220,38,38,0.45)" }}
        >
          📍
        </div>
      </button>

      {/* Tooltip card */}
      {isActive && (
        <div
          className="absolute z-40 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-2xl border border-gray-100 dark:border-gray-600 p-3 w-52"
          style={
            isBelow
              ? { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }
              : { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }
          }
          onClick={(e) => e.stopPropagation()}
        >
          {/* Arrow */}
          {isBelow ? (
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0"
              style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: `8px solid ${arrowColor}` }} />
          ) : (
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0"
              style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `8px solid ${arrowColor}` }} />
          )}

          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm leading-tight">{pin.item}</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mt-0.5 flex-shrink-0">
              <X size={13} />
            </button>
          </div>
          <p className="text-green-600 dark:text-[#4CAF50] font-bold text-base">{pin.price}</p>
          <p className="text-gray-500 dark:text-[#9E9E9E] text-xs mt-0.5">📍 {pin.label}</p>
          <p className="text-gray-400 text-xs">{pin.timeAgo}</p>
          <div className="mt-2">
            {pin.verified
              ? <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-[#4CAF50]/10 text-green-700 dark:text-[#4CAF50] font-medium">✅ Verified</span>
              : <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 font-medium">⚠️ Unverified</span>
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function CommunityPage() {
  const { darkMode } = useApp();

  // Map state
  const [activeRegion, setActiveRegion]   = useState("Metro Manila");
  const [regionOpen, setRegionOpen]       = useState(false);

  // Map center and zoom by region
  const regionCenters: Record<string, [number, number]> = {
    "All": [10.5, 121.0],
    "Metro Manila": [14.5995, 120.9842],
    "Cebu City": [10.3157, 123.8854],
    "Davao City": [7.1278, 125.5419],
    "Iloilo City": [10.6992, 122.5598],
    "Baguio City": [16.4023, 120.5960],
  };

  const regionZooms: Record<string, number> = {
    "All": 6,
    "Metro Manila": 11,
    "Cebu City": 11,
    "Davao City": 11,
    "Iloilo City": 11,
    "Baguio City": 11,
  };

  // Filter mapPins by region
  const filteredPins = activeRegion === "All" 
    ? mapPins 
    : mapPins.filter(pin => pin.region === activeRegion);

  // Convert mapPins to Leaflet markers format
  const leafletMarkers = filteredPins.map((pin) => ({
    id: pin.id,
    lat: pin.lat,
    lng: pin.lng,
    label: pin.label,
    item: pin.item,
    price: pin.price,
    verified: pin.verified,
    icon: pin.emoji || "📍",
    color: pin.verified ? "#2E7D32" : "#F59E0B",
  }));

  // OLD - kept for reference but not used
  const notUsedAnyMore = { activePin: null, zoom: 1 };

  // Reports state
  const [reports, setReports]             = useState<Report[]>(initialReports);
  const [votes, setVotes]                 = useState<Record<number, "up" | "down" | null>>({});

  // Comment modal
  const [commentReportId, setCommentReportId] = useState<number | null>(null);
  const [newComment, setNewComment]           = useState("");
  const commentReport = commentReportId !== null ? reports.find(r => r.id === commentReportId) ?? null : null;

  // Submit modal
  const [submitOpen, setSubmitOpen]       = useState(false);
  const [step, setStep]                   = useState(1);
  const [selectedItem, setSelectedItem]   = useState("");
  const [otherItem, setOtherItem]         = useState("");
  const [price, setPrice]                 = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");

  // Gamification / feedback
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showPointsPopup, setShowPointsPopup]   = useState(false);
  const [userPoints, setUserPoints]             = useState(0);
  const [leaderboard, setLeaderboard]           = useState(initialLeaderboard);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const toggleVote = (id: number, dir: "up" | "down") => {
    setVotes(v => ({ ...v, [id]: v[id] === dir ? null : dir }));
  };

  const getItemEmoji = (s: string) => {
    const m = s.match(/^\S+/);
    return m ? m[0] : "📦";
  };
  const getItemName = (s: string) => s.replace(/^\S+\s?/, "").trim() || s;

  const openSubmit = () => {
    setStep(1); setSelectedItem(""); setOtherItem(""); setPrice(""); setSelectedMarket("");
    setSubmitOpen(true);
  };
  const closeSubmit = () => setSubmitOpen(false);

  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
    if (item !== "Other") setStep(2);
  };

  const handleSubmit = () => {
    const itemDisplay = selectedItem === "Other" ? otherItem : selectedItem;
    const itemEmoji   = selectedItem === "Other" ? "📦" : getItemEmoji(selectedItem);
    const itemName    = selectedItem === "Other" ? otherItem : getItemName(selectedItem);
    const priceNum    = parseFloat(price) || 0;

    const newReport: Report = {
      id: Date.now(),
      user: "You",
      initials: "ME",
      badge: null,
      emoji: itemEmoji,
      item: itemName,
      price: priceNum,
      market: selectedMarket,
      distance: "0.1 km",
      timeAgo: "Just now",
      verified: false,
      upvotes: 0,
      comments: [],
      color: "#059669",
      isNew: true,
      isPending: true,
    };

    setReports(prev => [newReport, ...prev]);
    setSubmitOpen(false);

    // Success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);

    // Points popup (delayed slightly)
    setTimeout(() => {
      setShowPointsPopup(true);
      setTimeout(() => setShowPointsPopup(false), 2600);
    }, 700);

    // Update leaderboard
    const newPts = userPoints + 10;
    setUserPoints(newPts);
    setLeaderboard(prev => {
      const without = prev.filter(l => l.name !== "You");
      const withYou = [...without, { rank: 0, name: "You", points: newPts, badge: "🆕" }]
        .sort((a, b) => b.points - a.points)
        .map((l, i) => ({ ...l, rank: i + 1 }));
      return withYou;
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim() || commentReportId === null) return;
    setReports(prev => prev.map(r =>
      r.id === commentReportId
        ? { ...r, comments: [...r.comments, { user: "You", initials: "ME", text: newComment, time: "Just now", color: "#059669" }] }
        : r
    ));
    setNewComment("");
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">

      {/* ── Header ── */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">
            👥 Community Price Reports
          </h1>
          <p className="text-gray-500 dark:text-[#9E9E9E] text-sm mt-1">Real prices reported by your neighbors</p>
        </div>
        <button
          onClick={openSubmit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #2E7D32, #388E3C)" }}
        >
          <Camera size={16} /> Submit Report
        </button>
      </div>

      {/* ── MAP SECTION ── */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2D2D2D] overflow-visible">

        {/* Map toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-[#2D2D2D] flex-wrap gap-2">
          {/* Region dropdown */}
          <div className="relative">
            <button
              onClick={() => setRegionOpen(o => !o)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#2D2D2D] text-gray-800 dark:text-[#FFFFFF] text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#1E1E1E] transition-colors min-h-[44px]"
            >
              📍 {activeRegion}
              <ChevronDown size={14} className={`transition-transform duration-200 ${regionOpen ? "rotate-180" : ""}`} />
            </button>
            {regionOpen && (
              <div
                className="absolute top-full left-0 mt-1 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-30 overflow-hidden min-w-[190px]"
                onClick={e => e.stopPropagation()}
              >
                {regions.map(r => (
                  <button
                    key={r}
                    onClick={() => { setActiveRegion(r); setRegionOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors ${activeRegion === r ? "text-green-600 dark:text-[#4CAF50] font-semibold bg-green-50 dark:bg-[#4CAF50]/10" : "text-gray-700 dark:text-[#E0E0E0]"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto text-xs text-gray-400">
            🗺️ Interactive Leaflet map - drag to move, scroll to zoom
          </div>
        </div>

        {/* Map viewport */}
        <div className="relative rounded-b-2xl overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
          <LeafletMap
            markers={leafletMarkers}
            center={regionCenters[activeRegion]}
            zoom={regionZooms[activeRegion]}
            height="600px"
            darkMode={darkMode}
          />
        </div>

        {/* Map legend */}
        <div className="px-4 py-2.5 border-t border-gray-100 dark:border-[#2D2D2D] flex items-center gap-4 text-xs text-gray-500 dark:text-[#9E9E9E] flex-wrap">
          <span>📍 {filteredPins.length} active report pins</span>
          <span>✅ Verified</span>
          <span>⚠️ Unverified</span>
          <span className="ml-auto">Tap a pin to view price</span>
        </div>
      </div>

      {/* ── Reports + Leaderboard ── */}
      <div className="flex gap-5">

        {/* Reports list */}
        <div className="flex-1 space-y-4">
          {reports.map(r => (
            <div
              key={r.id}
              className={`bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border relative transition-shadow hover:shadow-md
                ${r.isNew ? "border-green-400 dark:border-[#81C784]" : "border-gray-100 dark:border-[#2D2D2D]"}`}
            >
              {/* NEW badge */}
              {r.isNew && (
                <div className="absolute -top-2.5 -right-2.5 bg-green-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow">
                  NEW
                </div>
              )}

              {/* Reporter row */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm"
                  style={{ background: r.color }}
                >
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{r.user}</p>
                    {r.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-medium">{r.badge}</span>
                    )}
                    {r.isPending ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium">⏳ Pending Verification</span>
                    ) : r.verified ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-[#4CAF50]/10 text-green-700 dark:text-[#4CAF50] font-medium flex items-center gap-1">
                        ✅ Verified <AIBadge size="sm" />
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 font-medium">⚠️ Unverified</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{r.distance} · {r.timeAgo}</p>
                </div>
              </div>

              {/* Price card */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#2D2D2D] rounded-xl mb-3">
                <span className="text-3xl">{r.emoji}</span>
                <div>
                  <p className="font-bold text-gray-800 dark:text-[#FFFFFF] text-lg">₱{r.price}/kg</p>
                  <p className="text-sm text-gray-500 dark:text-[#9E9E9E]">{r.item} at {r.market}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleVote(r.id, "up")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors min-h-[36px] ${votes[r.id] === "up" ? "bg-green-100 dark:bg-[#4CAF50]/10 text-green-700 dark:text-[#4CAF50]" : "bg-gray-100 dark:bg-[#2D2D2D] text-gray-500"}`}
                >
                  <ThumbsUp size={14} /> {r.upvotes + (votes[r.id] === "up" ? 1 : 0)}
                </button>
                <button
                  onClick={() => toggleVote(r.id, "down")}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors min-h-[36px] ${votes[r.id] === "down" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-gray-100 dark:bg-[#2D2D2D] text-gray-500"}`}
                >
                  <ThumbsDown size={14} />
                </button>
                {!r.isPending && (
                  <button
                    onClick={() => setCommentReportId(r.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-gray-100 dark:bg-[#2D2D2D] text-gray-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors min-h-[36px]"
                  >
                    <MessageSquare size={14} /> {r.comments.length}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard — desktop only */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D] sticky top-20">
            <h3 className="font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">🏆 Top Contributors</h3>
            <p className="text-xs text-gray-400 mb-3">This week</p>
            <div className="space-y-2">
              {leaderboard.map(l => (
                <div
                  key={l.rank}
                  className={`flex items-center gap-2 rounded-lg transition-colors ${l.name === "You" ? "bg-green-50 dark:bg-[#4CAF50]/10 px-2 py-1" : ""}`}
                >
                  <span className="text-lg">{l.badge}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${l.name === "You" ? "text-green-700 dark:text-[#4CAF50]" : "text-gray-700 dark:text-[#E0E0E0]"}`}>
                      {l.name === "You" ? "You 🆕" : l.name}
                    </p>
                    <p className="text-xs text-gray-400">{l.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-2 bg-green-50 dark:bg-[#4CAF50]/10 rounded-xl text-xs text-green-700 dark:text-[#4CAF50]">
              🎯 Earn points for verified reports!
            </div>
          </div>
        </div>
      </div>

      {/* ── Submit Report Modal ── */}
      {submitOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeSubmit}
        >
          <div
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="p-5 border-b border-gray-100 dark:border-[#2D2D2D] flex items-start justify-between sticky top-0 bg-white dark:bg-[#1E1E1E] z-10">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF]">Submit Price Report</h3>
                <div className="flex gap-1 mt-3">
                  {[1,2,3,4].map(s => (
                    <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors ${s <= step ? "bg-green-600" : "bg-gray-200 dark:bg-gray-600"}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">Step {step} of 4</p>
              </div>
              <button onClick={closeSubmit} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400 ml-3">
                <X size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5">

              {/* Step 1 — Select Item */}
              {step === 1 && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700 dark:text-[#E0E0E0]">1. Select Item</p>
                  <div className="grid grid-cols-3 gap-2">
                    {itemOptions.map(i => (
                      <button
                        key={i}
                        onClick={() => handleItemSelect(i)}
                        className={`p-3 rounded-xl border text-sm hover:bg-green-50 dark:hover:bg-[#4CAF50]/20/20 hover:border-green-400 transition-colors text-center
                          ${selectedItem === i
                            ? "border-green-500 bg-green-50 dark:bg-[#1B5E20]/30 dark:border-[#81C784] text-gray-800 dark:text-[#FFFFFF]"
                            : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-[#E0E0E0]"}`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                  {selectedItem === "Other" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={otherItem}
                        onChange={e => setOtherItem(e.target.value)}
                        placeholder="Type item name (e.g. Sayote, Upo...)"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm outline-none focus:border-green-400 dark:bg-[#2D2D2D] dark:text-[#FFFFFF]"
                      />
                      <button
                        disabled={!otherItem.trim()}
                        onClick={() => setStep(2)}
                        className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2 — Enter Price */}
              {step === 2 && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700 dark:text-[#E0E0E0]">2. Enter Price</p>
                  <p className="text-sm text-gray-500 dark:text-[#9E9E9E]">
                    Item: <span className="font-medium text-gray-700 dark:text-[#E0E0E0]">{selectedItem === "Other" ? otherItem : selectedItem}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-400">₱</span>
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      className="flex-1 text-2xl font-bold border-b-2 border-green-400 outline-none py-1 text-gray-800 dark:text-[#FFFFFF] dark:bg-transparent"
                    />
                    <span className="text-gray-400">/kg</span>
                  </div>
                  <button
                    disabled={!price || parseFloat(price) <= 0}
                    onClick={() => setStep(3)}
                    className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                  <button onClick={() => setStep(1)} className="w-full py-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 3 — Select Market */}
              {step === 3 && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-700 dark:text-[#E0E0E0]">3. Select Market</p>
                  <div className="space-y-2">
                    {marketOptions.map(m => (
                      <button
                        key={m}
                        onClick={() => { setSelectedMarket(m); setStep(4); }}
                        className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 text-left text-sm hover:bg-green-50 dark:hover:bg-[#4CAF50]/20/20 hover:border-green-400 transition-colors text-gray-700 dark:text-[#E0E0E0] min-h-[44px]"
                      >
                        📍 {m}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} className="w-full py-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    ← Back
                  </button>
                </div>
              )}

              {/* Step 4 — Photo + Submit */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="font-semibold text-gray-700 dark:text-[#E0E0E0]">
                    4. Upload Photo <span className="text-gray-400 font-normal text-sm">(optional)</span>
                  </p>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 dark:hover:bg-[#4CAF50]/20/10 transition-colors min-h-[44px]">
                    <Camera size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Tap to take a photo or upload</p>
                    <p className="text-xs text-gray-400 mt-1">Helps with AI verification (+bonus points)</p>
                  </div>

                  {/* Report summary */}
                  <div className="bg-green-50 dark:bg-[#4CAF50]/10 rounded-xl p-3.5 text-sm space-y-1">
                    <p className="font-semibold text-green-700 dark:text-[#4CAF50] mb-2">📋 Report Summary</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Item: <span className="font-medium text-gray-800 dark:text-[#FFFFFF]">{selectedItem === "Other" ? otherItem : selectedItem}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Price: <span className="font-medium text-gray-800 dark:text-[#FFFFFF]">₱{price}/kg</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Market: <span className="font-medium text-gray-800 dark:text-[#FFFFFF]">{selectedMarket}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 active:bg-green-800 transition-colors"
                  >
                    ✅ Submit Report
                  </button>
                  <p className="text-xs text-center text-green-600 dark:text-[#4CAF50]">🎯 Earn +10 pts for this report!</p>

                  <button onClick={() => setStep(3)} className="w-full py-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    ← Back
                  </button>
                </div>
              )}
            </div>

            <div className="px-5 pb-5">
              <button onClick={closeSubmit} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Comment Modal ── */}
      {commentReport && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setCommentReportId(null)}
        >
          <div
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="p-5 border-b border-gray-100 dark:border-[#2D2D2D] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1E1E1E] z-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{commentReport.emoji}</span>
                <div>
                  <p className="font-bold text-gray-800 dark:text-[#FFFFFF]">{commentReport.item} — ₱{commentReport.price}/kg</p>
                  <p className="text-xs text-gray-400">{commentReport.market} · {commentReport.timeAgo}</p>
                </div>
              </div>
              <button onClick={() => setCommentReportId(null)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>

            {/* Report details */}
            <div className="p-5 border-b border-gray-50 dark:border-[#2D2D2D]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ background: commentReport.color }}
                >
                  {commentReport.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{commentReport.user}</p>
                  {commentReport.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-medium">{commentReport.badge}</span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Reported <strong>{commentReport.item}</strong> at <strong>₱{commentReport.price}/kg</strong> in {commentReport.market}.
                {commentReport.verified && " ✅ AI-verified price."}
              </p>
            </div>

            {/* Comments */}
            <div className="p-5">
              <p className="font-semibold text-gray-700 dark:text-[#E0E0E0] mb-3 flex items-center gap-2">
                <MessageSquare size={15} /> {commentReport.comments.length} Comments
              </p>
              <div className="space-y-3 mb-4">
                {commentReport.comments.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-4">No comments yet. Be the first!</p>
                )}
                {commentReport.comments.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: c.color }}>
                      {c.initials}
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-[#2D2D2D] rounded-xl px-3 py-2">
                      <p className="font-medium text-gray-800 dark:text-[#FFFFFF] text-sm">{c.user}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{c.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add comment */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddComment()}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-sm outline-none focus:border-green-400 dark:text-[#FFFFFF]"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Success Toast ── */}
      {showSuccessToast && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
          ✅ Report submitted! Awaiting verification.
        </div>
      )}

      {/* ── Points Popup ── */}
      {showPointsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl p-8 text-center border-2 border-yellow-400 pointer-events-auto animate-bounce-once">
            <div className="text-5xl mb-3">🎉</div>
            <p className="font-bold text-2xl text-gray-800 dark:text-[#FFFFFF]">+10 points earned!</p>
            <p className="text-sm text-gray-500 dark:text-[#9E9E9E] mt-1">Keep reporting to earn more!</p>
            <div className="mt-3 px-4 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 rounded-full inline-block">
              <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">⭐ You're on the leaderboard!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
