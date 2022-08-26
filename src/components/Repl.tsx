import { FC, useEffect, useState } from 'react';

import { Box, Stack } from '@mui/material';

import { PyWorker } from '@graasp/pyodide-worker';

import { ReplStatus } from '../constants/constants';
import CodeEditor from './CodeEditor';
import ReplToolbar from './ReplToolbar';

const Repl: FC = () => {
  const [worker, setWorker] = useState<PyWorker | null>(null);
  const [output, setOutput] = useState<string>('');
  const [value, setValue] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [replStatus, setReplStatus] = useState<ReplStatus>(ReplStatus.LOADING);
  // register worker on mount
  useEffect(() => {
    const workerInstance = new PyWorker();

    workerInstance.onOutput = (newOutput) => {
      setOutput(newOutput);
    };

    workerInstance.onTerminated = () => {
      setIsExecuting(false);
      setReplStatus(ReplStatus.READY);
    };

    workerInstance.onStatusChanged = (status: string) => {
      console.log('Status Update:', status);
      let newStatus;
      // loading Pyodide || loading module
      if (status.startsWith('loading')) {
        newStatus = ReplStatus.LOADING;
      } else if (['startup', 'setup'].includes(status)) {
        newStatus = ReplStatus.INSTALLING;
      } else if (status === 'running') {
        newStatus = ReplStatus.RUNNING;
      } else if (['done', ''].includes(status)) {
        newStatus = ReplStatus.READY;
      } else if (['timeout'].includes(status)) {
        newStatus = ReplStatus.TIMEOUT;
      } else {
        newStatus = ReplStatus.UNKNOWN_STATUS;
      }

      setReplStatus(newStatus || ReplStatus.UNKNOWN_STATUS);
    };

    // preload worker instance
    workerInstance.preload();

    setWorker(workerInstance);
  }, []);

  const onClickRunCode = () => {
    // to run the code:
    // - previous run must be done
    // - worker must be set
    // - value must be true
    if (!isExecuting && worker && value) {
      setIsExecuting(true);
      // reset output
      setOutput('');
      worker.run(value);
    }
  };

  const onClickClearOutput = () => {
    setOutput('');
    worker?.clearOutput();
  };

  return (
    <Stack direction="column" spacing={1}>
      <ReplToolbar
        onRunCode={onClickRunCode}
        onClearOutput={onClickClearOutput}
        status={replStatus}
      />
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            border: 2,
            borderRadius: 1,
            borderColor: 'error.main',
            width: '100%',
            height: '50vh',
            overflow: 'hidden',
          }}
        >
          <CodeEditor setValue={setValue} />
        </Box>
        <Stack
          direction="column"
          sx={{ height: '50vh', width: '100%' }}
          spacing={2}
        >
          <Box
            width={'100%'}
            flexGrow={1}
            sx={{
              border: 2,
              borderRadius: 1,
              borderColor: 'info.main',
              height: '100%',
              width: '100%',
            }}
          >
            {/* we need to set the word-wrap: pre -> to display it correctly */}
            <pre>{output}</pre>
          </Box>
          <Box
            width={'100%'}
            flexGrow={1}
            sx={{
              border: 2,
              borderRadius: 1,
              borderColor: 'info.main',
              height: '100%',
              width: '100%',
            }}
          >
            Figures
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Repl;
