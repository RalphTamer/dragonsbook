// import { useEffect } from "react";

// export function useDebounceEffect(
//   fn: () => void,
//   waitTime: number,
//   deps: unknown[] = [],
// ) {
//   useEffect(() => {
//     const handleEffect = () => {
//       try {
//         fn();
//       } catch (error) {
//         // Handle errors here if necessary
//         console.error("Error occurred:", error);
//       }
//     };

//     const timeoutId = setTimeout(handleEffect, waitTime);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, deps);
// }
