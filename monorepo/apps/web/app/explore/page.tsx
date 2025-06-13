'use client'
import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Shield, ChevronRight, Eye, MessageSquare, Verified } from 'lucide-react';
import Header from '@/components/Headers';
// Mock listings data
const mockListings = [
  {
    id: "listing_001",
    itemName: "Rare Digital Art Collection",
    description: "Exclusive NFT collection with verified provenance and authentic certificates",
    category: "NFT",
    price: "2.5 ETH",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=300&fit=crop",
    seller: {
      address: "0x1234...5678",
      username: "ArtCollector_Pro",
      verified: true,
      rating: 4.9
    },
    views: 1247,
    messages: 23,
    timeLeft: "3 days",
    featured: true,
    tags: ["Digital Art", "Verified", "Rare"]
  },
  {
    id: "listing_002", 
    itemName: "Vintage Gaming Console Bundle",
    description: "Complete retro gaming setup with original accessories and rare games",
    category: "Gaming",
    price: "0.8 ETH",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
    seller: {
      address: "0x9876...5432",
      username: "RetroGamer_X",
      verified: true,
      rating: 4.7
    },
    views: 892,
    messages: 15,
    timeLeft: "5 days",
    featured: false,
    tags: ["Gaming", "Vintage", "Complete Set"]
  },
  {
    id: "listing_003",
    itemName: "Limited Edition Sneakers",
    description: "Exclusive collaboration sneakers in mint condition with original packaging",
    category: "Fashion",
    price: "1.2 ETH",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    seller: {
      address: "0xabcd...efgh",
      username: "SneakerHead_99",
      verified: false,
      rating: 4.5
    },
    views: 2156,
    messages: 41,
    timeLeft: "1 day",
    featured: true,
    tags: ["Limited Edition", "Fashion", "Mint Condition"]
  },
  {
    id: "listing_004",
    itemName: "Professional Camera Equipment",
    description: "High-end photography gear including lenses and professional accessories",
    category: "Electronics",
    price: "3.1 ETH", 
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
    seller: {
      address: "0x5678...9012",
      username: "PhotoPro_Studio",
      verified: true,
      rating: 4.8
    },
    views: 743,
    messages: 12,
    timeLeft: "2 weeks",
    featured: false,
    tags: ["Professional", "Photography", "Complete Kit"]
  },
  {
    id: "listing_005",
    itemName: "Crypto Trading Bot License",
    description: "Advanced algorithmic trading bot with proven track record and documentation",
    category: "Software",
    price: "0.5 ETH",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=300&fit=crop",
    seller: {
      address: "0x3456...7890",
      username: "CryptoDevMaster",
      verified: true,
      rating: 4.6
    },
    views: 1834,
    messages: 67,
    timeLeft: "4 days",
    featured: false,
    tags: ["Trading", "Algorithm", "Proven Results"]
  },
  {
    id: "listing_006",
    itemName: "Handcrafted Jewelry Set",
    description: "Unique artisan jewelry collection made with precious metals and stones",
    category: "Jewelry",
    price: "1.8 ETH",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    seller: {
      address: "0x7890...1234",
      username: "ArtisanCrafter",
      verified: true,
      rating: 4.9
    },
    views: 956,
    messages: 28,
    timeLeft: "1 week",
    featured: true,
    tags: ["Handcrafted", "Precious Metals", "Unique"]
  }
];

const categories = ["All", "NFT", "Gaming", "Fashion", "Electronics", "Software", "Jewelry"];

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

 
  const filteredListings = mockListings
    .filter(listing => {
      const matchesSearch = listing.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          return b.featured - a.featured;
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'newest':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    const handleListingClick = async (listing) => {
      if (!xmtp) {
        console.error("XMTP client not initialized");
        return;
      }
    
      const recipientAddress = listing.seller.address;
    
      // Check if recipient is reachable
      const canMessage = await XmtpClient.canMessage([recipientAddress]);
      if (!canMessage.get(recipientAddress)) {
        alert("This user is not available for messaging on XMTP.");
        return;
      }
    
      // Create or resume conversation
      const conversation = await xmtp.conversations.newConversation(recipientAddress);
    
      // Store the conversation
      // Here we redirect with listingId
      const slug = listing.itemName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
    
      window.location.href = `/listing/${slug}?listingId=${listing.id}`;
    };
    

  const formatPrice = (price) => {
    return price;
  };

  const formatTimeLeft = (timeLeft) => {
    return timeLeft;
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Header/>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              TradeTalk Marketplace
            </h1>
            <p className="text-gray-400 text-lg">Discover verified listings with secure, cryptographically-signed conversations</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-lg border border-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="featured" className="bg-gray-800">Featured First</option>
                <option value="newest" className="bg-gray-800">Newest</option>
                <option value="price-high" className="bg-gray-800">Price: High to Low</option>
                <option value="price-low" className="bg-gray-800">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-400">
              Showing {filteredListings.length} of {mockListings.length} listings
            </p>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => handleListingClick(listing)}
                className="group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-purple-500/50 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.itemName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {listing.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                    {formatTimeLeft(listing.timeLeft)} left
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">
                      {listing.itemName}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {listing.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {formatPrice(listing.price)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {listing.category}
                    </span>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {listing.seller.username.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium">
                          {listing.seller.username}
                        </span>
                        {listing.seller.verified && (
                          <Shield className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-gray-400 text-xs">
                          {listing.seller.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{listing.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{listing.messages}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{listing.timeLeft}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

       
          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">No listings found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}

       
          <div className="mt-16 text-center">
            <p className="text-gray-400">
              All conversations are secured with blockchain technology and cryptographic signatures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}