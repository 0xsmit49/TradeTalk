"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { cbWalletConnector } from "../app/wagmi";
import { ethers } from "ethers";
import { Client as XmtpClient } from "@xmtp/xmtp-js";
import { createXmtpClient } from "../lib/xmtp"; 

export function ConnectAndSIWE() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [xmtp, setXmtp] = useState<XmtpClient | null>(null);
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    mutation: {
      onSuccess: () => setIsConnecting(false),
      onError: () => setIsConnecting(false),
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

  useEffect(() => {
    const initXMTP = async () => {
      if (!account.isConnected || !account.address || typeof window === "undefined") return;

      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      try {
        const client = await createXmtpClient(account.address, provider);
        setXmtp(client);
      } catch (err) {
        console.error("Failed to create XMTP client:", err);
      }
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
        Connected as {account.address.slice(0, 6)}...{account.address.slice(-4)}
      </span>
      {xmtp && <p className="text-xs text-green-600 mt-1">XMTP Client Ready</p>}
    </div>
  );
}
