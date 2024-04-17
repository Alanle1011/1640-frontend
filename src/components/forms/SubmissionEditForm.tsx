import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { SubmissionEditValidation, UserValidation } from "@/lib/validation";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input, Popover, PopoverContent, PopoverTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    useToast,
} from "@/components/ui";
import { Faculty } from "@/types";
import { format } from "date-fns";
import { Calendar, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";

const SubmissionEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [facultyList, setFacultyList] = useState<Faculty[]>();
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

  const form = useForm<z.infer<typeof SubmissionEditValidation>>({
    resolver: zodResolver(SubmissionEditValidation),
    defaultValues: {
      id: "",
      name: "",
    },
  });

  // 1. GET Submission period
  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/submission-period/${id}`,
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
        form.setValue("startDate", response.startDate.dateTime);
        form.setValue("closureDate", response.closureDate.dateTime);
        form.setValue("finalClosureDate", response.finalClosureDate.dateTime);
      })
      .catch(error => console.error("Error fetching:", error));

  }, [id, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SubmissionEditValidation>) {
    try {
      updateSubmission(values);
      toast({ title: "Successfully edited!" });
      navigate(-1);
    } catch (error) {
      console.error("Error editing:", error);
    }
  }

  async function updateSubmission(data: any) {
    debugger
    let submissionBody = {
      name: data.name,
      startDate: data.startDate,
      closureDate: data.closureDate,
      finalClosureDate: data.finalClosureDate,
    };

    // Update Contribution
    const responseUser = await fetch(`${VITE_WEBSERVICE_URL}/submission-period/update/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionBody), // body data type must match "Content-Type" header
    });
    const user = await responseUser?.json();


    toast({
      description: "User was successfully edited!",
    });
    return user;
  }

  // Handler
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="input" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
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
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="closureDate"
          render={({ field }) => (
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
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="finalClosureDate"
          render={({ field }) => (
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
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
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
export default SubmissionEditForm;