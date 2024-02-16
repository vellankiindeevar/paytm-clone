import { Appbar } from "@/components/ui/appbar"
import { Users } from "@/components/ui/users"
import { Balance } from "@/components/ui/balance"

function Dashboard() {
  return (

    <div className="p-10">
      <Appbar />
      <div className="mt-5">
        <Balance value={100000} />
        <Users />
        
      </div>
    </div>
  )
}

export default Dashboard
