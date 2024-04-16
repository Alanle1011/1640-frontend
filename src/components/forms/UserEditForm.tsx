import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {UserValidation} from "@/lib/validation";
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
    useToast
} from "@/components/ui";
import {Faculty} from "@/types";

const UserEditForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {toast} = useToast()
    const [facultyList, setFacultyList] = useState<Faculty[]>();
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || ""

    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            name: "",
            oldPassword: "",
            newPassword: "",
            email: "",
        }
    });

    // 1. GET User and Faculty
    useEffect(() => {
        fetch(`${VITE_WEBSERVICE_URL}/user/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
                form.setValue("name", response.name);
                form.setValue("email", response.email);
                form.setValue("userRole", response.userRole);
                form.setValue("faculty", response.faculty);
            })
            .catch(error => console.error("Error fetching:", error));

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

    }, [id, form]);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof UserValidation>) {
        try {
            updateUser(values);
            toast({title: "Successfully edited!"});
            navigate(-1);
        } catch (error) {
            console.error("Error editing:", error);
        }
    }

    async function updateUser(data: any) {
        let userBody;
        debugger
        if (data.newPassword) {
            // Update with password
            if (data.userRole === "STUDENT") {
                userBody = {
                    name: data.name,
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    email: data.email,
                    userRole: data.userRole,
                    faculty: data.faculty
                };
            } else {
                userBody = {
                    name: data.name,
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    email: data.email,
                    userRole: data.userRole,
                };
            }
        } else {
            // Update without password
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
        }

        // Update Contribution
        const responseUser = await fetch(`${VITE_WEBSERVICE_URL}/user/update/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userBody), // body data type must match "Content-Type" header
        });
        const user = await responseUser?.json();


        toast({
            description: "User was successfully edited!",
        })
        return user;
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
                    name="oldPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Old Password</FormLabel>
                            <FormControl>
                                <Input type="input" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">New Password</FormLabel>
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
                            <FormLabel className="shad-form_label">Title</FormLabel>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.value ? field.value : "Select a faculty"}/>
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
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )

};
export default UserEditForm;