import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import CustomerDetails from "@/containers/customer-details/customer-details";

const CustomerAdd = () => {
  return (
    <>
      <Header title="Aadhavaa" showLeftArrow="true" navigate="/profile" />
      <Layout>
        <CustomerDetails />
      </Layout>
    </>
  );
};

export default CustomerAdd;
