import cardStyle from './card.module.scss';
import Dashcard from '@/components/ui/dashboard-card/dashboard-card';

export default function CardData() {
    return (
        <>
            <div className={cardStyle['card-split']}>

                <Dashcard totalValue="20 Iteams" SubValue="1 to 15" variant="dayBetween" />
                <Dashcard totalValue="₹50,000.00" SubValue="Cash on Hand" variant="cashHold" />

            </div>
        </>
    )

}