'use client';
import { useRouter } from 'next/navigation';
import styles from '@/styles//not-found.module.scss';
import Button from '@/components/ui/button/button';
export default function NotFound() {
    const router = useRouter();

    return (
        <div className={`not-found-wrapper d-flex j-c-c a-i-c h-100`}>
            <div className={`${styles['not-found-container']} container`}>
                <div className={styles['not-found-content']}>
                    <h1 className={styles['not-found-code']}>404</h1>
                    <h2 className={styles['not-found-title']}>Page Not Found</h2>
                    <p className={styles['not-found-message']}>
                        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <div className={styles['not-found-button-wrapper']}>
                        <Button
                            className={styles['not-found-button']}
                            onClick={() => router.back()}
                            variant={"primary"}
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
