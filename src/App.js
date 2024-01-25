import './App.modules.scss';
import { useState } from 'react';
import InputFields from './InputFields';

export default function App() {
  return (
    <div className="App">
      Guest List
      <br></br>
      <InputFields />
    </div>
  );
}
