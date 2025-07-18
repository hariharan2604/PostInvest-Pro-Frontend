import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import CollectionPending from "@/containers/collection-pending/collection-pending";
import { Suspense } from "react";
const ReceiptAdd =  () => {

    return (
        <>
            <Header showLeftArrow="true" />
            <Layout>
                <Suspense fallback={<div>Loading...</div>}>
                    <CollectionPending />
                </Suspense>
            </Layout>
        </>
    );
};

export default ReceiptAdd;
