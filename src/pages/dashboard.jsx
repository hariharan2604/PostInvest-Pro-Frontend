import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import CardData from "@/containers/card/card";
import CheckUser from "@/containers/checkUser/CheckUser";
import SearchHead from "@/containers/search-header/search-header";
import React, { } from "react";
const Dashboard = () => {

  return (
    <>
      <Header title="Welcome to BM App" notitficatoIcon={true} navigate="/profile" />
      <Layout>
        <SearchHead />
        <CardData />
        <CheckUser />
      </Layout>
    </>
  );
};

export default Dashboard;
