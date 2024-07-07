import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../providers/AuthProvider";
import api from "../axios/fetch";
import Swal from "sweetalert2";

const FormComponent = () => {
  const { user, loading } = useContext(AuthContext);
  const [userFromMongo, setUser] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    api.get(`/user?email=${user?.email}`).then((res) => {
      setUser(res.data.name);
    });
  }, [user?.email]);

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const thumbnailURL = form.get("thumbnailURL");
    const postTitle = form.get("postTitle");
    const description = form.get("description");
    const category = form.get("category");
    const location = form.get("location");
    const numberOfVolunteers = form.get("numberOfVolunteers");
    const deadLine = startDate;
    const volunteerPost = {
      thumbnailURL,
      postTitle,
      description,
      category,
      location,
      numberOfVolunteers,
      deadLine,
      organizerName: user?.displayName,
      organizerEmail: user?.email,
    };
    api
      .post("/volunteers/create", volunteerPost)
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Data inserted successfully",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 py-7 text-xl">
      <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
      <form className="space-y-4" onSubmit={handleAddPost}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Thumbnail url</span>
          </label>
          <input
            type="text"
            name="thumbnailURL"
            placeholder="Enter thumbnail URL"
            className="file-input file-input-bordered w-full p-1 pl-2"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Post Title</span>
          </label>
          <input
            type="text"
            name="postTitle"
            placeholder="Post Title"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            rows="4"
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            placeholder="Category"
            name="category"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            placeholder="Location"
            name="location"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">No. of Volunteers Needed</span>
          </label>
          <input
            type="number"
            placeholder="No. of Volunteers Needed"
            name="numberOfVolunteers"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Deadline</span>
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Organizer Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName || userFromMongo?.name || ""}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Organizer Email</span>
          </label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-200"
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary w-full">Add Post</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
