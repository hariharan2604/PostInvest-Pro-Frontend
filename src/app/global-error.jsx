'use client';

import styles from '@/styles/global-error.module.scss';
import Button from '@/components/ui/button/button';
import { useRouter } from 'next/navigation';
export default function GlobalError({ error, reset }) {
    const router = useRouter();
    return (
        <html>
            <body>
                <div className={`global-error-wrapper`}>
                    <div className={`${styles['global-error-container']} container`}>
                        <div className={styles['global-error-content']}>
                            <h1 className={styles['global-error-title']}>Something went wrong</h1>
                            <p className={styles['global-error-message']}>
                                {error?.message || 'An unexpected error occurred.'}
                            </p>
                            <div className={styles['global-error-button-wrapper']}>
                                <Button variant={"primary"} className={styles['global-error-button']} onClick={() => router.push('/')}>
                                    Go Home
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
