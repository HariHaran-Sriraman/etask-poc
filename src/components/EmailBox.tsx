import React, { useState } from 'react';

type EmailBoxProps = {
  team: string;
  messages: string[];
  newMessage: string;
  setNewMessage: (msg: string) => void;
};

const EmailBox: React.FC<EmailBoxProps> = ({ newMessage, setNewMessage }) => {

  return (
    <textarea
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      style={{
        width: '100%',
        height: '300px',
        padding: '12px',
        fontSize: '14px',
        lineHeight: '1.6',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#fdfdfd',
        resize: 'vertical',
        fontFamily: 'Arial, sans-serif',
        whiteSpace: 'pre-wrap',
      }}
    />
  );
};

export default EmailBox;
