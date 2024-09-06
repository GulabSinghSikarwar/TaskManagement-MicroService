import React, { useState, useEffect, useRef } from 'react';
import { FaRegCommentDots } from "react-icons/fa";
import DiscussionSection from './CommentSection/DiscussionSection';
import CommentSectionModal from './CommentSection/CommentSectionModal';

const MiniCommentBox = ({ card, button, options }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div style={{ position: 'relative' }} className='dropdown-pad' ref={dropdownRef}>
            <div style={{ fontWeight: 'lighter' }} className="flex items-center " onClick={handleDropdownClick}>
                <span> <img src="" alt="" /> </span>  <FaRegCommentDots className='z-1' color="#7E7B85" size={15} fontWeight='300' /> <span className="text-commentIconColor text-   px-1" >   {(card.comments.length) ? card.comments.length : 0} </span>

            </div>
            <CommentSectionModal isOpen={dropdownOpen} task={card} toggleModal={handleDropdownClick} />
        </div>
    );
};

export default MiniCommentBox;
