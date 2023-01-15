import React, { useEffect, useRef, useState } from "react";
import { FaWindowMinimize } from "react-icons/fa";
import { MdClose, MdMinimize } from "react-icons/md";

function ChitChat({ data, isVisible, setIsVisible }) {
  const [messages, setMessages] = useState([
    { text: "hey", sender: "me" },
    {
      text: "ow to flex some uneven component and give equal space to everyone tailwind css",
      sender: "you",
    },
    { text: "good", sender: "me" },
    { text: "hello", sender: "you" },
    { text: "good", sender: "me" },
    { text: "hello", sender: "you" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);
  const { email, firstName, _id } = data;
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, { text: newMessage, sender: "me" }]);
    setNewMessage("");
  };

  return (
    <div className="bg-gray-800 h-[440px] w-[350px] flex flex-col absolute bottom-0 md:right-[10%] right-0 border-t-[44px] border-x-[1px] border-x-slate-400 border-primary rounded-r-xl rounded-l-xl pb-3">
      <p className="absolute top-[-33px] left-4 text-white">{firstName}</p>
      {/* <p className="absolute top-[-35px] right-14 text-white">
        <MdMinimize
          fontSize={"24px"}
          className="hover:text-blue-500 transition-all cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}
        />
      </p> */}
      <p className="absolute top-[-33px] right- text-white">
        <MdClose
          fontSize={"24px"}
          className="hover:text-red-500 transition-all cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}
        />
      </p>
      <div
        ref={chatRef}
        className="bg-white p-4 flex-1 overflow-y-scroll"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {messages.map((msg, index) => (
          <div key={index} className="p-2 mb-2 rounded-md">
            <p
              className={`text-xs font-medium   ${
                msg.sender === "me"
                  ? "text-right"
                  : "text-left bg-primary/90 inline-block text-white px-2 py-1 rounded-full  "
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-200 p-4 flex gap-1">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="bg-white p-2 rounded-md w-full"
        />
        <button
          type="submit"
          className="bg-primary text-white p-2 rounded-md hover:bg-primary/90"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChitChat;
