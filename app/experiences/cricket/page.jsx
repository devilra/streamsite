import React from "react";
import CricketHero from "./_components/CricketHero";
import MatchHighlights from "./_components/Matchhighlights";
import CommunityGallery from "./_components/Communitygallery";
import CricketPlayerStats from "./_components/Cricketplayerstats";
import GalleryVideos from "./_components/GalleryVideos.jsx";
import RecentMatches from "./_components/RecentMatches";
import MyTeamCarousel from "./_components/MyTeamCarousel";

const page = () => {
  return (
    <div>
      <CricketHero />
      {/* <CricketPlayerStats /> */}
      <MyTeamCarousel />
      <GalleryVideos />
      {/* <MatchHighlights /> */}
      {/* <CommunityGallery /> */}
      <RecentMatches />
    </div>
  );
};

export default page;
