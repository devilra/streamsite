import React from "react";
import Hero from "./Hero";
import UpcomingEvents from "./UpcomingEvents";
import CommunityClubs from "./CommunityClubs";
import AmenitiesStreamSide from "./AmenitiesStreamSide";
import LovedByExplorers from "./Lovedbyexplorers";
import Tents from "./Tents";

const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Hero />
      <Tents />
      <UpcomingEvents />
      {/* <CommunityClubs /> */}
      <AmenitiesStreamSide />
      <LovedByExplorers />
    </div>
  );
};

export default Home;
