import React from "react";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import RemittanView from "@/containers/remittan-view/remittan-view";
const Remittance = () => {

  return (
    <>
      <Header showLeftArrow={false} title="Remittance" navigate="/dashboard" notitficatoIcon={true} />
      <Layout>

        <RemittanView />
      </Layout>
    </>
  );
};

export default Remittance;
