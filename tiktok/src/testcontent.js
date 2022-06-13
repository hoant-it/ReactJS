import { useState, useEffect } from 'react';

function Content() {
  const [countdown, setCountdown] = useState(180);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
      console.log('timer run');
    }, 1000);

    return () => {
      clearTimeout(timer);
      console.log('timer clear');
    };
  }, [countdown]);

  return (
    <div>
      <h1>{countdown}</h1>
    </div>
  );
}

export default Content;
