---


# Tech Stack for TradeTalk



A modular, decentralized commerce and negotiation platform leveraging XMTP, Ethereum, programmable agents, and onchain proofs for **secure, verifiable, wallet-native transactions**.

---
## Core Components

| Layer            | Stack                                        | Purpose                                                   |
|------------------|----------------------------------------------|----------------------------------------------------------|
| **Frontend**     | **Next.js**                                  | Interface for browsing listings, creating offers, chat   |
| **UI Design**    | TailwindCSS + shadcn/ui                      | Clean, modern interface for messaging and commerce flows  |
| **Monorepo**      | Turborepo / Nx                                   |Unified management for frontend, API, agents     |
| **Smart Contracts** | Solidity + Hardhat + Viem                  | Proof of Conversation generation, transaction logic       |

## Deployment & Hosting

| Layer            | Stack/Provider        | Purpose                          |
|------------------|-----------------------|----------------------------------|
| **Frontend**     | **Vercel**            | Global CDN, optimized for fast access |
| **Smart Contracts** | **Base (EVM)**        | Onchain proof storage, contract execution     |
| **CI/CD**        | GitHub Actions        | Automated builds and deployments  |

## Messaging & Communication

| Layer            | Stack/Protocol        | Purpose                                         |
|------------------|-----------------------|------------------------------------------------|
| **Messaging**    | **XMTP Protocol**     | Encrypted wallet-to-wallet conversations       |
| **Proof Generation** | Hashing (SHA-256) + Solidity    | Verifiable, onchain Proof of Conversation     |

## Wallets & Identity

| Layer            | Stack/Protocol        | Purpose                                       |
|------------------|-----------------------|-----------------------------------------------|
| **Authentication** | CDP WalletConnect | Connect EVM-compatible wallets easily       |
| **Identity Switching** | AgentKit + XMTP Contexts  | Switch between multiple personas/profiles   |

## Payments & Transactions

| Layer             | Stack/Protocol       | Purpose                                      |
|-------------------|----------------------|----------------------------------------------|
| **Transaction Layer** | Base L2 + ERC-20 tokens | Fast, cheap settlement of payments         |
| **Escrow/Future** | Future Integration | Future roadmap for escrow-enabled transactions |

## Automation & Agents

| Layer            | Stack/Tool            | Purpose                                     |
|------------------|-----------------------|---------------------------------------------|
| **Programmable Agents** | AgentKit         | Identity switching, automation, Proof orchestration  |
| **AI Integration**  | LLM APIs  | Negotiation bots, summarization, recommendations  |

## Analytics & Monitoring

| Layer            | Stack/Tool            | Purpose                                      |
|------------------|-----------------------|----------------------------------------------|
| **App Analytics** | Plausible Analytics  | Privacy-first user behavior tracking        |
| **Smart Contract Monitoring** | Tenderly + Hardhat | Debugging and monitoring of onchain components |

## Onchain Proof & Verification

| Layer            | Stack/Protocol        | Purpose                                       |
|------------------|-----------------------|-----------------------------------------------|
| **Hashing Algorithm** | SHA-256          | Generating unique content fingerprints       |
| **Proof Storage** | Solidity Contracts (Base) | Immutable, verifiable Proof of Conversation |







---
