import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/sonner";

const MainLayout = ({ children }) => {
  return (
    <div className="antialiased z-0 overflow-x-hidden overflow-y-auto relative h-full w-full bg-slate-950 text-slate-900 dark:text-slate-50 font-subheading">
      {/* Background gradient circles */}
      <div className="absolute z-[-1] bottom-0 left-[-10%] right-0 top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="absolute z-[-1] bottom-0 right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

      {/* Content */}
      <div className="flex justify-center items-center z-20">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="mx-auto py-[-50px] px-0">
            <main className="z-20">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MainLayout;
