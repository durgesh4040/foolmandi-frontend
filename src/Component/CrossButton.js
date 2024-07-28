import { RiCloseFill } from "react-icons/ri";

const CrossButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="text-white absolute top-4 right-4 "
      onClick={onClick}
    >
      <RiCloseFill size={24} />
    </button>
  );
};

export default CrossButton;
