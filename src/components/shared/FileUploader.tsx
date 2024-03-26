import {FileUploaderProps} from "@/types";


const FileUploader = ({fieldChange}: FileUploaderProps) => {
    return (
        <div className="flex ">
            <input onChange={(e) => {
                // @ts-ignore
                fieldChange(e.target.files[0])
                // @ts-ignore
                setFile(e.target.files[0])
            }} className="cursor-pointer" type={'file'} accept=
                "application/msword"/>
        </div>
    );
};

export default FileUploader;
