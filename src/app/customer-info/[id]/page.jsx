import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import CustomerDetails from "@/containers/customer-details/customer-details";

const CustomerAdd = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <Header title="Aadhavaa" showLeftArrow="true" />
      <Layout>
        <CustomerDetails customerId={id} />
      </Layout>
    </>
  );
};

export default CustomerAdd;
