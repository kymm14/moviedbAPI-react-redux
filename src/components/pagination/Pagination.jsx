import React from "react";
import PageLoader from "../loaders/PageLoader";

export default function Pagination({ page, onChange }) {
  const [isLoading, setisLoading] = useState(true);
  const handlePrev = (event) => {
    onChange(event, page - 1);
  };

  const handleNext = (event) => {
    onChange(event, page + 1);
  };

  return (
    <>
      {!isLoading ? (
        <div>
          <button disabled={page == 1} onClick={handlePrev}>
            Previous
          </button>
          {page}
          <button onClick={handleNext}>Next</button>
        </div>
      ) : (
        <>
          <PageLoader />
        </>
      )}
    </>
  );
}
