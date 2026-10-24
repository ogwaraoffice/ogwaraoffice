import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Heart, Star, Shield, 
  MessageSquare, Home, User, X, PlusCircle, ArrowRight, Check, ChevronRight, 
  Building, Zap, Droplet, Sparkles, AlertCircle, Mail, Phone, Tag
} from 'lucide-react';

// Sample Benin City Listings (Rent & Buy)
const INITIAL_PROPERTIES = [
  {
    id: 'og-001',
    title: 'Modern Executive Self-Contain',
    area: 'Ekosodin (Near UNIBEN Back Gate)',
    price: 250000,
    category: 'Rent',
    type: 'Self-Contain',
    rating: 4.8,
    reviewsCount: 14,
    verified: true,
    studentFriendly: true,
    powerStatus: 'Constant Power & Solar Backup',
    waterStatus: 'Running Water 24/7',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Perfect for UNIBEN students and young professionals. Tiled floors, personal prepaid meter, fully fenced compound with security wire, modern toilet fittings, and security gate.',
    amenities: ['Prepaid Meter', 'Fenced Gate', 'Water Borehole', 'Tiled Floor', 'Campus Shuttle Stop (2 mins)'],
    landlordName: 'Engr. Osagie',
    reviews: [
      { id: 'r1', author: 'Osas K.', rating: 5, date: '2 weeks ago', text: 'The light situation here is actually true! Very close to campus back gate.' },
      { id: 'r2', author: 'Blessing I.', rating: 4, date: '1 month ago', text: 'Clean compound and peaceful environment.' }
    ]
  },
  {
    id: 'og-002',
    title: 'Luxury 2-Bedroom Flat with POP Ceiling',
    area: 'GRA (Off Ihama Road)',
    price: 1200000,
    category: 'Rent',
    type: '2-Bedroom Flat',
    rating: 4.9,
    reviewsCount: 8,
    verified: true,
    studentFriendly: false,
    powerStatus: 'Band A Electricity Area',
    waterStatus: 'Central Water Treatment Unit',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-end spacious 2-bedroom apartment situated in serene GRA. All rooms en-suite, fitted kitchen cabinets, interlocked compound, uniform security men.',
    amenities: ['All Rooms En-suite', 'Fitted Kitchen', 'Uniformed Security', 'Interlocked Yard'],
    landlordName: 'Chief Eghosa',
    reviews: [
      { id: 'r3', author: 'Dr. Victor', rating: 5, date: '3 days ago', text: 'Super prime location in GRA. Quiet, secure, and light is almost 20 hours daily.' }
    ]
  },
  {
    id: 'og-003',
    title: 'Prime 100ft x 100ft Plot of Land for Sale',
    area: 'Airport Road (Near Boundary)',
    price: 18000000,
    category: 'Buy',
    type: 'Land',
    rating: 5.0,
    reviewsCount: 3,
    verified: true,
    studentFriendly: false,
    powerStatus: 'Standard Neighborhood Grid',
    waterStatus: 'Borehole Accessible Zone',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dry land situated along a tarred road off Airport Road GRA Extension. Free from community issues, with verified survey plan and Deed of Assignment.',
    amenities: ['Dry Land', 'Tarred Road Access', 'Approved Survey', 'Fast Developing Neighborhood'],
    landlordName: 'OgwaraOffice Direct Land Desk',
    reviews: [
      { id: 'r4', author: 'Pst. Sunday', rating: 5, date: '1 month ago', text: 'Verified title documents at the Edo Ministry. Smooth transaction.' }
    ]
  },
  {
    id: 'og-004',
    title: 'Clean 1-Bed Serviced Apartment',
    area: 'BDPA, Uselu (Opposite UNIBEN Main Gate)',
    price: 450000,
    category: 'Rent',
    type: '1-Bedroom Flat',
    rating: 4.7,
    reviewsCount: 19,
    verified: true,
    studentFriendly: true,
    powerStatus: 'Prepaid Meter / Good Transformer',
    waterStatus: 'Overhead Tank Water Pump',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Very accessible apartment inside BDPA. Walking distance to UNIBEN main gate and Uselu market. Dedicated caretaker, clean water.',
    amenities: ['Close to Main Road', 'Personal Balcony', 'Water Tank', 'Security Gate'],
    landlordName: 'Mrs. Idahosa',
    reviews: [
      { id: 'r5', author: 'Emmanuel O.', rating: 5, date: '1 month ago', text: 'Very convenient location if you trade or study around Uselu or UNIBEN.' }
    ]
  }
];

const BENIN_AREAS = [
  'All Areas in Benin',
  'GRA',
  'Ekosodin (Near UNIBEN)',
  'BDPA, Uselu',
  'Osasogie / UBTH Gate',
  'Airport Road',
  'Ekenwan Road',
  'Upper Sakponba'
];

const OFFICIAL_WHATSAPP = '2347026135346';
const OFFICIAL_EMAIL = 'ogwaraoffice@gmail.com';

export default function App() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [selectedArea, setSelectedArea] = useState('All Areas in Benin');
  const [selectedCategory, setSelectedCategory] = useState('All'); // 'All' | 'Rent' | 'Buy' | 'Short Let'
  const [maxBudget, setMaxBudget] = useState(20000000);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [wishlist, setWishlist] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');

  const [isLandlordModalOpen, setIsLandlordModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  
  const [landlordForm, setLandlordForm] = useState({
    name: '',
    phone: '',
    area: 'GRA',
    category: 'Rent',
    type: 'Self-Contain',
    price: '',
    description: ''
  });
  const [landlordSubmitted, setLandlordSubmitted] = useState(false);

  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      const matchesArea = selectedArea === 'All Areas in Benin' || item.area.toLowerCase().includes(selectedArea.toLowerCase().replace(' (near uniben)', ''));
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesBudget = item.price <= maxBudget;
      const matchesQuery = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesArea && matchesCategory && matchesBudget && matchesQuery;
    });
  }, [properties, selectedArea, selectedCategory, maxBudget, searchQuery]);

  const toggleWishlist = (id, e) => {
    e?.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      showToast('Removed from saved properties');
    } else {
      setWishlist([...wishlist, id]);
      showToast('Saved to your wishlist!');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail) return;
    setUser({
      name: authName || authEmail.split('@')[0],
      email: authEmail
    });
    setIsAuthModalOpen(false);
    showToast(`Welcome, ${authName || authEmail.split('@')[0]}!`);
  };

  const handleLandlordSubmit = (e) => {
    e.preventDefault();
    setLandlordSubmitted(true);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim() || !selectedProperty) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      author: user?.name || newReviewAuthor || 'Resident',
      rating: Number(newReviewRating),
      date: 'Just now',
      text: newReviewText
    };

    const updatedProps = properties.map(p => {
      if (p.id === selectedProperty.id) {
        const updatedReviews = [newRev, ...p.reviews];
        return {
          ...p,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length
        };
      }
      return p;
    });

    setProperties(updatedProps);
    setSelectedProperty({
      ...selectedProperty,
      reviews: [newRev, ...selectedProperty.reviews],
      reviewsCount: selectedProperty.reviews.length + 1
    });

    setNewReviewText('');
    setNewReviewAuthor('');
    showToast('Your review has been posted!');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#1E293B] font-sans flex flex-col selection:bg-[#00C29A] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002B49] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#00C29A]/30">
          <Sparkles className="w-5 h-5 text-[#00C29A]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#002B49] text-white shadow-md border-b border-[#00C29A]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-white shadow-lg overflow-hidden border-2 border-[#00C29A]">
              <div className="relative w-full h-full flex items-center justify-center bg-[#002B49]">
                <span className="text-2xl font-black text-white">O</span>
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#00C29A] rounded-full border border-white"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white">Ogwara</span>
                <span className="text-xl font-bold text-[#00C29A]">Office</span>
              </div>
              <p className="text-[10px] text-gray-300 font-medium tracking-wide uppercase">Benin Real Estate Portal</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('explore')}
              className={`hover:text-[#00C29A] ${activeTab === 'explore' ? 'text-[#00C29A] border-b-2 border-[#00C29A] pb-1' : 'text-gray-200'}`}
            >
              Explore Properties
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`flex items-center gap-1.5 hover:text-[#00C29A] ${activeTab === 'wishlist' ? 'text-[#00C29A] border-b-2 border-[#00C29A] pb-1' : 'text-gray-200'}`}
            >
              <Heart className="w-4 h-4 fill-current text-[#00C29A]" />
              Saved ({wishlist.length})
            </button>
            <button 
              onClick={() => setIsLandlordModalOpen(true)}
              className="text-[#00C29A] bg-[#00C29A]/10 hover:bg-[#00C29A]/20 px-3.5 py-1.5 rounded-lg border border-[#00C29A]/40 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              List Property (Landlords)
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 text-xs">
                <span className="font-bold text-white">{user.name}</span>
                <button onClick={() => setUser(null)} className="text-red-300 ml-2">Exit</button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-[#00C29A] hover:bg-[#00A884] text-[#002B49] font-bold px-4 py-2 rounded-xl text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      {activeTab === 'explore' && (
        <section className="bg-[#002B49] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#00C29A]/15 border border-[#00C29A]/40 text-[#00C29A] px-4 py-1.5 rounded-full text-xs font-bold uppercase">
              <Shield className="w-3.5 h-3.5" />
              Verified Properties for Rent, Sale & Short Let in Benin City
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-tight">
              Find Verified Homes & Land in <span className="text-[#00C29A]">Benin City</span>
            </h1>
            
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
              Direct connection to verified landlords around UNIBEN, GRA, Airport Road & Uselu. No viewing fee scam.
            </p>

            {/* SEARCH BOX */}
            <div className="bg-white text-[#1E293B] p-4 sm:p-6 rounded-2xl shadow-2xl space-y-4 text-left mt-6">
              
              {/* Category Pills */}
              <div className="flex gap-2 border-b border-gray-100 pb-3">
                {['All', 'Rent', 'Buy', 'Short Let'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat 
                        ? 'bg-[#002B49] text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'All' ? 'All Properties' : cat === 'Rent' ? 'For Rent' : cat === 'Buy' ? 'For Sale' : 'Short Let'}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search street name, landmark (Ihama, UNIBEN Gate, UBTH)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00C29A] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Area in Benin</label>
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00C29A]"
                  >
                    {BENIN_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-600">Max Budget (₦)</label>
                    <span className="text-xs font-black text-[#002B49] bg-[#00C29A]/20 px-2 py-0.5 rounded">
                      ₦{maxBudget.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    type="range"
                    min="150000"
                    max="50000000"
                    step="250000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="w-full accent-[#00C29A] cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#002B49]">
                  Available Properties in Benin ({filteredProperties.length})
                </h2>
                <p className="text-xs text-gray-500">Direct WhatsApp connection to OgwaraOffice support</p>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => {
                const isSaved = wishlist.includes(prop.id);
                return (
                  <div 
                    key={prop.id}
                    onClick={() => setSelectedProperty(prop)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col cursor-pointer group"
                  >
                    <div className="relative h-48 w-full bg-gray-100">
                      <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="bg-[#002B49] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                          {prop.category === 'Buy' ? 'FOR SALE' : 'FOR RENT'}
                        </span>
                      </div>

                      <button
                        onClick={(e) => toggleWishlist(prop.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${isSaved ? 'bg-red-500 text-white' : 'bg-black/30 text-white'}`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>

                      <div className="absolute bottom-3 left-3 text-white">
                        <p className="text-lg font-black text-[#00C29A]">
                          ₦{prop.price.toLocaleString()}<span className="text-xs font-normal text-white">{prop.category === 'Rent' ? '/yr' : ''}</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-xs text-[#002B49] font-bold">
                          <MapPin className="w-3.5 h-3.5 text-[#00C29A]" /> {prop.area}
                        </div>
                        <h3 className="font-bold text-base text-[#002B49] group-hover:text-[#00C29A] line-clamp-1">{prop.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{prop.description}</p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div className
