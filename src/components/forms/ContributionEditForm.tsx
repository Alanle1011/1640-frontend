import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ILoginUser, EditContribution } from "@/types";
import { ContributionValidation } from "@/lib/validation";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, useToast } from "@/components/ui";
import { ImageUploader, FileUploader } from "@/components/shared";

const ContributionEditForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast()
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || ""
    // @ts-ignore
    const [uploadedUserId, setUploadedUserId] = useState<ILoginUser>(JSON.parse(localStorage.getItem("userData")) || null);

    const [contributions, setContributions] = useState<EditContribution[]>([]);

    useEffect(() => {
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
        }
    }

    async function saveContribution(data: any) {
        debugger
        const contributionBody = {
            content: data.content,
            title: data.title,
            uploadedUserId: uploadedUserId.userId
        };

        const responseContribution = await fetch(`${VITE_WEBSERVICE_URL}/contribution/update/contribution.id`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contributionBody), // body data type must match "Content-Type" header
        });

        const contribution = await responseContribution?.json();
        const contributionId = contribution.id;

        const imageBody = new FormData();
        imageBody.append('images', data.image[0]);
        if (contributionId) {
            fetch(`${VITE_WEBSERVICE_URL}/image?contributionId=${contributionId}`, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                body: imageBody, // body data type must match "Content-Type" header
            });
        }
        const docBody = new FormData();
        docBody.append('doc', data.file);
        if (contributionId) {
            fetch(`${VITE_WEBSERVICE_URL}/document?contributionId=${contributionId}`, {
                method: "PUT",
                body: docBody,
            });
        }
        toast({
            description: "Contribution was successfully edited!",
        })
        return contribution;
    }

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
                                    mediaUrl={""}
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
                        Post
                    </Button>
                </div>
            </form>
        </Form>
    );
};
export default ContributionEditForm;
