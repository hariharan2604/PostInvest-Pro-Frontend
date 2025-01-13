import Header from "@/components/Header/Header"
import Layout from "@/components/Layout/Layout"
import ViewChequeLeaf from "@/containers/view-cheque-leaf/view-cheque-leaf"


const ViewCheque = () => {
    return (
        <>
            <Header title="View Cheque Leaf" />
            <Layout>
                <ViewChequeLeaf />
            </Layout>
        </>
    )
}

export default ViewCheque