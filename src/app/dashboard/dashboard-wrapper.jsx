import { cookies } from "next/headers";
import Dashboard from "./Dashboard";

const DashboardWrapper = async () => {
    const cookieStore = await cookies();
    const userName = cookieStore.get("agentName")?.value || "Guest";

    return <Dashboard name={userName} />;
};

export default DashboardWrapper;
