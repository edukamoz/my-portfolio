/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Background } from "./components/Background";
import { Cursor } from "./components/Cursor";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Work } from "./pages/Work";
import { Contact } from "./pages/Contact";
import { LanguageProvider } from "./contexts/LanguageContext";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - Routes key is required for AnimatePresence but not in types */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-white selection:text-black">
          <Cursor />
          <Background />
          <Navbar />
          <AnimatedRoutes />
        </div>
      </Router>
    </LanguageProvider>
  );
}
