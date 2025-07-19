'use client'

import { endpoints } from "@/services/api"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function Login() {
    const emailRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)
    const router = useRouter()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const data = {
            username: emailRef.current.value,
            password: passwordRef.current.value
        }
        const response = await axios.post(endpoints.user.login, data, { headers: { 'Content-Type': "application/json" } })
        if (response.status !== 200) {
            console.log(response.status)
            return
        }
        sessionStorage.setItem('token', response.data.token)
        router.push('/finance')
    }
    return <div className="w-full h-screen flex justify-center items-center ">
        <div className="flex lg:flex-row lg:gap-15 flex-col gap-6 w-full h-full items-center justify-center">
            <div>
                <img
                    alt="Ardan Electric AVILO Avilo"
                    src="/avilo.png"
                    className="lg:w-[300px] w-32 rounded-full lg:rounded-lg"
                />
            </div>
            <form onSubmit={handleLogin}>
                <div className="flex gap-6 flex-col lg:bg-white lg:p-10 lg:shadow-2xl lg:rounded-lg">
                    <div className="flex flex-col w-full">

                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <input ref={emailRef} id="email" name="email" type="email" autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6" />
                            </div>
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        className="inline-flex cursor-pointer w-full justify-center rounded-md bg-[#011f35] duration-300 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[#011f35bd]"
                    />
                </div>
            </form>
        </div>
    </div>
}