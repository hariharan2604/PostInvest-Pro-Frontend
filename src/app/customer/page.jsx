import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import AddCustomer from "@/containers/add-customer/add-customer";
import { Suspense } from "react";
const CustomerAdd = () => {
  return (
    <>
      <Header title="Customer Registration" showLeftArrow="true" />
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <AddCustomer />
        </Suspense>
      </Layout>
    </>
  );
};

export default CustomerAdd;
