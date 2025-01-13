'use client'
import SearchInput from "@/components/ui/search-input/search-input";
import style from "./search-header.module.scss";
import Button from "@/components/ui/button/button";

export default function SearchHead() {

  function getDataFunction() {

  }
  return (
    <div className={style.cardSplit}>
      <SearchInput />
      <Button variant="primary" onClick={getDataFunction} showIcon={true} path="/customer">
        Add
      </Button>
    </div>
  );
}
