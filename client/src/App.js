import { Button, Input, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import './App.css';

function App() {

  const initialState = {
    name: null,
    email: null,
    mobile: null,
    dob: null
  }

  const [formState, setFormState] = useState(initialState);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  console.log({
    formState
  });

  const formInfo = {
    name: {
      placeholder: 'Ramandeep Singh',
      type: 'text',
      id: 'name'
    },
    email: {
      placeholder: 'example@gmail.com',
      type: 'email',
      id: 'email'
    },
    mobile: {
      placeholder: '90******42',
      type: 'number',
      id: 'mobile'
    },
  }

  function isDate18orMoreYearsOld(day, month, year) {
    return new Date(year+18, month-1, day) <= new Date();
}

  const detectChange = (e, dob) => {
    if(e?.target?.id === 'name'){
      setFormState({
        ...formState,
        name: e.target.value
      })
    }
    if(e?.target?.id === 'email'){
      setFormState({
        ...formState,
        email: e.target.value
      })
    }
    if(e?.target?.id === 'mobile'){
      setFormState({
        ...formState,
        mobile: e.target.value
      })
    }
    if(dob){
      const date = e.$D;
      const month = e.$M + 1;
      const year = e.$y;
      if(isDate18orMoreYearsOld(date, month, year)){
        setFormState({
          ...formState,
          dob: `${date}-${month}-${year}`
        })
      } else {
        setMessage('Age must be greater than 18 years.')
      }
    }
  }

  const submit = async () => {
    if(formState.email.includes('@gmail.com')){
      await fetch('http://localhost:8000/form-user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })
      .then(res => res.json())
      .then(data => data.message.includes('Successfully') ? navigate('/submittedForms') : setMessage(data.message))
      .catch(err => console.log((err)))

      setFormState(initialState);
    } else{
      setMessage('Email is invalid.')
    } 
  }

  return (
    <div className='form-wrapper'>
      <h1>User form</h1>
      {Object.keys(formInfo).map((info) => {
        return (
          <>
            <InputLabel htmlFor={formInfo[info].id}>{info.toUpperCase()}</InputLabel>
            <Input id={formInfo[info].id} type={formInfo[info].type} placeholder={formInfo[info].placeholder} value={formState[info] ?? ''} onChange={(e) => detectChange(e)} />
          </>
        )
      })}
      <InputLabel>DOB &#x28;Age&gt;18&#41;</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={(e) => detectChange(e, true)} disableFuture />
      </LocalizationProvider>
      <Button variant='contained' onClick={submit}>Submit</Button>
      {message && (
        <div className='message'>
          {message}
          <Button onClick={() => setMessage(null)}>OK</Button>
        </div>
      )}
    </div>
  );
}

export default App;
