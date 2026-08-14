import React from "react";
import CricketHero from "./_components/CricketHero";
import MatchHighlights from "./_components/Matchhighlights";
import CommunityGallery from "./_components/Communitygallery";
import CricketPlayerStats from "./_components/Cricketplayerstats";

const page = () => {
  return (
    <div>
      <CricketHero />
      <CricketPlayerStats />
      <MatchHighlights />
      <CommunityGallery />
    </div>
  );
};

export default page;
