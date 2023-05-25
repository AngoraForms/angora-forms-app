'use client'

import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation'

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  const submitForm = async (formObj) => {
    try {
      const data = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formObj.username, email: formObj.email, password: formObj.password })
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen grid place-content-center">
        <p>signup</p>
        <form onSubmit={handleSubmit(submitForm)}>
          <input {...register("username", { required: 'username is required' })} className="box-border h-25 w-40 p-4 border-4 hover:box-content" autoFocus placeholder="Username" />
          <p>{errors.username?.message}</p>
          <input {...register("email", { required: 'email is required' })} className="box-border h-25 w-40 p-4 border-4 hover:box-content" placeholder="Email" />
          <p>{errors.email?.message}</p>
          <input {...register("password", { required: 'password is required' })} className="box-border h-25 w-40 p-4 border-4 hover:box-content" placeholder="Password" />
          <p>{errors.password?.message}</p>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
