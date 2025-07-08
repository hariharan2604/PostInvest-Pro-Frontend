import AddFamily from "@/containers/add-family/add-family";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import { Suspense } from "react";
export default function Family() {
  return (
    <>
      <Header title="Create Family Member" showLeftArrow="true" />

      <Layout>
        <Suspense fallback={<div>Loading..</div>}>
          <AddFamily />
        </Suspense>
      </Layout>
    </>
  );
}
