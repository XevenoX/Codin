import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [
  'Framer Design Mobile Responsiveness Specialist Specialist Specialist Specialist',
  'React Homepage Development',
];

export default function AutoCompleteControlled() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ size: 'small', width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Task Name" size="small" />
        )}
      />
    </div>
  );
}
