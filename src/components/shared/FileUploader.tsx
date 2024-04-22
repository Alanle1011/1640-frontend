import { FileUploaderProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { undefined } from "zod";

const FileUploader = ({ fieldChange, contribution }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFile, setIsFile] = useState(false);
  const inputFile = useRef(null);

  // Function to reset the input element
  const handleReset = () => {
    if (inputFile.current) {
      //@ts-ignore
      inputFile.current.value = "";
      //@ts-ignore
      inputFile.current.type = "text";
      //@ts-ignore
      inputFile.current.type = "file";
    }
  };
  useEffect(() => {
    if (contribution && contribution?.documentType) {
      setIsFile(true);
    }
  }, [contribution]);
  console.log("selectedFile", selectedFile);
  console.log("isFile", isFile);

  const removeFile = async () => {
    debugger;
    setSelectedFile(undefined);
    fieldChange();
    handleReset();
    setIsFile(false);
  };

  return (
    <div className="flex w-full relative h-14 items-center gap-4 justify-between">
      {selectedFile ? (
        <div
          className="top-0 small-medium lg:base-medium py-3 flex items-center border rounded-lg border-dark-2 p-4 w-fit relative z-10 bg-white">

          {selectedFile.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
              <img
                src="/assets/icons/docx-file.png"
                className="w-7 h-full mr-3"
                title="docx icons"
              />
            )}
          {selectedFile.type === "application/pdf" && (
            <img
              src="/assets/icons/pdf.png"
              className="w-7 h-full mr-3"
              title="pdf icons"
            />
          )}
          <p>{selectedFile.name}</p>

        </div>
      ) : contribution && contribution?.documentType ? (
        <div
          className="top-0 small-medium lg:base-medium py-3 flex items-center border rounded-lg border-dark-2 p-4 w-fit relative z-10 bg-white">

          {contribution?.documentType === "docx" && (
            <img
              src="/assets/icons/docx-file.png"
              className="w-7 h-full mr-3"
              title="docx icons"
            />
          )}
          {contribution?.documentType === "pdf" && (
            <img
              src="/assets/icons/pdf.png"
              className="w-7 h-full mr-3"
              title="pdf icons"
            />
          )}
          <p>{contribution?.documentName}</p>

        </div>
      ) : <></>}
      <input
        ref={inputFile}
        onChange={(e) => {
          // @ts-ignore
          fieldChange(e.target.files[0]);
          // @ts-ignore
          // setFile(e.target.files[0]);
          setSelectedFile(e.target.files[0]);
          setIsFile(true);
        }}
        className={`cursor-pointer w-fit absolute left-0 h-full top-3 z-10 ${isFile ? "opacity-0" : ""}`}
        type={"file"}
        accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      {isFile ? (
        <div>
          <img
            src={"/assets/icons/remove.png"}
            width={32}
            height={32}
            onClick={() => removeFile()}
            className="cursor-pointer"
          />
        </div>
      ) : <></>}
    </div>
  );
};

export default FileUploader;
