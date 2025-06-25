export default interface ISalary {
    id: string,
    technician_id: string,
    hours: number
    gross: number,
    net: number,
    check: number,
    created_at: Date
}