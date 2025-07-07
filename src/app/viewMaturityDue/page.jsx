import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import ViewMaturityDue from "@/containers/view-maturity-due/view-maturity-due";

const ViewMaturity = () => {
    return (
        <>
            <Header title="View Maturity Due" showLeftArrow={true}/>
            <Layout>
                <ViewMaturityDue />
            </Layout>
        </>
    )
}

export default ViewMaturity;