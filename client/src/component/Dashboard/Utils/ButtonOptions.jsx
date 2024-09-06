import React, { useState, useEffect } from 'react';

function ButtonOptions({ button, options }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = () => {
        setDropdownOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('#dropdownDividerButton') && !event.target.closest('#dropdownDivider')) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
        console.log("action options : ", options);
    }, []);
    return (
        <div style={{ position: 'relative' }} className='dropdown-pad'>
            <img src={button} alt="" srcset="" id="dropdownDividerButton"
                onClick={handleDropdownClick}
                className="text-white  text-center inline-flex items-center dark:bg-blue-600 "
                type="button" />
            <div
                id="dropdownDivider"
                className={`z-1 ${dropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow absolute top-full left-0 w-full z- `}
                style={{ minWidth: 200 ,zIndex:1}}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 z-200" aria-labelledby="dropdownDividerButton">
                    {
                        options.map((option, index) => {
                            return <li>
                                <a href="#" key={index} onClick={option.action} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{option.label}</a>
                            </li>
                        })
                    }
                </ul>
                 
            </div>
        </div>
    )
}

export default ButtonOptions