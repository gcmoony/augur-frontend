import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect } from "react"

import { Box } from "@mui/material"
import { useState } from "react"

export default function DistributorTable({ distributorData }) {
  useEffect(() => {
    setTableData(distributorData)
  }, distributorData)

  const [tableData, setTableData] = useState()

  return (
    <Box>
      <DataGrid
        slots={{
          toolbar: GridToolbar,
        }}
        sx={{
          "& .MuiDataGrid-row": {
            color: "inherit",
          },
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        rows={tableData}
        columns={[
          {
            headerName: "Distributor",
            field: "distributor_name",
            description: "Name of Distributor",
            flex: 1,
          },
          {
            headerName: "Last Month # Shipped",
            field: "last_month_quantity_shipped",
            description: "Quantity of goods shipped last month",
            flex: 1,
          },
          {
            headerName: "YTD Avg. / Month",
            field: "ytd_avg_goods_per_month",
            description: "Year-to-date average goods shipped per month.",
            flex: 1,
          },
          {
            headerName: "Forecasted # to Ship",
            field: "forcasted_incoming_goods",
            description:
              "Forecasted quantity of goods to ship this coming month.",
            flex: 1,
          },
        ]}
      ></DataGrid>
    </Box>
  )
}
