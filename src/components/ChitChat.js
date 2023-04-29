import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  useAddMessageMutation,
  useGetMessagesQuery,
} from "../features/message/messageApi";

function ChitChat({ data, isVisible, setIsVisible }) {
  // const hello = {
  //   type: "personal",
  //   users: [
  //     {
  //       userId: "63c145ba699e2c52c6560689",
  //       name: "Raihan Joy",
  //       email: "candidate@me.com",
  //       lastSeen: "2022-01-01T00:00:00.000Z",
  //     },
  //     {
  //       userId: "63c142d8699e2c52c6560688",
  //       name: "Jane Doe",
  //       email: "mdsaharshitol@gmail.com",
  //       lastSeen: "2022-01-02T00:00:00.000Z",
  //     },
  //   ],
  //   messages: [
  //     {
  //       userId: "63c142d8699e2c52c6560688",
  //       text: "Hello",
  //       timestamp: "2022-01-01T00:00:00.000Z",
  //     },
  //     {
  //       userId: "63c145ba699e2c52c6560689",
  //       text: "Hi there!",
  //       timestamp: "2022-01-01T00:00:01.000Z",
  //     },
  //     {
  //       userId: "63c142d8699e2c52c6560688",
  //       text: "How are you?",
  //       timestamp: "2022-01-01T00:00:02.000Z",
  //     },
  //     {
  //       userId: "63c145ba699e2c52c6560689",
  //       text: "Fine, you?",
  //       timestamp: "2022-01-01T00:00:01.000Z",
  //     },
  //   ],
  // };
  const { user } = useSelector((state) => state.auth);
  const { handleSubmit, register, reset } = useForm();
  const [addMessage] = useAddMessageMutation();
  const [messages, setMessages] = useState([]);
  console.log("", user?.email, data?.email);
  const emails = { email1: user?.email, email2: data?.email };
  const { data: getMessages, isLoading } = useGetMessagesQuery(emails, {
    pollingInterval: 1000,
  });
  useEffect(() => {
    // setUsers(chatData.users);
    setMessages(getMessages?.data?.messages);
  }, [getMessages]);
  const chatRef = useRef(null);
  const { firstName } = data;
  //
  console.log("msg", getMessages);
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);
  //

  //
  const submit = (newData) => {
    const senderName = user.firstName + " " + user.lastName;
    const receiverName = data.firstName + " " + data.lastName;
    const newMG = {
      userId: user._id,
      text: newData.newMessage,
      timestamp: new Date().toISOString(),
    };
    const properData = {
      users: [
        { email: user.email, userId: user._id, name: senderName },
        { email: data.email, userId: data._id, name: receiverName },
      ],
      messages: Array.isArray(messages) ? [...messages, newMG] : [newMG],
    };
    setMessages(Array.isArray(messages) ? [...messages, newMG] : [newMG]);
    console.log("", properData);
    addMessage(properData);
    reset();
  };
  if (isLoading) {
    return <p ref={chatRef}>...</p>;
  }
  return (
    <div className="bg-gray-800 h-[440px] w-[350px] flex flex-col absolute bottom-0 md:right-[10%] right-0 border-t-[44px] border-x-[1px] border-x-slate-400 border-primary rounded-r-xl rounded-l-xl pb-3">
      <p className="absolute top-[-33px] left-4 text-white">{firstName}</p>
      <p className="absolute top-[-33px] right-5 text-white">
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
        {messages?.map((msg, index) => (
          <div key={index} className="p-2 mb-2 rounded-md">
            <p
              className={`text-xs font-medium ${
                msg.userId === user._id
                  ? "text-right"
                  : "text-left bg-primary/90 inline-block text-white px-2 py-1 rounded-full  "
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-gray-200 p-4 flex gap-1"
      >
        <input
          type="text"
          className="bg-white p-2 rounded-md w-full"
          {...register("newMessage")}
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
