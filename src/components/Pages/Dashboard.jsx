import React from 'react'
import {DashboardComp} from '../ContentPages/index'

function Dashboard() {

  const sampleData = {
    uploadedProjects: 12,
    downloadedProjects: 8,
    coinsEarned: 350,
  };

  return (
    <DashboardComp data={sampleData}/>
  )
}

export default Dashboard