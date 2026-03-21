"use client";

import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/home",
    icon: "/icon/nav/home-outline.svg",
    activeIcon: "/icon/nav/home-solid.svg",
  },
  {
    label: "Information",
    href: "/quick-info/department-and-club",
    icon: "/icon/nav/information-outline.svg",
    activeIcon: "/icon/nav/information-solid.svg",
  },
  {
    label: "Activity",
    href: "/workshop-activities",
    icon: "/icon/nav/notepad-outline.svg",
    activeIcon: "/icon/nav/notepad-solid.svg",
  },
  {
    label: "Game",
    href: "/stamp",
    icon: "/icon/nav/apps-outline.svg",
    activeIcon: "/icon/nav/apps-solid.svg",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: "/icon/nav/user-outline.svg",
    activeIcon: "/icon/nav/user-solid.svg",
  },
];

const HIDDEN_PATHS = ["/terms-and-conditions", "/form", "/checkin", "/"];

export function shouldShowBottomNav(pathname: string): boolean {
  return (
    !HIDDEN_PATHS.includes(pathname) &&
    !pathname.startsWith("/activity/") &&
    !pathname.startsWith("/workshop/")
  );
}

export function BottomNav() {
  const pathname = usePathname();

  const shouldHide =
    HIDDEN_PATHS.includes(pathname) ||
    pathname.startsWith("/activity/") ||
    pathname.startsWith("/workshop/");

  if (shouldHide) return null;

  return (
    <>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "40px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "1.5px solid #F8F3E8",
          backgroundColor: "#5B3722",
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.25,
                }}
              >
                <Box
                  component="img"
                  src={isActive ? item.activeIcon : item.icon}
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: isActive ? 700 : 400,
                    color: "#F8F3E8",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </>
  );
}
