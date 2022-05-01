import { useCallback, useState } from "react";
import useOnBlock from "./OnBlock";
import usePoller from "./Poller";

const DEBUG = false;

export default function useBalance(provider, address, pollTime = 0) {
  const [balance, setBalance] = useState();

  const pollBalance = useCallback(
    async (provider, address) => {
      if (provider && address) {
        const newBalance = await provider.getBalance(address);
        if (newBalance !== balance) {
          setBalance(newBalance);
        }
      }
    },
    [provider, address],
  );

  useOnBlock(pollTime === 0 && provider, () => {
    if (provider && address && pollTime === 0) {
      pollBalance(provider, address);
    }
  });

  usePoller(
    async () => {
      if (provider && address && pollTime > 0) {
        if (DEBUG) console.log("polling!", address);
        pollBalance();
      }
    },
    pollTime,
    provider && address,
  );

  return balance;
}
