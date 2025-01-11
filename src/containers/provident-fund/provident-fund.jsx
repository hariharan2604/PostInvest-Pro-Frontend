import Table from "@/components/ui/table/table";
import fundStyle from "./provident-fund.module.scss";
import ProgressBar from "@/components/ui/progressbar/progressbar";

export default function Fund() {
  const startDate = 'Jan 2010';
  const endDate = 'May 2030';
  return (
    <>
      <div className={fundStyle["fundGroup"]}>
        <div className={fundStyle["details"]}>
          <span>Name</span>
          <p>Aadhavan</p>
        </div>
        <div className={fundStyle["details"]}>
          <span>Id</span>
          <p>1646 6499 6442</p>
        </div>
        <div className={fundStyle["details"]}>
          <span>Folio No</span>
          <p>#000132596</p>
        </div>
        <div className={fundStyle["details"]}>
          <span>Premium</span>
          <p>₹2500.00,00</p>
        </div>
      </div>
      <div className={fundStyle["progressBard"]}>
        <ProgressBar startDate={startDate} endDate={endDate} />

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
