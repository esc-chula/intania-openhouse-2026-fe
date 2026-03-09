import WorkshopAndActivitiesView from "@/sections/workshop-activities/view/workshop-activities";
import { Description } from "@mui/icons-material";

export const metadata = {
  title: "workshop-activities",
};

const mockStageData = [
    { id: 1, title: "Stepout", location: "ลานเกียร์", time: "11:00 น. - 12:00 น.", status: "ตอนนี้", image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description" },
    { id: 2, title: "IMC", location: "ลานเกียร์", time: "13:00 น. - 14:00 น.", status: "", image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description" },
    { id: 3, title: "Patt Recog", location: "หอประชุม", time: "13:00 น. - 14:00 น.", status: "", image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description" },
    { id: 4, title: "Comp Theory", location: "หอประชุม", time: "16:00 น. - 17:00 น.", status: "", image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description" },
];

const mockWorkshopData = [
    { id: 1, title: "Mechanical", location: "ลานเกียร์", time: "11:00 น. - 12:00 น.", department: "วิศวกรรมเครื่องกล", registered: 15, max: 20, image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description" },
    { id: 2, title: "Computer", location: "ตึก 100 ปี", time: "13:00 น. - 15:00 น.", department: "วิศวกรรมคอมพิวเตอร์", registered: 30, max: 30, image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description" },
    { id: 3, title: "Civil", location: "ตึก 3", time: "09:00 น. - 11:00 น.", department: "วิศวกรรมโยธา", registered: 10, max: 25, image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description" },
];

export default function TermsAndConditionsPage() {
  return (
    <WorkshopAndActivitiesView
      initialStageData={mockStageData}
      initialWorkshopData={mockWorkshopData}
    />
  );
}
