import React from "react";
import CricketHero from "./_components/CricketHero";
import MatchHighlights from "./_components/Matchhighlights";
import CommunityGallery from "./_components/Communitygallery";

const page = () => {
  return (
    <div>
      <CricketHero />
      <MatchHighlights />
      <CommunityGallery />
    </div>
  );
};

export default page;
