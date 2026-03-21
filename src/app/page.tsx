import MainLayout from "@/layouts/main/layout";
import LandingView from "@/sections/landing/view/landing-view";

export const metadata = {
  title: "Welcome | Intania Openhouse 2026",
};

export default function LandingPage() {
  return (
    <MainLayout>
      <LandingView />
    </MainLayout>
  );
}
