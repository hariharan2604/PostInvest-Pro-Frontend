"use client"
import { useState, useEffect } from 'react';
import styles from './progressbar.module.scss';

const calculateProgress = (startDate, endDate) => {

  
  
  console.log("🚀 ~ calculateProgress ~ startDate:", startDate);
  console.log("🚀 ~ calculateProgress ~ endDate:", endDate);

  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date();

  if (isNaN(start) || isNaN(end) || end <= start) return 0;

  const totalDuration = end - start;
  const elapsed = Math.max(0, current - start); 

  return Math.min(100, (elapsed / totalDuration) * 100);
};


const calculateRemainingMonths = (endDate, currentDate) => {
  const end = new Date(endDate);
  const current = new Date(currentDate);

  let months =
    (end.getFullYear() - current.getFullYear()) * 12 +
    (end.getMonth() - current.getMonth());

  if (end.getDate() < current.getDate()) {
    months -= 1;
  }

  return Math.max(0, months);
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
