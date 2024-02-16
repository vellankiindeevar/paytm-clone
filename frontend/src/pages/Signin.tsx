import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Signin() {

  const navigate = useNavigate();
  type creds = { username: string, password: string }
  const defaultCreds: creds = { username: "", password: "" }
  const [data, setData] = useState(defaultCreds)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const Post = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
      ...data
    });
    localStorage.setItem("token", response.data.token)
    navigate("/dashboard")
  }



  return (

    <div className="h-screen flex justify-center items-center">
      <div className="w-[400px] flex flex-col gap-5 border p-10 rounded-xl">

        <div className="text-center">
          <div className="text-4xl font-bold mb-2 ">
            Signin
          </div>
          <div className="text-gray-500">
            Enter your credentials to access your account
          </div>
        </div>

        <div>
          <Label >Username</Label>
          <Input placeholder="Username" type="string" id="username" name="username" value={data.username} onChange={handleChange} />
        </div>

        <div>
          <Label >Password</Label>
          <Input placeholder="Password" type="password" id="password" name="password" value={data.password} onChange={handleChange} />
        </div>
        <Button onClick={Post}>Sign in</Button>

        <div className="text-gray-500 mx-auto flex flex-row gap-2">
          Don't have an account?<div className="underline">Sign up</div>
        </div>
      </div>
    </div>
  )
}

export default Signin
