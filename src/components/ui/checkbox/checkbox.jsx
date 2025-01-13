
"use client"
import Input from "../input/input";
import styleCheck from "./checkbox.module.scss";


export default function Checkbox({labelVale}){
    return (
        <>
        <div className={styleCheck["checkbox"]}>
            <Input type="checkbox"></Input>
            <label >{labelVale}</label>
        </div>
        </>
    )
}