import { Modal, ModalContent, ModalFooter } from "../model/model";
import success from '../../../../public/images/success.svg'
import Image from "next/image";
import styles from "@/components/ui/model/model.module.scss";
import successStyles from './success-modal.module.scss'
import Button from "@/components/ui/button/button";

export default function SuccessModal({ successTitle, successContent, variant, onClose, onOpen }) {

    return (
        <>
            <div className={`${styles.modal} ${styles.modelSecond}`}>
                <ModalContent>
                    <div className={successStyles['success-modal']}>
                        <Image src={success} alt='success' />
                        <h3>{successTitle}</h3>
                        <p>{successContent}</p>

                    </div>
                </ModalContent>
                {variant === 'withfooter' ? (
                    <ModalFooter>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button variant="primary" onClick={onClose}>Add More Cheque</Button>
                    </ModalFooter>
                ) : (<ModalFooter />)}
            </div>


        </>
    )
}