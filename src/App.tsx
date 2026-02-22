import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  ChevronRight, 
  Leaf, 
  Settings, 
  User, 
  X, 
  Upload,
  Droplets,
  Zap,
  Heart,
  Search,
  ChevronUp
} from 'lucide-react';
import type { Post, Nutrient, ViewMode } from './types';

// --- Components ---

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-cream"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="text-brand-olive mb-8"
    >
      <Leaf size={64} />
    </motion.div>
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="serif text-4xl font-light tracking-widest uppercase"
    >
      Nature's Bounty
    </motion.h1>
  </motion.div>
);

interface PostCardProps {
  post: Post;
  isAdmin: boolean;
  onDelete?: (id: number) => void;
  key?: React.Key;
}

const PostCard = ({ post, isAdmin, onDelete }: PostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5 flex flex-col sm:flex-row h-auto sm:h-48"
    >
      <div className="w-full sm:w-48 h-48 sm:h-full overflow-hidden relative flex-shrink-0">
        <img 
          src={post.image_url || `https://picsum.photos/seed/${post.id}/800/1000`} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        
        {isAdmin && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete?.(post.id); }}
            className="absolute top-2 left-2 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors z-10"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-1">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-brand-olive opacity-80">{post.category}</p>
            <span className="text-[10px] text-brand-ink/40 font-mono">{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <h3 className="serif text-2xl leading-tight mb-2 group-hover:text-brand-olive transition-colors">{post.title}</h3>
          <p className="text-sm text-brand-ink/70 line-clamp-2 sm:line-clamp-1">
            {post.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {post.nutrients.slice(0, 2).map((n, i) => (
              <span key={i} className="text-[9px] bg-brand-cream px-2 py-1 rounded-full font-bold uppercase tracking-tighter text-brand-olive/70">
                {n.name}: {n.amount}{n.unit}
              </span>
            ))}
            {post.nutrients.length > 2 && <span className="text-[9px] text-brand-ink/30 font-bold">+{post.nutrients.length - 2} more</span>}
          </div>
          <button 
            onClick={() => setIsExpanded(true)}
            className="flex items-center text-xs font-semibold uppercase tracking-widest text-brand-olive hover:gap-2 transition-all"
          >
            View Details <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-brand-ink/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative"
            >
              <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                <div className="rounded-3xl overflow-hidden h-[300px] md:h-full">
                  <img 
                    src={post.image_url || `https://picsum.photos/seed/${post.id}/800/1000`} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="space-y-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-olive/60">{post.category}</span>
                    <h2 className="serif text-5xl mt-2">{post.title}</h2>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <Heart size={14} className="text-red-400" /> Health Benefits
                    </h4>
                    <p className="text-brand-ink/80 leading-relaxed italic serif text-lg">
                      "{post.benefits}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <Zap size={14} className="text-yellow-500" /> Nutritional Profile
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {post.nutrients.map((n, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-black/5">
                          <p className="text-[10px] uppercase tracking-wider text-brand-ink/50 font-bold">{n.name}</p>
                          <p className="text-xl font-medium">{n.amount}<span className="text-xs ml-1 opacity-60">{n.unit}</span></p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-black/5">
                    <p className="text-sm text-brand-ink/60 leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const COMMON_NUTRIENTS = [
  { name: 'Vitamin A', unit: 'mcg' },
  { name: 'Vitamin B1', unit: 'mg' },
  { name: 'Vitamin B2', unit: 'mg' },
  { name: 'Vitamin B3', unit: 'mg' },
  { name: 'Vitamin B5', unit: 'mg' },
  { name: 'Vitamin B6', unit: 'mg' },
  { name: 'Vitamin B7', unit: 'mcg' },
  { name: 'Vitamin B9', unit: 'mcg' },
  { name: 'Vitamin B12', unit: 'mcg' },
  { name: 'Vitamin C', unit: 'mg' },
  { name: 'Vitamin D', unit: 'IU' },
  { name: 'Vitamin E', unit: 'mg' },
  { name: 'Vitamin K', unit: 'mcg' },
  { name: 'Calcium', unit: 'mg' },
  { name: 'Iron', unit: 'mg' },
  { name: 'Magnesium', unit: 'mg' },
  { name: 'Potassium', unit: 'mg' },
  { name: 'Zinc', unit: 'mg' },
  { name: 'Protein', unit: 'g' },
  { name: 'Fiber', unit: 'g' },
  { name: 'Carbohydrates', unit: 'g' },
  { name: 'Healthy Fats', unit: 'g' },
];

const AdminForm = ({ onPostCreated, onClose }: { onPostCreated: () => void, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    benefits: '',
    category: 'fruit' as const,
    image_url: '',
    nutrients: [
      { name: 'Vitamin C', amount: '', unit: 'mg' },
      { name: 'Fiber', amount: '', unit: 'g' },
    ] as Nutrient[]
  });

  const addNutrient = (name: string = '', unit: string = 'mg') => {
    setFormData({
      ...formData,
      nutrients: [...formData.nutrients, { name, amount: '', unit }]
    });
  };

  const removeNutrient = (index: number) => {
    const newNutrients = [...formData.nutrients];
    newNutrients.splice(index, 1);
    setFormData({ ...formData, nutrients: newNutrients });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        onPostCreated();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-ink/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-brand-cream w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden"
      >
        <div className="p-8 border-b border-black/5 flex justify-between items-center">
          <h2 className="serif text-3xl">Create New Entry</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full"><X /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Title</label>
              <input 
                required
                className="w-full bg-white border border-black/5 rounded-xl p-3 focus:ring-2 focus:ring-brand-olive/20 outline-none"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Organic Avocado"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Category</label>
              <select 
                className="w-full bg-white border border-black/5 rounded-xl p-3 outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="meat">Meat & Poultry</option>
                <option value="resource">Natural Resource</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Image URL (Optional)</label>
            <input 
              className="w-full bg-white border border-black/5 rounded-xl p-3 outline-none"
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Description</label>
            <textarea 
              required
              rows={3}
              className="w-full bg-white border border-black/5 rounded-xl p-3 outline-none resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Health Benefits</label>
            <textarea 
              required
              rows={2}
              className="w-full bg-white border border-black/5 rounded-xl p-3 outline-none resize-none"
              value={formData.benefits}
              onChange={e => setFormData({...formData, benefits: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Nutrients & Vitamins</label>
              <div className="flex gap-2">
                <select 
                  className="text-[10px] bg-white border border-black/5 rounded-lg px-2 py-1 outline-none"
                  onChange={(e) => {
                    const nutrient = COMMON_NUTRIENTS.find(n => n.name === e.target.value);
                    if (nutrient) addNutrient(nutrient.name, nutrient.unit);
                    e.target.value = "";
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>+ Add Preset</option>
                  {COMMON_NUTRIENTS.map(n => (
                    <option key={n.name} value={n.name}>{n.name}</option>
                  ))}
                </select>
                <button 
                  type="button"
                  onClick={() => addNutrient()}
                  className="text-[10px] bg-brand-olive/10 text-brand-olive px-2 py-1 rounded-lg font-bold hover:bg-brand-olive/20 transition-colors"
                >
                  + Custom
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.nutrients.map((n, i) => (
                <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-black/5 group">
                  <div className="flex-grow space-y-1">
                    <input 
                      type="text"
                      placeholder="Nutrient Name"
                      className="text-[10px] font-bold w-full bg-transparent outline-none border-b border-transparent focus:border-brand-olive/20"
                      value={n.name}
                      onChange={e => {
                        const newNutrients = [...formData.nutrients];
                        newNutrients[i].name = e.target.value;
                        setFormData({...formData, nutrients: newNutrients});
                      }}
                    />
                    <div className="flex items-center gap-2">
                      <input 
                        type="text"
                        placeholder="Amount"
                        className="w-full bg-transparent outline-none text-sm border-b border-transparent focus:border-brand-olive/20"
                        value={n.amount}
                        onChange={e => {
                          const newNutrients = [...formData.nutrients];
                          newNutrients[i].amount = e.target.value;
                          setFormData({...formData, nutrients: newNutrients});
                        }}
                      />
                      <input 
                        type="text"
                        placeholder="Unit"
                        className="w-12 bg-transparent outline-none text-[10px] opacity-40 border-b border-transparent focus:border-brand-olive/20"
                        value={n.unit}
                        onChange={e => {
                          const newNutrients = [...formData.nutrients];
                          newNutrients[i].unit = e.target.value;
                          setFormData({...formData, nutrients: newNutrients});
                        }}
                      />
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeNutrient(i)}
                    className="p-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-olive text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-olive/90 transition-colors shadow-lg shadow-brand-olive/20"
          >
            Publish Entry
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('client');
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = [
    { id: 'all', name: 'All', icon: <Leaf size={14} /> },
    { id: 'fruit', name: 'Fruits', icon: <Droplets size={14} /> },
    { id: 'vegetable', name: 'Vegetables', icon: <Droplets size={14} /> },
    { id: 'meat', name: 'Meat', icon: <Heart size={14} /> },
    { id: 'resource', name: 'Resources', icon: <Zap size={14} /> },
  ];

  const nutrientFilters = [
    'Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D', 'Protein', 'Iron', 'Calcium'
  ];

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    const timer = setTimeout(() => setLoading(false), 2500);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPosts = posts.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nutrients.some(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
      p.category === selectedCategory || 
      p.nutrients.some(n => n.name.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-brand-cream/80 backdrop-blur-md border-b border-black/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-black/5 rounded-full md:hidden"
            >
              <Search size={20} />
            </button>
            <div className="flex items-center gap-2 text-brand-olive">
              <Leaf size={28} />
              <span className="serif text-2xl font-medium tracking-tight">Nature's Bounty</span>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 border border-black/5 shadow-sm w-96 focus-within:ring-2 focus-within:ring-brand-olive/20 transition-all">
            <Search size={18} className="text-brand-ink/40" />
            <input 
              type="text" 
              placeholder="Search ingredients, vitamins, minerals..." 
              className="bg-transparent border-none outline-none px-3 text-sm w-full"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewMode(viewMode === 'client' ? 'admin' : 'client')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                viewMode === 'admin' 
                ? 'bg-brand-olive text-white shadow-lg shadow-brand-olive/20' 
                : 'bg-white text-brand-olive border border-black/5 hover:bg-black/5'
              }`}
            >
              {viewMode === 'admin' ? <Settings size={14} /> : <User size={14} />}
              <span className="hidden sm:inline">{viewMode === 'admin' ? 'Admin Panel' : 'Client View'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-brand-ink/40 backdrop-blur-sm md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-brand-cream shadow-2xl p-8 md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-brand-olive">
                  <Leaf size={24} />
                  <span className="serif text-xl">Menu</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)}><X /></button>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Search</p>
                  <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-black/5">
                    <Search size={18} className="text-brand-ink/40" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="bg-transparent border-none outline-none px-3 text-sm w-full"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Categories</p>
                  <div className="flex flex-col gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.id); setIsMenuOpen(false); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          selectedCategory === cat.id ? 'bg-brand-olive text-white' : 'bg-white hover:bg-black/5'
                        }`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="serif text-7xl md:text-9xl font-light leading-none mb-6">
              Pure <br /> 
              <span className="italic text-brand-olive">Ingredients</span>
            </h1>
            <p className="max-w-md text-brand-ink/60 leading-relaxed text-lg">
              Explore the profound nutritional wisdom hidden within nature's most vibrant offerings. From soil to soul.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Leaf size={600} className="text-brand-olive transform rotate-45 translate-x-1/4 -translate-y-1/4" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 pb-20">
        {/* Category & Nutrient Filter Bar */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                  selectedCategory === cat.id 
                  ? 'bg-brand-olive text-white border-brand-olive shadow-lg shadow-brand-olive/20' 
                  : 'bg-white text-brand-ink/60 border-black/5 hover:border-brand-olive/30'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40 whitespace-nowrap">Rich in:</span>
            {nutrientFilters.map(nutrient => (
              <button
                key={nutrient}
                onClick={() => setSelectedCategory(selectedCategory === nutrient ? 'all' : nutrient)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === nutrient 
                  ? 'bg-brand-olive/10 text-brand-olive border border-brand-olive/20' 
                  : 'bg-black/5 text-brand-ink/40 border border-transparent hover:border-black/10'
                }`}
              >
                {nutrient}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-olive/60">The Collection</span>
            <h2 className="serif text-4xl mt-2">Curated Essentials</h2>
          </div>
          
          {viewMode === 'admin' && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdminForm(true)}
              className="bg-brand-olive text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-olive/20"
            >
              <Plus size={18} /> Add New Entry
            </motion.button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-black/5 rounded-[40px]">
            <Droplets size={48} className="mx-auto text-brand-olive/20 mb-4" />
            <p className="serif text-2xl text-brand-ink/40">No ingredients found in this garden yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {displayedPosts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    isAdmin={viewMode === 'admin'} 
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {visibleCount < filteredPosts.length && (
              <div className="flex justify-center pt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="bg-white border border-black/5 text-brand-olive px-12 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-sm hover:shadow-md transition-all"
                >
                  Load More Ingredients
                </motion.button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 bg-brand-olive text-white rounded-full shadow-2xl hover:bg-brand-olive/90 transition-colors"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-brand-olive/60">
            <Leaf size={20} />
            <span className="serif text-xl">Nature's Bounty</span>
          </div>
          <p className="text-xs uppercase tracking-widest font-bold opacity-40">
            © 2026 Crafted with Intention
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Journal', 'Contact'].map(item => (
              <a key={item} href="#" className="text-xs uppercase tracking-widest font-bold hover:text-brand-olive transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Admin Form Modal */}
      <AnimatePresence>
        {showAdminForm && (
          <AdminForm 
            onPostCreated={fetchPosts} 
            onClose={() => setShowAdminForm(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
