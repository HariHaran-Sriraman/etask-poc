
import { create } from 'zustand';
import { computeStatusCounts } from './function'

type taskStatus = 'Open' | 'In Progress' | 'Closed' | 'Pending' | 'Resolved';

interface RowData {
    caseId: string;
    subject: string;
    assignee: string;
    taskStatus: taskStatus;
    team: string;
    createdDate: string;
    messages: string[];
};

const sampleData: RowData[] = [
  {
      "caseId": "001",
      "subject": "reg. wrong brokerage calculation",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-04-25", 
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "002",
      "subject": "Issue B",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28", 
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "003",
      "subject": "Issue C",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "004",
      "subject": "Issue D",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "005",
      "subject": "Issue E",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "006",
      "subject": "Issue F",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "007",
      "subject": "Issue G",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "008",
      "subject": "Issue H",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "009",
      "subject": "Issue I",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "010",
      "subject": "Issue J",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "011",
      "subject": "Issue K",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "012",
      "subject": "Issue L",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "013",
      "subject": "Issue M",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "014",
      "subject": "Issue N",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "015",
      "subject": "Issue O",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "016",
      "subject": "Issue P",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "017",
      "subject": "Issue Q",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "018",
      "subject": "Issue R",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "019",
      "subject": "Issue S",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "020",
      "subject": "Issue T",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "021",
      "subject": "Issue U",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "022",
      "subject": "Issue V",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "023",
      "subject": "Issue W",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "024",
      "subject": "Issue X",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "025",
      "subject": "Issue Y",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "026",
      "subject": "Issue Z",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "027",
      "subject": "Issue A",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "028",
      "subject": "Issue B",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "029",
      "subject": "Issue C",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "030",
      "subject": "Issue D",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "031",
      "subject": "Issue E",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "032",
      "subject": "Issue F",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "033",
      "subject": "Issue G",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "034",
      "subject": "Issue H",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "035",
      "subject": "Issue I",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "036",
      "subject": "Issue J",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "037",
      "subject": "Issue K",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "038",
      "subject": "Issue L",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "039",
      "subject": "Issue M",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "040",
      "subject": "Issue N",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "041",
      "subject": "Issue O",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "042",
      "subject": "Issue P",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "043",
      "subject": "Issue Q",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "044",
      "subject": "Issue R",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "045",
      "subject": "Issue S",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "046",
      "subject": "Issue T",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "047",
      "subject": "Issue U",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "048",
      "subject": "Issue V",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "049",
      "subject": "Issue W",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "050",
      "subject": "Issue X",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "051",
      "subject": "Issue Y",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "052",
      "subject": "Issue Z",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "053",
      "subject": "Issue A",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "054",
      "subject": "Issue B",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "055",
      "subject": "Issue C",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "056",
      "subject": "Issue D",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "057",
      "subject": "Issue E",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "058",
      "subject": "Issue F",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "059",
      "subject": "Issue G",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "060",
      "subject": "Issue H",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "061",
      "subject": "Issue I",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "062",
      "subject": "Issue J",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "063",
      "subject": "Issue K",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "064",
      "subject": "Issue L",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "065",
      "subject": "Issue M",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "066",
      "subject": "Issue N",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "067",
      "subject": "Issue O",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "068",
      "subject": "Issue P",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "069",
      "subject": "Issue Q",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "070",
      "subject": "Issue R",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "071",
      "subject": "Issue S",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "072",
      "subject": "Issue T",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "073",
      "subject": "Issue U",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "074",
      "subject": "Issue V",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "075",
      "subject": "Issue W",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "076",
      "subject": "Issue X",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "077",
      "subject": "Issue Y",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "078",
      "subject": "Issue Z",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "079",
      "subject": "Issue A",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "080",
      "subject": "Issue B",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "081",
      "subject": "Issue C",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "082",
      "subject": "Issue D",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "083",
      "subject": "Issue E",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "084",
      "subject": "Issue F",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "085",
      "subject": "Issue G",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "086",
      "subject": "Issue H",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "087",
      "subject": "Issue I",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "088",
      "subject": "Issue J",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "089",
      "subject": "Issue K",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "090",
      "subject": "Issue L",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "091",
      "subject": "Issue M",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "092",
      "subject": "Issue N",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "093",
      "subject": "Issue O",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "094",
      "subject": "Issue P",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "095",
      "subject": "Issue Q",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "096",
      "subject": "Issue R",
      "assignee": "John",
      "taskStatus": "Open",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "097",
      "subject": "Issue S",
      "assignee": "Alice",
      "taskStatus": "In Progress",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "098",
      "subject": "Issue T",
      "assignee": "Bob",
      "taskStatus": "Closed",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "099",
      "subject": "Issue U",
      "assignee": "Eve",
      "taskStatus": "Pending",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  },
  {
      "caseId": "100",
      "subject": "Issue V",
      "assignee": "Charlie",
      "taskStatus": "Resolved",
      "team": "Frontdesk Team",
      "createdDate": "2025-03-28",
      "messages": ["I am Seeing discrepancies connected to my account number ACC- XXXX123. the brokerage which is supposed to be 0.01% is reflecting as 0.2%. Please help in resolving this issue"]
  }
];

type FrontDeskStore = {
  rowData: RowData[];
  statusCounts: Record<taskStatus, number>
  setRowData: (data: RowData[]) => void;
  removeRow: (caseId: string) => void;
  addRow: (row: RowData) => void;
};

export const useFrontDeskGridStore = create<FrontDeskStore>((set, get) => ({
  rowData: [ ...sampleData ],
  statusCounts: computeStatusCounts([...sampleData]),

  setRowData: (data) => {
    set({ rowData: data, statusCounts: computeStatusCounts(data) })
  },
  removeRow: (caseId) =>{
    const updatedData = get().rowData.filter((item) => item.caseId !== caseId)
    set({
      rowData: updatedData,
      statusCounts: computeStatusCounts(updatedData)
    })
},
  addRow: (row) =>{
    const updatedData = [...get().rowData, row];
    set({
      rowData: updatedData,
      statusCounts: computeStatusCounts(updatedData)
    })
}
}));