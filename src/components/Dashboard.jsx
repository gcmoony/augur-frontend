import Navbar from "./Navbar/Navbar"
import Layout from "./Layout/Layout"
import DistributorTable from "./DistributorTable/DistributorTable"
import DistributorGraphs from "./DistributorGraphs/DistributorGraphs"
import * as data from "./../assets/sample.json"
import { useState } from "react"
export default function Dashboard({ children }) {
  const [distData, setDistData] = useState(data.default)
  return (
    <>
      <Layout>
        <Navbar />
        <DistributorGraphs distributorData={distData}></DistributorGraphs>
        <DistributorTable distributorData={distData}></DistributorTable>
      </Layout>
    </>
  )
}
