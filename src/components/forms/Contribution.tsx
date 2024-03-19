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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { z } from "zod";
import { FileUploader } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContributionValidation } from "@/lib/validation";

type ContributionFormProps = {
  contribution?: any;
};

const ContributionForm = ({ contribution }: ContributionFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ContributionValidation>>({
    resolver: zodResolver(ContributionValidation),
    defaultValues: {
      email: "",
      studentID: "",
      title: "",
      content: "",
      file: [],
      faculty: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ContributionValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // Handler
  return (
    <Form {...form}>
      <form className="flex flex-col gap-9 w-full max-w-5xl">
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
          name="studentID"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Student ID</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="faculty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Faculty</FormLabel>
              <FormControl>
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Faculty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CS">Computer Science</SelectItem>
                      <SelectItem value="BA">
                        Business Administration
                      </SelectItem>
                      <SelectItem value="GD">Graphics Design</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={contribution?.imageUrl}
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
export default ContributionForm;
