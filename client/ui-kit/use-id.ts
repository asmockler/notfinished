// This is not particularly stable, but it gets the job done for now.

import { useRef } from "react";

// Basically just makes a big integer and then converts it to a hex string.
function generateRandomString() {
  return Math.floor((Math.random() * 100) ** 10).toString(16);
}

export function useId() {
  const id = useRef(generateRandomString());

  return id.current;
}
