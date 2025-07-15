import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import AddScheme from "@/containers/add-scheme/add-scheme";
import { Suspense } from "react";
const Profile = () => {
  return (
    <>
      <Header showLeftArrow="true"/>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <AddScheme />
        </Suspense>
      </Layout>
    </>
  );
};

export default Profile;
