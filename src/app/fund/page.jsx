import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Fund from "@/containers/provident-fund/provident-fund";
const Profile = () => {
  return (
    <>
      <Header title="Public Provident Fund" showLeftArrow="true" />
      <Layout>
        <Fund />
      </Layout>
    </>
  );
};

export default Profile;
