import { EMPTY_PATH, Schema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

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
import { Delete, Edit, Pen, RemoveFormatting, Trash } from "lucide-react";

const ContributionDetailedForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

    const [contribution, setContribution] = useState<any>(null);
    const [contributionImage, setContributionImage] = useState<string>();
    const [contributionFile, setContributionFile] = useState<string>();

    const form = useForm();

    // 1. GET Contribution
    console.log(contribution)
    useEffect(() => {
        fetch(`${VITE_WEBSERVICE_URL}/contribution/${id}`, {
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
                setContribution(response);
                if (response.imageId) {
                    setContributionImage(`${VITE_WEBSERVICE_URL}/image/${response.imageId}`)
                }
                if (response.documentId) {
                    setContributionFile(`${VITE_WEBSERVICE_URL}/document/pdf/${response.documentId}`)
                }
            })
            .catch(error => console.error("Error fetching:", error));
    }, [id]);

    return (
        <Form {...form}>
            <form className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Title</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled
                                    className="shad-input rounded-lg" {...field}>
                                    d
                                </Textarea>
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled
                                    className="shad-textarea custom-scrollbar" {...field}>
                                    d
                                </Textarea>
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <div>
                                    d
                                </div>
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Files</FormLabel>
                            <FormControl>
                                <div>
                                    {contribution.im}
                                </div>
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button className="button_edit whitespace-nowrap">
                        <Pen />Edit
                    </Button>
                    <Button className="button_delete whitespace-nowrap">
                        <Trash />Delete
                    </Button>
                </div>
            </form>
        </Form>

        //     <div>
        //         <h1>Title</h1>
        //     </div>
        //     <div className="shad-input">
        //         {contribution?.title}
        //     </div>
        //     <div>
        //         <h1>Content</h1>
        //     </div>
        //     <div className="shad-input">
        //         {contribution?.content}
        //     </div>
        //     {contributionImage &&
        //         <div>
        //             <div>
        //                 <h1>Image</h1>
        //             </div>
        //             <div className="flex flex-1 justify-center w-full h-full p-5 lg:p-10">
        //                 <img src={contributionImage} alt="image" className="object-contain w-[500px] h-[500px] " />
        //             </div>
        //         </div>
        //     }
        //     {contributionFile &&
        //         <div>
        //             <h1>DOCUMENT</h1>
        //             <iframe className={'w-full h-screen p-2'} src={contributionFile} />
        //         </div>
        //     }
    );
};
export default ContributionDetailedForm;