import React, { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className="grid gap-x-6 gap-y-2 rounded-lg bg-white p-3 shadow-md md:grid-cols-2 ">
      {children}
    </ul>
  );
};

export default Card;
