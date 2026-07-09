import React from "react";
import Hero from "./Hero";
import UpcomingEvents from "./UpcomingEvents";
import CommunityClubs from "./CommunityClubs";
import AmenitiesStreamSide from "./AmenitiesStreamSide";

const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Hero />
      <UpcomingEvents />
      <CommunityClubs />
      <AmenitiesStreamSide />
    </div>
  );
};

export default Home;
