import { useEffect, useRef } from "react";

const DEBUG = false;

export default function useOnBlock(provider, fn, args) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  useEffect(() => {
    if (fn && provider) {
      const listener = blockNumber => {
        if (DEBUG) console.log(blockNumber, fn, args, provider.listeners());

        if (args && args.length > 0) {
          savedCallback.current(...args);
        } else {
          savedCallback.current();
        }
      };

      provider.on("block", listener);

      return () => {
        provider.off("block", listener);
      };
    }
  }, [provider]);
}
