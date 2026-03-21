import DepartmentAndClubView from "../../../../../sections/quick-info/department-and-club/$id/view/department-and-club-detail-view";
import React from "react";

type Props = {
  params: Promise<{ id: number }>;
};

async function DepartmentAndClubDetailPage({ params }: Props) {
  const { id } = await params;
  return <DepartmentAndClubView id={id} />;
}

export default DepartmentAndClubDetailPage;
