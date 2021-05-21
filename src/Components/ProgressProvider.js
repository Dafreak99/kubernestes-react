import React from "react";

const ProgressProvider = ({ valueStart, valueEnd, children }) => {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);
  return children(value);
};
export default ProgressProvider;

// The progress circle started at 0 eventhough the useEffect is triggered. However, inside useEffect
// is a Promise so it takes time to do something. After set the value to 0 the useEffect kicked in and change
// it to 8. The smooth increase is default behavior of this package

// https://codesandbox.io/s/react-circular-progressbar-with-initial-animation-r3w6t
// https://codesandbox.io/s/goofy-knuth-vkk1o
