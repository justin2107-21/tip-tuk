import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { SMMarketsPage } from "./pages/SMMarketsPage";
import { FuelPage } from "./pages/FuelPage";
import { EVPage } from "./pages/EVPage";
import { BasketPage } from "./pages/BasketPage";
import { SeasonalCalendarPage } from "./pages/SeasonalCalendarPage";
import { CommunityPage } from "./pages/CommunityPage";
import { WasteReductionPage } from "./pages/WasteReductionPage";
import { BudgetPlannerPage } from "./pages/BudgetPlannerPage";
import { SmartDashboardPage } from "./pages/SmartDashboardPage";
import { AuthPage } from "./pages/AuthPage";
import { SettingsPage } from "./pages/SettingsPage";
import { HealthSupportPage } from "./pages/HealthSupportPage";
import { SubscriptionPage } from "./pages/SubscriptionPage";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <span className="text-6xl mb-4">🛒</span>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Page Not Found</h1>
      <p className="text-gray-500 mt-2">Balik tayo sa home!</p>
      <a href="/" className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
        Go Home
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "sm-markets", Component: SMMarketsPage },
      { path: "fuel", Component: FuelPage },
      { path: "ev", Component: EVPage },
      { path: "basket", Component: BasketPage },
      { path: "seasonal", Component: SeasonalCalendarPage },
      { path: "community", Component: CommunityPage },
      { path: "waste", Component: WasteReductionPage },
      { path: "budget", Component: BudgetPlannerPage },
      { path: "dashboard", Component: SmartDashboardPage },
      { path: "settings", Component: SettingsPage },
      { path: "help", Component: HealthSupportPage },
      { path: "subscription", Component: SubscriptionPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
