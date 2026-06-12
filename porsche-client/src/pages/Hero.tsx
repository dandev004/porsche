import { motion } from "framer-motion"
import { useRef, useState } from "react";
import { IoPause } from "react-icons/io5";
import { IoPlay } from "react-icons/io5";
const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef(null);


  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false)
    } else {
      video.play();
      setIsPlaying(true)
    }
  }
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <video ref={videoRef} autoPlay muted loop playsInline
             className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source
          src="https://vrvqjmkllbxtcjxxhiju.supabase.co/storage/v1/object/public/porsche/hero-desktop.mp4"
          media="(min-width: 768px)"
        />
        <source
          src="https://vrvqjmkllbxtcjxxhiju.supabase.co/storage/v1/object/public/porsche/hero-mobile.mp4"
          media="(max-width: 767px)"
        />
      </video>

      <div className='absolute px-6 bottom-1/6 flex flex-col justify-end gap-4 lg:w-1/3 transition-all duration-700 ease-in-out'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl text-white tracking-wide"
        >
          Sonderwunsch "Tree of Life"
        </motion.h1>
        <button 
          className='w-full p-4 bg-white/20 backdrop-blur-md rounded-lg text-white text-[16px] md:w-[35%] 
                     lg:w-[50%] xl:w-[40%] font-semibold hover:bg-white/10 '
        >
          Discover more
        </button>
      </div>

      <div
        onClick={togglePlay}
        className="absolute bottom-10 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm 
                   rounded-full flex items-center justify-center cursor-pointer"
      >
        {isPlaying ? (
          <IoPause size={20} color="white" />
        ) : (
          <IoPlay size={20} color="white" />
        )}
      </div>

    </section>
  )
}

export default Hero
