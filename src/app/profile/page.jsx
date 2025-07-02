import React from "react";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import AllCustomer from "@/containers/all-customer/all-customer";
const profile = () => {
  return (
    <>
      <Header showLeftArrow={false} title="Customer List" navigate="/dashboard" notifyToIcon={true} />
      <Layout>
        <AllCustomer />
      </Layout>
    </>
  );
};

export default profile;
