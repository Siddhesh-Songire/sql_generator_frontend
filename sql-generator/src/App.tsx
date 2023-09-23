import React, { useState, useEffect } from "react";
import MessagesDisplay from "./components/MessagesDisplay";
import CodeDisplay from "./components/CodeDisplay";
import "./app.css";

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [ans, setAns] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add a loading state

  const getQuery = async () => {
    setIsLoading(true); // Set loading state to true when the request starts
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      };
      const response = await fetch("http://localhost:8000", options);
      const data = await response.json();
      console.log(data);
      console.log(data.chatCompletion.content);
      setAns(data.chatCompletion.content);
      const userMessage = {
        role: "user",
        content: value,
      };
      setChat((oldChat) => [...oldChat, data, userMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false when the request is complete
    }
  };

  const filteredUserMessages = chat.filter(
    (message) => message.role === "user"
  );

  return (
    <div className="app">
      <MessagesDisplay userMessages={filteredUserMessages} />
      <input value={value} onChange={(e) => setValue(e.target.value)} />

      <div className="code-display">
        <div className="code-display-container">
          <CodeDisplay text={ans} />
          {isLoading && <div className="loader"></div>}
        </div>
      </div>

      <div className="button-container">
        <button id="get-query" onClick={getQuery}>
          {" "}
          Get Query{" "}
        </button>
        <button id="clear-chat"> Clear Chat </button>
      </div>
    </div>
  );
};

export default App;
