import axios from "axios";

async function useFetch(url:string){
    const token = sessionStorage.getItem('token') || null

    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    return (await axios.get(url, config)).data
}
async function usePost(url:string, body:any){
    const token = sessionStorage.getItem('token') || null

    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    return (await axios.post(url, body, config)).data
}
async function usePatch(url:any, body:any){
    const token = sessionStorage.getItem('token') || null

    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    return await axios.patch(url, body, config)
}
async function useDelete(url:any){
    const token = sessionStorage.getItem('token') || null

    const config = { headers: { 'Authorization': 'Bearer ' + token } }

    return await axios.delete(url, config)
}

export {useFetch, usePost, usePatch, useDelete}