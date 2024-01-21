import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
import NewsLetter from "@/components/Newsletter/NewsLetter";
import PageSearch from "@/components/PageSearch/PageSearch";
import { getFeaturedProduct } from "@/libs/apis";

const Home = async () => {
  const featuredProduct = await getFeaturedProduct ();
  // console.log(featuredProduct);

 

  return (<> 
    <HeroSection/>
    <PageSearch/>
    <FeaturedProduct featuredProduct={featuredProduct}/>
    <Gallery/>
    <NewsLetter/>


  </>
  );
} ;
export default Home;