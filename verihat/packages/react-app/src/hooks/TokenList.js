import { useEffect, useState } from "react";

const useTokenList = (tokenListUri, chainId) => {
  const [tokenList, setTokenList] = useState([]);

  const _tokenListUri = tokenListUri || "https://gateway.ipfs.io/ipns/tokens.uniswap.org";

  useEffect(() => {
    const getTokenList = async () => {
      if(navigator.onLine){
        try {
          const tokenList = await fetch(_tokenListUri);
          const tokenListJson = await tokenList.json();
          let _tokenList;

          if (chainId) {
            _tokenList = tokenListJson.tokens.filter(function (t) {
              return t.chainId === chainId;
            });
          } else {
            _tokenList = tokenListJson;
          }

          setTokenList(_tokenList.tokens);
        } catch (e) {
          console.log(e);
        }
      }
    };
    getTokenList();
  }, [tokenListUri]);

  return tokenList;
};

export default useTokenList;
