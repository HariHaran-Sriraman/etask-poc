import React from 'react';

type EmailBoxSideNavProps = {
  team: string;
  messages: string[];
};

const EmailBoxSideNav: React.FC<EmailBoxSideNavProps> = ({ messages }) => {

  const [firstMessage = '', ...restMessages] = messages ?? [];

  const readonlyChain = restMessages
    .slice()
    .reverse()
    .map((msg) => `${msg}`)
    .join('\n\n');

  const displayValue = `${readonlyChain ? `----- Previous Messages -----\n\n${readonlyChain}\n\n` : ''
    }Hi team,\n\n${firstMessage}\n\nThanks and regards,\nXXXXX`;

  return (
    <textarea
      value={displayValue}
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

export default EmailBoxSideNav;
