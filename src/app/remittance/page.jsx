import React from "react";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import RemittanceView from "@/containers/remittance-view/remittance-view";
const Remittance = () => {

  return (
    <>
      <Header showLeftArrow={true} title="Remittance" notifyToIcon={true} />
      <Layout>

        <RemittanceView />
      </Layout>
    </>
  );
};

export default Remittance;
