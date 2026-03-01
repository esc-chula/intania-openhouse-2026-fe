import { useEffect } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormFirstStepValues } from "@/lib/validations/form";
import {
  THAILAND_PROVINCES,
  BANGKOK_DISTRICTS,
} from "@/lib/constants/form-options";

const activitiesOptions = [
  " Workshop (เฉพาะนักเรียน)",
  "Showcase & Sharing Session",
  "Innovation",
  "Club & CSR",
  "Hall & Stage",
  "Competition",
  "กิจกรรมอื่นๆในงาน",
];

const knowOptions = [
  "IG (@cuopenhouse)",
  "IG (@cuintaniaopenhouse)",
  "Facebook",
  "เพื่อน/ครอบครัว",
  "โฆษณา",
];

const travelOptions: string[] = [
  "รถยนต์ส่วนบุคคล",
  "เที่ยวบินในประเทศ",
  "รถกระบะส่วนบุคคล",
  "รถตู้ประจำทาง",
  "แท็กซี่",
  "รถโดยสารประจำทาง",
  "รถยนต์ไฟฟ้าส่วนบุคคล",
  "รถไฟดีเซลราง",
  "รถตู้ส่วนบุคคล",
  "เรือสาธารณะ",
  "จักรยานยนต์",
  "รถไฟฟ้า",
];

export function FormFirstStep() {
  const { control, setValue } = useFormContext<FormFirstStepValues>();
  const province = useWatch({ control, name: "province" });

  useEffect(() => {
    if (province !== "กรุงเทพมหานคร") {
      setValue("district", "");
    }
  }, [province, setValue]);

  return (
    <Stack spacing={1}>
      <Stack
        spacing={1.5}
        sx={{ padding: "14px 16px" }}
        bgcolor={"#FFFBF6"}
        borderRadius={1}
      >
        <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
          ข้อมูลส่วนตัว
        </Typography>
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="ชื่อ"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="นามสกุล"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={["ชาย", "หญิง", "ไม่ต้องการระบุ"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="เพศ"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="เบอร์โทร (เช่น 0XXXXXXXXX)"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              label="อีเมล"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Stack>

      <Stack
        spacing={1.5}
        sx={{ padding: "14px 16px" }}
        bgcolor={"#FFFBF6"}
        borderRadius={1}
      >
        <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
          ข้อมูลการเข้าร่วม
        </Typography>

        <Controller
          name="participantType"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={[
                "นักเรียน/ผู้ที่สนใจศึกษาต่อ",
                "นิสิตปัจจุบัน/นิสิตเก่าวิศวะจุฬาฯ",
                "นิสิต/นักศึกษาจากมหาลัยอื่น",
                "ครู",
                "ผู้ปกครอง/บุคคลภายนอก",
              ]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ประเภทผู้เข้าร่วม"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              slotProps={{
                listbox: {
                  sx: { maxHeight: 36 * 3, overflow: "auto" },
                },
              }}
            />
          )}
        />

        <Typography sx={{ color: "primary.main" }}>วันที่เข้าร่วม</Typography>
        <Controller
          name="attendDates"
          control={control}
          render={({ field, fieldState }) => {
            const handleToggle = (date: string) => {
              const current = field.value || [];
              const newDates = current.includes(date)
                ? current.filter((d) => d !== date)
                : [...current, date];
              field.onChange(newDates);
            };
            return (
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(field.value || []).includes("2026-03-28")}
                      onChange={() => handleToggle("2026-03-28")}
                    />
                  }
                  label="28 มีนาคม"
                  sx={{ color: "primary.main" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(field.value || []).includes("2026-03-29")}
                      onChange={() => handleToggle("2026-03-29")}
                    />
                  }
                  label="29 มีนาคม"
                  sx={{ color: "primary.main" }}
                />
                {!!fieldState.error && (
                  <FormHelperText error>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </Box>
            );
          }}
        />

        <Controller
          name="activities"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel>กิจกรรมที่สนใจ (เลือกได้หลายกิจกรรม)</InputLabel>
              <Select
                {...field}
                multiple
                value={field.value || []}
                onChange={(e) => field.onChange(e.target.value)}
                input={
                  <OutlinedInput label="กิจกรรมที่สนใจ (เลือกได้หลายกิจกรรม)" />
                }
                renderValue={(selected) => (selected as string[]).join(", ")}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 48 * 3 + 8 } },
                }}
              >
                {activitiesOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={(field.value || []).includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="knows"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel>ช่องทางที่รู้จักงาน</InputLabel>
              <Select
                {...field}
                multiple
                value={field.value || []}
                onChange={(e) => field.onChange(e.target.value)}
                input={<OutlinedInput label="ช่องทางที่รู้จักงาน" />}
                renderValue={(selected) => (selected as string[]).join(", ")}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 48 * 3 + 8 } },
                }}
              >
                {knowOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    <Checkbox checked={(field.value || []).includes(option)} />
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Stack>
      <Stack
        spacing={1.5}
        sx={{ padding: "14px 16px" }}
        bgcolor={"#FFFBF6"}
        borderRadius={1}
      >
        <Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
          ข้อมูลการเดินทาง
        </Typography>

        <Controller
          name="travelMethod"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={travelOptions}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    <Radio checked={selected} sx={{ mr: 1 }} />
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="วิธีการเดินทางมางาน"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />

        <Controller
          name="province"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              onChange={(_, data) => field.onChange(data)}
              options={THAILAND_PROVINCES}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    <Radio checked={selected} sx={{ mr: 1 }} />
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="จังหวัด"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />

        <Controller
          name="district"
          control={control}
          render={({ field, fieldState }) => (
            <Autocomplete
              {...field}
              value={field.value ?? null}
              disabled={province !== "กรุงเทพมหานคร"}
              onChange={(_, data) => field.onChange(data)}
              options={BANGKOK_DISTRICTS}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    <Radio checked={selected} sx={{ mr: 1 }} />
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="เขต (เฉพาะกรุงเทพมหานคร)"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
