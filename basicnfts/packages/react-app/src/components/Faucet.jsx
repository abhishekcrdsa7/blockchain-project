import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { useLookupAddress } from "eth-hooks";
import React, { useCallback, useState, useEffect } from "react";
import Blockies from "react-blockies";
import { Transactor } from "../helpers";
import Wallet from "./Wallet";

const { utils } = require("ethers");

export default function Faucet(props) {

  const [faucetAddress, setFaucetAddress] = useState();

  useEffect(() => {
    const getFaucetAddress = async () => {
      if (props.localProvider) {
        const _faucetAddress = await props.localProvider.listAccounts();
        setFaucetAddress(_faucetAddress[0]);
        console.log(_faucetAddress);
      }
    };
    getFaucetAddress();
  }, [props.localProvider]);

  const [address, setAddress] = useState();

  let blockie;
  if (address && typeof address.toLowerCase === "function") {
    blockie = <Blockies seed={address.toLowerCase()} size={8} scale={4} />;
  } else {
    blockie = <div />;
  }

  const ens = useLookupAddress(props.ensProvider, address);

  const updateAddress = useCallback(
    async newValue => {
      if (typeof newValue !== "undefined") {
        let address = newValue;
        if (address.indexOf(".eth") > 0 || address.indexOf(".xyz") > 0) {
          try {
            const possibleAddress = await props.ensProvider.resolveName(address);
            if (possibleAddress) {
              address = possibleAddress;
            }
          } catch (e) {}
        }
        setAddress(address);
      }
    },
    [props.ensProvider, props.onChange],
  );

  const tx = Transactor(props.localProvider);

  return (
    <span>
      <Input
        size="large"
        placeholder={props.placeholder ? props.placeholder : "local faucet"}
        prefix={blockie}
        value={ens || address}
        onChange={e => {
          updateAddress(e.target.value);
        }}
        suffix={
          <Tooltip title="Faucet: Send local ether to an address.">
            <Button
              onClick={() => {
                tx({
                  to: address,
                  value: utils.parseEther("0.01"),
                });
                setAddress("");
              }}
              shape="circle"
              icon={<SendOutlined />}
            />
            <Wallet
              color="#888888"
              provider={props.localProvider}
              ensProvider={props.ensProvider}
              price={props.price}
              address={faucetAddress}
            />
          </Tooltip>
        }
      />
    </span>
  );
}
