'use client'
import SearchInput from "@/components/ui/search-input/search-input";
import style from "./search-header.module.scss";
import Button from "@/components/ui/button/button";
import { useRouter } from "next/navigation";
export default function SearchHead({ enableDropdown, navigatePath }) {
  const router = useRouter();
  const routePath = (customerId) => {
    router.push(`${navigatePath}/${customerId}`);
  }

  return (
    <div className={style.cardSplit}>
      <SearchInput placeholder="Search Customer" fetchUrl='/api/customer/get-customer-list' enableDropdown={enableDropdown} onSelect={routePath} />
      <Button variant="primary" showIcon={true} path="/customer">
        Add
      </Button>
    </div>
  );
}


