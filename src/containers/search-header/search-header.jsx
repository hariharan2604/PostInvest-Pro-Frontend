'use client'
import SearchInput from "@/components/ui/search-input/search-input";
import style from "./search-header.module.scss";
import Button from "@/components/ui/button/button";

export default function SearchHead({ enableDropdown }) {

  function getDataFunction() {

  }
  return (
    <div className={style.cardSplit}>
      <SearchInput placeholder="Search Customer" fetchUrl='/api/customer/get-customer-list' enableDropdown={enableDropdown} />
      <Button variant="primary" onClick={getDataFunction} showIcon={true} path="/customer">
        Add
      </Button>
    </div>
  );
}
