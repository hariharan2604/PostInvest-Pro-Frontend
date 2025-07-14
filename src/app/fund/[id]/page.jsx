import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Fund from "@/containers/provident-fund/provident-fund";
const Profile = async ({ params }) => {
  const { id } = await params;

  return (
    <>
      <Header title="Public Provident Fund" showLeftArrow="true" />
      <Layout>
        <Fund investmentId={id} />
      </Layout>
    </>
  );
};

export default Profile;
