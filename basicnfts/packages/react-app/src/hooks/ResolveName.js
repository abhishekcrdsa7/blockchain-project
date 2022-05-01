import { constants } from "ethers";
import { useEffect, useState } from "react";


const useResolveName = (provider, ensName) => {
  const [address, setAddress] = useState(constants.AddressZero);

  useEffect(() => {
    if (provider) {
      provider.resolveName(ensName).then(resolvedAddress => setAddress(resolvedAddress));
    }
  }, [provider, ensName]);

  return address;
};

export default useResolveName;
