import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import SuccessModal from "@/components/ui/success-modal/success-modal";
import AddCustomer from "@/containers/add-customer/add-customer";

const CustomerAdd = () => {
  return (
    <>
      <Header title="Create Customer" showLeftArrow="true" navigate="/dashboard" />
      <Layout>
        <AddCustomer />
      </Layout>
    </>
  );
};

export default CustomerAdd;
