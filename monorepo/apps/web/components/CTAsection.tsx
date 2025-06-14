import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Zap, Star, Users, Shield, CheckCircle, Sparkles, Rocket, Clock
} from 'lucide-react';

type Testimonial = {
  text: string;
  author: string;
  role: string;
};

type Plan = {
  name: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  cta: string;
};

const CTASection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  const testimonials: Testimonial[] = [
    {
      text: "Sold my NFT collection safely with verified buyers in minutes",
      author: "Alex Chen",
      role: "Digital Artist"
    },
    {
      text: "The proof of conversation feature saved me from a scam attempt",
      author: "Maria Rodriguez",
      role: "NFT Collector"
    },
    {
      text: "Finally a platform I can trust for high-value token trades",
      author: "David Thompson",
      role: "DeFi Trader"
    }
  ];

  const features = [
    "No listing fees or hidden costs",
    "XMTP identity verification",
    "EIP-712 cryptographic signatures",
    "24/7 decentralized trading"
  ];

  const plans: Plan[] = [
    {
      name: "Basic Trader",
      subtitle: "For casual trading",
      price: "Free",
      period: "forever",
      features: ["Up to 5 listings/month", "Basic verification", "Community support"],
      popular: false,
      cta: "Start Trading"
    },
    {
      name: "Pro Trader",
      subtitle: "Most popular choice",
      price: "0.5%",
      period: "per trade",
      features: ["Unlimited listings", "Priority verification", "Advanced proof tools", "Premium support"],
      popular: true,
      cta: "Upgrade to Pro"
    },
    {
      name: "Market Maker",
      subtitle: "For high-volume traders",
      price: "Custom",
      period: "rates",
      features: ["Volume discounts", "Dedicated support", "API access", "White-label options"],
      popular: false,
      cta: "Contact Us"
    }
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const testimonial = testimonials[currentTestimonial];

  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Countdown banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-6 py-2 mb-4">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-semibold text-sm">LAUNCH WEEK SPECIAL</span>
          </div>
          <div className="flex justify-center items-center space-x-6 text-white">
            {(['hours', 'minutes', 'seconds'] as const).map((unit, i) => (
              <React.Fragment key={unit}>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    {String(timeLeft[unit]).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/60 uppercase">{unit}</div>
                </div>
                {i < 2 && <div className="text-white/60">:</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* CTA heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-white/80 text-sm">Join 50K+ verified traders</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Trade</span><br />
            With Confidence?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
            Connect your wallet and start trading in minutes. Every transaction is verified, every conversation is secured.
          </p>

          {/* Testimonial */}
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-white/90 text-lg italic mb-4">
                "{testimonial?.text}"
              </blockquote>
              <div className="text-white/70">
                <div className="font-semibold">{testimonial?.author}</div>
                <div className="text-sm">{testimonial?.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 ${
                plan.popular ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm mb-4">{plan.subtitle}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60 ml-1">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature list */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-white/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-white/90 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => window.location.href = '/connect-wallet'}
              className="group px-12 py-4 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white font-bold text-xl rounded-2xl hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-emerald-500/25 cursor-pointer"
            >
              <span className="flex items-center space-x-3">
                <Rocket className="w-6 h-6" />
                <span>Connect Wallet</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-12 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-xl rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300">
              Browse Marketplace
            </button>
          </div>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            No registration fees • Wallet-based identity • Trade instantly<br />
            <span className="text-emerald-400">Zero fees</span> for your first 10 trades
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-white/60 text-sm">Verified Traders</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">99.8%</div>
              <div className="text-white/60 text-sm">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">25K+</div>
              <div className="text-white/60 text-sm">Assets Traded</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-emerald-400 bg-clip-text text-transparent mb-2">$5M+</div>
              <div className="text-white/60 text-sm">Trade Volume</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;