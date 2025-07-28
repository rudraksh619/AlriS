"use client";

import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const formSchema = z.object({
  name : z.string().min(1,{message:"name is require"}),
  email: z.string().email(),
  password: z.string().min(1, { message: "password is required" }),
  confirmPassword : z.string().min(1,{message : "Password is required"})
}).refine((data:any) => data.password === data.confirmPassword,{
    message : "Password don't match",
    path : ["confirmPassword"]
})

export const SignUpView = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const[ispending,setispending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name : "",
      email: "",
      password: "",
      confirmPassword : ""
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {

    setispending(true);
    setError(null);

    authClient.signUp.email(
      {
        name : data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
            setispending(false)
          router.push("/");

        },

        onError: ({ error }) => {
            setispending(false)
          setError(error.message);
        },
      }
      
    );
    
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid md:grid-cols-2 p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Let&apos;s get Started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create Your Account
                  </p>
                </div>

                <div className="grid gap-3">

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="rudraksh_619"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="abc@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}

                <Button 
                disabled = {ispending}
                type="submit" className="w-full">
                  Sign-up
                </Button>

                <div
                  className="after:border-border relative text-center text-sm after:absolute
                                after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                >
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button disabled = {ispending} variant="outline" type="button" className="w-full">
                    Google
                  </Button>
                  <Button disabled = {ispending} variant="outline" type="button" className="w-full">
                    Git Hub
                  </Button>
                </div>

                <div>
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="underline underline-offset-4"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div
            className="bg-radial from-green-700 to-green-900
                          relative hidden md:flex flex-col gap-y-4 justify-center items-center p-3"
          >
            <img
              src="/logo.svg"
              alt="logo image"
              className="h-[92px] w-[92px]"
            />
            <p className="text-2xl font-semibold text-white">AlRiS</p>
          </div>
        </CardContent>
      </Card>

      <div
        className="text-muted-foreground *:[a]:hover:text-primary
            text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
      >
        By clicking continue , you agree to our{" "}
        <a href="#">Terms of Services</a> and
        <a href="#"> Privacy Policy</a>
      </div>
    </div>
  );
};
