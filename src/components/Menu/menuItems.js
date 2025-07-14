import Home from "@icons/home.svg";
import Remittance from "@icons/remittance.svg";
import User from "@icons/footer-user.svg";
import Inventory from "@icons/coin_black.svg";
import Investment from "@icons/investment.svg";

export const menuItems = [
    { path: "/dashboard", text: "Home", icon: Home },
    { path: "/remittance", text: "Remittance", icon: Remittance },
    { path: "/profile", text: "Customer", icon: User },
    { path: "/viewChequeLeaf", text: "Inventory", icon: Inventory },
    { path: "/fund", text: "Investment", icon: Investment },
];

export const isActiveRoute = (pathname, item) => {
    const isDashboardActive =
        item.path === "/dashboard" &&
        ["/viewMaturityDue", "/viewChequeLeaf"].includes(pathname);
    const isProfileActive =
        item.path === "/profile" &&
        (pathname.includes("customer") || pathname === "/family-members");
    const isInvestmentActive = item.path === "/fund" && (pathname.includes("fund") || pathname.includes("scheme"));
    return pathname === item.path || isDashboardActive || isProfileActive || isInvestmentActive;
};
