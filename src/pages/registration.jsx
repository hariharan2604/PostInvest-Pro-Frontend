
import Header from "@/components/Header/Header";
import Registration from "@/containers/registration/registration";

export default function Register() {
    return (
        <>
            <Header title='Broker Registration' showLeftArrow={true} navigate="/" />
            <Registration />
        </>
    )
}