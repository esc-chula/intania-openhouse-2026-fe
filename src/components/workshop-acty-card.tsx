import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/th";
import Link from "next/link";

import type { TActivityItem } from "@/types/activity/get-activities-list";
import type { TWorkshopItem } from "@/types/workshop/get-workshops-list";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(buddhistEra);
dayjs.locale("th");

export type CardItem = TActivityItem | TWorkshopItem;

export function isWorkshop(item: CardItem): item is TWorkshopItem {
  return "total_seats" in item;
}

function formatTime(start: string, end: string): string {
  const s = dayjs.utc(start).format("HH:mm");
  const e = dayjs.utc(end).format("HH:mm");
  return `${s} น. - ${e} น.`;
}

function formatLocation(item: CardItem): string {
  if (isWorkshop(item)) {
    return item.location;
  }
  return item.building_name || "";
}

export interface WorkshopActyCardProps {
  item: CardItem;
  mode: "stage" | "workshop";
}

export function WorkshopActyCard({ item, mode }: WorkshopActyCardProps) {
  const title = isWorkshop(item) ? item.name : item.title;
  const location = formatLocation(item);
  const time = formatTime(item.start_time, item.end_time);
  const href =
    mode === "workshop" ? `/workshop/${item.id}` : `/activity/${item.id}`;

  return (
    <Link href={href} style={{ textDecoration: "none", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          containerType: "inline-size",
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          src={
            mode === "workshop"
              ? "/card/workshop-card.svg"
              : "/card/acty-card.svg"
          }
          sx={{
            width: "100%",
            display: "block",
            objectFit: "contain",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: "24px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              width: "100%",
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowX: "auto",
                whiteSpace: "nowrap",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#5B3722",
                  fontFamily: "var(--font-noto-thai)",
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                {title}
              </Typography>
            </Box>

            {!isWorkshop(item) && item.is_happening && (
              <Box
                sx={{
                  flexShrink: 0,
                  backgroundColor: "#D4EDDA",
                  color: "#155724",
                  padding: "4px 12px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "var(--font-noto-thai)",
                }}
              >
                ตอนนี้
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "max-content 1fr",
              columnGap: "16px",
              color: "#212B36",
              fontFamily: "var(--font-noto-thai)",
              fontSize: "16px",
              fontWeight: 500,
              width: "100%",
              overflowX: "auto",
              whiteSpace: "nowrap",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              สถานที่:
            </Typography>
            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              {location}
            </Typography>

            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              วันที่:
            </Typography>
            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              {dayjs
                .utc(item.event_date)
                .tz("Asia/Bangkok")
                .format("D MMMM BBBB")}
            </Typography>

            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              เวลา:
            </Typography>
            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
              }}
            >
              {time}
            </Typography>
            {isWorkshop(item) && (
              <>
                <Typography
                  sx={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  ภาควิชา:
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  {item.affiliation}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  ลงทะเบียน:
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  {item.registered_count}/{item.total_seats} คน
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
