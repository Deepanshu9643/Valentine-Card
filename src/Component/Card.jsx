import { useLocation } from "react-router-dom";

const Card = () => {
  const location = useLocation();
  const { state } = location || {};

  if (!state) {
    return <div className="text-center mt-10 text-xl">No Data Found! Please go back and fill the form.</div>;
  }

  const { yourName, partnerName, yourImage, partnerImage } = state;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-red-200 to-pink-300 p-4 flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,pink_1px,transparent_0)] opacity-20 bg-[size:40px_40px] animate-pulse" />
      
      {/* Floating hearts */}
      <div className="heart-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center transform transition-all duration-500 hover:scale-102 hover:shadow-3xl animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-8">
          Happy Valentine's Day!
        </h2>

        <div className="mt-8 flex justify-center items-center space-x-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
            <img 
              src={yourImage} 
              alt="Your" 
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-6"
            />
          </div>

          <span className="text-5xl md:text-6xl animate-pulse">❤️</span>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
            <img 
              src={partnerImage} 
              alt="Partner" 
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-6"
            />
          </div>
        </div>

        <p className="mt-8 text-3xl md:text-4xl font-semibold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          {yourName} ❤️ {partnerName}
        </p>
      </div>
    </div>
  );
};

const styles = `
.heart-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.floating-heart {
  position: fixed;
  opacity: 0;
  animation: floatHeart 6s linear infinite;
}

@keyframes floatHeart {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1) rotate(360deg);
    opacity: 0;
  }
}

@keyframes gradient-xy {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(2px, 2px) rotate(1deg);
  }
  50% {
    transform: translate(-2px, 2px) rotate(-1deg);
  }
  75% {
    transform: translate(-2px, -2px) rotate(1deg);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-gradient-xy {
  animation: gradient-xy 3s ease infinite;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Card;