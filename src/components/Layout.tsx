import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className = "" }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className={`pt-[72px] flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 