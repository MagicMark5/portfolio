import { useState, useEffect, useRef } from "react";
import "./App.scss";
import Nav from "./Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const App = () => {
  const [state, setState] = useState({
    view: "top", // marks top position window scroll
    position: 0, // tracks y position of window scroll
  });

  // React will hold DOM state of portfolio sections in refs
  // So we can use scrollIntoView with its `.current` property
  const refs = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const scrollTo = (ref) => {
    refs[ref].current.scrollIntoView();
  };

  const handleScroll = () => {
    // Hold Y scroll position of window
    const pos = window.pageYOffset;
    let view;
    if (pos < 10) {
      // consider y offset of less than 10 the top
      view = "top";
    }
    // track the Y scroll position in state
    setState({ ...state, view: view, position: pos });
  };

  useEffect(() => {
    // Setting "passive" to true indicates handleScroll will never call preventDefault()
    // to improve scroll performance on browsers other than Chrome and Firefox
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="App">
      <Nav view={state.view} position={state.position} scrollTo={scrollTo} />
      <Hero scrollToContact={() => scrollTo("contact")} />
      <div id="about" ref={refs.about} />
      <About />
      <div id="skills" ref={refs.skills} />
      <Skills />
      <div id="projects" ref={refs.projects} />
      <Projects />
      <div id="contact" ref={refs.contact} />
      <Contact />
      <div
        className={`scroller ${state.position < 400 ? "hide" : ""}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <div className="arrow" />
      </div>
      <footer>
        &copy; <span>2023 Adam Marsala</span>
      </footer>
    </div>
  );
};

export default App;
