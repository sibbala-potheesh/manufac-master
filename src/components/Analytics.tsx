/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Text, Paper, Table, Input } from "@mantine/core";
import _ from "lodash";
import cropData from "../data/Cropdata.json";
import "./Analytics.css";

// Function to aggregate crop data by year
const aggregateData = (data: any[]) => {
  const groupedData = _.groupBy(data, (item: any) => {
    // Extract the year from the "Year" field (e.g., "Financial Year (Apr - Mar), 2018" -> "2018")
    return item["Year"].split(",")[1].trim();
  });

  // Map over grouped data to get the crop with maximum and minimum production for each year
  return _.map(groupedData, (items: any, year: any) => {
    const maxProductionCrop = _.maxBy(
      items,
      (item: any) => item["Crop Production (UOM:t(Tonnes))"]
    );
    const minProductionCrop = _.minBy(
      items,
      (item: any) => item["Crop Production (UOM:t(Tonnes))"]
    );

    return {
      year,
      maxCrop: maxProductionCrop ? maxProductionCrop["Crop Name"] : "",
      minCrop: minProductionCrop ? minProductionCrop["Crop Name"] : "",
    };
  });
};

const Analytics: React.FC = () => {
  const [searchYear, setSearchYear] = useState("");
  const aggregatedRows = aggregateData(cropData);

  // Filter rows based on search input
  const filteredRows = aggregatedRows.filter((row: any) =>
    row.year.includes(searchYear)
  );

  return (
    <Paper shadow="xs" className="analytics-paper">
      <Text size="xl" className="analytics-title">
        Crop Production Analytics
      </Text>
      <Text mt="md" className="analytics-description">
        This table shows the crop with the maximum and minimum production for
        each year.
      </Text>

      <Input
        placeholder="Filter by year..."
        value={searchYear}
        onChange={(event) => setSearchYear(event.currentTarget.value)}
        mt="md"
        className="analytics-filter-input"
      />

      <div className="analytics-table-wrapper">
        <Table
          stickyHeader
          stickyHeaderOffset={60}
          mt="xl"
          className="analytics-table"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Year</Table.Th>
              <Table.Th>Crop with Maximum Production</Table.Th>
              <Table.Th>Crop with Minimum Production</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredRows.map((row: any) => (
              <Table.Tr key={row.year}>
                <Table.Td>{row.year}</Table.Td>
                <Table.Td>{row.maxCrop}</Table.Td>
                <Table.Td>{row.minCrop}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </Paper>
  );
};

export default Analytics;
