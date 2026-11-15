"use client";
import { useState } from "react";
import { authClient } from "../lib/auth-client"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password Validation (অ্যাসাইনমেন্টের রিকোয়ারমেন্ট)
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return toast.error("Password must contain at least one lowercase letter.");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return toast.error("Password must contain at least one uppercase letter.");
    }

    const toastId = toast.loading("Registering your account...");
    
    try {
      const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: photo, 
      });

      if (error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.success("Registration Successful!", { id: toastId });
        router.push("/login"); // সফল হলে লগইন পেজে নিয়ে যাবে
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="card w-full max-w-md shadow-2xl bg-base-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label"><span className="label-text font-semibold">Name</span></label>
            <input type="text" placeholder="Your Name" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="label"><span className="label-text font-semibold">Email</span></label>
            <input type="email" placeholder="Email Address" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label"><span className="label-text font-semibold">Photo URL</span></label>
            <input type="url" placeholder="Your Photo Link" className="input input-bordered w-full" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
          </div>
          <div>
            <label className="label"><span className="label-text font-semibold">Password</span></label>
            <input type="password" placeholder="Password" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-neutral w-full mt-6">Register</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}