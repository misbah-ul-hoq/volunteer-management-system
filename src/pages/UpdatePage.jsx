import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/fetch";

const UpdatePage = () => {
  const [currentPost, setCurrentPost] = useState({});
  const params = useParams();

  useEffect(() => {
    api.get(`/volunteers/${params.id}`).then((res) => {
      setCurrentPost(res.data);
      console.log(res.data);
    });
  }, [params.id]);
  return <div>UpdatePage</div>;
};

export default UpdatePage;
