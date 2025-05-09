export type Status = 'Open' | 'In Progress' | 'Closed' | 'Pending' | 'Resolved'

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

export const computeStatusCounts = (data: RowData[]): Record<taskStatus, number> => {
  const counts: Record<taskStatus, number> = {
    Open: 0,
    'In Progress': 0,
    Closed: 0,
    Pending: 0,
    Resolved: 0,
  }

  data.forEach((item) => {
    if (item.taskStatus in counts) {
      counts[item.taskStatus as taskStatus]++
    }
  })

  return counts
}
