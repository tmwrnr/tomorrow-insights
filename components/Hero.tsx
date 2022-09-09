import React from "react";
import FileDropzone from "./FileDropzone";

type Props = {
  onDrop: (acceptedFiles: File[]) => void;
};
const Hero: React.FC<Props> = ({ onDrop }) => {
  return (
    <div className=" container mx-auto flex grow flex-col items-center justify-center px-12 py-8 md:py-32 xl:-mb-20">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold">Tomorrow Insights</h1>
        <p className="py-6">
          Mit diesem Tool kann man sich einfach die Insights seines{" "}
          <a
            href="https://www.tomorrow.one/"
            target="_blank"
            rel="noreferrer"
            className="text-violet-500 hover:underline"
          >
            Tomorrow
          </a>{" "}
          Kontos anschauen.
        </p>

        <FileDropzone onDrop={onDrop} />
        <p className="py-6 text-xs text-gray-500">
          Alle Daten bleiben auf dem Gerät! <br />
          Es werden keine Daten an irgendeinen Server gesendet!
        </p>
      </div>
    </div>
  );
};

export default Hero;
