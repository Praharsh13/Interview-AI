"use client"
import FormField from './FormInput'
import { updateProfile } from '@/lib/actions/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm,FormProvider } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
interface User{
    id:string,
    name:string,
    email:string,
    
}
interface UpdateFormProps {
    user: User
  }

const schema=z.object({
    name:z.string().min(3),
    email:z.string().email(),
    password:z.string().min(4)

})  

type FormData= z.infer<typeof schema>
  
const UpdateForm = ({user}:UpdateFormProps) => {

    const form=
    useForm<FormData>({
        resolver:zodResolver(schema),
        defaultValues:{
            name:user.name,
            email:user.email,
            password:''
        }
    })
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
      } = form
    

    const onSubmit= async(data:FormData)=>{
        try{
            console.log(data)
            const res=await updateProfile({
                id:user.id,
                name:data.name,
                email:data.email,
                password:data.password
            })

            if(res.success){
                toast.success('Profile Updated Successfully')
            }
            else{
                toast.error("something went wrong")
            }
        }catch(e){

            toast.error('Something went wrong')
            console.error(e)

        }
    }


  return (
    <FormProvider {...form}>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
    <FormField
      control={control}
      name="name"
      label="Full Name"
      placeholder="Enter your name"
    />

    <FormField
      control={control}
      name="email"
      label="Email Address"
      placeholder="you@example.com"
      type="email"
    />

    <FormField
      control={control}
      name="password"
      label="Password (optional)"
      placeholder="••••••••"
      type="password"
    />

    <button
      type="submit"
      disabled={isSubmitting}
      className="btn btn-primary w-full"
    >
      {isSubmitting ? 'Updating...' : 'Update Profile'}
    </button>
  </form>
  </FormProvider>
  )
}

export default UpdateForm