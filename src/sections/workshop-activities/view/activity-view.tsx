"use client";

import { BackButton } from "@/components/back-button";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { activityQueryKeys } from "@/services/activity/query/activity-query";
import { useAuth } from "@/contexts/auth-provider";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/th";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);
dayjs.locale("th");

export default function ActivityView() {
  const params = useParams<{ id: string }>();
  const { loading: authLoading } = useAuth();

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery(activityQueryKeys.detailOptions(params.id, authLoading));

  if (isLoading || !activity) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          background: "url('/background/bg-landing.png')",
          backgroundSize: "cover",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          background: "url('/background/bg-landing.png')",
          backgroundSize: "cover",
        }}
      >
        <Typography color="error">Failed to load activity data</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        background: "url('/background/bg-landing.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          padding: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 3,
        }}
      >
        <BackButton />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box
            component="img"
            src="/banner/activity-banner.svg"
            sx={{
              width: "80%",
              display: "block",
              marginX: "auto",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#5B3722",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            {activity.title}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            paddingX: 4.625,
            marginX: "auto",
          }}
        >
          <Box
            component="img"
            src="/banner/image-banner.svg"
            sx={{
              width: "100%",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50.5%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              aspectRatio: "4 / 3",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={activity.image || "/example.png"}
              sx={{
                width: "100%",
                height: "90%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
        <Stack
          sx={{
            display: "flex",
            backgroundColor: "#F8F3E8",
            flexDirection: "column",
            alignSelf: "center",
            padding: 2,
            gap: 1.5,
            flexGrow: 1,
            borderRadius: 1,
            boxShadow:
              "0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.20)",
          }}
        >
          <Box sx={{display: "flex"}}>
            <Stack marginRight={1}>
              <Typography variant="body2">สถานที่:</Typography>
              <Typography variant="body2">วันที่:</Typography>
              <Typography variant="body2">เวลา:</Typography>
            </Stack>
            <Stack>
              <Typography variant="body2">
                {[activity.room_name, activity.building_name]
                  .filter(Boolean)
                  .join(" ")}
              </Typography>
              <Typography variant="body2">
                {dayjs
                  .utc(activity.start_time)
                  .tz("Asia/Bangkok")
                  .format("D MMMM BBBB")}
              </Typography>
              <Typography variant="body2">
                {dayjs(activity.start_time).format("HH:mm")} น. -&nbsp;
                {dayjs(activity.end_time).format("HH:mm")} น.
              </Typography>
            </Stack>
          </Box>

          <Typography variant="caption">{activity.description}</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
