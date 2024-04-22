import { FileUploaderProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { undefined } from "zod";

const FileUploader = ({ fieldChange, contribution }: FileUploaderProps) => {
  const [selectedFile, setselectedFile] = useState<any>(null);
  const [isFile, setisFile] = useState(false);
  const inputFile = useRef(null);

  // Function to reset the input element
  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };
  useEffect(() => {
    debugger;

    if (contribution.type) {
      setisFile(true);
    }
  }, [contribution]);
  console.log("selectedFile", selectedFile);
  console.log("isFile", isFile);

  const removeFile = async () => {
    debugger;
    setselectedFile(undefined);
    fieldChange();
    handleReset();
    setisFile(false);
  };

  return (
    <div className="flex w-full relative h-14 items-center gap-4 justify-between">
      {selectedFile ? (
        <div className="top-0 small-medium lg:base-medium py-3 flex items-center border rounded-lg border-dark-2 p-4 w-fit relative z-10 bg-white">
          <>
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
          </>
        </div>
      ) : contribution?.documentType ? (
        <div className="top-0 small-medium lg:base-medium py-3 flex items-center border rounded-lg border-dark-2 p-4 w-fit relative z-10 bg-white">
          <>
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
          </>
        </div>
      ) : null}
      <input
        ref={inputFile}
        onChange={(e) => {
          // @ts-ignore
          fieldChange(e.target.files[0]);
          // @ts-ignore
          // setFile(e.target.files[0]);
          setselectedFile(e.target.files[0]);
          setisFile(true);
        }}
        className={`cursor-pointer w-fit absolute left-0 h-full top-3 z-10 ${isFile ? "opacity-0" : ""}`}
        type={"file"}
        accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
      {selectedFile ? (
        <div>
          <img
            src={"/assets/icons/remove.png"}
            width={32}
            height={32}
            onClick={() => removeFile()}
            className="cursor-pointer"
          />
        </div>
      ) : contribution?.documentType ? (
        <div>
          <img
            src={"/assets/icons/remove.png"}
            width={32}
            height={32}
            onClick={() => removeFile()}
            className="cursor-pointer"
          />
        </div>
      ) : null}
    </div>
  );
};

export default FileUploader;
