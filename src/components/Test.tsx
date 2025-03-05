import React from "react";

interface TestProps {
  number: number;
  onClick: () => void;
}

const Test: React.FC<TestProps> = ({ number, onClick }) => {
  return <p onClick={onClick}>{number}</p>;
};

export default Test;
