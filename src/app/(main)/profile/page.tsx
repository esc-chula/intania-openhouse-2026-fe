import ProfileView from "@/sections/profile/view/profile-view";

export const metadata = {
  title: "profile",
};

const mockWorkshopData = [
    { id: 1, title: "Mechanical", location: "ลานเกียร์", time: "11:00 น. - 12:00 น.", department: "วิศวกรรมเครื่องกล", registered: 15, max: 20, image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description", status: "จองแล้ว" },
    { id: 2, title: "Computer", location: "ตึก 100 ปี", time: "13:00 น. - 15:00 น.", department: "วิศวกรรมคอมพิวเตอร์", registered: 30, max: 30, image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description", status: "จองแล้ว" },
    { id: 3, title: "Civil", location: "ตึก 3", time: "09:00 น. - 11:00 น.", department: "วิศวกรรมโยธา", registered: 10, max: 25, image: "https://placehold.co/600x400?text=Hello+World", description: "placeholder description placeholder description placeholder description placeholder description placeholder description placeholder description", status: "จองแล้ว" },
];

const mockProfileData = {
  name: "MockMock NameName",
  email: "xxx123@gmail.com",
  bookingCount: 2,
  stampCount: 2,
  image: "https://placehold.co/640x640?text=image"
};

export default function ProfilePage() {
  return (
    <ProfileView initialWorkshopData={mockWorkshopData} 
                 userData={mockProfileData} 
    />
  );
}
