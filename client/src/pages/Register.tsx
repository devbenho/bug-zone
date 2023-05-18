import React, { useState, FormEvent } from 'react'
import axios from 'axios'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

interface IFormData {
  username: string
  password: string
}

export const Register: React.FC<IFormData> = () => {
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
    // Page
    <div className="bg-[#042631] h-screen w-full flex flex-col justify-center items-center">
      {/* Main Container */}
      <div>
        <div className="box flex flex-col gap-8 w-full justify-center">
          <div className="title">
            <h1 className="text-[22px] font-bold text-[#137898]">Register</h1>
          </div>
          {/* Input(s) container*/}
          <div className="flex flex-col gap-5">
            <Input id="username" label="Username" />
            <Input id="email" label="Email" />
            <Input id="password" label="Password" />
            <Input id="bio" label="Bio" />
          </div>
          {/* Button(s) container*/}
          <div className="flex items-center gap-4">
            <Button label="Register" variant="solid" onClick={handleSubmit} size="md" />
            <p className="text-zinc-50">
              Already have an account?{' '}
              <a href="/login">
                <span className="text-[#137A9B]">Login</span>
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Sub-container */}
    </div>
  )
}
