import React from 'react';

const Messenger = () => {
    let messages = []
    return (
        <div>
            <div className="bg-gray-100 p-4 rounded-lg mt-5">
                <div className="">
                    {messages.map((msg) => (
                        <div className={`mt-2 py-2 break-words px-4 w-1/2 rounded-lg text-white bg-blue-500 w-auto ${msg.userId === socketId ? "ml-auto ": "mr-auto "}`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messenger;