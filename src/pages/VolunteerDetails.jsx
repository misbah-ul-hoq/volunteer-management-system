import { useEffect, useState } from "react";
import api from "../axios/fetch";
import { useParams } from "react-router-dom";

const VolunteerDetails = () => {
  const id = useParams().id;
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get(`/volunteers/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [id]);
  return (
    <div className="container-center py-7">
      <div className="flex flex-col gap-5">
        <img
          src={data?.thumbnailURL}
          alt="thumbnail"
          className="h-80 object-cover rounded-md"
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
    </div>
  );
};

export default VolunteerDetails;
