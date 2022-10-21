/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";

const DropSelect = ({ checked, children, onClick = () => {}, ...props }) => {
  const [show, setShow] = useState(false);
  const showRef = useRef(null);
  useEffect(() => {
    function handleDropdown(e) {
      if (showRef.current && !showRef.current.contains(e.target)) {
        setShow(checked);
      }
    }
    document.addEventListener("click", handleDropdown);
    return () => {
      document.removeEventListener("click", handleDropdown);
    };
  }, []);
  return (
    <>
      <div className="max-w-[400px] mt-2">
        <div
          ref={showRef}
          onClick={onClick}
          className="cursor-pointer relative p-3 bg-bg-primary rounded-xl w-full text-lg font-normal mb-3"
        >
          Select your job
          <span className="top-0 right-0 flex items-center justify-center h-full p-3 absolute text-lg rounded-lg">
            {checked ? (
              <img
                className="w-full h-full bg-text-color text-text-blue rounded-2xl"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALtJREFUSEvtlNENgzAMRC+bwCZlEzpJxSTtJqzSTUAnxZLlhtj+QKoE+SEC8p5zMRScPMrJfFxPMNRIv9FoMxER/gbA6wQgJIkKBP5QOwhJIgILl3S4A1fiCTScQH0GnLuSnsDCRwBbLZ/ztQq7kiNBC062CLiO77iSI8FcO4bVsVoZWsB7WvIE8LHt24voBWAxC6xAJOyuHzgfeodsC2oJut/cLXB/SX8XkVtxpk3TsNaCbERp6S1wI9sBw2snGWLVmY4AAAAASUVORK5CYII="
              />
            ) : (
              <img
                className="w-full h-full bg-text-color !text-text-blue rounded-2xl"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALdJREFUSEvtk9ENgzAMRI9NYJMyCpPAJrSTwCZlE9BJjmRFTu1IIPUj+QGk4z3HTjo8vLqH+WgCt8N/16JTSg4XFg4KuAncQ3Fri2YAHwCH0lqCHsALwNsqrzRkwheBj0qSCwhfRTBZkpKAP24A+OQOkkQLNJyZoWYHzFqSr0AIS5UX4cx69yCX8Jtrl7b8hEcE+U50F1x4VGBJQvAagZbw3Rxo7ZCtfDpV7o1MAW/IYVAp2ARuCy8J1CQZyN2WJwAAAABJRU5ErkJggg=="
              />
            )}
          </span>
        </div>
      </div>
      {children}
    </>
  );
};

export default DropSelect;
