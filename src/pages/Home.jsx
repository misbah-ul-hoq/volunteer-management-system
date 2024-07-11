import Hero from "../components/home/Hero";
import Sliders from "../components/home/Sliders";
import VolunteerNeeds from "../components/home/VolunteerNeeds";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Home | Volunteers");
  return (
    <div>
      <Hero />
      <Sliders />
      <VolunteerNeeds />
    </div>
  );
};

export default Home;
