import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import api from "../axios/fetch";
import edit from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    api.get(`/volunteers/user/${user?.email}`).then((res) => {
      setMyPosts(res.data);
    });
  }, [user?.email]);
  return (
    <section className="container-center py-9">
      <h2 className="text-4xl mb-5">My posts</h2>
      {myPosts.length === 0 ? (
        <h3 className="text-3xl text-center font-bold">
          You have not added any posts yet.
        </h3>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>People Need</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts?.map((post) => (
                <tr key={post._id}>
                  <th>{post?.postTitle.split(" ").slice(0, 4).join(" ")}</th>
                  <td>{post?.category}</td>
                  <td>{post?.location}</td>
                  <td>{post?.numberOfVolunteers}</td>
                  <td className="flex gap-4 items-center">
                    <Link
                      to={`/volunteers/update/${post?._id}`}
                      className="cursor-pointer"
                    >
                      <img
                        src={edit}
                        alt="Edit icon"
                        className="inline-block cursor-pointer"
                      />
                    </Link>

                    <img
                      src={deleteIcon}
                      alt="Delete icon"
                      className="h-6 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyPosts;
