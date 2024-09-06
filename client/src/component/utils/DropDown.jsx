import React, { useState, useEffect, useRef } from 'react';

function DropdownDivider({ onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('A'); // Default selected type is 'A'
  const dropdownRef = useRef(null);

  useEffect(() => { 
    handleSelectType(selectedType)

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };

  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
    onChange({ target: { name: 'Type', value: type } }); // Update the 'Type' field in the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  const options = [
    { label: 'A (Address) Record', value: 'A' },
    { label: 'AAAA (IPv6 Address) Record', value: 'AAAA' },
    { label: 'CNAME (Canonical Name) Record', value: 'CNAME' },
    { label: 'MX (Mail Exchange) Record', value: 'MX' },
    { label: 'NS (Name Server) Record', value: 'NS' },
    { label: 'PTR (Pointer) Record', value: 'PTR' },
    { label: 'SOA (Start of Authority) Record', value: 'SOA' },
    { label: 'SRV (Service) Record', value: 'SRV' },
    { label: 'TXT (Text) Record', value: 'TXT' },
    { label: 'DNSSEC', value: 'DNSSEC' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownDividerButton"
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 overflow-hidden whitespace-nowrap max-w-full"
        type="button"
        style={{ maxWidth: 'calc(100% - 20px)' }}
      >
        {selectedType ? options.find(option => option.value === selectedType)?.label : 'Dropdown divider'}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="dropdownDivider"
          className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            {options.map(option => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelectType(option.value)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white overflow-hidden whitespace-nowrap max-w-full"
                  style={{ maxWidth: 'calc(100% - 20px)' }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownDivider;
