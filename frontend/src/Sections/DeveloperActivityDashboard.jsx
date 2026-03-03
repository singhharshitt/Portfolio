import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Coins,
  ShoppingBag,
  Gift,
  Zap,
  ExternalLink,
  TrendingUp,
  Diamond,
  Hexagon,
  Box,
  Rocket,
  Globe,
} from 'lucide-react';
import {
  SiEthereum,
  SiSolana,
  SiPolygon,
  SiGumroad,
  SiPayhip,
  SiKofi,
  SiX,
  SiLens,
} from 'react-icons/si';

// Web3 & Blockchain Data
const WEB3_STATS = {
  wallets: [
    { name: 'MetaMask', address: '0x7a8...3f2a', balance: '2.45 ETH', chain: 'Ethereum', logo: SiEthereum },
    { name: 'Phantom', address: 'HN8x...9kL2', balance: '145 SOL', chain: 'Solana', logo: SiSolana },
  ],
  nfts: {
    collected: 24,
    created: 8,
    volume: '12.5 ETH',
    collections: ['BAYC', 'Azuki', 'DeGods']
  },
  airdrops: {
    claimed: 6,
    pending: 3,
    estimated: '$4,250',
    recent: ['LayerZero', 'Zksync', 'Starknet']
  },
  chains: ['Ethereum', 'Solana', 'Polygon', 'Arbitrum', 'Base']
};

// Digital Products Data
const DIGITAL_PRODUCTS = {
  platforms: [
    { 
      name: 'Gumroad', 
      logo: SiGumroad,
      color: '#FF90E8',
      products: 3,
      revenue: '$1',
      url: 'https://rb.gy/xsuj36',
      topProduct: 'React Animation Masterclass'
    },
    { 
      name: 'Payhip', 
      logo: SiPayhip,
      color: '#2563EB',
      products: 8,
      revenue: '$3,200',
      url: 'https://payhip.com/singhharshitt',
      topProduct: 'UI Design System Kit'
    },
    { 
      name: 'Ko-fi', 
      logo: SiKofi,
      color: '#FF5E5B',
      supporters: 0,
      revenue: '$0',
      url: 'https://ko-fi.com/neocartyhere',
      topProduct: 'Premium Templates'
    }
  ],
  totalRevenue: '$13,750',
  totalSales: 1247,
  digitalDownloads: 5890
};

// Airdrop Hunting Tracker
const AIRDROP_TRACKER = [
  { name: 'LayerZero', status: 'claimed', amount: '$1,200', date: '2024-06-15', tier: 'Tier 1' },
  { name: 'Zksync', status: 'claimed', amount: '$850', date: '2024-05-20', tier: 'Tier 2' },
  { name: 'Starknet', status: 'claimed', amount: '$2,100', date: '2024-04-10', tier: 'Tier 1' },
  { name: 'Linea', status: 'pending', estimated: '$600', progress: 75, tier: 'Tier 2' },
  { name: 'Scroll', status: 'pending', estimated: '$400', progress: 60, tier: 'Tier 3' },
  { name: 'Blast', status: 'farming', estimated: '$1,200+', progress: 45, tier: 'Tier 1' },
];

const CHAIN_LOGOS = {
  Ethereum: SiEthereum,
  Solana: SiSolana,
  Polygon: SiPolygon,
};

const SOCIAL_LINKS = [
  { name: 'X', url: 'https://x.com/singhharshitt', icon: SiX },
  { name: 'Lens', url: 'https://www.lens.xyz/', icon: SiLens },
  { name: 'ENS', url: 'https://ens.domains/', icon: SiEthereum },
];

const BlockchainNode = ({ chain, index, total }) => {
  const angle = (index / total) * 360;
  const radius = 120;
  const ChainIcon = CHAIN_LOGOS[chain] ?? Hexagon;
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}px)`,
        top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}px)`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      whileHover={{ scale: 1.2 }}
    >
      <div className="relative group cursor-pointer">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#5D0D18]/20 bg-[#FFFBEB] shadow-lg"
          whileHover={{ borderColor: '#5D0D18', boxShadow: '0 0 20px rgba(93, 13, 24, 0.3)' }}
        >
          <ChainIcon size={20} className="text-[#5D0D18]" />
        </motion.div>
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-[#5D0D18] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {chain}
        </motion.div>
      </div>
    </motion.div>
  );
};

const WalletCard = ({ wallet, index }) => {
  const WalletLogo = wallet.logo ?? Globe;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5D0D18] to-[#3d0910] p-6 text-[#FFFBEB]"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(93, 13, 24, 0.4)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-[#FFFBEB]/10 rounded-lg">
          <WalletLogo size={20} />
        </div>
        <span className="text-xs bg-[#FFFBEB]/20 px-2 py-1 rounded-full">{wallet.chain}</span>
      </div>
      <h4 className="font-bold text-lg mb-1">{wallet.name}</h4>
      <p className="text-[#FFFBEB]/60 text-sm font-mono mb-3">{wallet.address}</p>
      <div className="text-2xl font-bold font-fliege">{wallet.balance}</div>

      {/* Animated background */}
      <motion.div
        className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#FFFBEB]/5"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </motion.div>
  );
};

const PlatformCard = ({ platform, index }) => {
  const PlatformLogo = platform.logo ?? ShoppingBag;
  
  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl bg-white border border-[#5D0D18]/10 p-6 shadow-sm hover:shadow-xl transition-all"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
        style={{ backgroundColor: platform.color }}
      />
      
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${platform.color}20` }}
        >
          <PlatformLogo size={24} style={{ color: platform.color }} />
        </div>
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ x: 3 }}
        >
          <ExternalLink size={16} className="text-[#5D0D18]" />
        </motion.div>
      </div>
      
      <h4 className="font-bold text-[#1a1a1a] text-lg mb-1">{platform.name}</h4>
      <p className="text-sm text-[#1a1a1a]/50 mb-4 line-clamp-1">{platform.topProduct}</p>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-[#5D0D18] font-fliege">{platform.revenue}</div>
          <div className="text-xs text-[#1a1a1a]/50">
            {platform.products ? `${platform.products} products` : `${platform.supporters} supporters`}
          </div>
        </div>
        <motion.div
          className="w-10 h-10 rounded-full bg-[#5D0D18]/10 flex items-center justify-center group-hover:bg-[#5D0D18] transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <TrendingUp size={18} className="text-[#5D0D18] group-hover:text-[#FFFBEB]" />
        </motion.div>
      </div>
    </motion.a>
  );
};

const AirdropRow = ({ drop, index }) => {
  const statusColors = {
    claimed: '#6B7A3D',
    pending: '#C67C4E',
    farming: '#5D0D18'
  };

  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#5D0D18]/10 hover:border-[#5D0D18]/30 transition-colors"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ x: 5 }}
    >
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${statusColors[drop.status]}20` }}
      >
        <Gift size={18} style={{ color: statusColors[drop.status] }} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h5 className="font-bold text-[#1a1a1a]">{drop.name}</h5>
          <span 
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${statusColors[drop.status]}20`, color: statusColors[drop.status] }}
          >
            {drop.tier}
          </span>
        </div>
        <div className="text-sm text-[#1a1a1a]/50">
          {drop.status === 'claimed' ? `Claimed ${drop.date}` : `${drop.progress}% complete`}
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-[#5D0D18] font-fliege">
          {drop.amount || drop.estimated}
        </div>
        <div className="text-xs text-[#1a1a1a]/50 capitalize">{drop.status}</div>
      </div>
      
      {drop.status !== 'claimed' && (
        <div className="w-24 h-1.5 bg-[#5D0D18]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: statusColors[drop.status] }}
            initial={{ width: 0 }}
            whileInView={{ width: `${drop.progress}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          />
        </div>
      )}
    </motion.div>
  );
};

const NFTGallery = () => (
  <motion.div
    className="grid grid-cols-3 gap-3"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <motion.div
        key={i}
        className="aspect-square rounded-xl bg-gradient-to-br from-[#9FB2AC]/20 to-[#5D0D18]/20 border border-[#5D0D18]/10 flex items-center justify-center relative overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
      >
        <Diamond size={24} className="text-[#5D0D18]/30 group-hover:text-[#5D0D18] transition-colors" />
        <motion.div
          className="absolute inset-0 bg-[#5D0D18]/5 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </motion.div>
    ))}
  </motion.div>
);

export default function DeveloperActivityDashboard({ githubStats, leetCodeStats, gfgStats }) {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('web3');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const stats = [
    { label: 'Web3 Chains', value: WEB3_STATS.chains.length, Icon: Globe, color: '#5D0D18' },
    { label: 'NFTs Held', value: WEB3_STATS.nfts.collected, Icon: Diamond, color: '#9FB2AC' },
    { label: 'Digital Revenue', value: DIGITAL_PRODUCTS.totalRevenue, Icon: Coins, color: '#6B7A3D' },
    { label: 'Airdrops Claimed', value: WEB3_STATS.airdrops.claimed, Icon: Gift, color: '#C67C4E' },
  ];

  return (
    <section 
      id="coding-activity" 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FFFBEB] py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#5D0D18]/5 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#9FB2AC]/10 blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 text-[#9FB2AC] text-sm font-medium tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <span className="w-8 h-px bg-[#9FB2AC]" />
            Digital Entrepreneur
            <span className="w-8 h-px bg-[#9FB2AC]" />
          </motion.span>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] font-fliege"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Web3 & <span className="text-[#5D0D18] italic">Digital Products</span>
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Building in the decentralized web while creating valuable digital products for the developer community.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl bg-white border border-[#5D0D18]/10 p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(93, 13, 24, 0.15)' }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.Icon size={24} style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-[#1a1a1a] font-fliege mb-1">{stat.value}</div>
              <div className="text-sm text-[#1a1a1a]/50">{stat.label}</div>
              
              <motion.div
                className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5"
                style={{ backgroundColor: stat.color }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-12">
          {[
            { id: 'web3', label: 'Web3 & Blockchain', icon: Box },
            { id: 'products', label: 'Digital Products', icon: ShoppingBag },
            { id: 'airdrops', label: 'Airdrop Hunter', icon: Rocket },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'text-[#FFFBEB]' : 'text-[#5D0D18] hover:bg-[#5D0D18]/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-[#5D0D18] rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={16} />
                {tab.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {activeTab === 'web3' && (
              <>
                {/* Blockchain Network Visualization */}
                <div className="relative h-80 rounded-2xl bg-white border border-[#5D0D18]/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-32 h-32 rounded-full border-2 border-dashed border-[#5D0D18]/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute w-24 h-24 rounded-full bg-[#5D0D18]/5 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Box size={32} className="text-[#5D0D18]" />
                    </motion.div>
                  </div>
                  {WEB3_STATS.chains.map((chain, i) => (
                    <BlockchainNode key={chain} chain={chain} index={i} total={WEB3_STATS.chains.length} />
                  ))}
                </div>

                {/* Wallet Cards */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Connected Wallets</h3>
                  {WEB3_STATS.wallets.map((wallet, i) => (
                    <WalletCard key={wallet.name} wallet={wallet} index={i} />
                  ))}
                  
                  <div className="mt-6 p-4 rounded-xl bg-[#9FB2AC]/10 border border-[#9FB2AC]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1a1a1a]">NFT Collection</span>
                      <span className="text-xs text-[#5D0D18] font-bold">{WEB3_STATS.nfts.collected} items</span>
                    </div>
                    <NFTGallery />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'products' && (
              <>
                <div className="space-y-6">
                  <div className="grid gap-4">
                    {DIGITAL_PRODUCTS.platforms.map((platform, i) => (
                      <PlatformCard key={platform.name} platform={platform} index={i} />
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-8 rounded-2xl bg-gradient-to-br from-[#5D0D18] to-[#3d0910] text-[#FFFBEB]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-lg font-medium mb-6 opacity-80">Total Impact</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Revenue</span>
                        <span className="text-2xl font-bold font-fliege">{DIGITAL_PRODUCTS.totalRevenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Sales</span>
                        <span className="text-xl font-bold">{DIGITAL_PRODUCTS.totalSales.toLocaleString('en-US')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Downloads</span>
                        <span className="text-xl font-bold">{DIGITAL_PRODUCTS.digitalDownloads.toLocaleString('en-US')}</span>
                      </div>
                    </div>
                  </motion.div>

                  <div className="p-6 rounded-2xl bg-white border border-[#5D0D18]/10">
                    <h4 className="font-bold text-[#1a1a1a] mb-4">Top Performing Product</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#5D0D18]/10 flex items-center justify-center">
                        <Zap size={28} className="text-[#5D0D18]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-[#1a1a1a]">React Animation Masterclass</h5>
                        <p className="text-sm text-[#1a1a1a]/50">847 sales | $12,705 revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'airdrops' && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1a1a1a]">Airdrop Tracker</h3>
                    <span className="text-sm text-[#9FB2AC]">
                      Est. Value: <span className="font-bold text-[#5D0D18]">{WEB3_STATS.airdrops.estimated}</span>
                    </span>
                  </div>
                  {AIRDROP_TRACKER.map((drop, i) => (
                    <AirdropRow key={drop.name} drop={drop} index={i} />
                  ))}
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 rounded-2xl bg-white border border-[#5D0D18]/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="font-bold text-[#1a1a1a] mb-4">Airdrop Strategy</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Bridge Activity', value: 85, color: '#5D0D18' },
                        { label: 'DEX Trading', value: 70, color: '#9FB2AC' },
                        { label: 'NFT Minting', value: 60, color: '#6B7A3D' },
                        { label: 'Testnet Participation', value: 90, color: '#C67C4E' },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#1a1a1a]/70">{item.label}</span>
                            <span className="font-bold" style={{ color: item.color }}>{item.value}%</span>
                          </div>
                          <div className="h-2 bg-[#5D0D18]/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.value}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#6B7A3D]/10 border border-[#6B7A3D]/20 text-center">
                      <div className="text-2xl font-bold text-[#6B7A3D]">{WEB3_STATS.airdrops.claimed}</div>
                      <div className="text-xs text-[#1a1a1a]/50">Claimed</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#C67C4E]/10 border border-[#C67C4E]/20 text-center">
                      <div className="text-2xl font-bold text-[#C67C4E]">{WEB3_STATS.airdrops.pending}</div>
                      <div className="text-xs text-[#1a1a1a]/50">Pending</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 p-2 rounded-full bg-white border border-[#5D0D18]/10 shadow-sm">
            <span className="pl-4 text-sm text-[#1a1a1a]/60">Connect with me:</span>
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="w-10 h-10 rounded-full bg-[#5D0D18]/5 flex items-center justify-center text-[#5D0D18] hover:bg-[#5D0D18] hover:text-[#FFFBEB] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
