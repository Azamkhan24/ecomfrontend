import React, { useContext, useEffect, useState } from 'react'
import loginIcons from '../assest/signin2.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails } = useContext(Context);


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            navigate('/')
            fetchUserDetails()
        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }

    }


    return (
        <section id='login'>
            <div className='mx-auto container h-[89.6vh] flex items-center justify-center'>

                <div className=' p-5 w-full max-w-sm mx-auto '
                    style={{
                        background: 'rgba(255, 255, 255, 0.38)',
                        borderRadius: '10px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(5.9px)',
                        WebkitBackdropFilter: 'blur(5.9px)', 
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}

                >
                    <div className='w-28 h-28 mx-auto rounded-full overflow-hidden'>
                        <img src={loginIcons} alt='login icons' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-200 p-2 rounded-lg'>
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent rounded-lg' />
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-200 p-2 flex rounded-lg'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent rounded-lg' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash />
                                            )
                                                :
                                                (
                                                    <FaEye />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-gray-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-lg hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>
                </div>


            </div>
        </section>
    )
}

export default Login