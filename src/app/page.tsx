"use client";

import {
  Box,
  Card,
  Stack,
  Radio,
  Button,
  Select,
  Switch,
  MenuItem,
  Checkbox,
  TextField,
  Typography,
  InputLabel,
  RadioGroup,
  FormControl,
  Autocomplete,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function Home() {
  const [selectValue, setSelectValue] = useState("1");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          bgcolor: "background.default",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h3" sx={{ mb: 5, color: "primary.main" }}>
          Intania Openhouse 2026 - Theme Showcase
        </Typography>

        <Stack spacing={5} maxWidth={800} margin="0 auto">
          {/* Typography */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Typography Showcase
            </Typography>
            <Stack spacing={2}>
              <Typography variant="h1">Heading 1 (h1)</Typography>
              <Typography variant="h2">Heading 2 (h2)</Typography>
              <Typography variant="h3">Heading 3 (h3)</Typography>
              <Typography variant="body1">
                Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Body 2: (Secondary Text) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Typography>
            </Stack>
          </Card>

          {/* Buttons */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Buttons
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: 2 }}
              flexWrap="wrap"
              useFlexGap
            >
              <Button variant="contained" color="primary">
                Contained Primary
              </Button>
              <Button variant="outlined" color="primary">
                Outlined Primary
              </Button>
              <Button variant="soft" color="primary">
                Soft Primary
              </Button>
              <Button variant="text" color="primary">
                Text Primary
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button variant="contained" color="secondary">
                Contained Secondary
              </Button>
              <Button variant="contained" color="error">
                Contained Error
              </Button>
              <Button variant="contained" color="warning">
                Contained Warning
              </Button>
              <Button variant="contained" color="success">
                Contained Success
              </Button>
            </Stack>
          </Card>

          {/* TextFields */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              TextFields & Autocomplete
            </Typography>
            <Stack spacing={3}>
              <TextField label="Standard Input" variant="outlined" fullWidth />
              <TextField
                label="Error Input"
                variant="outlined"
                error
                helperText="This is an error message"
                fullWidth
              />
              <TextField
                label="Disabled Input"
                variant="outlined"
                disabled
                fullWidth
                defaultValue="123"
              />

              <Autocomplete
                options={["Option 1", "Option 2", "Option 3"]}
                renderInput={(params) => (
                  <TextField {...params} label="Autocomplete" />
                )}
              />
            </Stack>
          </Card>

          {/* Selection Controls */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Selection Controls
            </Typography>
            <Stack direction="row" spacing={5}>
              {/* Checkboxes */}
              <Stack>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Checkboxes
                </Typography>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Checked"
                />
                <FormControlLabel control={<Checkbox />} label="Unchecked" />
                <FormControlLabel
                  control={<Checkbox disabled />}
                  label="Disabled"
                />
              </Stack>

              {/* Radios */}
              <Stack>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Radios
                </Typography>
                <RadioGroup defaultValue="1">
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Option 1"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Option 2"
                  />
                </RadioGroup>
              </Stack>

              {/* Switches */}
              <Stack>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Switches
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="On"
                />
                <FormControlLabel control={<Switch />} label="Off" />
              </Stack>
            </Stack>
          </Card>

          {/* Dropdown & Date */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Select & DatePicker
            </Typography>
            <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
              <FormControl fullWidth>
                <InputLabel>Select Option</InputLabel>
                <Select
                  value={selectValue}
                  label="Select Option"
                  onChange={(e) => setSelectValue(e.target.value)}
                >
                  <MenuItem value="1">Option 1</MenuItem>
                  <MenuItem value="2">Option 2</MenuItem>
                  <MenuItem value="3">Option 3</MenuItem>
                </Select>
              </FormControl>

              <DatePicker label="Select Date" sx={{ width: "100%" }} />
            </Stack>
          </Card>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
