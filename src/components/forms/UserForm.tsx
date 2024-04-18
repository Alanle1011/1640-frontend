import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    useToast,
} from "@/components/ui";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateUserValidation} from "@/lib/validation";
import {useEffect, useState} from "react";
import {Faculty} from "@/types";


const UserForm = () => {
    const navigate = useNavigate();
    const {toast} = useToast()
    const [facultyList, setFacultyList] = useState<Faculty[]>();
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || ""
    // @ts-ignore


    useEffect(() => {

        fetch(`${VITE_WEBSERVICE_URL}/faculty`,
            {
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(response => {
                setFacultyList(response)
            })
            .catch(error => console.error("Error fetching:", error));
    }, []);
    const form = useForm<z.infer<typeof CreateUserValidation>>({
        resolver: zodResolver(CreateUserValidation),
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof CreateUserValidation>) {
        saveUser(values);
    }

    async function saveUser(data: any) {
        
        let userBody;
        if (data.userRole === "STUDENT") {
            userBody = {
                name: data.name,
                email: data.email,
                userRole: data.userRole,
                faculty: data.faculty
            };
        } else {
            userBody = {
                name: data.name,
                email: data.email,
                userRole: data.userRole,
            };
        }

        const responseContribution = await fetch(`${VITE_WEBSERVICE_URL}/user`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify(userBody), // body data type must match "Content-Type" header
        });

        toast({
            description: "Create User Success",
        })
        return responseContribution;
    }


    // Handler
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Name</FormLabel>
                            <FormControl>
                                <Input type="input" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Email</FormLabel>
                            <FormControl>
                                <Input type="input" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="userRole"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.value ? field.value : "Select a ROLE"}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                    <SelectItem value="MANAGER">MANAGER</SelectItem>
                                    <SelectItem value="COORDINATOR">COORDINATOR</SelectItem>
                                    <SelectItem value="STUDENT">STUDENT</SelectItem>
                                    <SelectItem value="GUEST">GUEST</SelectItem>
                                    <SelectItem value="NONE">NONE</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="faculty"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Faculty</FormLabel>
                            <Select onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={"Select a faculty"}/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {facultyList && facultyList.map((faculty, key) =>
                                        <SelectItem key={key}
                                                    value={faculty.facultyName}>{faculty.facultyName}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                        onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        // disabled={isLoadingCreate || isLoadingUpdate}
                    >
                        {/* {(isLoadingCreate || isLoadingUpdate) && <Loader />} */}
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    );
};
export default UserForm;
