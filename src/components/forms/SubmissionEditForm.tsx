import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {SubmissionEditValidation} from "@/lib/validation";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useToast,

} from "@/components/ui";
import { Calendar } from "@/components/ui/calendar"
import {format} from "date-fns";
import { CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";

const SubmissionEditForm = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {toast} = useToast();
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

    const form = useForm<z.infer<typeof SubmissionEditValidation>>({
        resolver: zodResolver(SubmissionEditValidation),
        defaultValues: {
            id: "",
            name: "",
        },
    });

    function formatDate(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero based
        const year = date.getFullYear();

        // Ensure day and month are formatted to have two digits
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;

        // Return formatted date string in 'dd/mm/yyyy' format
        return `${formattedDay}/${formattedMonth}/${year} 00:00`;
    }

    const getDate = (dateStr: string) => {
        debugger
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('/');
        const [hours, minutes] = timePart.split(':');

        // @ts-ignore
        return new Date(year, month - 1, day, hours, minutes);
    }

    // 1. GET Submission period
    useEffect(() => {
        fetch(`${VITE_WEBSERVICE_URL}/submission_period/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                return response.json();
            })
            .then(response => {
                form.setValue("name", response.name);
                form.setValue("startDate", getDate(response.startDate));
                form.setValue("closureDate", getDate(response.closureDate));
                form.setValue("finalClosureDate", getDate(response.finalClosureDate));
            })
            .catch(error => console.error("Error fetching:", error));

    }, [id, form]);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof SubmissionEditValidation>) {
        try {
            updateSubmission(values);
            toast({title: "Successfully edited!"});
            navigate(-1);
        } catch (error) {
            console.error("Error editing:", error);
        }
    }

    async function updateSubmission(data: any) {
        debugger
        let submissionBody = {
            name: data.name,
            startDate: formatDate(data.startDate),
            closureDate: formatDate(data.closureDate),
            finalClosureDate: formatDate(data.finalClosureDate),
        };

        // Update Contribution
        const responseContribution = await fetch(`${VITE_WEBSERVICE_URL}/submission_period/update/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionBody), // body data type must match "Content-Type" header
        });
        const contribution = await responseContribution?.json();


        toast({
            description: "Contribution was successfully edited!",
        });
        return contribution;
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
                    name="startDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="closureDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Closure Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="finalClosureDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Final Closure Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
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
                        Edit
                    </Button>
                </div>
            </form>
        </Form>
    );
};
export default SubmissionEditForm;