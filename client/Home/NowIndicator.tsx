import { useEffect, useState } from "react";

export function NowIndicator() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="
        pointer-events-none absolute z-10 h-[2px] w-full
        bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 dark:from-sky-500 dark:via-purple-400 dark:to-pink-600
      "
      style={{ top: now.getHours() * 60 + now.getMinutes() }}
    />
  );
}
