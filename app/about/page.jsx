import React from "react";
import AboutHero from "./_components/AboutHero";
import StreamSideHighlights from "./_components/StreamSideHighlights";
import ForestTrekking from "./_components/ForestTrekking";

const page = () => {
  return (
    <div>
      <AboutHero />
      <StreamSideHighlights />
      <ForestTrekking />
    </div>
  );
};

export default page;
