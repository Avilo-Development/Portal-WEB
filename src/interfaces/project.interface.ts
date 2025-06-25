export default interface IProject{
    id: string,
    name: string, 
    estimate: string,
    hcp_url: string,
    address: string,
    deadline_at: Date,
    send_at: Date,
    budget: number,
    quote: number,
    visit: boolean,
    status: {}
}