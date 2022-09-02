import { DocumentChartBarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};
const FileDropzone: React.FC<Props> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        {
          "border-violet-400 bg-violet-200": isDragActive,
          "border-violet-400 bg-violet-50": !isDragActive,
        },
        "flex justify-center rounded-md border-2 border-dashed px-6 pt-10 pb-12"
      )}
    >
      <input {...getInputProps()} className="sr-only" />
      <div className="space-y-1 text-center">
        <DocumentChartBarIcon className="mx-auto mb-4 h-10 w-10" />
        <div className=" flex text-sm">
          <span
            className={clsx("link", {
              "text-violet-600": !isDragActive,
              "text-violet-500": isDragActive,
            })}
          >
            Select a file
          </span>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-600">only CSV files</p>
      </div>
    </div>
  );
};

export default FileDropzone;
