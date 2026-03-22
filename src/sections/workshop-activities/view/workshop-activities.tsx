"use client";
import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  InputBase,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { WorkshopActyCard, isWorkshop } from "@/components/workshop-acty-card";
import type { CardItem } from "@/components/workshop-acty-card";
import { workshopQueryKeys } from "@/services/workshop/query/workshops-query";
import { activityQueryKeys } from "@/services/activity/query/activities-query";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function WorkshopAndActivitiesView() {
  const [mode, setMode] = useState<"stage" | "workshop">("stage");
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activitiesQuery = useQuery(
    activityQueryKeys.listOptions({ search: debouncedSearch || undefined }),
  );
  const workshopsQuery = useQuery(
    workshopQueryKeys.listOptions({ search: debouncedSearch || undefined }),
  );

  const currentQuery = mode === "stage" ? activitiesQuery : workshopsQuery;

  const data: CardItem[] =
    mode === "stage"
      ? (activitiesQuery.data?.activities ?? [])
      : (workshopsQuery.data?.workshops ?? []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [mode]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: "stage" | "workshop" | null,
  ) => {
    if (value) setMode(value);
  };

  const router = useRouter();

  const handleCardClick = (item: CardItem) => {
    if (isWorkshop(item)) {
      router.push(`/workshop/${item.id}`);
    } else {
      router.push(`/activity/${item.id}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100dvh",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        background: "url('/background/bg-workshop-activities.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "25px 25px",
        paddingBottom: "80px",
        gap: 2,
      }}
    >
      {/* Header: banner + image */}
      <Box
        sx={{
          position: "relative",
          width: "70%",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src="/banner/banner-no-text.svg"
          sx={{
            width: "100%",
            display: "block",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#5B3722",
            fontSize: "16px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          กิจกรรมและ
          <br />
          เวิร์คช็อป
        </Box>
      </Box>
      <Box
        component="img"
        src={
          mode === "workshop"
            ? "/background/bg-img-workshop.svg"
            : "/background/bg-img-acty.svg"
        }
        sx={{
          width: "100%",
          flexShrink: 0,
        }}
      />

      {/* Toggle + Search: sticky */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
          py: 1,
        }}
      >
      <ToggleButtonGroup
        color="primary"
        value={mode}
        exclusive
        aria-label="Platform"
        onChange={handleChange}
        sx={{
          backgroundColor: "#F5F0E6",
          borderRadius: "50px",
          padding: "5px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          border: "none",
          gap: 1,
          "& .MuiToggleButtonGroup-grouped": {
            border: "none",
            borderRadius: "50px",
            padding: "8px 15px",
            fontSize: "16px",
            fontWeight: 500,
            color: "#5C3722",
            "&.Mui-selected": {
              backgroundColor: "#5C3D2E",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#4A3125",
              },
            },
          },
        }}
      >
        <ToggleButton value="stage">ตารางกลางเวที</ToggleButton>
        <ToggleButton value="workshop">เวิร์คช็อป</ToggleButton>
      </ToggleButtonGroup>

      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F5F0E6",
          borderRadius: "6px",
          padding: "4px 20px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
          border: 2,
          borderColor: "#E5E8EB",
        }}
      >
        <InputBase
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={
            mode === "workshop" ? "ค้นหาเวิร์คช็อป" : "ค้นหาตารางเวลาเวที"
          }
          sx={{
            flex: 1,
            fontSize: "30px",
            fontFamily: "inherit",
            color: "#5C3722",
            "& input::placeholder": {
              color: "#6B7280",
              opacity: 1,
            },
          }}
        />
        <SearchIcon
          sx={{ color: "#6B7280", fontSize: "35px", cursor: "pointer" }}
        />
      </Box>
      </Box>

      {/* Cards */}
      <Stack
        ref={scrollRef}
        spacing={2}
        sx={{
          width: "100%",
          maxWidth: "500px",
          paddingTop: 1,
          paddingBottom: 4,
        }}
      >
        {currentQuery.isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
            <CircularProgress sx={{ color: "#5C3722" }} />
          </Box>
        ) : currentQuery.isError ? (
          <Box sx={{ padding: "30px" }}>
            <Typography
              sx={{
                textAlign: "center",
                color: "#B71931",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
            </Typography>
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ padding: "30px" }}>
            <Typography
              sx={{
                textAlign: "center",
                color: "#5C3722",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              ไม่พบกิจกรรมที่ค้นหา
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "#637381",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              ลองเปลี่ยนคำค้นหา
              <br />
              หรือค้นหากิจกรรมอื่นๆแทน
            </Typography>
          </Box>
        ) : (
          data.map((item) => (
            <Box
              key={item.id}
              onClick={() => handleCardClick(item)}
              sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
            >
              <WorkshopActyCard item={item} mode={mode} />
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
}
