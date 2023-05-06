import banner from "../assests/banner.jpg";
import Category from "../components/category/Category";
import PopularProducts from "../components/popular-product/PopularProducts";
const Home = () => {
  return (
    <div>
      <div>
        <img src={banner} width={"100%"} alt="banner" />
      </div>
      <Category />
      <PopularProducts />
    </div>
  );
};

export default Home;
