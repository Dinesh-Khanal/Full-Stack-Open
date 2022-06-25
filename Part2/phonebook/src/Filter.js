import React from "react";

const Filter = ({ setSearchStr }) => {
  return (
    <div>
      filter shown with <input onChange={(e) => setSearchStr(e.target.value)} />
    </div>
  );
};

export default Filter;
