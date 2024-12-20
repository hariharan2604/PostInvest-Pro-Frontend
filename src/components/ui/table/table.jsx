import styles from './table.module.scss'

export default function Table() {
    const tableHeader = ['SNo', 'Due Date', 'Status']
    const tableDate = [
        {
            sno: '01',
            dueDate: '01/01/2020',
            status: 'Paid'
        },
        {
            sno: '02',
            dueDate: '01/01/2020',
            status: 'Paid'
        },
        {
            sno: '03',
            dueDate: '01/01/2020',
            status: 'Paid'
        },
        {
            sno: '04',
            dueDate: '01/01/2020',
            status: 'Paid'
        },
        {
            sno: '05',
            dueDate: '01/01/2020',
            status: '-'
        },
        {
            sno: '06',
            dueDate: '01/01/2020',
            status: '-'
        },
        {
            sno: '07',
            dueDate: '01/01/2020',
            status: '-'
        },
        {
            sno: '08',
            dueDate: '01/01/2020',
            status: '-'
        },
        {
            sno: '09',
            dueDate: '01/01/2020',
            status: '-'
        },
        {
            sno: '10',
            dueDate: '01/01/2020',
            status: '-'
        },

    ]
    return (
        <div className={styles.table}>

            <table className={styles['table-data']}>
                <thead>
                    <tr>
                        {tableHeader.map((header, index) =>
                            <th key={index}>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {tableDate.map((item, index) =>
                        <tr key={index}>
                            <td>{item.sno}</td>
                            <td>{item.dueDate}</td>
                            <td style={{ color: item.status === 'Paid' ? '#01A726' : '#000000' }}>{item.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}