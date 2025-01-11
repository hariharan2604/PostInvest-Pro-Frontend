import Input from "@/components/ui/input/input";
import detailsStyle from "./customer.module.scss";
import { Accordion, AccordionItem } from "@/components/ui/accordion/accordion";
import IconInput from "@/components/ui/icon-input/icon-input";
import Profile from "@/components/ui/profile/profile";

// image import
import Email from "@icons/email.svg";
import DateIcon from "@icons/date_picker.svg";
import Location from "@icons/location.svg";
import Phone from "@icons/phone.svg";
import Image from "next/image";
import Button from "@/components/ui/button/button";
import Link from "next/link";

export default function CustomerDetails() {
  const schemesData = [
    {
      id: "#000132596",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileText: "SIP",
    },
    {
      id: "#000132597",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileText: "MF",
    },
    {
      id: "#000132598",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileText: "SIP",
    },
  ];

  //user info data

  const detailsData = [
    {
      icon: Phone,
      text: "+91 987456123",
    },
    {
      icon: Email,
      text: "aadhavanks@gmail.com",
    },
    {
      icon: DateIcon,
      text: "01/Feb/1980",
    },
    {
      icon: Location,
      text: "No.5, 12th Main Road, Vijaya Nagar,. Velacheri, Chennai - 600 042",
    },
  ];
  return (
    <>
      <div className={detailsStyle["customerGroup"]}>
        <div className={detailsStyle['accordionWrapper']}>
          <div className={detailsStyle['accordionItem']}>
            <Accordion>
              <AccordionItem header="Basic Info">
                <div className={detailsStyle.detailsInfo}>
                  {detailsData.map((detail, index) => (
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
              <AccordionItem header="Family Member (2)">
                <div className={detailsStyle["memberInfo"]}>
                  <div className={detailsStyle["details"]}>
                    <div className={detailsStyle["memberImage"]}>
                      <Profile variant="profileIcon"></Profile>
                    </div>
                    <div className={detailsStyle["textGroup"]}>
                      <p>Rithika</p>
                      <span>Wife | 10-Feb-1985 Invest Scheme 1</span>
                    </div>
                  </div>
                  <div className={detailsStyle["addMember"]}>
                    <Button variant="linkButton" path="/family-members">
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
            <p>Schemes ({schemesData.length})</p>
          </div>
          <div className={detailsStyle["innerContent"]}>
            {schemesData.map((scheme, index) => (
              <Link href="/fund" key={index} passHref>
                <div className={detailsStyle["dataGroup"]}>
                  <div className={detailsStyle["profile_text_group"]}>
                    <Profile
                      variant="profileText"
                      profileText={scheme.profileText}
                    />
                    <div className={detailsStyle["detail_info"]}>
                      <span>{scheme.id}</span>
                      <p>{scheme.name}</p>
                    </div>
                  </div>
                  <div className={detailsStyle["amountInfo"]}>
                    <span>#Amount</span>
                    <p>{scheme.amount}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={detailsStyle["addMember"]}>
            <Button variant="linkButton" path="/scheme">
              Add Scheme
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
