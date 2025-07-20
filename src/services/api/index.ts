const url = process.env.NEXT_PUBLIC_API
export const endpoints = {
    user: {
        create: `${url}/user`,
        account: `${url}/user/account`,
        login: url+'/user/login'
    },
    finance: {
        getAll: (props:string) => `${url}/finance?${props}`,
        getOne: (id:string) => `${url}/finance/${id}`,
        customers: (props:string) => `${url}/finance/customers?${props}`,
        responsible: (id:string) => `${url}/finance/responsible/${id}`,
        invoice: (active:boolean) => `${url}/finance/invoice/${active}`,
        summary: (query:string) =>`${url}/finance/summary?${query}`,
        grouped: (props:string) => `${url}/finance/grouped?${props}`,
        update: (id:string) => `${url}/finance/${id}`,
    },
    comment: {
        create: `${url}/comment`,
        patch: (id: string) => `${url}/comment/${id}`,
        remove: (id: string) => `${url}/comment/${id}`
    },
    customer: {
        getAll: `${url}/customer`,
        patch: (id: string) => `${url}/customer/${id}`,
        remove: (id: string) => `${url}/customer/${id}`
    },
}