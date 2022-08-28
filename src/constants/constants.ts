export enum ReplStatus {
  READY = 'Ready',
  RUNNING = 'Running',
  LOADING_PYODIDE = 'Loading Pyodide…',
  LOADING_MODULE = 'Loading Modules…',
  INSTALLING = 'Installing…',
  WAIT_INPUT = 'Waiting on input',
  ERROR = 'Error',
  TIMEOUT = 'Failed: Timeout',
  UNKNOWN_STATUS = 'Unknown Status',
}

export const MAX_REPL_HEIGHT = '60vh';
export const DEFAULT_INPUT_VALUE = '';
