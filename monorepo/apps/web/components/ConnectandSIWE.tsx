"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { cbWalletConnector } from "../app/wagmi";
import { ethers } from "ethers";
import { Client as XmtpClient, type Signer as XmtpSigner } from "@xmtp/xmtp-js";

export function ConnectAndSIWE() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [xmtp, setXmtp] = useState<XmtpClient | null>(null);
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    mutation: {
      onSuccess: () => {
        setIsConnecting(false);
      },
      onError: () => {
        setIsConnecting(false);
      },
    },
  });

  const handleConnect = () => {
    setIsConnecting(true);
    connect({ connector: cbWalletConnector });
  };

  const handleDisconnect = () => {
    disconnect();
    setXmtp(null);
    setIsConnecting(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isSmartContractWallet = async (
    address: string,
    provider: ethers.providers.Provider
  ): Promise<boolean> => {
    const code = await provider.getCode(address);
    return code !== "0x";
  };

  const createEOASigner = (signer: ethers.Signer): XmtpSigner => ({
    type: "EOA",
    getIdentifier: async () => ({
      identifier: await signer.getAddress(),
      identifierKind: "Ethereum",
    }),
    signMessage: async (message: string): Promise<Uint8Array> => {
      const signature = await signer.signMessage(message);
      return ethers.utils.arrayify(signature); // convert to Uint8Array
    },
  });

  useEffect(() => {
    const initXMTP = async () => {
      if (!account.isConnected || !account.address || typeof window === "undefined") return;

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const isSCW = await isSmartContractWallet(account.address, provider);

      let xmtpSigner: XmtpSigner;

      if (isSCW) {
        console.warn("SCW not yet implemented. Falling back to EOA.");
        xmtpSigner = createEOASigner(signer);
       
      } else {
        xmtpSigner = createEOASigner(signer);
      }

      const client = await XmtpClient.create(xmtpSigner);
      setXmtp(client);
    };

    initXMTP();
  }, [account.isConnected, account.address]);

  if (!account.isConnected) {
    return (
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium transition-colors"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div
      onClick={handleDisconnect}
      className="bg-green-50 p-4 rounded-lg border border-green-200 cursor-pointer hover:bg-green-100 transition-colors group max-w-md"
    >
      <span className="text-sm font-medium text-green-700">
        Connected as {formatAddress(account.address!)}
      </span>
      {xmtp && <p className="text-xs text-green-600 mt-1">XMTP Client Ready</p>}
    </div>
  );
}
