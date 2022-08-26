import { FC, useEffect, useState } from 'react';

import { Alert, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { PyWorker } from '@graasp/pyodide-worker';

import { MAX_REPL_HEIGHT, ReplStatus } from '../constants/constants';
import CodeEditor from './CodeEditor';
import InputPrompt from './InputPrompt';
import OutputConsole from './OutputConsole';
import ReplToolbar from './ReplToolbar';
import ShowFigures from './ShowFigures';

const Repl: FC = () => {
  const [worker, setWorker] = useState<PyWorker | null>(null);
  const [output, setOutput] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [figures, setFigures] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [replStatus, setReplStatus] = useState<ReplStatus>(
    ReplStatus.LOADING_PYODIDE,
  );
  // register worker on mount
  useEffect(() => {
    // todo: reconciliate the concat output option
    const workerInstance = new PyWorker();

    workerInstance.onOutput = (newOutput, append = false) => {
      setOutput((prevOutput) =>
        append ? `${prevOutput}${newOutput}` : newOutput,
      );
    };

    workerInstance.onInput = (prompt) => {
      setIsWaitingForInput(true);
      setPrompt(prompt);
    };

    workerInstance.onError = (newError: any) => {
      console.warn(newError);
      // setError(newError.data);
    };

    workerInstance.onTerminated = () => {
      setIsExecuting(false);
      setReplStatus(ReplStatus.READY);
    };

    workerInstance.onFigure = (figureData) => {
      setFigures((prevFigures) => [...prevFigures, figureData]);
    };

    workerInstance.onStatusChanged = (status: string) => {
      console.log('Status Update:', status);
      let newStatus;
      // loading Pyodide || loading module
      if (status.startsWith('loading Pyodide')) {
        newStatus = ReplStatus.LOADING_PYODIDE;
      } else if (status.startsWith('loading module')) {
        newStatus = ReplStatus.LOADING_MODULE;
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
    setFigures([]);
    worker?.clearOutput();
  };

  const onClickStopCode = () => {
    if (isExecuting && worker) {
      worker.stop();
      setIsExecuting(false);
    }
  };

  const onClickValidateInput = (userInput: string) => {
    if (worker) {
      worker.submitInput(userInput);
      setIsWaitingForInput(false);
    }
  };

  const onClickCancel = () => {
    if (worker) {
      worker.cancelInput();
      setIsWaitingForInput(false);
    }
  };

  return (
    <Stack direction="column" spacing={1}>
      <ReplToolbar
        onRunCode={onClickRunCode}
        onStopCode={onClickStopCode}
        onClearOutput={onClickClearOutput}
        status={replStatus}
      />
      <Grid container direction="row">
        <Grid
          xs
          sx={{
            mr: 0.5,
            border: 1,
            borderRadius: 1,
            borderColor: 'error.main',
            height: MAX_REPL_HEIGHT,
            overflow: 'hidden',
          }}
        >
          <CodeEditor setValue={setValue} />
        </Grid>
        <Grid
          container
          xs
          direction="column"
          sx={{
            ml: 0.5,
            height: MAX_REPL_HEIGHT,
          }}
        >
          <Grid
            xs
            display="flex"
            // flexGrow={1}
            overflow="hidden"
            sx={{
              mb: 0.5,
              border: 1,
              borderRadius: 1,
              borderColor: 'info.main',
            }}
          >
            <Grid container direction="column" width="100%">
              <Grid xs>
                <OutputConsole output={output} />
              </Grid>
              <Grid justifySelf={'flex-end'}>
                <InputPrompt
                  prompt={prompt}
                  onValidate={onClickValidateInput}
                  onCancel={onClickCancel}
                  isWaitingForInput={isWaitingForInput}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            xs
            display="flex"
            // flexGrow={1}
            overflow="hidden"
            sx={{
              mt: 0.5,
              border: 1,
              borderRadius: 1,
              borderColor: 'info.main',
            }}
          >
            <ShowFigures figures={figures} />
          </Grid>
        </Grid>
      </Grid>
      {error && <Alert color="error">{error}</Alert>}
    </Stack>
  );
};

export default Repl;
