import { useState, useEffect } from 'react';
import styles from './progressbar.module.scss';

const calculateProgress = (startDate, endDate, currentDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date(currentDate);

  const totalDuration = end - start;
  const elapsed = current - start;

  return Math.min(100, (elapsed / totalDuration) * 100);
};

const calculateRemainingMonths = (endDate, currentDate) => {
  const end = new Date(endDate);
  const current = new Date(currentDate);

  const diff = end - current;
  const remainingMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

  return remainingMonths;
};

const ProgressBar = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);
  const [remainingMonths, setRemainingMonths] = useState(0);

  useEffect(() => {
    const currentDate = new Date();

    const progress = calculateProgress(startDate, endDate, currentDate);
    setProgress(progress);

    const remainingMonths = calculateRemainingMonths(endDate, currentDate);
    setRemainingMonths(remainingMonths);
  }, [startDate, endDate]);

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.dateLabels}>
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${progress}%`,
            backgroundColor: progress > 0 ? 'black' : 'gray',
          }}
        ></div>
      </div>
      <div className={styles.remainingMonths}>
        <p>{remainingMonths} months remaining</p>
      </div>
    </div>
  );
};

export default ProgressBar;
