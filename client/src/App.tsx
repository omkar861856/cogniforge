import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, memo } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// Lazy load components for better code splitting and performance
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <h2 className="mt-4 text-xl font-semibold text-orange-500">Loading...</h2>
    </div>
  </div>
);

// Memoized Router component to prevent unnecessary re-renders
const Router = memo(function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
});

// Main App component with performance optimizations
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <ScrollToTopButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default memo(App);
