import React from 'react'
import { useFrontDeskGridStore } from '../store/FrontDeskStore'
import { useSettlementGridStore } from '../store/SettlementStore'
import { Status } from '../store/function'
import { Box, Typography } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useLocation } from "react-router-dom";

const statusColors: Record<Status, string> = {
  Open: '#f44336',         // Green
  'In Progress': 'yellow', // Orange
  Closed: '#4caf50',       // Red
  Pending: 'orange',      // Amber
  Resolved: 'white',     // Blue
}

const StatusSummary: React.FC = () => {
  const location = useLocation();
  let useGridStore;
  if(location.pathname === '/Settlementtasks' || location.pathname === '/breaks') {
    useGridStore= useSettlementGridStore;
  } else {
    useGridStore= useFrontDeskGridStore;
  }
  const statusCounts = useGridStore((state) => state.statusCounts)

  return (
    <Box display="flex" gap={3} alignItems="center" justifyContent="flex-end" padding={1}>
      {Object.entries(statusCounts).map(([status, count]) => (
        <Box key={status} display="flex" alignItems="center" gap={1}>
          <FiberManualRecordIcon fontSize="small" style={{ color: statusColors[status as Status] }} />
          <Typography variant="body2" fontWeight={500}>
            {count} {status}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default StatusSummary
