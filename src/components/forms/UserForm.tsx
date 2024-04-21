import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
import { CreateUserValidation } from "@/lib/validation";
import { Faculty } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";

const UserForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [facultyList, setFacultyList] = useState<Faculty[]>();
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  const [selectedRole, setSelectedRole] = useState<string>();

  const handleOnChange = (values: any) => {
    setSelectedRole(values);
  };

  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/faculty`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((response) => {
        setFacultyList(response);
      })
      .catch((error) => console.error("Error fetching:", error));
  }, []);
  const form = useForm<z.infer<typeof CreateUserValidation>>({
    resolver: zodResolver(CreateUserValidation),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateUserValidation>) {
    saveUser(values);
    toast({ title: "Successfully Added User!" });
    setTimeout(() => {
        navigate(-1);
        window.location.reload();
      }, 500);
  }

  async function saveUser(data: any) {
    debugger;
    let userBody;
    if (data.userRole === "STUDENT") {
      userBody = {
        name: data.name,
        email: data.email,
        userRole: data.userRole,
        faculty: data.faculty,
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
    });
    return responseContribution;
  }

  // Handler
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={async () => {
          await handleOnChange(form.getValues().userRole);
          await handleOnChange(form.getValues().userRole);
        }}
        className="flex flex-col gap-9 w-full max-w-5xl">
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="input" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={field.value ? field.value : "Select a ROLE"}
                    />
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
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedRole && selectedRole === "STUDENT" && (
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => {
              console.log("field.value", field.value);
              return (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            field.value ? field.value : "Select a faculty"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {facultyList &&
                        facultyList.map((faculty, key) => (
                          <SelectItem key={key} value={faculty.facultyName}>
                            {faculty.facultyName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        )}

        <div className="flex gap-4 items-center">
          <Button
            type="submit"
            className="button_green w-full"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UserForm;
