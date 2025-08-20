import { renderdates } from "./script.js";
const targetDiv = document.getElementById("month");

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" || mutation.type === "characterData") {
      
      renderdates()
    }
  }
});

// Start observing
observer.observe(targetDiv, {
  childList: true,       // detect added/removed child elements
  characterData: true,   // detect text changes
  subtree: true          // detect inside nested elements
});
