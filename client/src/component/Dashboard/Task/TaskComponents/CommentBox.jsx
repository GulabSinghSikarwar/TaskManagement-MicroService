import React, { useState, useRef, useEffect } from 'react';
import { MAP_API_KEY } from '../../../utils/constant';
import { ReactComponent as SendIcon } from '../../../../icons/sendIcon.svg'
import sendIcon from '../../../../icons/sendIcon.svg'

import EmojiPicker from 'emoji-picker-react';
import Editor from '../../../Editor/Editor';

const CommentBox = () => {
    const [editorValue, setEditorValue] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [location, setLocation] = useState(null);
    const [stickers, setStickers] = useState([]);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const emojiButtonRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const handleEditorChange = (e) => {
        setEditorValue(e.target.value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        // Append the file names to the editor value
        const fileNames = files.map(file => file.name).join(', ');
        setEditorValue(editorValue + ` Attached files: ${fileNames}`);
    };

    const handleLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                // Embed Google Maps iframe
                const iframe = `<iframe width="100%" height="450" style="border:0;" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}&q=${latitude},${longitude}"></iframe>`;
                setEditorValue(editorValue + ` ${iframe}`);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleStickerClick = (sticker) => {
        // setStickers([...stickers, sticker]);
        // setEditorValue(editorValue + ` ${sticker}`);
    };

    const handleSubmit = (event) => {
        console.log("form : ", editorValue);
        event.preventDefault();
    };
    const onEmojiClick = async (event, emojiObject) => {

        setStickers([...stickers, emojiObject.target]);
        const sticker = await event.emoji;
        console.log("sticker : ", sticker);
        console.log("Editor VALUE : ", editorValue);
        setEditorValue(editorValue + ` ${sticker}`);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
                emojiButtonRef.current && !emojiButtonRef.current.contains(event.target)) {
                setEmojiPickerVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                            <label className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <input type="file" className="hidden" multiple onChange={handleFileChange} />
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                </svg>
                                <span className="sr-only">Attach file</span>
                            </label>
                            <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" onClick={handleLocation}>
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                                <span className="sr-only">Embed map</span>
                            </button>
                            <label className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </label>
                            <button
                                ref={emojiButtonRef}
                                type="button"
                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                onClick={toggleEmojiPicker}
                            >
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                                </svg>
                                <span className="sr-only">Add emoji</span>
                            </button>

                        </div>
                    </div>
                </div>
                <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                    {/* <textarea
                        className="w-full px-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        rows="8"
                        placeholder="Write an article..."
                        value={editorValue}
                        onChange={handleEditorChange}
                    ></textarea> */}

                    <Editor editorValue={editorValue} updateValue={setEditorValue} />
                    {emojiPickerVisible && (
                        <div
                            ref={emojiPickerRef}
                            className="absolute z-50 mt-2"
                            style={{ top: '80%', left: '0' }}
                        >
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                    {/* Display location iframe if location is set */}
                    {/* {location && (
                        <div className="mt-4 relative h-full max-h-[calc(100vh-8rem)] overflow-auto">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}&q=${location.latitude},${location.longitude}`}
                            ></iframe>
                        </div>
                    )} */}
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <button
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white ">
                    <SendIcon />
                </button>

            </div>
        </form>
    );
};

export default CommentBox;
