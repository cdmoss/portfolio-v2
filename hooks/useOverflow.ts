import React, { MutableRefObject } from "react";

export const useIsOverflow = (
  ref: MutableRefObject<HTMLDivElement>,
  callback: (hasOverflow: boolean) => any
) => {
  const [isOverflow, setIsOverflow] = React.useState(false);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
