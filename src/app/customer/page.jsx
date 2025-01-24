import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import InfoModal from "@/components/ui/info-modal/info-modal";
import AddCustomer from "@/containers/add-customer/add-customer";

const CustomerAdd = () => {
  return (
    <>
      <Header title="Create Customer" showLeftArrow="true" navigate="/profile" />
      <Layout>
        <AddCustomer />
      </Layout>
    </>
  );
};

export default CustomerAdd;
