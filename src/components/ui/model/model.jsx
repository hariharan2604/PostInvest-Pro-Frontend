import styles from "./model.module.scss";
import Image from "next/image";
import CloseIcon from "../../../../public/images/close.svg";
import Button from "../button/button";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export const ModalHeader = ({ title, showButton, onClose, subTitle }) => {
  return (
    <div className={styles.modalHeader}>
      <div className={styles.textGroup}>
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </div>
      {showButton && (
        <Button className={styles.closeButton} onClick={onClose}>
          <Image src={CloseIcon} alt="Close" />
        </Button>
      )}
    </div>
  );
};

export const ModalContent = ({ children }) => {
  return <div className={styles.modalContent}>{children}</div>;
};

export const ModalFooter = ({ children }) => {
  return <div className={styles.modalFooter}>{children}</div>;
};
