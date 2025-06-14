'use client';
import { base } from 'viem/chains';
import styles from "./page.module.css";
import Header from '@/components/Headers';
import React, { useState } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';

// Listing Creation Component
function ListingCreationSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isListed, setIsListed] = useState(false);
  const [listingDetails, setListingDetails] = useState<{
    listingId: string;
    contractAddress: string;
    marketplaceUrl: string;
    xmtpIdentity: string;
    deploymentTime: string;
    status: string;
  } | null>(null);
  
  const [listingData, setListingData] = useState({
    itemName: '',
    description: '',
    category: 'NFT',
    price: '0.01',
    currency: 'ETH',
    tokenAddress: '',
    deliveryTerms: '',
    thumbnail: null as File | null,
    walletConnected: true,
    xmtpEnabled: false
  });

  const steps = [
    
    { id: 1, title: 'Asset Details', icon: '📝' },
    { id: 2, title: 'Set Price', icon: '💰' },
    { id: 3, title: 'Upload Media', icon: '🖼️' },
    { id: 4, title: 'Publish Listing', icon: '🚀' }
  ];

  const categories = [
    { id: 'NFT', name: 'NFT', description: 'Non-Fungible Tokens' },
    { id: 'Physical', name: 'Physical Item', description: 'Real-world goods' },
    { id: 'Token', name: 'Token', description: 'Cryptocurrency tokens' }
  ];

  const currencies = ['ETH', 'USDC', 'USDT', 'DAI'];

  const handleInputChange = (field: any, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const connectWallet = () => {
    // Simulate wallet connection
    handleInputChange('walletConnected', true);
    handleInputChange('xmtpEnabled', true);
    nextStep();
  };


  const publishListing = () => {
    // Generate listing details
    const details = {
      listingId: `listing_${Math.random().toString(36).substr(2, 9)}`,
      contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
      marketplaceUrl: `https://tradetalk.com/listing/${Math.random().toString(36).substr(2, 9)}`,
      xmtpIdentity: `xmtp_${Math.random().toString(36).substr(2, 12)}`,
      deploymentTime: new Date().toISOString(),
      status: 'Active'
    };
    
    setListingDetails(details);
    setIsListed(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('thumbnail', file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Create New Listing
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          List your digital assets on TradeTalk marketplace. Connect securely via XMTP and start trading instantly.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-4 bg-gray-900/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-800">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                currentStep === step.id
                  ? 'bg-purple-600 text-white'
                  : currentStep > step.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              <span className="text-lg">{step.icon}</span>
              <span className="font-medium hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800 p-8 mb-8">
        {/* Step 1: Connect Wallet */}
        

        {/* Step 2: Asset Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">📝 Asset Details</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Item Name</label>
                <input
                  type="text"
                  value={listingData.itemName}
                  onChange={(e) => handleInputChange('itemName', e.target.value)}
                  placeholder="Enter your item's name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Description</label>
                <textarea
                  value={listingData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your item..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-medium mb-2">Category</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleInputChange('category', category.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        listingData.category === category.id
                          ? 'border-purple-500 bg-purple-900/30'
                          : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                      }`}
                    >
                      <h4 className="font-bold text-white">{category.name}</h4>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              {listingData.category === 'NFT' && (
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Token Address</label>
                  <input
                    type="text"
                    value={listingData.tokenAddress}
                    onChange={(e) => handleInputChange('tokenAddress', e.target.value)}
                    placeholder="0x..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-300 font-medium mb-2">Delivery Terms</label>
                <input
                  type="text"
                  value={listingData.deliveryTerms}
                  onChange={(e) => handleInputChange('deliveryTerms', e.target.value)}
                  placeholder="e.g., NFT transferred after payment, Physical item shipped within 3 days"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <button
                  onClick={connectWallet}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 font-bold"
                >
                  Next Step
                </button>
          </div>
        )}

        {/* Step 3: Set Price */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">💰 Set Price</h2>
            <div className="bg-gray-800/50 rounded-2xl p-6">
              <label className="block text-gray-300 font-medium mb-4">Price</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  step="0.001"
                  value={listingData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
                <select
                  value={listingData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500 mt-2">Set your asking price in crypto</p>
            </div>
          </div>
        )}

        {/* Step 4: Upload Media */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">🖼️ Upload Media</h2>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📁</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Click to upload thumbnail</p>
                      <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </label>
                {listingData.thumbnail && (
                  <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-700">
                    <p className="text-green-300">✓ {listingData.thumbnail.name} uploaded</p>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-900/30 rounded-2xl p-6 border border-blue-700">
                <h3 className="text-lg font-bold text-blue-300 mb-2">Preview Tips</h3>
                <ul className="text-blue-100 space-y-1 text-sm">
                  <li>• Use high-quality images for better visibility</li>
                  <li>• Square format (1:1) works best for thumbnails</li>
                  <li>• Show multiple angles for physical items</li>
                  <li>• Include metadata/rarity info for NFTs</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Publish */}
        {currentStep === 4 && !isListed && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">🚀 Ready to Publish</h2>
            <div className="bg-gray-800/50 rounded-2xl p-8 space-y-4">
              <div className="text-left space-y-2">
                <p><span className="text-gray-400">Item:</span> <span className="text-white">{listingData.itemName}</span></p>
                <p><span className="text-gray-400">Category:</span> <span className="text-blue-400">{listingData.category}</span></p>
                <p><span className="text-gray-400">Price:</span> <span className="text-green-400">{listingData.price} {listingData.currency}</span></p>
                <p><span className="text-gray-400">Delivery:</span> <span className="text-purple-400">{listingData.deliveryTerms}</span></p>
                {listingData.thumbnail && (
                  <p><span className="text-gray-400">Media:</span> <span className="text-cyan-400">✓ Thumbnail uploaded</span></p>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">What happens next?</h3>
              <div className="text-left space-y-2 text-purple-100">
                <p>🔐 Listing signed with EIP-712 for authenticity</p>
                <p>💬 XMTP chat enabled for buyer communication</p>
                <p>📋 Instant marketplace visibility</p>
                <p>🔍 Searchable by category and price</p>
              </div>
            </div>
          </div>
        )}

        {/* Published Listing Details */}
        {currentStep === 4 && isListed && listingDetails && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">🎉</span>
              <h2 className="text-3xl font-bold text-white mb-2">Listing Successfully Published!</h2>
              <p className="text-gray-300">Your item is now live on TradeTalk marketplace</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-blue-400 mr-2">📝</span>
                  Listing Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Listing ID:</span>
                    <span className="text-white font-mono">{listingDetails.listingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400 font-semibold">{listingDetails.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Published:</span>
                    <span className="text-white">{new Date(listingDetails.deploymentTime).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-purple-400 mr-2">🔐</span>
                  Blockchain Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract:</span>
                    <span className="text-white font-mono text-xs">{listingDetails.contractAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network:</span>
                    <span className="text-blue-400">Base Sepolia</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Signature:</span>
                    <span className="text-green-400">EIP-712 Verified</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-cyan-400 mr-2">💬</span>
                  XMTP Communication
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Identity:</span>
                    <span className="text-white font-mono">{listingDetails.xmtpIdentity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chat Status:</span>
                    <span className="text-cyan-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Inbox:</span>
                    <span className="text-white">Ready</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="text-green-400 mr-2">💰</span>
                  Listing Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="text-green-400 font-semibold">{listingData.price} {listingData.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-blue-400">{listingData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views:</span>
                    <span className="text-white">0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">🔗 Access Your Listing</h3>
              <div className="text-sm">
                <p className="text-green-100 mb-2"><strong>Marketplace URL:</strong></p>
                <a href={listingDetails.marketplaceUrl} className="text-white underline hover:text-green-200 break-all">
                  {listingDetails.marketplaceUrl}
                </a>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-yellow-300 mb-2 flex items-center">
                <span className="mr-2">📈</span>
                Next Steps
              </h3>
              <ul className="text-yellow-100 space-y-1 text-sm">
                <li>• Share your listing URL to attract buyers</li>
                <li>• Respond to XMTP messages from interested buyers</li>
                <li>• Monitor listing performance in your dashboard</li>
                <li>• Update price or details anytime</li>
                <li>• Complete trades through secure escrow</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        {currentStep === 1 ? (
          <div></div> // Empty div for spacing, connect button is in the step content
        ) : currentStep < 4 ? (
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Next Step
          </button>
        ) : !isListed ? (
          <button
            onClick={publishListing}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 font-bold"
          >
            🚀 Publish Listing
          </button>
        ) : (
          <button
            disabled
            className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-bold cursor-not-allowed opacity-75"
          >
            📋 Listing Published
          </button>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <OnchainKitProvider apiKey="HtKBr6ZPPcdHN6plf9qm4G3TAuQtV7Kf" chain={base}>
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Animated Lines */}
          <div className="absolute inset-0">
            <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse top-1/4"></div>
            <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse top-2/3 delay-1000"></div>
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse left-1/4 delay-2000"></div>
            <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-pulse right-1/3 delay-500"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen">
          <Header/>
          <ListingCreationSection/>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `}</style>
      </OnchainKitProvider>
    </div>
  );
}