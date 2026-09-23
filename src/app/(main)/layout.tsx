import Navbar from "@/components/navbar";
import { PreLoader } from "@/components/preloader";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmoothScroll } from "@/components/animations/smooth-scroll";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PreLoader />
      <CustomCursor />
      <SmoothScroll>
        <div className="relative z-10 w-full">
          {children}
        </div>
      </SmoothScroll>
      <Navbar />
    </>
  );
}
