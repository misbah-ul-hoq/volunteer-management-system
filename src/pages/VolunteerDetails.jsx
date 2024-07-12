import { useContext, useEffect, useState } from "react";
import api from "../axios/fetch";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useDocumentTitle from "../hooks/useDocumentTitle";

const VolunteerDetails = () => {
  useDocumentTitle("Volunteer Details");
  const { user, userMongo } = useContext(AuthContext);
  const id = useParams().id;
  const [data, setData] = useState({});
  const [suggestion, setSuggestion] = useState({});

  //creating a new object so that the property _id does not get duplicated on the database,
  const { _id: appliedFor, ...rest } = data;
  const newData = { appliedFor, ...rest };

  useEffect(() => {
    api.get(`/volunteers/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);
  return (
    <div className="container-center py-7">
      <div className="flex flex-col gap-5">
        <img
          src={data?.thumbnailURL}
          alt="thumbnail"
          className="h-80 max-w-96 object-cover rounded-md"
        />
        <h3 className="text-2xl font-bold">{data?.postTitle}</h3>
        <p className="">{data?.description}</p>
        <p className="">Category: {data?.category}</p>
        <p className="">Location: {data?.location}</p>
        <p className="">
          Number of volunteers needed: {data?.numberOfVolunteers}
        </p>
        <p>Deadline: {data?.deadLine}</p>
        <p>Organizer Name: {data?.organizerName}</p>
        <p>Organizer Email: {data?.organizerEmail}</p>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary mt-6"
        onClick={() => document.getElementById("my_modal_1").showModal()}
        disabled={data.numberOfVolunteers === 0 ? "disabled" : ""}
      >
        Be a volunteer
      </button>

      {data.numberOfVolunteers === 0 && <p>Criteria met.</p>}

      <dialog
        id="my_modal_1"
        className="modal modal-backdrop text-base-content"
      >
        <div className="modal-box">
          <div className="max-w-xl mx-auto p-5 bg-base-200 shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Event Details
            </h1>

            {/* values from mongodb */}
            <form className="space-y-4">
              <div className="form-control">
                <img
                  src={data?.thumbnailURL}
                  alt="Thumbnail"
                  className="w-full h-64 object-cover rounded-lg"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Post Title</span>
                </label>
                <input
                  type="text"
                  // value={data?.postTitle}
                  defaultValue={data?.postTitle}
                  placeholder={data?.postTitle}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  defaultValue={data?.description}
                  className="textarea textarea-bordered w-full h-24"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  defaultValue={data?.category}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  defaultValue={data?.location}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">No. of Volunteers Needed</span>
                </label>
                <input
                  type="number"
                  defaultValue={data?.numberOfVolunteers}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Deadline</span>
                </label>
                <input
                  type="date"
                  defaultValue={data?.deadLine}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Organizer Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={data?.organizerName}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Organizer Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={data?.organizerEmail}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
            </form>

            {/* values from user */}
            <form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  defaultValue={user?.email || userMongo?.email || ""}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  defaultValue={user?.displayName || userMongo?.name || ""}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Suggestion</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  placeholder="Suggestion"
                  value={suggestion.suggestion ? suggestion.suggestion : ""}
                  onChange={(e) => {
                    setSuggestion({
                      ...suggestion,
                      suggestion: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  placeholder="request"
                  value={suggestion.request ? suggestion.request : "requested"}
                  onChange={(e) =>
                    setSuggestion({
                      ...suggestion,
                      request: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn mr-4">Close</button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  api
                    .post(`/volunteers/request/${data?._id}`, {
                      ...newData,
                      ...suggestion,
                      requestEmail: user?.email,
                    })
                    .then((res) => {
                      if (res.data.acknowledged) {
                        Swal.fire({
                          text: "Requested successfully",
                          icon: "success",
                        });
                      }
                    });
                }}
              >
                Request
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default VolunteerDetails;
