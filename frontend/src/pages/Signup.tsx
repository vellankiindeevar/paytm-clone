import { useState, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios";


function Signup() {

  const navigate = useNavigate();
  type User = { firstName: string, lastName: string, username: string, password: string }
  const defaultUser: User = { firstName: "", lastName: "", username: "", password: "" }
  const [data, setData] = useState(defaultUser)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const Post = async () => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
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
            Signup
          </div>
          <div className="text-gray-500">
            Enter your infromation to create an account
          </div>
        </div>

        <div>
          <Label>Firstname</Label>
          <Input placeholder="Firstname" id="firstName" name="firstName" type="string" value={data.firstName} onChange={handleChange} />
        </div>
        <div>
          <Label >Lastname</Label>
          <Input placeholder="Lastname" id="lastName" name="lastName" type="string" value={data.lastName} onChange={handleChange} />
        </div>
        <div>
          <Label >Username</Label>
          <Input placeholder="Username" type="string" id="username" name="username" value={data.username} onChange={handleChange} />
        </div>

        <div>
          <Label >Password</Label>
          <Input placeholder="Password" type="password" id="password" name="password" value={data.password} onChange={handleChange} />
        </div>
        <Button onClick={Post}>Sign up</Button>

        <div className="text-gray-500 mx-auto flex flex-row gap-2">
          Already have an account? <div className="underline">Sign in</div>
        </div>
      </div>
    </div>
  )
}

export default Signup
