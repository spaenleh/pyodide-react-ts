import { FC, useEffect, useState } from 'react';

import { Box, Stack } from '@mui/material';

import { PyWorker } from '@graasp/pyodide-worker';

import CodeEditor from './CodeEditor';
import ReplToolbar from './ReplToolbar';

const Repl: FC = () => {
  const [worker, setWorker] = useState<PyWorker | null>(null);
  const [output, setOutput] = useState<string>('');
  const [value, setValue] = useState('');
  const [execute, setExecute] = useState(false);
  // register worker on mount
  useEffect(() => {
    const workerInstance = new PyWorker(
      'https://spaenleh.github.io/graasp-pyodide/webWorker.js',
    );

    workerInstance.onOutput = (newOutput) => {
      setOutput(newOutput);
    };

    workerInstance.onTerminated = () => {
      setExecute(false);
    };

    workerInstance.preload();

    setWorker(workerInstance);
  }, []);

  useEffect(() => {
    if (execute && worker) {
      worker.run(value);
    }
  }, [value, execute, worker]);

  return (
    <Stack direction="column" spacing={1}>
      <ReplToolbar setExecute={setExecute} />
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
            sx={{
              border: 2,
              borderRadius: 1,
              borderColor: 'info.main',
              height: '100%',
            }}
          >
            {/* we need to set the word-wrap: pre -> to display it correctly */}
            <pre>{output}</pre>
          </Box>
          <Box
            sx={{
              border: 2,
              borderRadius: 1,
              borderColor: 'info.main',
              height: '100%',
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
