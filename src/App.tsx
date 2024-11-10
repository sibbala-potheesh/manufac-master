import { useState } from "react";
import {
  MantineProvider,
  Container,
  Grid,
  Text,
  Box,
  Avatar,
} from "@mantine/core";
import { IconChartBar } from "@tabler/icons-react";
import { theme } from "./theme";
import "./App.css";
import Analytics from "./components/Analytics";
import AverageAnalytics from "./components/AverageAnalytics";

export default function App() {
  const [selectedSection, setSelectedSection] = useState<string>("production");

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <MantineProvider theme={theme}>
      <Container fluid>
        <Grid gutter={0}>
          {/* Sidebar */}
          <Grid.Col span={2}>
            <Box className="sidebar">
              <Text className="title">Manufac</Text>
              <hr className="sidebar-divider" />
              <Box mt="xl" className="text-container">
                <Text
                  className={`analytics-text ${
                    selectedSection === "production" ? "selected" : ""
                  }`}
                  onClick={() => handleSectionClick("production")}
                >
                  <IconChartBar size={18} className="icon" />
                  Production Analytics
                </Text>

                <Text
                  className={`analytics-text ${
                    selectedSection === "average" ? "selected" : ""
                  }`}
                  onClick={() => handleSectionClick("average")}
                >
                  <IconChartBar size={18} className="icon" />
                  Average Analytics
                </Text>
              </Box>

              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <hr className="footer-divider" />
              <Box
                className="sidebar-footer"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=faces&fit=crop&w=80&h=80"
                  alt="User"
                  size="xs"
                  className="user-avatar"
                />

                <Text
                  className="name"
                  style={{ marginLeft: "8px", marginBottom: "30px" }}
                >
                  sibbalapotheesh@gmail.com
                </Text>
              </Box>
            </Box>
          </Grid.Col>

          {/* Main Content */}
          <Grid.Col span={10} className="content">
            {selectedSection === "production" ? (
              <Analytics />
            ) : (
              <AverageAnalytics />
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </MantineProvider>
  );
}
