
import Header from "@/components/Header/Header";
import Registration from "@/containers/registration/registration";
export default function Register() {
    return (
        <>
            <Header title='Agent Registration' showLeftArrow={false} navigate="/" footer={false} />
                <Registration />
        </>
    )
}