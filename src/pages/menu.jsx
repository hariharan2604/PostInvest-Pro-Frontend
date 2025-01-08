import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Menu from "@/containers/menu/menu";

export default function Menus() {
    return (
        <>
            <Header title={'Menu'} notifyToIcon={true} />
            <Layout>
                <Menu profileName={'Agent Name'} profileId={'#ID00123'} />
            </Layout>
        </>
    )
}