import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 50 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 50 });
  const moveX = useTransform(smoothX, [0, 1920], [-40, 40]);
  const moveY = useTransform(smoothY, [0, 1080], [-40, 40]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <motion.img src="/assets/images/sticker1.png" className="bg-sticker" style={{ top: '10%', left: '5%', x: moveX, y: moveY }} />
      <motion.img src="/assets/images/sticker2.png" className="bg-sticker" style={{ bottom: '10%', right: '5%', x: moveX, y: moveY }} />
      <motion.img src="/assets/images/sticker3.png" className="bg-sticker" style={{ top: '20%', right: '15%', x: moveX, y: moveY }} />
      <motion.img src="/assets/images/sticker4.png" className="bg-sticker" style={{ bottom: '20%', left: '15%', x: moveX, y: moveY }} />

      {!isStarted ? (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-white text-center p-3">
          <div className="rei-avatar-wrapper mb-4">
            <img src="/assets/images/ReiRei.jpg" alt="Rei" className="rei-avatar" />
          </div>
          <h1 className="mb-3" style={{ color: '#8b5cf6' }}>Happy Birthday, Rei!</h1>
          {countdown > 0 ? (
            <h2 className="display-4 fw-bold pulse-text" style={{ color: '#38bdf8' }}>{countdown}</h2>
          ) : (
            <button className="btn btn-outline-info btn-lg mt-4" onClick={() => setIsStarted(true)}>進入慶祝頁面</button>
          )}
        </div>
      ) : (
        <div className="container text-center py-5">
          <div className="banner-wrapper mb-5">
            <img src="/assets/images/channels4_banner.jpg" alt="Rei Banner" className="img-fluid rounded shadow-lg" />
          </div>

          <h1 className="display-1 fw-bold text-light mb-4">澪Rei 生日快樂！</h1>

          <div className="d-flex justify-content-center">
            <AnimatePresence mode="wait">
              {!showLetter ? (
                <motion.div 
                  key="envelope"
                  onClick={() => { setShowLetter(true); confetti({ particleCount: 100, spread: 70 }); }}
                  className="envelope-icon"
                >
                  💌 點擊開啟這封信
                </motion.div>
              ) : (
                <motion.div 
                  key="letter"
                  className="letter-content bg-white text-dark p-4 rounded shadow-lg"
                  style={{ maxWidth: '600px', textAlign: 'left' }}
                >
                  <h4 className="fw-bold mb-3">Dear 小澪:</h4>
                  <p className="lead" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    謝謝妳這幾年的開台，用你的歌聲、歡笑幫助我紓解工作時的壓力。<br /><br />
                    也希望妳在未來能更好，VT人數盡快破10W！<br />
                    祝你每一天都像煙火般燦爛~~
                  </p>
                  
                  <div className="text-center mt-4 pt-3 border-top">
                    {!wishMade && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="mb-3 text-muted" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                          ✧ 請 ReiRei 在心中默默許下今年的願望 ✧<br />
                          <small>許願完成後，請點擊下方按鈕</small>
                        </p>
                        <button 
                          className="btn btn-lg text-white shadow-sm" 
                          style={{ backgroundColor: '#8b5cf6' }} 
                          onClick={() => { setWishMade(true); confetti({ particleCount: 250, spread: 120, origin: { y: 0.5 } }); }}
                        >
                          ✨ 願望已默念完畢
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {wishMade && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="mt-5 text-center mx-auto" 
              style={{ maxWidth: '600px' }}
            >
              {!showSurprise ? (
                <button className="btn btn-warning btn-lg shadow" onClick={() => setShowSurprise(true)}>
                  千萬別看，會後悔喔~~ 🤐
                </button>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-dark text-light rounded shadow-lg">
                  <h5 className="mb-4">既然都點了，那就看吧...</h5>
                  <div className="d-grid gap-3">
                    <a href="https://www.youtube.com/watch?v=Kqlg4ocfyT0" target="_blank" rel="noopener noreferrer" className="btn btn-outline-info p-3">
                      🎥 最想跟大家回憶的~
                    </a>
                    <a href="https://www.youtube.com/watch?v=rAJJ35DTO3U" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger p-3">
                      💀 最不想回憶的...
                    </a>
                    <a href="https://www.youtube.com/watch?v=wEU7-nCO0uM" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary p-3 mt-3">
                      🏁 慶祝活動已結束，主播請點我收尾！
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          <footer className="mt-5 pt-4 border-top border-secondary text-white">
            <p className="mb-0" style={{ fontSize: '0.85rem' }}>
              ※ 本作品為粉絲製作之展示用途，並無商業用途，純屬慶祝使用。
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;