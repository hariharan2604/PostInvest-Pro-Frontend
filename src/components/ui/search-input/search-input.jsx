import Searchinputstyle from "./search-input.module.scss";
import Image from 'next/image';
import Searchicon from "../../../../public/images/search-input.svg"


export default function SearchInput(){
    return(
        <>
        <div className={Searchinputstyle["input_search"]}>
            <Image src={Searchicon} alt="Search Icon" className={Searchinputstyle["searchicon"]}></Image>
   
        <input className={Searchinputstyle["input"]} type="search" placeholder="Search Customer" />
        </div>
        </>
    )
}