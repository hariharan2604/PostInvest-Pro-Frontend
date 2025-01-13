import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import AddScheme from "@/containers/add-scheme/add-scheme";
const Profile = () => {
  return (
    <>
      <Header title="Add Scheme" showLeftArrow="true" navigate="/customer-info" />
      <Layout>
        <AddScheme />
      </Layout>
    </>
  );
};

export default Profile;
