import { utils } from "ethers";
import { useEffect, useState } from "react";


const lookupAddress = async (provider, address) => {
  if (address && utils.isAddress(address)) {
    try {
      const reportedName = await provider.lookupAddress(address);

      const resolvedAddress = await provider.resolveName(reportedName);

      if (address && utils.getAddress(address) === utils.getAddress(resolvedAddress)) {
        return reportedName;
      }
      return utils.getAddress(address);
    } catch (e) {
      return utils.getAddress(address);
    }
  }
  return 0;
};

const useLookupAddress = (provider, address) => {
  const [ensName, setEnsName] = useState(address);
  
  useEffect(() => {
    let cache = window.localStorage.getItem("ensCache_" + address);
    cache = cache && JSON.parse(cache);

    if (cache && cache.timestamp > Date.now()) {
      setEnsName(cache.name);
    } else if (provider) {
      lookupAddress(provider, address).then(name => {
        if (name) {
          setEnsName(name);
          window.localStorage.setItem(
            "ensCache_" + address,
            JSON.stringify({
              timestamp: Date.now() + 360000,
              name,
            }),
          );
        }
      });
    }
  }, [provider, address, setEnsName]);

  return ensName;
};

export default useLookupAddress;
