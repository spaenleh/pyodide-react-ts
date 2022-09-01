import { FC, useEffect, useState } from 'react';

import { Alert, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { PyWorker, PyodideStatus } from '@graasp/pyodide-worker';

import { MAX_REPL_HEIGHT } from '../constants/constants';
import CodeEditor from './CodeEditor';
import InputArea from './InputArea';
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
  const [replStatus, setReplStatus] = useState<PyodideStatus>(
    PyodideStatus.LOADING_PYODIDE,
  );

  // register worker on mount
  useEffect(() => {
    // todo: reconciliate the concat output option
    const workerInstance = new PyWorker(
      'https://spaenleh.github.io/graasp-pyodide/fullWorker.min.js',
    );

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
      console.error(newError);
      // setError(newError.data);
    };

    workerInstance.onTerminated = () => {
      setIsExecuting(false);
      setReplStatus(PyodideStatus.READY);
    };

    workerInstance.onFigure = (figureData) => {
      setFigures((prevFigures) => [...prevFigures, figureData]);
    };

    workerInstance.onStatusUpdate = (status: PyodideStatus) => {
      setReplStatus(status);
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
      worker.clearOutput();
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
    if (isWaitingForInput && worker) {
      worker.cancelInput();
      worker.stop();
      setIsWaitingForInput(false);
    }
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
            sx={{
              p: 1,
              overflow: 'hidden',
              mb: 0.5,
              border: 1,
              borderRadius: 1,
              borderColor: 'info.main',
              width: '100%',
            }}
          >
            <InputArea
              onValidate={onClickValidateInput}
              onCancel={onClickCancel}
              prompt={output + (isWaitingForInput ? prompt : '')}
              readOnly={!isWaitingForInput}
            />
          </Grid>
          <Grid
            xs
            display="flex"
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
