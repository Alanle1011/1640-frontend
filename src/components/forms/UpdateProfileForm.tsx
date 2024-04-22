import { ImageUploader } from "@/components/shared";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
} from "@/components/ui";
import { UserProfileEditValidation } from "@/lib/validation";
import { ILoginUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const UpdateProfileForm: React.FC<{ userData: ILoginUser }> = ({
  userData,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  const [userImageUrl, setUserImageUrl] = useState<string>();
  const [imageId, setImageId] = useState<string>();

  const form = useForm<z.infer<typeof UserProfileEditValidation>>({
    resolver: zodResolver(UserProfileEditValidation),
    defaultValues: {
      name: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  // 1. GET User
  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/user/${userData.userId}`, {
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
        debugger;
        form.setValue("name", response.name);
        if (response.imageId) {
          setUserImageUrl(`${VITE_WEBSERVICE_URL}/image/${response.imageId}`);
          setImageId(response.imageId);
        }
      })
      .catch((error) => console.error("Error fetching:", error));
  }, [userData, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserProfileEditValidation>) {
    try {
      updateUserProfile(values);
      toast({ title: "Successfully edited!" });
      setTimeout(() => {
        navigate('/profile');
      }, 500);
    } catch (error) {
      console.error("Error editing:", error);
    }
  }

  async function updateUserProfile(data: any) {
    debugger;
    let userBody;
    if (data.newPassword) {
      userBody = {
        // Update with password
        name: data.name,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
    } else {
      // Update without password
      userBody = {
        name: data.name,
      };
    }

    // Update User
    const responseUser = await fetch(
      `${VITE_WEBSERVICE_URL}/user/update/${userData.userId}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBody), // body data type must match "Content-Type" header
      }
    );
    const user = await responseUser?.json();

    //AddImage or update Image
    if (!userImageUrl) {
      const imageBody = new FormData();
      imageBody.append("images", data.image[0]);
      fetch(`${VITE_WEBSERVICE_URL}/image?userId=${userData.userId}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: imageBody, // body data type must match "Content-Type" header
      });
    } else {
      const imageBody = new FormData();
      imageBody.append("images", data.image[0]);
      fetch(`${VITE_WEBSERVICE_URL}/image?imageId=${imageId}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageBody), // body data type must match "Content-Type" header
      });
    }

    toast({
      description: "User Profile was successfully Updated!",
    });
    return user;
  }

  // Handler
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <ImageUploader
                  fieldChange={field.onChange}
                  mediaUrl={userImageUrl || ""}
                 removeMediaUrl={()=>{}}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
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
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Old Password</FormLabel>
              <FormControl>
                <Input type="input" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">New Password</FormLabel>
              <FormControl>
                <Input type="input" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
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
            className="shad-button_primary whitespace-nowrap">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UpdateProfileForm;
