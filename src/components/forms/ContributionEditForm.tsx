import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { ContributionValidation } from "@/lib/validation";

import { Contribution } from "@/_root/pages/Home";
import { FileUploader, ImageUploader } from "@/components/shared";
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
import { ILoginUser } from "@/types";
import { IDocument } from "@cyntler/react-doc-viewer";

const ContributionEditForm: React.FC<{ userData: ILoginUser }> = ({
  userData,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";
  const [contribution, setContribution] = useState<Contribution>();
  const [contributionImage, setContributionImage] = useState("");
  const [contributionFile, setContributionFile] = useState<string>();
  const [contributionFileType, setContributionFileType] = useState<string>();
  const [contributionFileName, setContributionFileName] = useState<string>();

  const docs = [
    {
      uri: contributionFile,
      fileType: contributionFileType,
      fileName: contributionFileName,
    },
  ] as IDocument[];
  // const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof ContributionValidation>>({
    resolver: zodResolver(ContributionValidation),
  });

  // 1. GET Contribution
  console.log("contribution", contribution);
  useEffect(() => {
    fetch(`${VITE_WEBSERVICE_URL}/contribution/${id}`, {
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
        setContribution(response);
        if (response.imageId) {
          setContributionImage(
            `${VITE_WEBSERVICE_URL}/image/${response.imageId}`
          );
        }
        if (response.documentId) {
          setContributionFile(
            `${VITE_WEBSERVICE_URL}/document/${response.documentId}`
          );
          setContributionFileType(response.documentType.toString());
          setContributionFileName(response.documentName.toString());
        }
        form.setValue("title", response.title);
        form.setValue("content", response.content);
      })
      .catch((error) => console.error("Error fetching:", error));
  }, [id, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ContributionValidation>) {
    try {
      updateContribution(values);
      toast({ title: "Successfully edited!" });
      setTimeout(() => {
        navigate(-1);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error editing:", error);
    }
  }

  async function updateContribution(data: any) {
    debugger;
    const contributionBody = {
      content: data.content,
      title: data.title,
    };
    // Update Contribution
    const contribution = await fetch(
      `${VITE_WEBSERVICE_URL}/contribution/update/${id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(contributionBody), // body data type must match "Content-Type" header
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .catch((error) => console.error("Error fetching:", error));

    // Update Image
    if (data.image && contribution.imageId) {
      const imageBody = new FormData();
      imageBody.append("images", data.image[0]);
      fetch(`${VITE_WEBSERVICE_URL}/image?imageId=${contribution.imageId}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        body: imageBody, // body data type must match "Content-Type" header
      });
    } else if (data.image) {
      const imageBody = new FormData();
      imageBody.append("images", data.image[0]);
      fetch(`${VITE_WEBSERVICE_URL}/image?contributionId=${contribution.id}`, {
        method: "POST",
        body: imageBody,
      });
    }
    // Update Doc
    const docBody = new FormData();
    docBody.append("doc", data.file);
    //Update old DOC
    if (data.file && contribution.documentId) {
      fetch(
        `${VITE_WEBSERVICE_URL}/document?documentId=${contribution.documentId}`,
        {
          method: "PUT",
          body: docBody,
        }
      );
    } else if (data.file) {
      fetch(
        `${VITE_WEBSERVICE_URL}/document?contributionId=${contribution.id}`,
        {
          method: "POST",
          body: docBody,
        }
      );
    }

    toast({
      description: "Contribution was successfully edited!",
    });
    return contribution;
  }

  if (!contribution) {
    return <div>There's nothing to show here.</div>;
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
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <ImageUploader
                  fieldChange={field.onChange}
                  mediaUrl={contributionImage}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        {userData.userId.toString() ===
          `${contribution.uploadedUserId}`.toString() && (
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Add Files</FormLabel>
                  <FormControl>
                    <div>
                      <FileUploader
                        fieldChange={field.onChange}
                        contribution={contribution}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          )}

        <div className="flex gap-4 items-center">
          <Button
            type="submit"
            className="button_green w-full"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ContributionEditForm;
