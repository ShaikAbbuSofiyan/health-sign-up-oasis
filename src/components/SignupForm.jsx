
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Phone, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }).refine((val) => /^\d+$/.test(val), {
    message: "Phone number should only contain digits.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).refine((val) => {
    return /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val);
  }, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, and one number."
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

const SignupForm = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    toast({
      title: "Account created successfully!",
      description: "Welcome to HealthCare. Please check your email to verify your account.",
    });
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-green-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-700">Create Account</h2>
        <p className="text-green-600/70 mt-2">Join our healthcare platform to access premium services</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800">Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input 
                      placeholder="johndoe" 
                      className="pl-10 border-green-200 focus-visible:ring-green-500" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800">Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input 
                      placeholder="1234567890" 
                      className="pl-10 border-green-200 focus-visible:ring-green-500" 
                      type="tel"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input 
                      placeholder="john.doe@example.com" 
                      className="pl-10 border-green-200 focus-visible:ring-green-500" 
                      type="email"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      className="pl-10 pr-10 border-green-200 focus-visible:ring-green-500" 
                      {...field} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-green-500 hover:text-green-700"
                    >
                      {showPassword ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </button>
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-green-600/80">
                  Password must be at least 8 characters with uppercase, lowercase, and numbers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input 
                      type={showConfirmPassword ? "text" : "password"} 
                      className="pl-10 pr-10 border-green-200 focus-visible:ring-green-500" 
                      {...field} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-green-500 hover:text-green-700"
                    >
                      {showConfirmPassword ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Check className="mr-2 h-4 w-4" /> Create Account
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <p className="text-green-600/80">
          Already have an account?{" "}
          <a href="#" className="text-green-700 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
