import AddFamily from "@/containers/add-family/add-family";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
export default function Family() {
  return (
    <>
      <Header title="Create Family Member" showLeftArrow="true" />

      <Layout>
        <AddFamily />
      </Layout>
    </>
  );
}
