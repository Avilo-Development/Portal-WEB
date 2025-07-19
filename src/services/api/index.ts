const url = 'http://localhost:3030'
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
        summary: (query:string) =>`${url}/finance/summary?${query}`,
        grouped: (props:string) => `${url}/finance/grouped?${props}`,
        update: (id:string) => `${url}/finance/${id}`,
    },
    comment: {
        create: `${url}/comment`,
        patch: (id: string) => `${url}/comment/${id}`
    },
    hcp: {
        customer: (id:string) => `${url}/housecalpro/customers/${id}`
    }
}