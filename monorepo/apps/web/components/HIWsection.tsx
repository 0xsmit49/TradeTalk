'use client';
import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Connect & Create Identity",
      description: "Connect your wallet to create an XMTP client. Your identity is extracted and stored securely in the local SQLite database",
      gradient: "from-purple-500 to-blue-500",
      badgeGradient: "from-purple-400 to-pink-400",
      shadowColor: "shadow-purple-500/25",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m6 0H9" />
        </svg>
      )
    },
    {
      number: 2,
      title: "List Your Assets",
      description: "Fill out listing details for NFTs, physical items, or tokens. Sign with EIP-712 to prove ownership and publish to the marketplace",
      gradient: "from-blue-500 to-cyan-500",
      badgeGradient: "from-blue-400 to-cyan-400",
      shadowColor: "shadow-blue-500/25",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      number: 3,
      title: "Browse & Negotiate",
      description: "Browse marketplace listings with seller info, prices in ETH/USDC, and thumbnails. Start secure P2P conversations for deals",
      gradient: "from-cyan-500 to-green-500",
      badgeGradient: "from-cyan-400 to-green-400",
      shadowColor: "shadow-cyan-500/25",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      number: 4,
      title: "Secure Transaction",
      description: "Finalize deals through cryptographic proof of conversation. Hash signatures provide immutable transaction records on Base network",
      gradient: "from-green-500 to-purple-500",
      badgeGradient: "from-green-400 to-purple-400",
      shadowColor: "shadow-green-500/25",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const features = [
    {
      title: "XMTP Protocol",
      description: "End-to-end encrypted messaging",
      icon: "🔐"
    },
    {
      title: "EIP-712 Signatures",
      description: "Cryptographic proof of ownership",
      icon: "✍️"
    },
    {
      title: "Multi-Asset Support",
      description: "NFTs, Physical Items, Tokens",
      icon: "🎯"
    },
    {
      title: "Base Network",
      description: "Fast, low-cost transactions",
      icon: "⚡"
    }
  ];

  const StepCard = ({ step }) => (
    <div className="text-center group">
      <div className="relative mb-8">
        <div className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ${step.shadowColor}`}>
          {step.icon}
        </div>
        <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r ${step.badgeGradient} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
          {step.number}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
      <p className="text-white/70 leading-relaxed">{step.description}</p>
    </div>
  );

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          How TradeTalk <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Secure P2P trading in 4 simple steps with cryptographic proof
        </p>
      </div>

      <div className="relative mb-16">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 via-cyan-500/50 to-green-500/50 transform -translate-y-1/2"></div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} />
          ))}
        </div>
      </div>

      

    </section>
  );
};

export default HowItWorksSection;