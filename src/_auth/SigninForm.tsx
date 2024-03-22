import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useNavigate} from 'react-router-dom';

import {SigninValidation} from "@/lib/validation";
import { useAuth } from './AuthContext';


const SigninForm = () => {
    const navigate = useNavigate();
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || ""

    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
    });

    function onSubmit(values: z.infer<typeof SigninValidation>) {
        console.log(values);
        const response = saveLogin(values);
        console.log(response);
    }

    async function saveLogin(data: any) {
        debugger;
        const loginBody = {
            email: data.email,
            password: data.password,
        };
        const responseLogin = await fetch(`${VITE_WEBSERVICE_URL}/user/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginBody), // body data type must match "Content-Type" header
        });
        const login = await responseLogin?.json();
        if (login.status) {
            localStorage.setItem('loginStatus', JSON.stringify(login));
            navigate('/');
        }

    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img
                    src="/assets/images/logo.png"
                    width="300"
                    height="60%"
                    alt="logo"
                />

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-10">
                    Log in to your account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    Welcome back! Please enter your details.
                </p>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Email</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="shad-button_primary">
                        "Log in"
                    </Button>
                </form>
            </div>
        </Form>
    );
};

export default SigninForm;
