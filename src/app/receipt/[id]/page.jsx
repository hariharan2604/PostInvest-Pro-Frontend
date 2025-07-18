import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import CollectionPending from "@/containers/collection-pending/collection-pending";
import { Suspense } from "react";
const ReceiptAdd = async ({ params }) => {
    const { id } = await params;

    return (
        <>
            <Header showLeftArrow="true" />
            <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                    <CollectionPending customer_id={id} />
                </Suspense>
            </Layout>
        </>
    );
};

export default ReceiptAdd;
