"use client"
import Table from "@/components/ui/table/table";
import fundStyle from "./provident-fund.module.scss";
import ProgressBar from "@/components/ui/progressbar/progressbar";
import { useTitle } from "@/contexts/TitleContext";
import React, { useEffect, useState } from "react";
import { formatToLocaleString } from "@/app/_utils/dateformatter";
import { fetchWithAuth } from "@/app/_utils/fetchWithAuth";

export default function Fund({ investmentId }) {
  const { setTitle } = useTitle();
  const [investmentDetail, setInvestmentDetail] = useState({});
  useEffect(() => {
    setTitle("Investment Details");
  });

  useEffect(() => {
    const fetchInvestmentData = async () => {
      try {
        const res = await fetchWithAuth(`/api/investment/get-investment-detail/${investmentId}`);
        if (!res) return;
        const { data } = await res.json();

        if (res.ok && data) {
          const startDate = new Date(data.investment_date);
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + parseInt(data.tenure));
          setInvestmentDetail({ ...data, startDate, endDate });
        }
      } catch (error) {
        console.error("❌ Failed to fetch investment", error);
      }
    };

    fetchInvestmentData();
  }, [investmentId]);

  return (
    <>
      <div className={fundStyle["fundGroup"]}>
        <div className={fundStyle["details"]}>
          <span>Name</span>
          <p>{investmentDetail.name}</p>
        </div>
        <div className={fundStyle["details"]}>
          <span>Scheme Name</span>
          <p>{investmentDetail.scheme_name}</p>
        </div>
        <div className={fundStyle["details"]}>
          <span>Account No</span>
          <p>{`# ${investmentDetail.investment_acc_no}`}</p>
        </div>
        <div className={fundStyle["details"]}>
          <span>Premium</span>
          <p>{`₹ ${investmentDetail.installment_amount}`}</p>
        </div>
        <div className={fundStyle["details"]}>
          <span>Investment Amount</span>
          <p>{`₹ ${investmentDetail.investment_amount}`}</p>
        </div>
      </div>
      <div className={fundStyle["progressBard"]}>
        <ProgressBar startDate={formatToLocaleString(investmentDetail.startDate)} endDate={formatToLocaleString(investmentDetail.endDate)} />

      </div>
      <div className={fundStyle["table"]}>
        <div className={fundStyle["tableHead"]}>
          <h3>Payment Report</h3>
        </div>
        <Table />
      </div>
    </>
  );
}
