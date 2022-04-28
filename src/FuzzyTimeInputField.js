import { useState } from 'react'
import { Combobox } from '@headlessui/react'
const fuzzyTimeInput = require('fuzzytimeinput');

const hours = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

const minutes = [
  '00',
  '15',
  '30',
  '45',
];

function getOptions(query) {

  const queryTime = fuzzyTimeInput(query, 'json');

  console.log({ queryTime})

  const matchHours = hours.filter((hour) => hour.includes(queryTime.hours.toString()));

  const matchMinutes = minutes.filter((minute) => minute.includes(queryTime.minutes.toString()));

  return matchHours.map((hours) => matchMinutes.map((minutes) => ({ hours, minutes }))).flat();
}

function FuzzyTimeInputField() {

  const [value, setValue] = useState(null);

  const [query, setQuery] = useState('');

  const options = query === '' ? [] : getOptions(query);

  return (
    <Combobox value={value} onChange={setValue}>
      <Combobox.Input
        displayValue={(value) => value ? `${value.hours}:${value.minutes}` : ''}
        onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options>
        {
          options.map((time) => (
            <Combobox.Option value={time}>
              {`${time.hours}:${time.minutes}`}
            </Combobox.Option>
          ))
        }
      </Combobox.Options>
    </Combobox>
  )
}

export default FuzzyTimeInputField;
