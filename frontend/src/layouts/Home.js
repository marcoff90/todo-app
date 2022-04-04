import Logo from "../components/Logo";
import {Fade} from "react-awesome-reveal";
import Login from "../components/Login";

const Home = () => {
  return (
      <>
        <Logo/>
        <Fade delay={6500} duration={2000}>
          <Login/>
        </Fade>
      </>
  );
};
export default Home;
