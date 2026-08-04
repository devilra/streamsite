import PhotographyActivities from "./_components/PhotographyActivities";
import PhotographyHero from "./_components/PhotographyHero";
import PhotographyHighlights from "./_components/PhotographyHighlights";

const page = () => {
  return (
    <div>
      <PhotographyHero />
      <PhotographyActivities />
      <PhotographyHighlights />
    </div>
  );
};

export default page;
