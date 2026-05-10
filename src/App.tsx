import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Phone, 
  Leaf, 
  Waves, 
  Home, 
  LayoutGrid, 
  Trees, 
  CheckCircle2, 
  Instagram, 
  ArrowRight, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Users,
  Shrub,
  ShoppingBag
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price?: string;
}

interface Testimonial {
  name: string;
  location: string;
  text: string;
}

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

interface PortfolioItem {
  id: number;
  category: string;
  image: string;
  title: string;
}

// --- Data ---
const service1 = '/assets/images/regenerated_image_1778420943843.jpg';
const service2 = '/assets/images/regenerated_image_1778420945957.jpg';
const service3 = '/assets/images/regenerated_image_1778420942355.jpg';
const service4 = '/assets/images/regenerated_image_1778420937910.jpg';
const service5 = '/assets/images/regenerated_image_1778420936394.jpg';
const service6 = '/assets/images/regenerated_image_1778420932096.jpg';
const service7 = '/assets/images/regenerated_image_1778420930440.jpg';
const product1 = '/assets/images/regenerated_image_1778423585427.jpg';
const product2 = '/assets/images/regenerated_image_1778423586913.jpg';

const WHATSAPP_NUMBER = "087846240574";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const BUSINESS_NAME = "riadytaman";
const LOGO_URL = "https://scontent.xx.fbcdn.net/v/t1.15752-9/674518066_1155787856633881_4831878191650638700_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=dWrBJzvr3LwQ7kNvwHMSt7z&_nc_oc=Adqj3-uFlf7fTmug6lD_zVqzyehp4xESQFcSdsQJracd7xZDf55zmlOj25IMmnA8EnssPmTMuLrm9mTbUYwlXzhe&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD5AFjx1HVcLOhfr_CdIkAH_lehLFBqsW4zbpIW1rEWemLGQ&oe=6A11A7C6";
const PROJECT_A_IMAGE = "https://instagram.fcgk33-1.fna.fbcdn.net/v/t1.15752-9/657762933_1420976045996876_5059208154390473513_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=101&ccb=7-5&_nc_sid=fc17b8&efg=eyJxZV9ncm91cHMiOlsiaWdkX2Jlc3RfZWZmb3J0X2ltYWdlOnRlc3QiXX0%3D&_nc_ohc=O6tSPjPnyDoQ7kNvwH16T7I&_nc_oc=AdpGZutdkhBO1X8ULfDbeJqJHoMBkqUV3Q854IqfEIOOycw3co2f74W7zvGPPNtzh580WI95fvj1KTApetXfLzqh&_nc_zt=23&_nc_ht=instagram.fcgk33-1.fna&_nc_ss=7a3a8&oh=03_Q7cD5AFfORrlpbuslnilOZTEdSqMO_V0zw72eOlQTQJjXpK0pQ&oe=69FB3AEC";

const HERO_SLIDES = [
  {
    image: "https://dpa79oyyyfxcd.cloudfront.net/laravel/design/20b70250-67fa-43ee-a247-41a22a23dd0f.png",
    subtitle: "Desain Modern",
    title: "Wujudkan Taman Impian Anda",
    description: "Solusi landscape profesional untuk hunian asri dan menenangkan.",
  },
  {
    image: "https://platinumadisentosa.com/wp-content/uploads/2025/02/Ternyata-Begini-Cara-Membuat-Kolam-Ikan-Ideal-dan-Nyaman-1536x864.jpg",
    subtitle: "Kolam Koi",
    title: "Keindahan Air di Rumah Anda",
    description: "Pembuatan kolam hias dan koi dengan sistem filter terbaik.",
  }
];

const SERVICES: Service[] = [
  {
    title: "Taman Minimalis",
    description: "Desain simpel namun elegan, cocok untuk lahan terbatas di area perkotaan.",
    icon: <Home className="w-6 h-6" />,
    image: service1
  },
  {
    title: "Taman Tropis",
    description: "Hadirkan nuansa hutan tropis yang rimbun dan eksotis di halaman Anda.",
    icon: <Trees className="w-6 h-6" />,
    image: service2
  },
  {
    title: "Taman Kering",
    description: "Low maintenance dengan paduan batu hias dan tanaman sukulen yang menawan.",
    icon: <LayoutGrid className="w-6 h-6" />,
    image: service3
  },
  {
    title: "Vertical Garden",
    description: "Solusi penghijauan pada dinding untuk area sempit agar tetap terasa asri.",
    icon: <Leaf className="w-6 h-6" />,
    image: service4
  },
  {
    title: "Kolam Hias",
    description: "Pembuatan kolam koi dan air mancur dengan gemericik air yang menenangkan.",
    icon: <Waves className="w-6 h-6" />,
    image: service5
  },
  {
    title: "Hardscape",
    description: "Pemasangan batu alam, gazebo, dan struktur taman untuk estetika maksimal.",
    icon: <LayoutGrid className="w-6 h-6" />,
    image: service6
  },
  {
    title: "Zen Garden",
    description: "Taman bergaya Jepang yang tenang dengan elemen pasir, batu, dan tanaman bonsai.",
    icon: <Shrub className="w-6 h-6" />,
    image: service7
  }
];

const PORTFOLIO_RAW: PortfolioItem[] = [
  { id: 1, category: "Minimalis", title: "Project Minimalis 1", image: service1 },
  { id: 2, category: "Tropis", title: "Project Tropis 1", image: service2 },
  { id: 3, category: "Kering", title: "Project Kering 1", image: service3 },
  { id: 4, category: "Vertical Garden", title: "Vertical Garden Project", image: service4 },
  { id: 5, category: "Kolam Hias", title: "Kolam Koi & Hias", image: service5 },
  { id: 6, category: "Hardscape", title: "Hardscape & Stone", image: service6 },
  { id: 7, category: "Zen Garden", title: "Japanese Zen Garden", image: service7 },
  { id: 8, category: "Minimalis", title: "Modern Garden", image: service1 },
  { id: 9, category: "Zen Garden", title: "Indoor Zen Garden", image: service7 }
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Bonsai Olive Tree Artificial",
    description: "Replika pohon zaitun bonsai berkualitas premium untuk sentuhan klasik Mediterania tanpa perawatan rutin.",
    image: product1
  },
  {
    id: 2,
    title: "Moss Wall",
    description: "Dinding hijau dari lumut abadi (stabilized moss) yang menghadirkan nuansa alami ke dalam ruangan tanpa perlu disiram.",
    image: product2
  }
];

const TESTIMONIALS: Testimonial[] = [
  { name: "Budi Santoso", location: "Bintaro", text: "Tim riadytaman sangat profesional. Dari desain sampai pengerjaan kolam koi-nya rapi sekali. Sangat puas!" },
  { name: "Siti Rahma", location: "Sentul City", text: "Taman minimalis saya jadi lebih asri. Padahal lahannya tidak luas, tapi penataannya sangat cerdas." },
  { name: "Andi Wijaya", location: "Bekasi", text: "Pengerjaan tepat waktu dan harganya kompetitif. Rekomendasi buat yang mau bikin vertical garden." }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Produk', href: '#products' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center space-x-3 group">
          <div className="relative">
            <img src={LOGO_URL} alt="riadytaman logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-primary/20 shadow-sm transition-transform group-hover:scale-110" />
            <div className={`absolute inset-0 rounded-full ring-2 ring-primary ring-offset-2 transition-opacity ${isScrolled ? 'opacity-20' : 'opacity-0'}`} />
          </div>
          <span className={`font-display font-bold text-xl md:text-2xl tracking-tight transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>
            {BUSINESS_NAME}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-medium text-sm tracking-widest uppercase transition-all hover:text-primary relative group ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
            Konsultasi Gratis
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-900 bg-gray-100' : 'text-white bg-white/10'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl py-8 flex flex-col items-center space-y-6 md:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-gray-800 font-bold text-lg hover:text-primary transition-colors tracking-widest uppercase"
              >
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg text-lg">
              Hubungi Kami
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Counter = ({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-gray-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.25em]">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent md:hidden" />
          </motion.div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2">
            {/* Left side empty for desktop layout as requested */}
            <div className="hidden md:block" />
            
            {/* Right side content starting from 50% */}
            <div className="flex flex-col justify-center text-center md:text-left h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-xl"
              >
                <div className="inline-block py-1.5 px-5 bg-primary/30 backdrop-blur-md border border-primary/40 text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 rounded-full">
                  {HERO_SLIDES[currentIndex].subtitle}
                </div>
                <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-[1.1] selection:bg-white selection:text-primary">
                  {HERO_SLIDES[currentIndex].title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-light">
                  {HERO_SLIDES[currentIndex].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a href="#services" className="bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
                    Lihat Layanan
                  </a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-12 py-5 rounded-full font-bold text-lg transition-all">
                    Hubungi Kami
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation UI */}
      <div className="absolute bottom-12 left-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex space-x-3">
            {HERO_SLIDES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all outline-none rounded-full ${currentIndex === idx ? 'w-16 bg-primary shadow-[0_0_15px_rgba(21,128,61,0.5)]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
          
          <div className="flex space-x-4">
            <button onClick={prevSlide} className="p-4 rounded-full bg-white/10 hover:bg-primary text-white backdrop-blur-md border border-white/20 transition-all group active:scale-90">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={nextSlide} className="p-4 rounded-full bg-white/10 hover:bg-primary text-white backdrop-blur-md border border-white/20 transition-all group active:scale-90">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Keahlian Kami</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8 leading-tight text-center md:text-left">
              Mewujudkan <span className="italic text-primary-dark">Landscape Impian</span> Secara Profesional
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-light text-center md:text-left">
              <strong className="text-gray-900 font-semibold">{BUSINESS_NAME}</strong> hadir sebagai mitra terpercaya untuk segala kebutuhan taman Anda. Dari jasa desain yang visioner hingga perawatan taman yang teliti, kami memastikan hasil akhir yang berkualitas tinggi.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
              {[
                { title: "Jasa Desain Taman", desc: "Perencanaan detail & visualisai profesional." },
                { title: "Pembuatan Taman", desc: "Konstruksi landscape dengan material premium." },
                { title: "Perawatan Taman", desc: "Maintenance rutin agar taman tetap asri." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className="mb-4 bg-primary/10 text-primary p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all inline-block">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-light italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Statistics Counters */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pt-10 border-t border-gray-100">
              <Counter value={500} label="Proyek Selesai" suffix="+" />
              <Counter value={450} label="Klien Puas" suffix="+" />
              <Counter value={10} label="Tahun Pengalaman" suffix="+" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Layanan Kami</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Solusi Landscape <span className="text-primary">Menyeluruh</span></h2>
          <p className="text-gray-500 mt-6 text-lg font-light italic">"Memberikan keindahan alami di setiap sudut properti Anda."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-[1.25rem] shadow-xl text-primary transform -rotate-6 group-hover:rotate-0 transition-transform">
                  {service.icon}
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8 font-light italic">
                  {service.description}
                </p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-bold tracking-widest uppercase text-xs hover:text-primary-dark transition-colors border-b-2 border-primary/20 hover:border-primary pb-1 group/btn">
                  Pesan Sekarang <ArrowRight size={14} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('Semua');
  const categories = ['Semua', 'Minimalis', 'Tropis', 'Vertical Garden', 'Kolam Hias', 'Hardscape', 'Kering', 'Zen Garden'];

  const filteredItems = filter === 'Semua' 
    ? PORTFOLIO_RAW 
    : PORTFOLIO_RAW.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 leading-tight">Proyek <span className="text-primary italic">Terfavorit</span></h2>
          </div>
          
          {/* Modern Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center bg-gray-100/50 p-2 rounded-3xl border border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-2xl text-[10px] md:text-xs font-bold transition-all uppercase tracking-widest ${
                  filter === cat 
                    ? 'bg-white text-primary shadow-sm ring-1 ring-black/5' 
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg border border-white"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 relative z-10"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 z-20 pointer-events-none">
                  <span className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.category}</span>
                  <h4 className="text-white text-2xl font-display font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Products = () => {
  return (
    <section id="products" className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Koleksi Kami</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Produk <span className="text-primary italic">Unggulan</span></h2>
          <p className="text-gray-500 mt-6 text-lg font-light italic">"Dekorasi alami eksklusif untuk mempercantik interior dan eksterior Anda."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group bg-white rounded-[3rem] overflow-hidden shadow-xl border border-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-8 left-8">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl text-primary shadow-lg">
                    <ShoppingBag size={24} />
                  </div>
                </div>
              </div>
              <div className="p-10 md:p-12 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8 font-light italic">
                  {product.description}
                </p>
                <a 
                  href={`${WHATSAPP_LINK}?text=Halo%20riadytaman,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-gray-950 text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-primary transition-all group/btn"
                >
                  Tanya Produk <ArrowRight size={16} className="ml-3 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const USP = () => {
  const points = [
    { title: "Konsultasi & Survey Gratis", icon: <Users size={32} />, desc: "Kami siap melakukan peninjauan lokasi tanpa biaya apa pun sebagai bentuk layanan prima." },
    { title: "Desain Sesuai Budget", icon: <Zap size={32} />, desc: "Layout taman eksklusif yang dirancang khusus menyesuaikan plafon anggaran Anda." },
    { title: "Tim Berpengalaman", icon: <ShieldCheck size={32} />, desc: "Dikerjakan oleh profesional senior yang memiliki dedikasi tinggi terhadap estetika." },
    { title: "Tepat Waktu & Rapi", icon: <Clock size={32} />, desc: "Komitmen pengerjaan sesuai timeline dengan hasil akhir yang bersih dan presisi." },
  ];

  return (
    <section className="py-32 bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-primary-light font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Keunggulan</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Mengapa riadytaman Adalah <span className="italic text-primary-light">Pilihan Tepat?</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {points.map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white hover:border-white transition-all duration-500 group"
            >
              <div className="text-primary mb-8 bg-white p-5 rounded-[1.5rem] shadow-2xl inline-block group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mb-5 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{p.title}</h3>
              <p className="text-white/60 group-hover:text-gray-500 transition-colors leading-relaxed font-light italic text-sm">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Konsultasi", desc: "Hubungi kami via WhatsApp untuk diskusi awal." },
    { title: "Survey Lokasi", desc: "Peninjauan langsung ke hunian Anda." },
    { title: "Desain & Penawaran", desc: "Visualisai draf dan rincian biaya (RAB)." },
    { title: "Pengerjaan", desc: "Eksekusi lapangan oleh tim ahli." },
    { title: "Finishing", desc: "Serah terima hasil dan tips perawatan." },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-24">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Proses Kerja</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Alur Layanan <span className="text-primary">Eksklusif</span></h2>
        </div>

        <div className="relative">
          {/* Connector Line Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-gray-100" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white ring-1 ring-gray-100 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-8 shadow-sm transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-2xl">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light italic px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Kesan Klien</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Cerita Kepuasan <span className="text-primary">Pelanggan</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white"
            >
              <div className="mb-8 flex text-primary">
               {[...Array(5)].map((_, i) => <Zap size={16} key={i} fill="currentColor" />)}
              </div>
              <p className="text-gray-700 italic mb-10 leading-relaxed font-light text-lg">"{t.text}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold font-display">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-none mb-1">{t.name}</h4>
                  <p className="text-primary text-[10px] uppercase font-bold tracking-[0.1em]">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto bg-gray-950 rounded-[4rem] p-12 md:p-32 text-center text-white relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 opacity-10 grayscale">
          <img src="https://platinumadisentosa.com/wp-content/uploads/2025/02/Ternyata-Begini-Cara-Membuat-Kolam-Ikan-Ideal-dan-Nyaman-1536x864.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-[1.05] selection:bg-white selection:text-black">Wujudkan Hunian Asri <br />Bersama <span className="text-primary italic">riadytaman</span></h2>
          <p className="text-lg md:text-2xl text-white/60 mb-14 font-light leading-relaxed">Jangan tunda lagi keindahan taman rumah Anda. Tim profesional kami siap membantu me-realisasikan ide landscape Anda sekarang juga.</p>
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-12 py-6 rounded-full font-bold text-xl shadow-[0_20px_40px_-10px_rgba(21,128,61,0.5)] transition-all hover:scale-105 group active:scale-95"
          >
            <Phone className="mr-4 group-hover:rotate-12 transition-transform" /> Chat WhatsApp Sekarang
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-10">
              <img src={LOGO_URL} alt="logo" className="h-12 w-12 rounded-full object-cover shadow-sm ring-1 ring-gray-100" />
              <span className="font-display font-bold text-2xl tracking-tight text-gray-900">{BUSINESS_NAME}</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-10 font-light pr-10">
              Menyeimbangkan alam dan hunian melalui desain landscape yang penuh makna. Dedikasi kami adalah menghadirkan ketenangan hijau di rumah Anda.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram size={22} />
              </a>
              <a href={WHATSAPP_LINK} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                <MessageCircle size={22} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-gray-900">Eksplorasi</h4>
            <ul className="space-y-5 text-gray-500 font-light">
              <li><a href="#home" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Beranda</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Tentang</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Layanan</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Portfolio</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Produk</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-gray-900">Layanan Populer</h4>
            <ul className="space-y-4 text-gray-500 font-light">
              <li className="flex items-center"><Leaf size={14} className="mr-3 text-primary" /> Taman Minimalis Modern</li>
              <li className="flex items-center"><Waves size={14} className="mr-3 text-primary" /> Kolam Ikan & Air Mancur</li>
              <li className="flex items-center"><Home size={14} className="mr-3 text-primary" /> Vertical Garden</li>
              <li className="flex items-center"><LayoutGrid size={14} className="mr-3 text-primary" /> Hardscape & Gazebo</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-gray-900">Hubungi Langsung</h4>
            <ul className="space-y-8 font-light">
              <li className="flex items-start group cursor-pointer" onClick={() => window.open(WHATSAPP_LINK)}>
                <div className="bg-primary/5 p-3 rounded-xl text-primary mr-5 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">WhatsApp</p>
                  <p className="text-gray-900 font-bold">{WHATSAPP_NUMBER}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/5 p-3 rounded-xl text-primary mr-5">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Area Layanan</p>
                  <p className="text-gray-900 font-bold">Jabodetabek & Jabar</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs font-light tracking-wide">© {new Date().getFullYear()} {BUSINESS_NAME}. Dibuat untuk Kepuasan Anda.</p>
          <div className="flex space-x-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- App Root ---

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white antialiased">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Products />
      <USP />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />

      {/* Floating WA Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, translateY: -5 }}
        className="fixed bottom-8 right-8 z-[60] bg-green-500 text-white p-5 rounded-full shadow-[0_20px_50px_rgba(34,197,94,0.4)] flex items-center justify-center group"
      >
        <MessageCircle size={32} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold ml-0 group-hover:ml-4 whitespace-nowrap text-sm tracking-wide">
          BUTUH KONSULTASI?
        </span>
      </motion.a>
    </div>
  );
}
