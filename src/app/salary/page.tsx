import Table from "@/components/table";

export default function Salary() {
    const header = ["Date","Technician","Total", "Hours", "Paid"]
    const data = [
        [new Date(), "Oleg", 3000, 80, true],
        [new Date(), "Yevhen", 3000, 80, true],
        [new Date(), "Dmytro", 3000, 80, true],
        [new Date(), "Oleksandr", 3000, 80, true],
        [new Date(), "Daniel", 3000, 80, true],
        [new Date(), "Miguel", 3000, 80, true],
    ]
    return <>
        <Table header={header} data={data} />
    </>
}