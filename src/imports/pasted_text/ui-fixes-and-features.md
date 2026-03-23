Please address each point precisely.

🌗 GLOBAL FIXES (All Pages)
Dark Mode Color Scheme

Current dark mode uses the same green (#2E7D32) and orange (#F57C00) as light mode, but they don’t complement the dark background.

Fix: Adjust dark mode colors only:

Background: #121212 (soft black)

Surface (cards): #1E1E1E

Primary green: #4CAF50 (brighter, maintains contrast)

Accent orange: #FF9800 (warmer)

Text: #E0E0E0 (body), #FFFFFF (headings)

Status badges: keep green (#4CAF50), orange (#FF9800), but ensure they are readable on dark surfaces.

Test all pages for visual harmony.

Page‑Specific Disclaimers (Footer)
Add the following disclaimers at the very bottom of each page, styled as small text (12px, grey) with a subtle border above:

Home: 📋 Source: DA Bantay Presyo official price monitoring (90 commodities). Not a government app.

SM Markets: Prices from smmarkets.ph. Actual prices may vary in-store.

Fuel: Source: DOE — Oil Industry Management Bureau • Updates weekly

EV: Source: DOE — evindustry.ph EVCS Registry • Updates weekly

(Other pages can reuse the Home disclaimer or none, but ensure consistency.)

Add to Basket Success Modal

When any "➕ Add to Basket" button is clicked, a small modal (toast or centered pop‑up) should appear with the message "Added to My Basket" and a green check icon.

Modal auto‑closes after 1.5 seconds or can be dismissed with a tap outside.

Notification Bell with AI Robot Icon

The bell icon in the top navigation (which also has an AI robot badge) currently does nothing.

Fix: On click, open a modal listing the latest price alerts and AI tips (e.g., "Broccoli dropped 5%", "AI suggests buying chicken tomorrow").

Modal should have a close button (X) and background click to close.

Search Feature

The global search bar currently does not filter results.

Fix: Implement functional search that filters items in the current page (Home, SM, etc.) based on item name. On Home, it should filter the Bantay Presyo list; on SM, filter product cards.

Use a debounced input; show "No results" if none found.

🏠 HOME PAGE Fixes
Notification Bell (Top Nav) – already covered in Global #4.

"Load More Items" Button – currently not loading more items.

Fix: When clicked, load the next batch of items (e.g., 20 more) from the Bantay Presyo dataset. The button should remain until no more items exist, then be disabled or hidden.

🔥 Best Deals – 7D/30D/90D Filters

The active tab highlights but the displayed prices do not change.

Fix: On click, filter the best‑deal items based on price drop period:

7D: items that dropped in the last 7 days (use mock data with timestamps).

30D: dropped in last 30 days.

90D: dropped in last 90 days.

Update the list of cards accordingly.

📊 Bantay Presyo Filters

Category chips (All, Meats, Fish, Vegetables, Fruits, Rice, Spices) and sort dropdown (Best Deal, Name, Price ↑, Price ↓) do not work.

Fix:

Clicking a category chip filters the displayed items to that category only. "All" resets to full list.

Sort dropdown reorders the current filtered list.

Both should work together (filter then sort, or sort then filter).

Plus Icon Notification – already covered in Global #3 (success modal for any add to basket action).

Ensure the plus icon on each Bantay Presyo row triggers the same modal.

🛒 SM MARKETS PAGE Fixes
Sort Options – ₱/kg ↑, ₱/kg ↓, Pack ↑, Name currently do nothing.

Fix: Implement sorting:

₱/kg ↑ : ascending by price per kg.

₱/kg ↓ : descending by price per kg.

Pack ↑ : ascending by pack size (in grams).

Name : alphabetical by product name.

Apply to the current filtered list (based on category/ store selection).

⛽ FUEL PAGE Fixes
Fuel Type Options – currently shown as tabs outside the dropdown.

Fix: Convert them into a dropdown menu next to the Area dropdown.

Dropdown options:

RON 95

RON 91

Diesel

RON 97

RON 100

Diesel+

Kerosene

Selecting a fuel type updates the price list accordingly.

Set Alert Modal – the "Set Alert" button inside the AI Forecast widget does nothing.

Fix: On click, open a modal with:

Fuel type (pre‑selected),

Target price input,

Area selection,

"Save Alert" button.

After saving, show success toast and close modal.

🔋 EV PAGE Fixes
Location Dropdown Options – currently NCR only.

Fix: Replace with dropdown containing these regions:

NCR

CALABARZON

Central Luzon

Central Visayas

Ilocos

Western Visayas

Davao

CAR

Selecting a region filters the station list on the "Cheapest Stations" tab.

🛍️ MY BASKET PAGE Fixes
Recipe Modal Close Button – the "Generate Tipid Recipe" button opens a modal, but there is no way to close it (click outside doesn’t work).

Fix: Add an "X" button in the top right corner of the modal that closes it. Also ensure clicking outside the modal closes it.

👥 COMMUNITY PAGE Fixes
Submit Report Form – "Other" Option

The form currently has limited item selections.

Fix: Add an "Other" option in the item dropdown. When selected, a text input appears allowing the user to type the item name.

The photo upload remains required.

Comments Icon (Map Tab) – clicking the comment icon does nothing.

Fix: On click, open a modal showing the full report details and a comment section (mock data can be used). Modal should have a close button.

💰 BUDGET PLANNER PAGE Fixes
Add Goal – Incorrect Progress Display

When adding a goal, the new card shows "₱0 of ₱3,000" regardless of the entered target amount.

Fix: The progress should show the saved amount (which starts at 0) and the target amount the user entered. Update the card text accordingly (e.g., "₱0 of ₱5,000").

If the user sets a target, that value should be stored and displayed.

Manual Add Button (Recent Purchases)

The "Add Manual" button under Recent Purchases does nothing.

Fix: On click, open a modal allowing the user to enter:

Item name

Category (optional)

Amount spent

Date (default today)

After submission, add the entry to the Recent Purchases list and update the spending chart and budget progress.

📊 SMART DASHBOARD Fixes
"See Full Recipe" Link – currently navigates to My Basket page instead of opening a recipe detail.

Fix: Change the link to open a modal or a new page (or a dedicated recipe detail overlay) showing the full recipe instructions, ingredients, and cooking time.

The modal should have a close button.

👥 COMMUNITY PAGE (Additional)
Comment Page Not Clickable – this appears to be a duplicate of the Map Tab comment issue.

Ensure the comment icon in the map tab is fixed (as above).

Also check the list view comment icon (if exists) and ensure it opens the same modal.

