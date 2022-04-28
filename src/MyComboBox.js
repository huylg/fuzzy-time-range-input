import { useState, Fragment } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

function MyCombobox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      {/* Render a `Fragment` instead of an `input` */}
      <Combobox.Input
        as={Fragment}
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(person) => person.name}
      >
        <input />
      </Combobox.Input>
      <Combobox.Options>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person.id} value={person}>
            {person.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default MyCombobox;
