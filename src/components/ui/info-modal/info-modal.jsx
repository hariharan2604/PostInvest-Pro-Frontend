import { ModalHeader, ModalContent, ModalFooter, Modal } from "../modal/modal";
import success from '../../../../public/images/success.svg'
import error from '../../../../public/images/error.svg'
import Image from "next/image";
import successStyles from './info-modal.module.scss'
import Button from "@/components/ui/button/button";

export default function InfoModal({ showButton = true, errorStatus = false, Title, Content, onClose, onOpen, children }) {

    return (
        <>
            <Modal isOpen={onOpen}>
                <ModalHeader showButton={showButton} onClose={onClose} />
                <ModalContent>
                    <div className={`${successStyles['info-modal']} ${errorStatus ? 'error' : 'success'}`}>
                        <Image src={errorStatus ? error : success} alt='success' />
                        <h3>{Title}</h3>
                        <p>{Content}</p>
                    </div>
                </ModalContent>
                <ModalFooter>
                    {children}
                </ModalFooter>
            </Modal>
        </>
    )
}