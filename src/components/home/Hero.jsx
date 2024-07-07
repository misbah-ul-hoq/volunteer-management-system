import BlurryBg from "./BlurryBg";
import { Slide } from "react-awesome-reveal";
const Hero = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2 items-center container-center pt-10 overflow-x-hidden">
      <div className="content h-full flex items-center justify-center mb-10 md:mb-0">
        <Slide triggerOnce={true}>
          <BlurryBg />
        </Slide>
      </div>
      <div className="illustrator">
        <Slide direction="right" triggerOnce={true}>
          <img src="/illustrator-1.png" alt="" />
        </Slide>
      </div>
    </div>
  );
};

export default Hero;
