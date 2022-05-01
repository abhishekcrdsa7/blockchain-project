import { useEffect, useState } from "react";
import useOnBlock from "./OnBlock";
import usePoller from "./Poller";

const DEBUG = false;

export default function useContractReader(contracts, contractName, functionName, args, pollTime, formatter, onChange) {
  let adjustPollTime = 0;
  if (pollTime) {
    adjustPollTime = pollTime;
  } else if (!pollTime && typeof args === "number") {
    adjustPollTime = args;
  }

  const [value, setValue] = useState();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (typeof onChange === "function") {
      setTimeout(onChange.bind(this, value), 1);
    }
  }, [value, onChange]);

  const updateValue = async () => {
    try {
      let newValue;
      if (DEBUG) console.log("CALLING ", contractName, functionName, "with args", args);
      if (args && args.length > 0) {
        newValue = await contracts[contractName][functionName](...args);
        setTried(true);
        if (DEBUG)
          console.log("contractName", contractName, "functionName", functionName, "args", args, "RESULT:", newValue);
      } else {
        newValue = await contracts[contractName][functionName]();
      }
      if (formatter && typeof formatter === "function") {
        newValue = formatter(newValue);
      }
      if (newValue !== value) {
        setValue(newValue);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useOnBlock(contracts && contracts[contractName] && adjustPollTime === 0 && contracts[contractName].provider, () => {
    if (contracts && contracts[contractName] && adjustPollTime === 0) {
      updateValue();
    }
  });

  usePoller(
    async () => {
      if (contracts && contracts[contractName] && adjustPollTime > 0) {
        if (DEBUG) console.log("polling!", contractName, functionName);
        updateValue();
      }
    },
    adjustPollTime,
    contracts && contracts[contractName],
  );

  if (tried === false && contracts && contracts[contractName]) {
    updateValue();
  }

  return value;
}
