import React from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import EmailBox from "./EmailBox";
import { useFrontDeskGridStore } from '../store/FrontDeskStore';
import { useSettlementGridStore } from '../store/SettlementStore';

interface RowData {
  caseId: string;
  subject: string;
  assignee: string;
  taskStatus: taskStatus;
  team: string;
  createdDate: string;
  messages: string[];
}

type taskStatus = 'Open' | 'In Progress' | 'Closed' | 'Pending' | 'Resolved';

type Props = {
  open: boolean;
  modalType: 'send' | 'reply' | null;
  onClose: () => void;
  selectedRow: RowData;
  closePanel: () => void;
};


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const MessageFrontDeskModal: React.FC<Props> = ({ open, modalType, onClose, selectedRow, closePanel }) => {
  const [subject, setSubject] = React.useState('');
  const [mailaddress, setEmailAddress] = React.useState('');
  const [team, setTeam] = React.useState('');
  const [newMessage, setNewMessage] = React.useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isFrontdesk = path.includes("/frontdesktasks");
  const firstLabel = isFrontdesk ? "Settlement Team" : "Frontdesk Team";

  const handleSubmit = () => {
    const appendedmessages = [...selectedRow.messages, newMessage];
    const newRow: RowData = {
      caseId: selectedRow.caseId,
      subject: subject,
      assignee: selectedRow.assignee,
      taskStatus: "In Progress",
      team: team,
      createdDate: selectedRow.createdDate,
      messages: appendedmessages
    };

    if (modalType === "send") {
      if (isFrontdesk) {
        useFrontDeskGridStore.getState().removeRow(newRow.caseId);
        useSettlementGridStore.getState().addRow(newRow);
        // navigate('/Settlementtasks');
      } else {
        useSettlementGridStore.getState().removeRow(newRow.caseId);
        useFrontDeskGridStore.getState().addRow(newRow);
        // navigate('/frontdesktasks');
      }
    }

    if (modalType === "reply") {
      if (isFrontdesk) {
        useFrontDeskGridStore.getState().removeRow(newRow.caseId);
      } else {
        useSettlementGridStore.getState().removeRow(newRow.caseId);
      }
    }
    onClose();
    closePanel();
    setSubject('');
    setTeam('');
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>

        <Typography variant="h6" mb={2}>
          {modalType === 'send' ? 'Send Message' : 'Reply Message'}
        </Typography>
        {modalType === 'reply' && (
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={mailaddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}
        <TextField
          fullWidth
          label="Subject"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ mb: 2 }}
        />
        {modalType === 'send' && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="team-select-label">Team</InputLabel>
            <Select
              labelId="team-select-label"
              value={team}
              label="Team"
              onChange={(e) => setTeam(e.target.value)}
            >
              <MenuItem value={firstLabel}>{firstLabel}</MenuItem>
              <MenuItem value="Audit Team">Audit Team</MenuItem>
            </Select>
          </FormControl>
        )}

        <EmailBox team={selectedRow.team} messages={selectedRow.messages} newMessage={newMessage}
          setNewMessage={setNewMessage} />

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {modalType === 'send' ? 'Send' : 'Reply'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MessageFrontDeskModal;
