
import Header from "@/components/Header/Header";
import Registration from "@/containers/registration/registration";
export default function Register() {
    return (
        <>
            <Header title='Agent Registration' disableMobileMenu={true} showLeftArrow={false} />
                <Registration />
        </>
    )
}