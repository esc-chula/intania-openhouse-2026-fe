import WorkshopAndActivitiesView from "@/sections/workshop-activities/view/workshop-activities";

export const metadata = {
  title: "workshop-activities",
};

export default function WorkshopActivitiesPage() {
  return (
    <>
      <link rel="preload" href="/card/workshop-card.svg" as="image" />
      <link rel="preload" href="/card/acty-card.svg" as="image" />
      <link rel="preload" href="/banner/banner-no-text.svg" as="image" />
      <link rel="preload" href="/background/bg-img-acty.svg" as="image" />
      <link rel="preload" href="/background/bg-img-workshop.svg" as="image" />
      <WorkshopAndActivitiesView />
    </>
  );
}
