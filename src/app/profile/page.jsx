import React from "react";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import AllCustomer from "@/containers/all-customer/all-customer";
const profile = () => {
  return (
    <>
      <Header showLeftArrow={true} title="Customer List" notifyToIcon={true} />
      <Layout>
        <AllCustomer />
      </Layout>
    </>
  );
};

export default profile;
