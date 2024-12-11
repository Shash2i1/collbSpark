import React from 'react';

function LogoText({ text, className }) {
  return (
    <div>
      <h1
        className={`font-righteous ${text} ${className} text-xl sm:text-base xs:text-xs`}
      >
        CollabSpark
      </h1>
    </div>
  );
}

export default LogoText;
