import { FileUploaderProps } from "@/types";

const FileUploader = ({ fieldChange }: FileUploaderProps) => {
  return (
    <div className="flex w-full ">
      <input
        onChange={(e) => {
          // @ts-ignore
          fieldChange(e.target.files[0]);
          // @ts-ignore
          setFile(e.target.files[0]);
        }}
        className="cursor-pointer w-full"
        type={"file"}
        accept="application/msword"
      />
    </div>
  );
};

export default FileUploader;
