import { useState } from "react";
import { liveflowerPrice } from "../misc/LiveFlowerPrice";
import { useNavigate } from "react-router-dom";
import LoaderComponent from "../LoaderComponent";

const Feedback = () => {
  const [text, setText] = useState("Write your suggestion !!");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "text") {
      setText(value);
    }
    console.log(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await liveflowerPrice.saveFeedback(text);
      if (response.status === 200) {
        console.log("Successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4 sm:p-6 lg:p-8">
      <h1 className="text-green-700 text-2xl sm:text-3xl lg:text-4xl font-bold mb-5">
        Improvement Feedback
      </h1>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <textarea
            type="text"
            rows="10"
            name="text"
            value={text}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          ></textarea>
          <div className="mt-4 flex justify-end">
            <button className="w-full sm:w-auto bg-green-700 hover:bg-green-600 text-white p-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Feedback;
