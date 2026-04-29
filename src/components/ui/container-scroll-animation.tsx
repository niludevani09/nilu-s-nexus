import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ContainerScroll({ titleComponent, children, className }: ContainerScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.95] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={ref} className={cn("relative h-[60rem] md:h-[80rem] flex items-center justify-center p-4 md:p-20", className)}>
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>{children}</Card>
      </div>
    </div>
  );
}

const Header = ({ translate, children }: { translate: MotionValue<number>; children: React.ReactNode }) => (
  <motion.div style={{ translateY: translate }} className="div max-w-5xl mx-auto text-center">
    {children}
  </motion.div>
);

const Card = ({ rotate, scale, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; children: React.ReactNode }) => (
  <motion.div
    style={{ rotateX: rotate, scale, boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003" }}
    className="max-w-6xl -mt-10 mx-auto h-[24rem] md:h-[40rem] w-full border-4 border-white/10 p-2 md:p-6 bg-card rounded-[30px] shadow-elegant"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-background md:rounded-2xl md:p-4">
      {children}
    </div>
  </motion.div>
);
