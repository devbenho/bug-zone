import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

interface IFormData {
  username: string
  password: string
}

export const Login: React.FC<IFormData> = () => {
  useState({})
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:4050/login')
      console.log(response.data) // Do something with the response

      // Clear the form inputs
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-[#042631] h-screen w-full flex flex-col justify-center items-center">
      <div className="box flex flex-col gap-8 w-[60%]">
        <div className="title">
          <h1 className="text-[22px] font-bold text-[#137898]">Login</h1>
        </div>
        <div className="flex flex-col gap-5">
          <Input id="username" label="Username or Email" />
          <Input id="password" label="Password" />
        </div>
        <div className="flex items-center gap-4">
          <Button label="Login" variant="solid" onClick={handleSubmit} size="md" />
          <p className="text-zinc-50">
            Don't have an account?{' '}
            <a href="/register">
              <span className="text-[#137A9B]">Create One</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
