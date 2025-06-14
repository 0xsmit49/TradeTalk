import React from "react";

export default function HeroSection() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6 text-center max-w-4xl mx-auto py-20">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            TradeTalk
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white/90">
            Secure P2P Trading Made Simple
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Trade NFTs, tokens, and physical items with cryptographic proof of conversations. 
            Connect your wallet, verify identities through XMTP, and trade with confidence using EIP-712 signatures.
          </p>
        </div>

       

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => window.location.href = '/explore'}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Browse Marketplace
          </button>
          <button 
            onClick={() => window.location.href = '/create'}
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Create Listing
          </button>
       
        </div>

      </div>
    </main>
  );
}