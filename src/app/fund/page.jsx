import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Fund from "@/containers/provident-fund/provident-fund";
const Profile = () => {
  return (
    <>
      <Header title="Public Provident Fund" showLeftArrow="true" navigate="/customer-info" />
      <Layout>
        <Fund />
      </Layout>
    </>
  );
};

export default Profile;
