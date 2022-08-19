import React from "react";
import ReactDOM from 'react-dom/client';

import './style.css';

type HelloProps = {
    to: string,
    howMany?: number,
}

const Hello: React.FC<HelloProps> = ({ to, howMany = 3 }) => <div>Hello, {to} ({howMany})</div>

const App: React.FC<{}> = () => <div>asd1!
    <Hello to="world" />
</div>

const root = ReactDOM.createRoot(
    document.getElementById('root')!
);
root.render(<App />);

