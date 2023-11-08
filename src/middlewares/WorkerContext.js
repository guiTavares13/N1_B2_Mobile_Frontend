import { createContext } from 'react';

const WorkerContext = createContext({
    workerContext: {},
    setWorkerContext: () => {},
});

export default WorkerContext;
