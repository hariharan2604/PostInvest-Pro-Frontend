"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/ui/table/table";
import fundStyle from "./provident-fund.module.scss";
import ProgressBar from "@/components/ui/progressbar/progressbar";
import { useTitle } from "@/contexts/TitleContext";
import { formatToLocaleString } from "@/app/_utils/dateformatter";
import { fetchWithAuth } from "@/app/_utils/fetchWithAuth";

export default function Fund({ investmentId }) {
  const { setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(true);
  const [investmentDetail, setInvestmentDetail] = useState({});

  useEffect(() => {
    setTitle("Investment Details");
  }, [setTitle]);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestmentData();
  }, [investmentId]);

  if (isLoading || !investmentDetail.name) {
    return <div>Loading Investment Details...</div>;
  }

  const detailsList = [
    { label: "Name", value: investmentDetail.name },
    { label: "Scheme Name", value: investmentDetail.scheme_name },
    { label: "Account No", value: `# ${investmentDetail.investment_acc_no}` },
    { label: "Premium", value: `₹ ${investmentDetail.installment_amount}` },
    { label: "Investment Amount", value: `₹ ${investmentDetail.investment_amount}` },
  ];

  return (
    <>
      <div className={fundStyle["fundGroup"]}>
        {detailsList.map(({ label, value }) => (
          <div key={label} className={fundStyle["details"]}>
            <span>{label}</span>
            <p>{value}</p>
          </div>
        ))}
      </div>

      <div className={fundStyle["progressBar"]}>
        <ProgressBar
          startDate={
            investmentDetail.startDate
              ? formatToLocaleString(investmentDetail.startDate)
              : ""
          }
          endDate={
            investmentDetail.endDate
              ? formatToLocaleString(investmentDetail.endDate)
              : ""
          }
        />
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
