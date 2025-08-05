'use client'

import { useData } from "@/hooks/contexts/global.context"
import { useFetch, usePost } from "@/hooks/useFetch"
import { endpoints } from "@/services/api"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { motion } from 'motion/react'

export default function Login() {
    const [error, setError] = useState<any>({ message: '', status: false })
    const [signup, setSignup] = useState(false)
    const [verification, setVerification] = useState(false)
    const [email, setEmail] = useState('')
    const emailRef = useRef<any>(null)
    const passwordRef = useRef<any>(null)
    const codeRef = useRef<any>(null)
    const confirmPasswordRef = useRef<any>(null)
    const router = useRouter()

    const { setToken, setAccount, setUsers } = useData()

    useEffect(() => {
        const t = sessionStorage.getItem('token') || null
        if(t) {return router.push('/')}
    }, [])

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setError({ message: '', status: false })
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
            setUsers(await useFetch(endpoints.user.create))
            router.push('/')
        } catch (err: any) {
            setError({
                message: err.message,
                status: true
            })
        }
    }
    const handleSignup = async (e: any) => {
        e.preventDefault()
        setError({ message: '', status: false })
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setError({
                message: 'Password does not match',
                status: true
            })
            return;
        }
        try {
            const UNDEFINED = process.env.NEXT_PUBLIC_UNDEFINED
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
                role_id: UNDEFINED,
                name: `${employee.first_name} ${employee.last_name}`
            }
            await usePost(endpoints.user.create, data)
            setVerification(true)
            setEmail(emailRef.current.value)
        } catch (err: any) {
            setError({
                message: err.message,
                status: true
            })
        }
    }
    const handleVerify = async (e: any) => {
        e.preventDefault()
        setError({ message: '', status: false })
        try {
            const code = codeRef.current.value
            const response = await usePost(endpoints.user.verify, { code, email })
            if (!response.error) {
                setVerification(false)
                setSignup(false)
                //router.push('/login')
            } else {
                setError({
                    message: response.message,
                    status: true
                })
            }
        } catch (err: any) {
            setError({
                message: err?.response?.data?.message,
                status: true
            })
        }
    }
    return <div className="w-full h-screen flex justify-center items-center flex-col fixed top-0 bg-gradient-to-tr from-[#011e34] from-10% via-[#032e4e] via-30% to-[#023358] to-90%">
        <div className="flex gap-5 flex-col w-full h-full items-center justify-center">
            <img
                alt="Ardan Electric AVILO Avilo"
                src="/logo.png"
                className="size-24"
            />
            {!signup ? <motion.form onSubmit={handleLogin} className="flex flex-col gap-2" initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}>
                <h1 className="font-normal text-lg font-sans text-gray-100">Login with your HCP email</h1>
                <div className="flex gap-6 flex-col bg-transparent text-gray-100">
                    <div className="flex flex-col w-full gap-3">

                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <input placeholder="Email Address" ref={emailRef} id="email" name="email" type="email" autoComplete="email"
                                    className={"block w-full rounded-md bg-transparent px-5 py-3 text-base text-gray-100 shadow shadow-blue-500 placeholder:text-gray-400 focus:outline-none hover:shadow-[#fcc101] focus:shadow-[#fcc101] sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')} />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <input placeholder="Password" ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password"
                                    className={"block w-full rounded-md bg-transparent px-5 py-3 text-base text-gray-100 shadow shadow-blue-500 placeholder:text-gray-400 focus:outline-none hover:shadow-[#fcc101] focus:shadow-[#fcc101] sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')}
                                />
                            </div>
                        </div>
                        <button type="button" onClick={() => setSignup(true)} className="underline underline-offset-2 font-light text-sm hover:text-[#82b7ddbd] cursor-pointer duration-200">Create an account</button>
                    </div>
                    {error.status && <span className="font-light text-sm text-red-800">{error.message}</span>}
                    <input
                        type="submit"
                        value="Login"
                        className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    />
                </div>
            </motion.form>
                :
                <>
                    {!verification ?
                        <motion.form onSubmit={handleSignup} className="flex flex-col gap-3 text-center" initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}>
                            <h1 className="font-normal text-lg font-sans text-gray-100">Sign Up</h1>
                            <div className="flex gap-6 flex-col bg-transparent text-gray-100">

                                <div className="flex flex-col gap-5 w-full">
                                    <div className="flex flex-col gap-2 w-full">
                                        <input ref={emailRef} id="email" name="email" type="email" autoComplete="email" placeholder="Email:"
                                            className={"block w-full rounded-md bg-transparent px-5 py-3 text-base text-gray-100 shadow shadow-blue-500 placeholder:text-gray-400 focus:outline-none hover:shadow-[#fcc101] focus:shadow-[#fcc101] sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')} />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <input ref={passwordRef} id="password" name="password" type="password" autoComplete="current-password" placeholder="Password:"
                                            className={"block w-full rounded-md bg-transparent px-5 py-3 text-base text-gray-100 shadow shadow-blue-500 placeholder:text-gray-400 focus:outline-none hover:shadow-[#fcc101] focus:shadow-[#fcc101] sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <input ref={confirmPasswordRef} id="cpassword" name="cpassword" type="password" autoComplete="current-password" placeholder="Confirm Password:"
                                            className={"block w-full rounded-md bg-transparent px-5 py-3 text-base text-gray-100 shadow shadow-blue-500 placeholder:text-gray-400 focus:outline-none hover:shadow-[#fcc101] focus:shadow-[#fcc101] sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')}
                                        />
                                    </div>
                                </div>
                                <button type="button" onClick={() => setSignup(false)} className="underline underline-offset-2 font-light text-sm hover:text-[#82b7ddbd] cursor-pointer duration-200">Already have an account</button>
                            </div>
                            {error.status && <span className="font-light text-sm text-red-800">{error.message}</span>}
                            <input
                                type="submit"
                                value="Sign Up"
                                className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            />
                        </motion.form>
                        :
                        <motion.form onSubmit={handleVerify}  className="flex flex-col gap-3 text-center" initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}>
                                <h1 className="font-normal text-lg font-sans text-gray-100">Verify your account</h1>
                                <div className="flex gap-6 flex-col bg-transparent text-gray-100">

                                    <div className="flex flex-col gap-5 w-full">
                                        <div className="flex flex-col gap-2 w-full">
                                            <input ref={codeRef} id="code" name="code" type="number" maxLength={4} autoComplete="text" placeholder="Verification Code"
                                                className={"block w-full rounded-md bg-transparent px-5 py-3 text-base text-gray-100 shadow shadow-blue-500 placeholder:text-gray-400 focus:outline-none hover:shadow-[#fcc101] focus:shadow-[#fcc101] sm:text-sm/6 " + (error.status && 'outline-none border-2 border-red-800 focus:outline-none')} />
                                        </div>
                                    </div>
                                </div>
                                {error.status && <span className="font-light text-sm text-red-800">{error.message}</span>}
                                <input
                                type="submit"
                                value="Verify"
                                className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            />
                        </motion.form>
                    }
                </>
            }
        </div>
    </div>
}