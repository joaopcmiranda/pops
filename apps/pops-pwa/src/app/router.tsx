/**
 * React Router configuration
 */
import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layout/RootLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { EntitiesPage } from "@/pages/EntitiesPage";
import { BudgetsPage } from "@/pages/BudgetsPage";
import { InventoryPage } from "@/pages/InventoryPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { ImportPage } from "@/pages/ImportPage";
import { AiUsagePage } from "@/pages/AiUsagePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "entities", element: <EntitiesPage /> },
      { path: "budgets", element: <BudgetsPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "import", element: <ImportPage /> },
      { path: "ai-usage", element: <AiUsagePage /> },
    ],
  },
]);
