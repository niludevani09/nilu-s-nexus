import { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className={`flex h-full w-full items-center justify-center ${className ?? ""}`}>
          <div className="h-12 w-12 animate-spin-slow rounded-full border-2 border-primary/40 border-t-primary" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
