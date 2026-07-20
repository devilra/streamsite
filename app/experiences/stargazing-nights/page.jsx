import React from "react";
import StargazingHero from "./_components/StargazingHero";
import StargazingOverview from "./_components/StargazingOverview";
import UpcomingStargazingEvents from "./_components/UpcomingStargazingEvents";
import NightSkyTimeline from "./_components/NightSkyTimeline";
import TelescopeExperience from "./_components/TelescopeExperience";

const page = () => {
  return (
    <div>
      <StargazingHero />
      <StargazingOverview />
      <UpcomingStargazingEvents />
      {/* <NightSkyTimeline /> */}
      <TelescopeExperience />
    </div>
  );
};

export default page;
