import React, { useState } from 'react';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: '100%',
    border: '1px solid #ccc',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#004368',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#004368' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: '#004368',
      color: 'white',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#999',
  }),
};

const FilterPokemon = ({ types, onFilter }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setSelectedType(selectedOption);
    onFilter(value);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const options = [
    { value: '', label: <em >All Types</em> },
    ...types.map((type) => ({
      value: type,
      label: capitalize(type),
    })),
  ];

  return (
    <div className="flex flex-col items-center md:items-start w-full">
      <label className="mb-2 text-gray-700">Select Pokémon Type</label>
      <div className="w-full md:w-1/4">
        <Select
          styles={customStyles}
          options={options}
          onChange={handleChange}
          value={selectedType}
          isClearable
          placeholder="Select a type"
        />
      </div>
    </div>
  );
};

export default FilterPokemon;