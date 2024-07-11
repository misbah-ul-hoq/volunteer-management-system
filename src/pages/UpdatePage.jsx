import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/fetch";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const UpdatePage = () => {
  const [currentPost, setCurrentPost] = useState({});

  const {
    thumbnailURL,
    postTitle,
    description,
    category,
    location,
    numberOfVolunteers,
    deadLine,
    organizerName,
    organizerEmail,
  } = currentPost;

  const params = useParams();

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const thumbnailURL = form.get("thumbnailURL");
    const postTitle = form.get("postTitle");
    const description = form.get("description");
    const category = form.get("category");
    const location = form.get("location");
    const numberOfVolunteers = parseInt(form.get("numberOfVolunteers"));
    const deadLine = form.get("deadLine");
    const updatePost = {
      thumbnailURL,
      postTitle,
      description,
      category,
      location,
      numberOfVolunteers,
      deadLine,
      organizerName,
      organizerEmail,
    };

    api.post(`/volunteers/update/${params.id}`, updatePost).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        Swal.fire({
          text: "Updated Successfully",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    api.get(`/volunteers/${params.id}`).then((res) => {
      setCurrentPost(res.data);
    });
  }, [params.id]);
  return (
    <form
      onSubmit={handleUpdatePost}
      className="container-center space-y-4 py-5"
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">Thumbnail</span>
        </label>
        <input
          type="text"
          defaultValue={thumbnailURL}
          name="thumbnailURL"
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Post Title</span>
        </label>
        <input
          type="text"
          defaultValue={postTitle}
          name="postTitle"
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          defaultValue={description}
          name="description"
          className="textarea textarea-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Category</span>
        </label>
        <input
          type="text"
          defaultValue={category}
          name="category"
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          defaultValue={location}
          className="input input-bordered"
          name="location"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">No. of volunteers needed</span>
        </label>
        <input
          type="number"
          defaultValue={numberOfVolunteers}
          name="numberOfVolunteers"
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Deadline</span>
        </label>
        <DatePicker
          // selected={deadline}
          value={deadLine}
          className="input input-bordered"
          name="deadLine"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Organizer Name</span>
        </label>
        <input
          type="text"
          defaultValue={organizerName}
          readOnly
          className="input input-bordered"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Organizer Email</span>
        </label>
        <input
          type="email"
          defaultValue={organizerEmail}
          readOnly
          className="input input-bordered"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update Post
      </button>
    </form>
  );
};

export default UpdatePage;
