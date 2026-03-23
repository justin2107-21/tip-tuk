can you make this 5000 characters? its currently at 12000

Project Overview
Design a comprehensive, high-fidelity UI for Anopresyo – a Filipino price tracking and smart budgeting web application. The app helps users find the best prices for market goods (vegetables, fruits, meat, rice), SM supermarket items, fuel, and EV charging stations. It features AI-powered insights, community price reports, waste reduction alerts, and a personal budget planner. The design must be vibrant, modern, and accessible – especially for elderly Filipino users (large text, high contrast, simple navigation). All AI-enhanced features must be clearly marked with a 🤖 badge.

Target Audience: Filipino households, including senior citizens, tech-savvy年轻人, and budget-conscious shoppers.
Platform: Web (responsive desktop & mobile).
Tone: Friendly, trustworthy, empowering, with a touch of Filipino warmth.

🎨 Global Design Guidelines
Color Palette
Primary Green: #2E7D32 – for savings, best deals, "MURA" tags.

Accent Orange: #F57C00 – for warnings, "MAHAL" tags, alerts.

Neutral Background: #F8F9FA (light gray) – clean and easy on eyes.

Text: Dark gray (#212121) for body, white on dark backgrounds.

AI Badge Color: Purple #9C27B0 or a distinct color to highlight AI features.

Filipino Accent: Use subtle patterns inspired by banig (woven mat) or jeepney stripes in backgrounds or cards (very subtle, not overwhelming).

Typography
Headings: Poppins or Montserrat – bold, modern, readable.

Body: Inter or Roboto – clean, high legibility.

Font Sizes: Minimum 16px for body text; headings at least 24px; buttons 18px. Ensure high contrast (WCAG AA compliant).

Iconography
Use emojis for items (e.g., 🥦 for broccoli) for instant recognition, especially for elderly users.

Supplement with Font Awesome or similar line icons for actions (search, basket, profile, etc.).

Accessibility Features
High contrast between text and background.

Buttons and interactive elements have clear hover/focus states.

Simple, consistent navigation with clear labels.

Option to increase font size (or default large text).

Avoid complex gestures; all actions available via click/tap.

Global UI Elements (Every Page)
Top Navigation Bar: Logo (Anopresyo) on left. Center: Search bar with placeholder "Search items, fuel, or stations...". Right: Notification bell, user profile icon (with login/signup dropdown), and a dark/light mode toggle.

Sidebar (desktop) or Bottom Navigation (mobile): Icons + labels linking to: Home, SM Markets, Fuel, EV, My Basket, and a "More" menu (for additional features like Seasonal Calendar, Community, Budget Planner). On mobile, a hamburger menu contains all pages.

Footer: Brief info, data sources (DA, SM, DOE), last updated timestamp, and social links (Facebook, etc.). Include a small "Accessibility" link.

📄 Page-by-Page Design Specifications
PAGE 1: HOME PAGE (Smart Price Dashboard)
Layout:

Hero Section: "Ano ang mura ngayon?" headline, with a dynamic carousel of top 3 best deals (item image placeholder, name, price, savings). Include a "View All Best Deals" button.

🔥 Best Deals Section:

Toggle tabs: 7D, 30D, 90D (for price drop period).

Grid of 4-6 cards showing:

Item emoji, name, current price per kg.

Savings (e.g., "Save ₱13/kg").

🟢 MURA badge.

"➕ Add to Basket" and "🔔 Set Alert" (with AI badge for smart alerts).

⚠️ Getting Expensive Section:

List format (or cards) showing items with price increases:

Item emoji, name, current price, vs. usual price.

🔴 MAHAL badge.

Upward trend icon.

📊 Bantay Presyo (Main Price List):

Category filter chips: All, Meats, Fish, Vegetables, Fruits, Rice, Spices, Others.

Sort dropdown: Best Deal, Name, Price ↑, Price ↓.

Each row/card includes:

Item emoji, name, current price, usual price/average.

Status badge: 🟢 MURA, 🟡 STABLE, 🔴 MAHAL.

"🤍" (favorite) and "➕" buttons.

Infinite scroll or "Load More" button.

🤖 AI Price Predictor Teaser: Small widget showing a forecast for a popular item (e.g., "AI predicts broccoli price to drop next week"). Click opens Seasonal Calendar page.

PAGE 2: SM MARKETS PAGE
Layout:

Search Bar: Specific to SM items (placeholder "Search SM items...").

Store Dropdown: Select SM branch (e.g., SM Hypermarket Cubao, North, Southmall). Show last updated date for that branch.

Category Tabs: Chicken, Pork, Beef, Seafood, Vegetables, Fruits.

Sort Options: ₱/kg ↑, ₱/kg ↓, Pack ↑, Name.

Product Cards:

Product image placeholder (or emoji), name.

Pack size info (e.g., "500g-550g").

Price for pack and calculated price per kg (highlighted).

"➕ Add to Basket" button.

"🤍" favorite icon.

🤖 AI Comparison Insight: On some cards, a small banner: "🤖 AI tip: This is 10% cheaper than wet market average!" (if applicable).

PAGE 3: FUEL PAGE
Layout:

Dual Dropdowns: Fuel Type (RON 95, RON 91, Diesel) and Area (Quezon City, Taguig, etc.).

Toggle Switch: View by Brand / View by Area.

Summary Card: NCR average price with range and last update.

Ranked List:

By Brand: Show brand logo (or name), price, savings vs most expensive, star for favorites.

By Area: Show area name, price range, common price, and a map icon (future).

Price Trend Sparkline: Small graph next to each fuel type (using Chart.js style).

🤖 AI Fuel Forecast: Small widget: "🤖 AI predicts prices may drop next week based on historical trends." with a "Set Alert" button.

Price Alert Bell: For specific fuel type/area – with AI badge.

PAGE 4: EV PAGE
Layout with 3 Tabs:

Tab 1: Cheapest Stations

Filters: Location (NCR, etc.), Charger Type (All, AC, DC).

List of stations with:

Station name, operator, location, charger type, hours, price per kWh.

Rank medals (🥇, 🥈, 🥉) for cheapest.

Favorite star.

Map Integration: Static mockup map showing station pins.

Tab 2: Operators

Table or cards listing operators: operator name, number of stations, average price per kWh, "No pricing" if unavailable.

Sorting by stations or price.

Tab 3: Gas vs EV (Cost Comparison)

Interactive calculator with cards:

EV: ₱28.90/kWh × 0.15 kWh/km = ₱4.34/km

Gasoline: ₱71.85/L ÷ 10 km/L = ₱7.19/km

Diesel: ₱81.75/L ÷ 12 km/L = ₱6.81/km

Big savings badges: "⚡ vs ⛽ Save 39.6%"

Monthly estimate slider (km/month) to dynamically update total cost.

🤖 AI Route Planner: Small button: "🤖 Plan your EV route" (conceptual) – opens a modal with sample route and station suggestions.

🤖 Charger Availability Predictor: Icon with tooltip: "AI predicts low wait times at this station" based on historical data (dummy).

PAGE 5: MY BASKET PAGE
Layout:

Header: Total estimated cost (large font), with action buttons: Share Basket, Clear All, and Optimize My Trip (highlighted as AI feature).

List of Items:

Each item: emoji, name, current price per kg.

Quantity selector (with + and -) and item total.

Delete icon.

If price changed since added, show indicator (e.g., "↑₱5" in red or "↓₱3" in green).

Savings Tips Section (bottom):

"🤖 AI Tip: 3 items in your basket have price alerts active."

"🥦 Broccoli is ₱13 cheaper than usual!"

Button: "🤖 Generate Tipid Recipe from My Basket" (opens recipe modal).

Recipe Modal Example:

Shows 2-3 recipe cards using basket items + best deals, with estimated cost per serving and "Cook Now" button (dummy).

Ingredients list and simple instructions.

PAGE 6: SEASONAL CALENDAR (🌱)
Layout:

Calendar Grid: Monthly view (can scroll through months). Each month cell shows icons of in-season produce.

Selected Month View: When user clicks a month, a detailed list appears below with:

Item name, typical price range, peak season indicator.

🤖 AI Price Forecast: For each item, a small graph or text: "Expected to drop 10% in next 2 weeks" or "Prices rising soon."

Search/Filter: Find specific produce and see its seasonality chart.

Visuals: Use color coding: green for peak, yellow for start/end, gray for off-season.

Data Source Note: "Based on DA historical data and AI predictions."

PAGE 7: COMMUNITY PRICE REPORTS (👥)
Layout:

Map or List Toggle: Option to view nearby reports on a map or as a list.

List View:

Each report card includes:

User avatar/initial, username, trust badge (e.g., "Top Contributor").

Item emoji, name, reported price, market name, distance, time ago.

Photo thumbnail (click to enlarge).

Verification badge: ✅ Verified (AI-checked) or ⚠️ Unverified.

Upvote/downvote buttons, comment count.

Submit Report Form (prominent button):

Step-by-step: Select item, enter price, select market, upload photo, submit.

Gamification note: "Earn points for verified reports!"

Leaderboard Sidebar: Top contributors this week with badges (🥇, 🥈, 🥉).

🤖 AI Verification Badge: Automatically shown on verified reports.

PAGE 8: WASTE REDUCTION (♻️) – Surplus Markdown Alerts
Layout:

Nearby Surplus Section:

Cards for each store with surplus items:

Store name, address, distance.

List of discounted items: name, original price, discounted price, expiry (e.g., "Expires tomorrow").

"Get Alert" button for that store.

🤖 AI Markdown Predictor Widget:

"Today at 7pm, SM Cubao usually marks down meats. Set reminder?"

List of predicted markdown times for the week.

Flash Sale Alerts: Real-time notifications (simulated) of ongoing markdowns.

Recipe Ideas: "Use soon-to-expire items in these recipes" – links to recipe modal.

PAGE 9: BUDGET PLANNER (💰)
Layout:

Budget Summary Card:

Monthly budget set by user, spent so far, remaining.

Progress bar.

Spending by Category: Bar chart or pie chart showing breakdown (Vegetables, Meat, etc.).

Recent Transactions: List of items added to basket (with dates) that count toward spending. Option to manually add purchases.

🤖 AI Savings Insights:

"You're spending 20% more on meat this month. Try chicken instead to save ₱500."

"Based on your basket, switching to local onions could save ₱120."

"Set a goal to save ₱1,000 this month?"

Savings Goals: Add and track goals (e.g., Emergency Fund, New TV).

PAGE 10: SMART DASHBOARD (Personalized Home for Logged-in Users)
Layout:

Welcome Header: "Good morning, [Name]!" with avatar.

Quick Actions: Buttons for My Basket, Budget, Alerts, Community.

Personalized Deals:

"Based on your favorites, these items are on sale:" – carousel of items.

"Price drops on your watched items:" – list.

Nearby Community Reports: Map snippet with recent reports near user's location.

AI Recipe Suggestion: "Try this recipe using your basket items."

Budget Snapshot: Mini progress bar and tip.

🤖 AI Chatbot Assistant (Floating on All Pages)
A floating chat bubble (bottom right) with AI icon.

Click opens chat window with sample messages:

"What's the cheapest vegetable today?"

"Set alert for chicken below ₱150/kg."

"Suggest a recipe with eggplant."

"Show me my budget."

Chat interface: message bubbles, quick reply buttons, option to speak to human.

📱 Mobile Responsiveness
All pages must adapt to mobile view:

Stack cards vertically.

Navigation becomes bottom bar with icons (Home, Markets, Fuel, EV, More).

Hamburger menu for additional pages.

Font sizes remain readable (min 16px).

Touch targets at least 44x44px.

✨ Unique Design Touches
Use subtle Filipino elements: banig patterns as card backgrounds (very light), jeepney-inspired color accents (e.g., stripes on buttons).

Incorporate Capiz shell textures or parol shapes in decorative elements.

Color palette warm and inviting, reminiscent of sari-sari store vibrancy.

Illustrations of local market scenes (optional).

🔖 AI Feature Badging
Every AI-powered feature must have a small 🤖 badge (e.g., next to price forecast, verified report, markdown prediction, chatbot, etc.). Use a distinct color (purple) for these badges to make them stand out.

✅ Output Expectations
Provide full mockups for all 10 pages (Home, SM Markets, Fuel, EV, My Basket, Seasonal Calendar, Community Reports, Waste Reduction, Budget Planner, Smart Dashboard) in both light mode and optionally dark mode.

Include interactive elements: dropdowns, hover states, modal pop-ups (for recipe, set alert, submit report).

Show mobile versions for at least key pages (Home, My Basket).

Use realistic sample data (e.g., prices, item names) to fill the UI.

Ensure accessibility: high contrast, large text, clear labels.

Deliverables: High-resolution images (PNG, Figma link, or interactive prototype if possible).