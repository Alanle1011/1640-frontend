import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
  Cbb,
} from "@/components/ui";
import { z } from "zod"
import { FileUploader } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  
  email: z.string(),
  studentID: z.string(),
  title: z.string(),
  content: z.string(),
  faculty: z.string(),
  file: z.string(),
  // file: z.object({ // Define file object with validation (optional)
  //   validate: (value) => {
  //     if (!value?.type) {
  //       throw new Error("Please select a file to upload.");
  //     }
  //     // Add other validation rules for file size, type, etc. (optional)
  //     return value;
  //   },
  // }),
})

const PostForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      studentID: "",
      title: "",
      content: "",
      file: "",
      faculty: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  // Handler
  return (
    <Form {...form}>
      <form className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Email</FormLabel>
            <FormControl>
              <Input type="input" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />
        
        <FormField control={form.control} name="studentID" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Student ID</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />
        <FormField control={form.control} name="faculty" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Faculty</FormLabel>
            <FormControl>
              <Cbb />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Title</FormLabel>
            <FormControl>
              <Input type="input" className="shad-input" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Content</FormLabel>
            <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />
        <FormField control={form.control} name="file" render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
            <Input type="input" className="shad-input" {...field} />
              {/* <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} /> */}
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )} />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4" onClick={() => navigate(-1)}>
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
export default PostForm;
