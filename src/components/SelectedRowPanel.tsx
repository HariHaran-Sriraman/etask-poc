import { Box, Button, IconButton, Grid as MuiGrid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailBoxSideNav from "./EmailBoxSideNav";
import MessageFrontDeskModal from "./MessageFrontDeskModal";
import EmailGrid from "./EmailGrid";

type taskStatus = 'Open' | 'In Progress' | 'Closed' | 'Pending' | 'Resolved';

interface RowData {
    caseId: string;
    subject: string;
    assignee: string;
    taskStatus: taskStatus;
    team: string;
    createdDate: string;
    messages: string[];
}

type forModel = 'send' | 'reply' | null;

interface SelectedRowPanelProps {
    selectedRow: RowData;
    open: boolean;
    modalType: forModel;
    handleOpen: (type: forModel) => void;
    handleClose: () => void;
    closePanel: () => void;
    gridFlex: number;
}

const SelectedRowPanel: React.FC<SelectedRowPanelProps> = ({
    selectedRow,
    open,
    modalType,
    handleOpen,
    handleClose,
    closePanel,
    gridFlex,
}) => {
    return (
        <Box flex={12 - gridFlex}>
            <Box height="18vh" padding="10px" border="1px solid #ddd" borderRadius="5px" bgcolor="#f9f9f9">
                <IconButton onClick={closePanel} style={{ float: "right" }}>
                    <CloseIcon />
                </IconButton>
                <h3>Selected Row Details</h3>

                <MuiGrid container spacing={2}>
                    <MuiGrid item xs={6}>
                        <Typography><strong>Case ID:</strong> {selectedRow.caseId}</Typography>
                    </MuiGrid>
                    <MuiGrid item xs={6}>
                        <Typography><strong>Subject:</strong> {selectedRow.subject}</Typography>
                    </MuiGrid>
                    <MuiGrid item xs={6}>
                        <Typography><strong>Assignee:</strong> {selectedRow.assignee}</Typography>
                    </MuiGrid>
                    <MuiGrid item xs={6}>
                        <Typography><strong>Task Status:</strong> {selectedRow.taskStatus}</Typography>
                    </MuiGrid>
                    <MuiGrid item xs={6}>
                        <Typography><strong>Team:</strong> {selectedRow.team}</Typography>
                    </MuiGrid>
                    <MuiGrid item xs={6}>
                        <Typography><strong>Created Date:</strong> {selectedRow.createdDate}</Typography>
                    </MuiGrid>
                </MuiGrid>
            </Box>
            <Box display="flex" flexDirection="column" height="23vh" padding="10px" border="1px solid #ddd" borderRadius="5px" bgcolor="#f9f9f9">
                <EmailGrid />
            </Box>
            <Box  height="44vh" padding="10px" border="1px solid #ddd" borderRadius="5px" bgcolor="#f9f9f9">
                <EmailBoxSideNav team={selectedRow.team} messages={selectedRow.messages} />
                <Button variant="contained" color="primary" sx={{ px: 4, py: 1.5, mx: 1, my: 1 }} onClick={() => handleOpen('send')}>
                    Send
                </Button>
                <Button variant="outlined" color="secondary" sx={{ px: 4, py: 1.5 }} onClick={() => handleOpen('reply')}>
                    Reply
                </Button>
            </Box>

            <MessageFrontDeskModal
                open={open}
                modalType={modalType}
                onClose={handleClose}
                selectedRow={selectedRow}
                closePanel={closePanel}
            />
        </Box>
    );
};

export default SelectedRowPanel;
