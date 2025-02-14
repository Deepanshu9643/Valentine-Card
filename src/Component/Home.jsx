import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FallingFlower = () => {
    const randomFlower = ["🌸", "🌹", "💮", "🌺", "🌷", "💝", "💖"][Math.floor(Math.random() * 7)];
    const randomLeft = Math.random() * 100; // Random position on the screen
    const randomTop = Math.random() * 100; // Random vertical position
    const randomSize = Math.random() * 10 + 14; // Random font size
    const randomDuration = 4 + Math.random() * 6; // Random movement speed
  
    return (
      <div
        className="absolute animate-roam"
        style={{
          left: `${randomLeft}vw`,
          top: `${randomTop}vh`,
          fontSize: `${randomSize}px`,
          animationDuration: `${randomDuration}s`,
        }}
      >
        {randomFlower}
      </div>
    );
  };
  

const Home = () => {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [yourImage, setYourImage] = useState(null);
  const [partnerImage, setPartnerImage] = useState(null);
  const [flowers, setFlowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Create more flowers with shorter delays
    const flowerCount = 50; // Increased from 20 to 50
    const newFlowers = Array.from({ length: flowerCount }, (_, i) => ({
      id: i,
      delay: Math.random() * 10 // Reduced from 20 to 10 for faster initial appearance
    }));
    setFlowers(newFlowers);

    // Recreate flowers periodically to maintain their presence
    const interval = setInterval(() => {
      setFlowers(prev => [
        ...prev.slice(-30), // Keep last 30 flowers
        ...Array.from({ length: 20 }, (_, i) => ({ // Add 20 new flowers
          id: Date.now() + i,
          delay: 0
        }))
      ]);
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/card", { state: { yourName, partnerName, yourImage, partnerImage } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-red-300 to-pink-400 p-4 md:p-6 lg:p-8">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,pink_1px,transparent_0)] opacity-20 bg-[size:40px_40px]" />
      
      {/* Falling flowers */}
      {flowers.map((flower) => (
        <FallingFlower key={flower.id} delay={flower.delay} />
      ))}

      <div className="relative flex items-center justify-center min-h-screen">
        <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-500 hover:scale-102 hover:shadow-3xl hover:bg-white/90">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-8 tracking-tight animate-fade-in">
            Create Your Valentine Card
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none transition-all duration-300 text-lg placeholder-gray-400 bg-white/50 hover:bg-white/80" 
              value={yourName} 
              onChange={(e) => setYourName(e.target.value)} 
              required 
            />
            
            <input 
              type="text" 
              placeholder="Partner's Name" 
              className="w-full p-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 outline-none transition-all duration-300 text-lg placeholder-gray-400 bg-white/50 hover:bg-white/80" 
              value={partnerName} 
              onChange={(e) => setPartnerName(e.target.value)} 
              required 
            />
            
            <div className="space-y-4">
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setYourImage(URL.createObjectURL(e.target.files[0]))} 
                className="w-full p-3 border-2 border-pink-200 rounded-xl bg-white/50 cursor-pointer hover:bg-white/80 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600" 
                required 
              />
              
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setPartnerImage(URL.createObjectURL(e.target.files[0]))} 
                className="w-full p-3 border-2 border-pink-200 rounded-xl bg-white/50 cursor-pointer hover:bg-white/80 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-600" 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-red-600 hover:to-pink-600 focus:ring-4 focus:ring-pink-300 focus:outline-none animate-pulse hover:animate-none"
            >
              Generate Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = `
@keyframes roam {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(50px, 30px);
  }
  50% {
    transform: translate(-40px, -50px);
  }
  75% {
    transform: translate(30px, -20px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.animate-roam {
  animation: roam infinite alternate ease-in-out;
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
