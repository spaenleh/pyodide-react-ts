export enum ReplStatus {
  READY = 'Ready',
  RUNNING = 'Running',
  LOADING = 'Loading…',
  INSTALLING = 'Installing…',
  WAIT_INPUT = 'Waiting on input',
  ERROR = 'Error',
  TIMEOUT = 'Failed: Timeout',
  UNKNOWN_STATUS = 'Unknown Status',
}
