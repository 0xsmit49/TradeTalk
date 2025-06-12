import { ethers } from "ethers";
import { Client as XmtpClient, type Signer as XmtpSigner } from "@xmtp/xmtp-js";

export const isSmartContractWallet = async (
  address: string,
  provider: ethers.providers.Provider
): Promise<boolean> => {
  const code = await provider.getCode(address);
  return code !== "0x";
};

export const createEOASigner = (signer: ethers.Signer): XmtpSigner => ({
  type: "EOA",
  getIdentifier: async () => ({
    identifier: await signer.getAddress(),
    identifierKind: "Ethereum",
  }),
  signMessage: async (message: string): Promise<Uint8Array> => {
    const signature = await signer.signMessage(message);
    return ethers.utils.arrayify(signature);
  },
});

export const createXmtpClient = async (
  address: string,
  provider: ethers.providers.Web3Provider
): Promise<XmtpClient> => {
  const signer = provider.getSigner();
  const isSCW = await isSmartContractWallet(address, provider);

  let xmtpSigner: XmtpSigner;

  if (isSCW) {
    
    console.warn("SCW support not implemented yet; falling back to EOA");
  }

  xmtpSigner = createEOASigner(signer);
  const client = await XmtpClient.create(xmtpSigner);
  return client;
};
