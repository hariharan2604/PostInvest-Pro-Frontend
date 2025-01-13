"use client"
import { useState, Children, cloneElement } from 'react';
import Image from 'next/image';
import accordionStyle from './accordion.module.scss';
import downArrow from '@icons/down-arrow.svg';

const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className={accordionStyle.accordionContainer}>
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          isOpen: openIndex === index,
          onToggle: () => toggleAccordion(index),
        });
      })}
    </div>
  );
};

const AccordionItem = ({ header, children, isOpen, onToggle }) => (
  <div className={accordionStyle.accordion}>
    <div className={accordionStyle.accordionHeader} onClick={onToggle}>
      <span>{header}</span>
      <Image
        src={downArrow}
        alt="Toggle"
        className={isOpen ? accordionStyle.open : ''}
      />
    </div>
    {isOpen && <div className={accordionStyle.accordionInner}>{children}</div>}
  </div>
);

export { Accordion, AccordionItem };
