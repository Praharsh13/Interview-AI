import UpdateForm from '@/components/UpdateForm';
import { getCurrentUser } from '@/lib/actions/auth';
import React from 'react'


const page = async ({params}:RouteParams) => {
    const {id}=await params;
    const user=await getCurrentUser()
    if(user?.id!==id){
        return
    }
  return (
    <div>
      <UpdateForm user={user}/>
    </div>
  )
}

export default page