import CommunityGallery from "./_components/CommunityGallery";
import PhotographyActivities from "./_components/PhotographyActivities";
import PhotographyHero from "./_components/PhotographyHero";
import PhotographyHighlights from "./_components/PhotographyHighlights";
import PhotographyLocations from "./_components/PhotographyLocations";

const page = () => {
  return (
    <div>
      <PhotographyHero />
      <PhotographyActivities />
      {/* <PhotographyHighlights /> */}
      <CommunityGallery />
      <PhotographyLocations />
    </div>
  );
};

export default page;
