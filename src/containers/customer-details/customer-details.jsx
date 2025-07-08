"use client"
import detailsStyle from "./customer.module.scss";
import { Accordion, AccordionItem } from "@/components/ui/accordion/accordion";
import Profile from "@/components/ui/profile/profile";
import EditIcon from '@icons/edit.svg';
import Email from "@icons/email.svg";
import Cif from "@icons/cif.svg";
import DateIcon from "@icons/date_picker.svg";
import Location from "@icons/location.svg";
import Phone from "@icons/phone.svg";
import Image from "next/image";
import Button from "@/components/ui/button/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTitle } from "@/contexts/TitleContext";

export default function CustomerDetails({ customerId }) {
  const [customerData, setCustomerData] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [familymembers, setFamilyMembers] = useState([]);
  const [name, setName] = useState('');
  const { setTitle } = useTitle();
  useEffect(() => {
    setTitle("Customer Info");
  })

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const res = await fetch(`/api/customer/get-customer-detail/${customerId}`);
        const { data } = await res.json();

        if (res.ok && data) {
          const {
            name,
            cif,
            dob,
            mobile,
            email,
            address1,
            address2,
            area,
            city,
            state,
            zip,
            Investments,
            relatedCustomers
          } = data;
          const location = `${address1}, ${address2}, ${area}, ${city}, ${state} - ${zip}`;
          const dob_data = new Date(dob);
          setCustomerData([
            {
              icon: Cif,
              text: cif ? `#${cif}` : '-',
            },
            {
              icon: Phone,
              text: `+91 ${mobile}`,
            },
            {
              icon: Email,
              text: email,
            },
            {
              icon: DateIcon,
              text: `${String(dob_data.getDate()).padStart(2, '0')
                }/${String(dob_data.getMonth() + 1).padStart(2, '0')}/${dob_data.getFullYear()}`,
            },

            {
              icon: Location,
              text: location,
            }
          ]);
          setFamilyMembers(relatedCustomers);
          setInvestments(Investments);
          setName(name);
        }
      } catch (error) {
        console.error("❌ Failed to fetch customer", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);




  return (
    <>
      <div className={detailsStyle["customerGroup"]}>
        <div className={detailsStyle['accordionWrapper']}>
          <div className={detailsStyle['accordionItem']}>
            <Accordion>
              <AccordionItem header={
                <div className={detailsStyle["headerRow"]}>
                  <div className={detailsStyle["titleGroup"]}>
                    <span>Basic Info</span>
                    <Link href={`/customer?id=${customerId}`} className={detailsStyle["editIcon"]}>
                      <Image src={EditIcon} alt="Edit" width={18} height={18} />
                    </Link>
                  </div>
                </div>
              }>
                <div className={detailsStyle.detailsInfo}>
                  {customerData.map((detail, index) => (
                    <div key={index} className={detailsStyle.data}>
                      <div className="image">
                        <Image src={detail.icon} alt="Icon" />
                      </div>
                      <div className="details">
                        <p>{detail.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
          <div className={detailsStyle['accordionItem']}>
            <Accordion>
              <AccordionItem header={`Family Members (${familymembers.length})`}>
                <div className={detailsStyle["memberInfo"]}>
                  {familymembers.map((member, index) => (
                    <Link key={index} href={`/customer-info/${member.id}`} className={detailsStyle["details"]}>
                      <div className={detailsStyle["memberImage"]}>
                        <Profile variant="profileIcon" />
                      </div>
                      <div className={detailsStyle["textGroup"]}>
                        <p>{member.name}</p>
                        <span>{`${member.relation_type} | Investments ${member.investment_count}`}</span>
                      </div>
                    </Link>
                  ))}

                  <div className={detailsStyle["addMember"]}>
                    <Button variant="linkButton" path={`/family-members?customer_name=${encodeURIComponent(name)}&id=${encodeURIComponent(customerId)}`}>
                      Add Member
                    </Button>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {/* //scheme section */}
        <div className={detailsStyle["schemesInfo"]}>
          <div className={detailsStyle["head"]}>
            <p>Schemes ({investments.length})</p>
          </div>
          <div className={detailsStyle["innerContent"]}>
            {investments.map((investment, index) => (
              <Link href="/fund" key={index} passHref>
                <div className={detailsStyle["dataGroup"]}>
                  <div className={detailsStyle["profile_text_group"]}>
                    <Profile
                      variant="profileText"
                      profileText={investment.scheme_code}
                    />
                    <div className={detailsStyle["detail_info"]}>
                      <span>{investment.investment_acc_no}</span>
                      <p>{investment.scheme_name}</p>
                    </div>
                  </div>
                  <div className={detailsStyle["amountInfo"]}>
                    <span>Installment Amount</span>
                    <p>{`₹ ${investment.installment_amount}.00`}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={detailsStyle["addMember"]}>
            <Button variant="linkButton" path={`/scheme?id=${encodeURI(customerId)}&customer_name=${encodeURI(name)}`}>
              Add Scheme
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
