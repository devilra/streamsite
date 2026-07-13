import React from "react";
import TrekHero from "./_components/TrekHero";
import TrekOverview from "./_components/TrekOverview";
import TrekHighlights from "./_components/TrekHighlights";

const page = () => {
  return (
    <div>
      <TrekHero />
      <TrekOverview />
      <TrekHighlights />
    </div>
  );
};

export default page;
