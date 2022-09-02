import React from "react";

const Header = () => {
  return (
    <header className="flex justify-center pt-10">
      <h1 className="text-3xl font-semibold ">Tomorrow Insights</h1>
    </header>
  );
};

export default React.memo(Header);
