export function NowIndicator() {
  const now = new Date();

  console.log("cool");

  return (
    <div
      className="
        h-[2px] w-full absolute z-10
        bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 dark:from-sky-500 dark:via-purple-400 dark:to-pink-600
      "
      style={{ top: now.getHours() * 60 + now.getMinutes() }}
    />
  );
}
