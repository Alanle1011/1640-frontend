import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

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
} from "@/components/ui";
import {z} from "zod";
import {FileUploader} from "@/components/shared";
import {zodResolver} from "@hookform/resolvers/zod";
import {ContributionValidation} from "@/lib/validation";


const ContributionForm = () => {
    const navigate = useNavigate();
    const VITE_WEBSERVICE_URL = import.meta.env.VITE_WEBSERVICE_URL || ""

    const form = useForm<z.infer<typeof ContributionValidation>>({
        resolver: zodResolver(ContributionValidation),
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ContributionValidation>) {
        console.log(values);
        const response = saveContribution(values)
        console.log(response);
    }

    async function saveContribution(data: any) {
        debugger
        const contributionBody = {
            content: data.content,
            submissionPeriodId: parseInt(data.submissionPeriodId),
            title: data.title,
            uploadedUserId: parseInt(data.uploadedUserId)
        };
        const responseContribution = await fetch(`${VITE_WEBSERVICE_URL}/contribution`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contributionBody), // body data type must match "Content-Type" header
        });

        const imageBody = new FormData();
        imageBody.append('images', data.file[0]);

        const contribution = await responseContribution?.json();
        const contributionId = contribution.id;
        // if (contributionId) {
        //     fetch(`${BACKEND_URL}/image?contributionId=${contributionId}`, {
        //         method: "POST", // *GET, POST, PUT, DELETE, etc.
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         },
        //         body: imageBody, // body data type must match "Content-Type" header
        //     });
        // }


        return responseContribution.json();
    }


    // Handler
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="uploadedUserId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Uploaded User ID</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                {/*<FormField*/}
                {/*  control={form.control}*/}
                {/*  name="faculty"*/}
                {/*  render={({ field }) => (*/}
                {/*    <FormItem>*/}
                {/*      <FormLabel className="shad-form_label">Faculty</FormLabel>*/}
                {/*      <FormControl>*/}
                {/*        <FormItem>*/}
                {/*          <Select*/}
                {/*            onValueChange={field.onChange}*/}
                {/*            defaultValue={field.value}>*/}
                {/*            <FormControl>*/}
                {/*              <SelectTrigger>*/}
                {/*                <SelectValue placeholder="Select a Faculty" />*/}
                {/*              </SelectTrigger>*/}
                {/*            </FormControl>*/}
                {/*            <SelectContent>*/}
                {/*              <SelectItem value="CS">Computer Science</SelectItem>*/}
                {/*              <SelectItem value="BA">*/}
                {/*                Business Administration*/}
                {/*              </SelectItem>*/}
                {/*              <SelectItem value="GD">Graphics Design</SelectItem>*/}
                {/*            </SelectContent>*/}
                {/*          </Select>*/}
                {/*          <FormMessage />*/}
                {/*        </FormItem>*/}
                {/*      </FormControl>*/}
                {/*      <FormMessage className="shad-form_message" />*/}
                {/*    </FormItem>*/}
                {/*  )}*/}
                {/*/>*/}
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Title</FormLabel>
                            <FormControl>
                                <Input type="input" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="shad-textarea custom-scrollbar"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="submissionPeriodId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Submission Period Id</FormLabel>
                            <FormControl>
                                <Input
                                    className="shad-textarea custom-scrollbar"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={""}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message"/>
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
export default ContributionForm;
