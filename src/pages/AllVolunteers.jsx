import { Link } from "react-router-dom";
import formatDate from "../functions/functions";
import { Fade } from "react-awesome-reveal";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const AllVolunteers = () => {
  useDocumentTitle("All Volunteers");
  const [endPoint, setEndPoint] = useState("/volunteers");
  const { data } = useFetch(`${endPoint}`);

  return (
    <section className="container-center">
      <label className="input input-primary input-bordered flex items-center gap-2 my-4">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) => {
            setEndPoint(
              `/volunteers${e.target.value && "/search/" + e.target.value}`
            );
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-6 w-6 opacity-70 cursor-pointer"
          onClick={() => {}}
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className=" py-8 grid gap-x-5 gap-y-7 md:grid-cols-2 xl:grid-cols-3 justify-center">
        {data.length === 0
          ? "No posts found"
          : data?.map((item) => {
              const {
                _id,
                thumbnailURL,
                postTitle,
                category,
                description,
                deadLine,
              } = item;
              return (
                <Fade key={_id} fraction={0.2}>
                  <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                      <img
                        src={thumbnailURL}
                        alt={postTitle}
                        className="h-36"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {postTitle.split(" ").slice(0, 4).join(" ")}
                      </h2>
                      <p>{description.split(" ").slice(0, 10).join(" ")}</p>
                      <div className="flex gap-3 items-center my-3">
                        <p>Deadline: </p>
                        <div className="badge badge-secondary">
                          {formatDate(deadLine)}
                        </div>
                      </div>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline">{category}</div>
                      </div>
                      <Link
                        to={`/volunteers/${_id}`}
                        className="btn btn-secondary mt-5"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </Fade>
              );
            })}
      </div>
    </section>
  );
};

export default AllVolunteers;
