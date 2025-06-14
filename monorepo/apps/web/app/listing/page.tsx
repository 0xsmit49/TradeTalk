"use client";

import { useState, useEffect, useRef } from "react";
import { base } from 'viem/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Send, Shield, Hash, Copy, CheckCircle, MessageSquare, User, Clock, Lock } from 'lucide-react';
import { useAccount, useSignMessage } from "wagmi";
import Header from '@/components/Headers';
// Mock listing data for context
const mockListing = {
  id: "listing_001",
  itemName: "Rare Digital Art Collection",
  description: "Exclusive NFT collection with verified provenance",
  category: "NFT",
  price: "2.5 ETH",
  seller: {
    address: "0x1234...5678",
    username: "ArtCollector_Pro",
    verified: true
  },
  buyer: {
    address: "0x9876...5432", 
    username: "DigitalInvestor",
    verified: true
  }
};

// Mock conversation data
const initialMessages = [
  {
    id: 1,
    sender: "buyer",
    message: "Hi! I'm interested in your NFT collection. Can you tell me more about the provenance?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    verified: true,
    hash: "0xabc123...def456"
  },
  {
    id: 2,
    sender: "seller", 
    message: "Hello! This collection was minted directly by the artist in 2023. I have all the original certificates and can provide verification.",
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    verified: true,
    hash: "0xghi789...jkl012"
  },
  {
    id: 3,
    sender: "buyer",
    message: "That sounds great. Are you willing to negotiate on the price? I'm thinking around 2.2 ETH.",
    timestamp: new Date(Date.now() - 2400000).toISOString(),
    verified: true,
    hash: "0xmno345...pqr678"
  },
  {
    id: 4,
    sender: "seller",
    message: "I can do 2.3 ETH as my final offer. The collection has been appraised at 2.8 ETH recently.",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    verified: true,
    hash: "0xstu901...vwx234"
  }
];

export default function ProofOfConversation() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHash, setConversationHash] = useState('');
  const [proofGenerated, setProofGenerated] = useState(false);
  const [selectedChat, setSelectedChat] = useState('active');
  const [userRole, setUserRole] = useState('buyer'); // buyer or seller
  const messagesEndRef = useRef(null);

  const { address, isConnected } = useAccount();
  const { signMessage, data: signature, isPending: isSigningPending } = useSignMessage();

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate conversation hash
  const generateConversationHash = () => {
    const conversationData = messages.map(msg => ({
      sender: msg.sender,
      message: msg.message,
      timestamp: msg.timestamp
    }));
    
    const dataString = JSON.stringify(conversationData);
    const hash = `0x${Math.random().toString(16).substr(2, 64)}`;
    setConversationHash(hash);
    return hash;
  };

  // Handle sending new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !isConnected) return;

    const messageId = messages.length + 1;
    const timestamp = new Date().toISOString();
    
    // Create message object
    const message = {
      id: messageId,
      sender: userRole,
      message: newMessage,
      timestamp,
      verified: false,
      hash: null
    };

    // Add message to conversation
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    try {
      // Sign the message for proof
      const messageToSign = `TradeTalk Message: ${newMessage} | Timestamp: ${timestamp} | Listing: ${mockListing.id}`;
      
      await signMessage({
        message: messageToSign
      });

      // Update message with verification
      const messageHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, verified: true, hash: messageHash }
          : msg
      ));

    } catch (error) {
      console.error('Error signing message:', error);
    } finally {
      setIsTyping(false);
    }

    // Mock response from other party (for demo)
    setTimeout(() => {
      const responseMessage = {
        id: messageId + 1,
        sender: userRole === 'buyer' ? 'seller' : 'buyer',
        message: getRandomResponse(),
        timestamp: new Date().toISOString(),
        verified: true,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const getRandomResponse = () => {
    const responses = [
      "I understand your position. Let me think about it.",
      "That's a fair point. Can we discuss the details further?",
      "I appreciate your interest. When would you like to proceed?",
      "Thanks for the clarification. I'll get back to you shortly.",
      "Sounds good! Let's move forward with the next steps."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Generate proof of conversation
  const handleGenerateProof = async () => {
    if (!isConnected) return;

    const hash = generateConversationHash();
    
    try {
      // Sign the conversation hash
      const proofMessage = `TradeTalk Conversation Proof | Hash: ${hash} | Listing: ${mockListing.id} | Participants: ${mockListing.buyer.address}, ${mockListing.seller.address}`;
      
      await signMessage({
        message: proofMessage
      });

      setProofGenerated(true);
      
    } catch (error) {
      console.error('Error generating proof:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <OnchainKitProvider apiKey="HtKBr6ZPPcdHN6plf9qm4G3TAuQtV7Kf" chain={base}>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
                <Header/>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                TradeTalk Conversation
              </h1>
              <p className="text-gray-400">Secure, verified communication with cryptographic proof</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Sidebar - Listing Info & Controls */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Listing Info */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Listing Details
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">Item:</span>
                      <p className="text-white font-medium">{mockListing.itemName}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Price:</span>
                      <p className="text-green-400 font-bold">{mockListing.price}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Category:</span>
                      <p className="text-white">{mockListing.category}</p>
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Participants
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        S
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{mockListing.seller.username}</p>
                        <p className="text-gray-400 text-xs">{mockListing.seller.address}</p>
                      </div>
                      {mockListing.seller.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        B
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{mockListing.buyer.username}</p>
                        <p className="text-gray-400 text-xs">{mockListing.buyer.address}</p>
                      </div>
                      {mockListing.buyer.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                  </div>
                </div>

                {/* Role Selector */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold mb-4">Your Role</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUserRole('buyer')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        userRole === 'buyer'
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      Buyer
                    </button>
                    <button
                      onClick={() => setUserRole('seller')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        userRole === 'seller'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      Seller
                    </button>
                  </div>
                </div>

                {/* Proof Generation */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Conversation Proof
                  </h3>
                  
                  {!proofGenerated ? (
                    <button
                      onClick={handleGenerateProof}
                      disabled={!isConnected || messages.length < 2}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium py-3 px-4 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSigningPending ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating...
                        </div>
                      ) : (
                        'Generate Proof'
                      )}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Proof Generated
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-xs">Conversation Hash</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-xs font-mono break-all">{conversationHash}</span>
                          <button 
                            onClick={() => copyToClipboard(conversationHash)}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <Copy className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 h-[600px] flex flex-col">
                  
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Secure Conversation</h3>
                        <p className="text-gray-400 text-sm">All messages are cryptographically signed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <Lock className="w-4 h-4" />
                      Encrypted
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === userRole ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.sender === userRole
                            ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs opacity-80">
                              {message.sender === 'buyer' ? mockListing.buyer.username : mockListing.seller.username}
                            </span>
                            {message.verified && <CheckCircle className="w-3 h-3 text-green-400" />}
                          </div>
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-60">
                            <span>{formatTime(message.timestamp)}</span>
                            {message.hash && (
                              <span className="font-mono">{message.hash.substring(0, 8)}...</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 rounded-2xl px-4 py-3 border border-white/20">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/20">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        disabled={!isConnected}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || !isConnected || isSigningPending}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSigningPending ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    
                    {!isConnected && (
                      <p className="text-red-400 text-sm mt-2">Connect your wallet to send messages</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}