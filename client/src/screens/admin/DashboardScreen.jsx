import React from 'react'
import SideNavigation from '../../components/admin/SideNavigation';
import Dashboard from '../../components/admin/Dashboard';

function DashboardScreen() {
  return (
    <div style={{display: 'flex'}}>
        <SideNavigation />
        <Dashboard />
    </div>
  )
}

export default DashboardScreen;
