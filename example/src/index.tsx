import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

import './index.css';
import 'bear-styled-grid/dist/index.css';
import 'bear-react-table/dist/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
