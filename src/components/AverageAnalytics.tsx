/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Text, Paper, Table, Input } from "@mantine/core";
import _ from "lodash";
import cropData from "../data/Cropdata.json";
import "./AverageAnalytics.css";

// Function to calculate average yield and average cultivation area for crops between 1950 and 2020
const aggregateCropAverages = (data: any[]) => {
  // Filter the data for years between 1950 and 2020
  const filteredData = data.filter((item: any) => {
    const year = parseInt(item["Year"].split(",")[1].trim());
    return year >= 1950 && year <= 2020;
  });

  // Group the data by crop name
  const groupedByCrop = _.groupBy(
    filteredData,
    (item: any) => item["Crop Name"]
  );

  // Calculate average yield and average cultivation area for each crop
  return _.map(groupedByCrop, (items: any, cropName: any) => {
    const totalYield = _.sumBy(items, (item: any) => {
      // If the yield value is an empty string, treat it as 0
      const yieldValue = item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];
      return yieldValue === "" || isNaN(yieldValue) ? 0 : yieldValue;
    });

    const totalArea = _.sumBy(items, (item: any) => {
      // If the area value is an empty string, treat it as 0
      const areaValue = item["Area Under Cultivation (UOM:Ha(Hectares))"];
      return areaValue === "" || isNaN(areaValue) ? 0 : areaValue;
    });

    const count = items.length;

    const averageYield = count ? totalYield / count : 0;
    const averageArea = count ? totalArea / count : 0;

    // Ensure that if the value is NaN, it defaults to 0
    return {
      cropName,
      averageYield: isNaN(averageYield) ? 0 : averageYield,
      averageArea: isNaN(averageArea) ? 0 : averageArea,
    };
  });
};

const AverageAnalytics: React.FC = () => {
  const [searchYear, setSearchYear] = useState("");
  const cropAverages = aggregateCropAverages(cropData);

  return (
    <Paper shadow="xs" className="analytics-paper">
      <Text size="xl" className="analytics-title">
        Average Crop Yield and Area (1950-2020)
      </Text>
      <Text mt="md" className="analytics-description">
        This table shows the average crop yield and cultivation area for each
        crop between 1950 and 2020.
      </Text>

      <Input
        placeholder="Filter by crop name..."
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
              <Table.Th>Crop Name</Table.Th>
              <Table.Th>Average Yield (Kg/Ha)</Table.Th>
              <Table.Th>Average Area (Ha)</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {cropAverages
              .filter((row: any) =>
                row.cropName.toLowerCase().includes(searchYear.toLowerCase())
              )
              .map((row: any) => (
                <Table.Tr key={row.cropName}>
                  <Table.Td>{row.cropName}</Table.Td>
                  <Table.Td>{row.averageYield.toFixed(3)}</Table.Td>
                  <Table.Td>{row.averageArea.toFixed(3)}</Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
      </div>
    </Paper>
  );
};

export default AverageAnalytics;
