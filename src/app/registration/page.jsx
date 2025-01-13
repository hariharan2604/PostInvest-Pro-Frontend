
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Registration from "@/containers/registration/registration";

export default function Register() {
    return (
        <>
            <Header title='Agent Registration' showLeftArrow={true} navigate="/" />
            <Layout>
                <Registration />
            </Layout>
        </>
    )
}