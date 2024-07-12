import { useContext, useEffect, useState } from "react";
import api from "../axios/fetch";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const MyReqs = () => {
  const { user } = useContext(AuthContext);
  const [myReqs, setMyReqs] = useState([]);
  useEffect(() => {
    api.get(`/requests/${user?.email}`).then((res) => {
      setMyReqs(res.data);
    });
  }, [user?.email]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api.post(`/requests/delete/${id}`).then((res) => {
          console.log(res.data);
          setMyReqs(myReqs.filter((req) => req._id != id));
          if (res.data.deletedCount == 1) {
            Swal.fire({
              title: "Deleted successfully",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="container-center my-10">
      <div className="overflow-x-auto">
        {myReqs.length === 0 && (
          <h3 className="text-center text-3xl font-bold">
            You have not added any post
          </h3>
        )}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Categoy</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 3 */}
            {myReqs?.map((req) => (
              <tr key={req._id}>
                <th>{req?.postTitle}</th>
                <td>{req?.category}</td>
                <td>{req?.location}</td>
                <td
                  className="btn btn-warning btn-sm"
                  onClick={() => handleCancel(req?._id)}
                >
                  cancel
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReqs;
