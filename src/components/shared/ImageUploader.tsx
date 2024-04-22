import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Button } from "@/components/ui";
import { convertFileToUrl } from "@/lib/utils";
import { ImageUploaderProps } from "@/types";


const ImageUploader = ({ fieldChange, mediaUrl, removeMediaUrl }: ImageUploaderProps) => {
  const [file, setFile] = useState<File[]>();
  const [fileUrl, setFileUrl] = useState<string>();
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  const handleDeleteImage = () => {
    debugger
    // @ts-ignore
    setFile(undefined);
    // @ts-ignore
    setFileUrl();
    removeMediaUrl();
    fieldChange();
  };

  return (
    <div className={"relative"}>
      <div
        {...getRootProps()}
        className="flex flex-center flex-col bg-light-1 border rounded-lg border-dark-2 cursor-pointer ">
        <input {...getInputProps()} className="cursor-pointer" />

        {fileUrl ? (
          <>
            <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
              <img src={fileUrl} alt="image" className="file_uploader-img" />
            </div>
            <p className="file_uploader-label">Click or drag photo to replace</p>
          </>
        ) : mediaUrl ? (
          <>
            <div className="flex flex-1 justify-center w-full h-full p-5 lg:p-10">
              <img src={mediaUrl} alt="image" className="object-contain w-full h-full " />
            </div>
            <p className="file_uploader-label">Click or drag photo to replace</p>
          </>
        ) : (
          <div className="file_uploader-box ">
            <img
              src="/assets/icons/file-upload.svg"
              width={96}
              height={77}
              alt="file upload"
            />

            <h3 className="base-medium text-black mb-2 mt-6">
              Drag photo here
            </h3>
            <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

            <Button type="button" className="shad-button_light_4">
              Select from computer
            </Button>
          </div>
        )}


      </div>
      {mediaUrl || fileUrl ? (
        <div className={"absolute top-3 right-3 z-10"}>
          <img
            src={"/assets/icons/remove.png"}
            width={32}
            height={32}
            onClick={() => handleDeleteImage()}
            className="cursor-pointer"
          />
        </div>
      ) : <></>}
    </div>

  );
};

export default ImageUploader;
