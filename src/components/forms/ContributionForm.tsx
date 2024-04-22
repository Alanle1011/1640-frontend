import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import FileUploader from "@/components/shared/FileUploader.tsx";
import ImageUploader from "@/components/shared/ImageUploader.tsx";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  useToast,
} from "@/components/ui";
import { ContributionValidation } from "@/lib/validation";
import { ILoginUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
export type SubmissionPeriod = {
  id: string;
  name: string;
  startDate: string;
  closureDate: string;
  finalClosureDate: string;
};

const ContributionForm: React.FC<{ userData: ILoginUser }> = ({ userData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  // @ts-ignore
  const [uploadedUserId, setUploadedUserId] = useState<ILoginUser>(userData);
  const [submissionPeriod, setsubmissionPeriod] = useState<SubmissionPeriod>();

  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/submission_period`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        const newestPeriod = response.reduce(
          (
            latestPeriod: SubmissionPeriod | null,
            currentPeriod: SubmissionPeriod
          ) => {
            const currentStartDate = new Date(currentPeriod.startDate);

            if (!latestPeriod) {
              return currentPeriod;
            }

            const latestStartDate = new Date(latestPeriod.startDate);

            return currentStartDate > latestStartDate
              ? currentPeriod
              : latestPeriod;
          },
          null
        );
        setsubmissionPeriod(newestPeriod);
      })
      .catch((error) => console.error("Error fetching:", error));
    console.log(submissionPeriod);

    const userData = JSON.parse(localStorage.getItem("userData") || '""');
    if (userData) {
      // @ts-ignore
      setUploadedUserId(userData);
    }
  }, []);
  const form = useForm<z.infer<typeof ContributionValidation>>({
    resolver: zodResolver(ContributionValidation),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ContributionValidation>) {
    if (uploadedUserId) {
      saveContribution(values);
      toast({ title: "Successfully Added Contribution!" });
      setTimeout(() => {
        navigate(-1);
        window.location.reload();
      }, 500);
    }
  }
  async function saveContribution(data: any) {
    const contributionBody = {
      content: data.content,
      title: data.title,
      uploadedUserId: uploadedUserId.userId,
    };
    const responseContribution = await fetch(
      `${VITE_WEBSERVICE_URL}/contribution`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contributionBody), // body data type must match "Content-Type" header
      }
    );

    const contribution = await responseContribution?.json();
    const contributionId = contribution.id;

    const imageBody = new FormData();
    imageBody.append("images", data.image[0]);
    if (contributionId) {
      fetch(`${VITE_WEBSERVICE_URL}/image?contributionId=${contributionId}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: imageBody, // body data type must match "Content-Type" header
      });
    }
    const docBody = new FormData();
    docBody.append("doc", data.file);
    if (contributionId) {
      fetch(
        `${VITE_WEBSERVICE_URL}/document?contributionId=${contributionId}`,
        {
          method: "POST",
          body: docBody,
        }
      );
    }
    toast({
      description: "Create Contribution Success",
    });
    return contribution;
  }

  // Handler
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Title</FormLabel>
              <FormControl>
                <Input type="input" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Content</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photo</FormLabel>
              <FormControl>
                <ImageUploader fieldChange={field.onChange} mediaUrl={""}  removeMediaUrl={()=>{}}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Document</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 w-fit h-fit border border-dark-4 rounded-[20px] px-4 py-8 bg-light-2">
          <p className="base-medium lg:body-bold text-black">
            {submissionPeriod?.name}
          </p>
          <div className={"flex flex-col gap-2"}>
            <div className="flex items-center gap-4">
              <p className="subtle-semibold lg:body-medium text-black whitespace-nowrap">
                Start Date:
              </p>
              <p className="subtle-semibold lg:body-medium text-light-3 whitespace-nowrap">
                {submissionPeriod?.startDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="subtle-semibold lg:body-medium text-black whitespace-nowrap">
                Close Date:
              </p>
              <p className="subtle-semibold lg:body-medium text-light-3 whitespace-nowrap">
                {submissionPeriod?.closureDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="subtle-semibold lg:body-medium text-black whitespace-nowrap">
                Final Close Date:
              </p>
              <p className="subtle-semibold lg:body-medium text-light-3 whitespace-nowrap">
                {submissionPeriod?.finalClosureDate}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Button type="submit" className="button_green w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ContributionForm;
