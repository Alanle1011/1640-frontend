import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { ContributionValidation } from "@/lib/validation";

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
    useToast
} from "@/components/ui";
import { FileUploader, ImageUploader } from "@/components/shared";

const ContributionEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast()
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || ""
    const [contribution, setContribution] = useState(null);
    const [contributionImage, setContributionImage] = useState("");

    const form = useForm<z.infer<typeof ContributionValidation>>({
        resolver: zodResolver(ContributionValidation),
        defaultValues: {
            title: "",
            content: "",
        }
    });

    // 1. GET Contribution
    console.log("contribution", contribution)
    useEffect(() => {
        fetch(`${VITE_WEBSERVICE_URL}/contribution/${id}`,
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
                debugger
                setContribution(response);
                if (response.imageId) {
                    setContributionImage(`${VITE_WEBSERVICE_URL}/image/${response.imageId}`)
                }
                form.setValue("title", response.title);
                form.setValue("content", response.content);
            })
            .catch(error => console.error("Error fetching:", error));
    }, [id, form]);

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ContributionValidation>) {
        try {
            updateContribution(values);
            toast({ title: "Successfully edited!" });
            navigate(-1);
        } catch (error) {
            console.error("Error editing:", error);
        }
    }

    async function updateContribution(data: any) {
        const contributionBody = {
            content: data.content,
            title: data.title,
        };
        // Update Contribution
        const responseContribution = await fetch(`${VITE_WEBSERVICE_URL}/contribution/update/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contributionBody), // body data type must match "Content-Type" header
        });
        const contribution = await responseContribution?.json();

        // Update Image
        const imageBody = new FormData();
        imageBody.append('images', data.image[0]);
        if (contribution.imageId) {
            fetch(`${VITE_WEBSERVICE_URL}/image?imageId=${contribution.imageId}`, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                body: imageBody, // body data type must match "Content-Type" header
            });
        }

        // Update Doc
        const docBody = new FormData();
        docBody.append('doc', data.file);
        if (contribution.documentId) {
            fetch(`${VITE_WEBSERVICE_URL}/document?documentId=${contribution.documentId}`, {
                method: "PUT",
                body: docBody,
            });
        }
        toast({
            description: "Contribution was successfully edited!",
        })
        return contribution;
    }

    if (!contribution) {
        return (
            <div>
                There's nothing to show here.
            </div>
        )
    };

    // Handler
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
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
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Files</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                    // disabled={isLoadingCreate || isLoadingUpdate}
                    >
                        {/* {(isLoadingCreate || isLoadingUpdate) && <Loader />} */}
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
};
export default ContributionEditForm;