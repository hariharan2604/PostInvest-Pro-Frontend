"use client"
import { useState } from 'react'
import dropdownStyles from './dropdown.module.scss'
import Image from 'next/image';
import downArrow from '@icons/down-arrow.svg'
import close from '@icons/close.svg'
import check from '@icons/check.svg'
export default function Dropdown() {
    let options = ['Today', 'Week', 'This Month']
    const [isopen, setIsopen] = useState(false);

    const [selectedOption, setSelectedOption] = useState('Today');
    const toggleDropdown = () => {
        setIsopen(!isopen)
    }
    const handleSelect = (option) => {
        setSelectedOption(option.target.textContent);
        setIsopen(false);
    };
    const closeItem = () => {
        setIsopen(false)
    }
    return (
        <>
            <div className={dropdownStyles.dropdown} onClick={toggleDropdown}>
                <p>{selectedOption}</p>
                <Image src={downArrow} alt='down-arrow' />
            </div>
            {isopen && (
                <div className={dropdownStyles.overlay}>

                    <div className={dropdownStyles['dropdown-menu']}>
                        <div className={dropdownStyles['dropdown-menu-title']}>
                            <h4>Select Period</h4>
                            <p>You can choose any one of the option to filter</p>
                            <Image src={close} alt='close' onClick={closeItem} />
                        </div>
                        <ul>
                            {options.map((option, index) => (
                                <li key={index} onClick={handleSelect}>
                                    {option}
                                    {selectedOption === option && <Image src={check} alt='check' />}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            )}


        </>
    )
}