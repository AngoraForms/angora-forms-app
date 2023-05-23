'use client'
import { useForm } from 'react-hook-form';

export default function Login() {

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      email:"",
      password:""
    }
  });

  return (
    <div className = "min-h-screen grid place-content-center">
      <form onSubmit = {handleSubmit((data) => {
        console.log(data)
      })}>
        <input {...register("email", {required: 'email is required'})} className = "box-border h-25 w-40 p-4 border-4 hover:box-content" autoFocus placeholder = "Name"/>
        <p>{errors.email?.message}</p>
        <input {...register("password", {required: 'password is required'})} className = "box-border h-25 w-40 p-4 border-4 hover:box-content" placeholder = "Password"/>
        <p>{errors.password?.message}</p>
        <input type = "submit"/>
      </form>
    </div>
  )
}

