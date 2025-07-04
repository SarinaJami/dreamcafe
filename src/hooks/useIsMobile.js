import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleReize = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }
    window.addEventListener('resize', handleReize)
    return () => window.removeEventListener('resize', handleReize)
  }, [breakpoint])

  return isMobile
}

export default useIsMobile