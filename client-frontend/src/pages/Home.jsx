import banner from "../assests/banner.jpg";
import Category from "../components/category/Category";
const Home = () => {
  return (
    <div>
      <div>
        <img src={banner} width={"100%"} alt="banner" />
      </div>
      <Category />
    </div>
  );
};

export default Home;
