"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import CardData from "@/containers/card/card";
import CheckUser from "@/containers/checkUser/CheckUser";
import SearchHead from "@/containers/search-header/search-header";
import { useTitle } from "@/contexts/TitleContext";

const Dashboard = ({ name }) => {
    const { setTitle } = useTitle();
    useEffect(() => {
        setTitle(`Welcome, ${name}`);
    }, [name, setTitle]);
    
    return (
        <>
            <Header notifyToIcon={true} />
            <Layout>
                <SearchHead  enableDropdown={true} showRouteOptions={true} allowEmptySearch={true} />
                <CardData />
                <CheckUser />
            </Layout>
        </>
    );
};

export default Dashboard;
