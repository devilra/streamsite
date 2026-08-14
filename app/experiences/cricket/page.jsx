import React from "react";
import CricketHero from "./_components/CricketHero";
import MatchHighlights from "./_components/Matchhighlights";
import CommunityGallery from "./_components/Communitygallery";
import CricketPlayerStats from "./_components/Cricketplayerstats";
import GalleryVideos from "./_components/GalleryVideos.jsx";

const page = () => {
  return (
    <div>
      <CricketHero />
      {/* <CricketPlayerStats /> */}
      <GalleryVideos />
      {/* <MatchHighlights /> */}
      {/* <CommunityGallery /> */}
    </div>
  );
};

export default page;
