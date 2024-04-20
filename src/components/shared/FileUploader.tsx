import { FileUploaderProps } from "@/types";
import { useState } from "react";

const FileUploader = ({ fieldChange, contribution }: FileUploaderProps) => {
  const [selectedFile, setselectedFile] = useState<any>();
  console.log("selectedFile", selectedFile);
  return (
    <div className="flex w-full relative h-14">
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
      ) : contribution.documentType ? (
        <div className="top-0 small-medium lg:base-medium py-3 flex items-center border rounded-lg border-dark-2 p-4 w-fit relative z-10 bg-white">
          <>
            {contribution.documentType === "docx" && (
              <img
                src="/assets/icons/docx-file.png"
                className="w-7 h-full mr-3"
                title="docx icons"
              />
            )}
            {contribution.documentType === "pdf" && (
              <img
                src="/assets/icons/pdf.png"
                className="w-7 h-full mr-3"
                title="pdf icons"
              />
            )}
            <p>{contribution.documentName}</p>
          </>
        </div>
      ) : null}

      <input
        onChange={(e) => {
          // @ts-ignore
          fieldChange(e.target.files[0]);
          // @ts-ignore
          // setFile(e.target.files[0]);
          setselectedFile(e.target.files[0]);
        }}
        className={`cursor-pointer w-full absolute left-0 h-full top-3 z-10 ${selectedFile || contribution.documentId ? "opacity-0" : ""}`}
        type={"file"}
        accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      />
    </div>
  );
};

export default FileUploader;
