import { EMPTY_PATH, Schema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

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
    toast
} from "@/components/ui";

import { Delete, Edit, Pen, RemoveFormatting, Trash } from "lucide-react";

import { EditContribution } from "@/types";

const ContributionDetailedForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || "";

    const [contribution, setContribution] = useState<any>(null);
    const [contributionImage, setContributionImage] = useState<string>();
    const [contributionFile, setContributionFile] = useState<string>();

    // const 

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

    // Delete button
    // const deleteContribution = async (contributionId: string) => {
    //     if (!!contribution.id) {
    //         try {
    //             const response = await fetch(`${VITE_WEBSERVICE_URL}/contribution/delete/${contributionId}`, { method: "DELETE" });

    //             if (!response.ok) {
    //                 throw new Error(`Failed to delete item: ${response.statusText}`);
    //             }

    //             toast({ title: "Deleted successfully!" });
    //             window.location.reload();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else {
    //         return toast({ title: "Failed to delete! Please try again.", });
    //     }
    // };

    return (
        <div>
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
                                        className="shad-input rounded-lg" {...field} >
                                        {contribution?.title}
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
                                        className="shad-textarea custom-scrollbar" {...field} >
                                        {contribution?.content}
                                    </Textarea>
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Photos</FormLabel>
                                <FormControl>
                                    {contributionImage &&
                                        <div>
                                            <div>
                                                <h1>Image</h1>
                                            </div>
                                            <div className="flex flex-1 justify-center w-full h-full p-5 lg:p-10">
                                                <img src={contributionImage} alt="image" className="object-contain w-[500px] h-[500px] " />
                                            </div>
                                        </div>
                                    }
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="file"
                        render={() => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Files</FormLabel>
                                <FormControl>
                                    {contributionFile &&
                                        <div>
                                            <h1>DOCUMENT</h1>
                                            <iframe className={'w-full h-screen p-2'} src={contributionFile} />
                                        </div>
                                    }
                                </FormControl>
                                <FormMessage className="shad-form_message" />
                            </FormItem>
                        )}
                    />
                    {/* <div className="flex gap-4 items-center justify-end">
                        <Button
                            className="button_edit whitespace-nowrap">
                            <Link
                                className="flex gap-2 mt-1"
                                to={`/contribution-edit/${contribution.id}`}>
                                <Pen />Edit
                            </Link>
                        </Button>
                        <Button
                            onClick={() => deleteContribution(contribution.id)}
                            className="button_delete whitespace-nowrap">
                            <Trash />Delete
                        </Button>
                    </div> */}
                </form>
            </Form>

            {/* <div >
                <text className="shad-form_label">Title</text>
            </div>
            <div className="shad-input border-input">
                {contribution?.title}
            </div>
            <div>
                <text className="shad-form_label">Content</text>
            </div>
            <div className="shad-input border-input">
                {contribution?.content}
            </div>
            {contributionImage &&
                <div>
                    <div>
                        <h1>Image</h1>
                    </div>
                    <div className="flex flex-1 justify-center w-full h-full p-5 lg:p-10">
                        <img src={contributionImage} alt="image" className="object-contain w-[500px] h-[500px] " />
                    </div>
                </div>
            }
            {contributionFile &&
                <div>
                    <h1>DOCUMENT</h1>
                    <iframe className={'w-full h-screen p-2'} src={contributionFile} />
                </div>
            } */}
        </div>
    );
};
export default ContributionDetailedForm;