'use client'

import { useData } from "@/hooks/contexts/global.context"
import { useFetch, usePost } from "@/hooks/useFetch"
import { endpoints } from "@/services/api"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export default function Login() {
    const [error, setError] = useState<any>({ message: '', status: false })
    const [signup, setSignup] = useState(false)
    const emailRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)
    const confirmPasswordRef = useRef<any>(null)
    const router = useRouter()

    const { setToken, setAccount } = useData()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const data = {
            username: emailRef.current.value,
            password: passwordRef.current.value
        }
        try {
            const response = await axios.post(endpoints.user.login, data, { headers: { 'Content-Type': "application/json" } })
            if (response.status !== 200) {
                return
            }
            sessionStorage.setItem('token', response.data.token)
            setToken(response.data.token)
            setAccount(response.data)
            router.push('/finance')
        } catch (err: any) {
            setError({
                message: err.message,
                status: true
            })
        }
    }
    const handleSignup = async (e: any) => {
        e.preventDefault()
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError({
                message: 'Password does not match',
                status: true
            })
            return;
        }
        try {
            const employee = (await useFetch(endpoints.hcp.employees)).employees.filter((empl: any) => empl.email === emailRef.current.value)[0]
            if (!employee) {
                setError({
                    message: 'Employee is not in CRM',
                    status: true
                })
                return
            }
            const data = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                picture: employee.avatar_url,
                role: employee.role,
                name: `${employee.first_name} ${employee.last_name}`
            }
            const response = await usePost(endpoints.user.create, data)
            sessionStorage.setItem('token', response.token)
            setToken(response.token)
            setAccount(response.user)
            router.push('/finance')
        } catch (err: any) {
            setError({
                message: err.message,
                status: true
            })
        }
    }
    return <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="flex lg:flex-row lg:gap-15 flex-col gap-6 w-full h-full items-center justify-center">
            <div>
                <img
                    alt="Ardan Electric AVILO Avilo"
                    src="/avilo.png"
                    className="lg:w-[300px] w-32 rounded-full lg:rounded-lg"
                />
            </div>
            {!signup ? <form onSubmit={handleLogin}>
                <div className="flex gap-6 flex-col lg:bg-white lg:p-10 lg:shadow-2xl lg:rounded-lg">
                    <h1 className="font-bold text-3xl font-mono">Login</h1>
                    <div className="flex flex-col w-full gap-2">

                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <input ref={emailRef} id="email" name="email" type="email" autoComplete="email"
                                    className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')} />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password"
                                    className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')}
                                />
                            </div>
                        </div>
                        <button type="button" onClick={() => setSignup(true)} className="underline underline-offset-2 font-light text-sm hover:text-[#011f35bd] duration-200">Create an account</button>
                    </div>
                    {error.status && <span className="font-light text-sm text-red-800">{error.message}</span>}
                    <input
                        type="submit"
                        value="Login"
                        className="inline-flex cursor-pointer w-full justify-center rounded-md bg-[#011f35] duration-300 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#011f35bd]"
                    />
                </div>
            </form>
                :
                <form onSubmit={handleSignup}>
                    <div className="flex gap-6 flex-col lg:bg-white lg:p-10 lg:shadow-2xl lg:rounded-lg">
                        <h1 className="font-bold text-3xl font-mono">Sign Up</h1>
                        <div className="flex flex-col w-full gap-2">

                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <input ref={emailRef} id="email" name="email" type="email" autoComplete="email"
                                        className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')} />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password"
                                        className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label htmlFor="cpassword" className="block text-sm/6 font-medium text-gray-900">
                                        Confirm password
                                    </label>
                                    <input ref={confirmPasswordRef} id="cpassword" name="cpassword" type="password" autoComplete="current-password"
                                        className={"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')}
                                    />
                                </div>
                            </div>
                            <button type="button" onClick={() => setSignup(false)} className="underline underline-offset-2 font-light text-sm hover:text-[#011f35bd] duration-200">Already have an account</button>
                        </div>
                        {error.status && <span className="font-light text-sm text-red-800">{error.message}</span>}
                        <input
                            type="submit"
                            value="Login"
                            className="inline-flex cursor-pointer w-full justify-center rounded-md bg-[#011f35] duration-300 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#011f35bd]"
                        />
                    </div>
                </form>
            }
        </div>
    </div>
}