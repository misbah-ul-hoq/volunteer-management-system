import { Link } from "react-router-dom";
import formatDate from "../functions/functions";
import { Fade } from "react-awesome-reveal";
import useFetch from "../hooks/useFetch";

const AllVolunteers = () => {
  const { data } = useFetch("/volunteers");
  return (
    <div className="container-center py-8 grid gap-x-5 gap-y-7 md:grid-cols-2 xl:grid-cols-3 justify-center">
      {data?.map((item) => {
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
                <img src={thumbnailURL} alt={postTitle} className="h-36" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{postTitle}</h2>
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
  );
};

export default AllVolunteers;
