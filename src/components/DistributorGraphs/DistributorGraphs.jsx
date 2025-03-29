import { Grid, Card, Typography, Stack } from "@mui/material"
import { BarChart, Gauge, gaugeClasses } from "@mui/x-charts"
import { axisClasses } from "@mui/x-charts/ChartsAxis"
import { useState, useEffect } from "react"
export default function DistributorGraphs({ distributorData }) {
  const [tableData, setTableData] = useState(distributorData)
  const [toShipQty, setToShipQty] = useState([])
  useEffect(() => {
    setTableData(distributorData)
    buildPieChart()
  }, [distributorData])

  function buildPieChart() {
    let builtValues = []
    tableData.map((item) => {
      builtValues.push({
        id: item.id,
        label: item.distributor_name,
        value: item.forcasted_incoming_goods,
      })
    })

    const sortedBuiltValues = builtValues.toSorted((a, b) => b.value - a.value)
    const other = { id: 1337, label: "Other", value: 0 }
    let finalBuilt = []
    finalBuilt = sortedBuiltValues.slice(3)
    finalBuilt.map((item) => {
      other.value += item.value
    })
    // console.log(sortedBuiltValues[0])
    setToShipQty([
      sortedBuiltValues[0],
      sortedBuiltValues[1],
      sortedBuiltValues[2],
      other,
    ])
  }

  const getTotalToShip = () => {
    let totalVal = 0
    toShipQty.map((item) => {
      totalVal += item.value
    })
    return totalVal
  }

  return (
    <Grid
      container
      size={12}
      marginBottom={"2rem"}
      spacing={"1rem"}
    >
      <Grid
        container
        size={8}
      >
        <Card
          variant='elevation'
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: 0,
          }}
        >
          {toShipQty && toShipQty.length > 0 && (
            <BarChart
              title='Top 3 Most Shipped Distributors'
              grid={{ horizontal: true }}
              sx={{
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                  transform: "translateX(-20px)",
                },
                padding: "1rem",
              }}
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    toShipQty[0].label,
                    toShipQty[1].label,
                    toShipQty[2].label,
                  ],
                  label: "Distributor",
                },
              ]}
              yAxis={[{ label: "Quantity Shipped Last Month" }]}
              series={[
                {
                  data: [
                    toShipQty[0].value,
                    toShipQty[1].value,
                    toShipQty[2].value,
                  ],
                },
              ]}
              height={400}
            />
          )}

          <h3>Top 3 Most Shipped Distributors</h3>
        </Card>
      </Grid>

      <Grid
        container
        size={4}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          textAlign: "center",
        }}
        spacing={"1rem"}
      >
        <Card
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            lineHeight: 0,
          }}
          elevation={3}
        >
          {toShipQty && toShipQty.length > 0 ? (
            <Typography variant='h3'>{getTotalToShip()}</Typography>
          ) : (
            <h3>N/A</h3>
          )}
          <h3>Forecasted Shipments This Month</h3>
        </Card>
        <Card
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            lineHeight: 0,
          }}
          elevation={3}
        >
          {toShipQty && toShipQty.length > 0 ? (
            <Gauge
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 40,
                  transform: "translate(0px, 0px)",
                },
              }}
              value={(() => {
                return ((getTotalToShip() * 0.73) / getTotalToShip()) * 100
              })()}
            />
          ) : (
            <h3>N/A</h3>
          )}
          <h3>% Shipped</h3>
        </Card>
        {/* <Box textAlign={"center"}>
          <h3>To Ship This Month</h3>
        </Box> */}
      </Grid>
    </Grid>
  )
}
