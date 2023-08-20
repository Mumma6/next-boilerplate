import React from "react"
import { DashboardLayout } from "../components/dashboard/DashboardLayout"
import Settings from "@/components/settings/Settings"

const SettingPage = () => {
  return (
    <>
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    </>
  )
}

export default SettingPage
