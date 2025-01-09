import success from '@icons/success.svg'
import check from '@icons/check.svg'
import Image from 'next/image'
import successStyles from '@/components/ui/info-modal/info-modal.module.scss'
import { ModalContent, ModalFooter } from '../modal/modal'
import styles from "@/components/ui/modal/modal.module.scss";
import customerStyle from './customer-verification-modal.module.scss'
import Button from "@/components/ui/button/button";


export default function CustomerVerification({ title, subtitle, customerName, customerContact, scheme }) {


    return (
        <>
            <div className={styles.modal}>
                <ModalContent>
                    <div className={successStyles['info-modal']}>
                        <Image src={success} alt='success' />
                        <h3>{title}</h3>
                        <p>{subtitle}</p>
                    </div>
                    <div className={customerStyle['customer-details']}>
                        <small>Customer Name <span>{customerName}</span></small>
                        <small><p>Mobile No <Image src={check} alt='Image' /></p><span className={customerStyle['verified']}>{customerContact}</span></small>
                        <small>Scheme <span>{scheme}</span></small>
                    </div>
                </ModalContent>
                <ModalFooter>
                    <Button variant="primary">Proceed</Button>

                </ModalFooter>
            </div>
        </>
    )
}