import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import TextField from './Components/Common/TextField';

function App() {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };;

  return (
    <div className="App">
     <TextField label='FirstName' value={inputValue} onChange={handleInputChange} />
    </div>
  );
}

export default App;
