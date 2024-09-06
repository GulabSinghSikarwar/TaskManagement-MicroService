import Critical from '../../icons/jira_priority/critical.png'
import Blocker from '../../icons/jira_priority/blocker.png'
import Medium from '../../icons/jira_priority/medium.png'
import Low from '../../icons/jira_priority/low.png'
import High from '../../icons/jira_priority/high.png'
import {Priority} from './app.enum'
export const getRequestParams = (reqBody, method) => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reqBody)

  }
}
export const messageColor = {
  success: 'success',
  error: 'danger',
  warning: 'warning'
}
export const PriorityIcon = (priority) => {

  switch (priority) {
    case Priority.HIGH:
      return High;
    case Priority.LOW:
      return Low;
    case Priority.CRITICAL:
      return Critical;
    case Priority.MEDIUM:
      return Medium
  }
}