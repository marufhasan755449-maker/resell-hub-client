import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../utils/axiosPublic";
import Hero from "../../components/home/Hero";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import PopularCategories from "../../components/home/PopularCategories";
import SuccessStories from "../../components/home/SuccessStories";
import MarketplaceStats from "../../components/home/MarketplaceStats";
import SustainabilityImpact from "../../components/home/SustainabilityImpact";
import TrustedSellers from "../../components/home/TrustedSellers";

const Home = () => {
  const { data: stats } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/stats");
      return res.data;
    },
  });

  return (
    <div>
      <Hero stats={stats} />
      <FeaturedProducts />
      <PopularCategories />
      <MarketplaceStats />
      <SuccessStories />
      <SustainabilityImpact />
      <TrustedSellers />
    </div>
  );
};

export default Home;
