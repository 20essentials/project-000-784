import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "bulma/css/bulma.min.css";

const App = () => {
  const imgRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    Object.assign(document.body.style, {
      height: "100vh",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      placeContent: "center",
      backgroundImage: "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)"
    });

    const img = imgRef.current;
    const result = resultRef.current;
    const lens = document.createElement("div");
    lens.classList.add("img-zoom-lens");
    img.parentElement.insertBefore(lens, img);

    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url('${img.src}')`;
    result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    const moveLens = (e) => {
      e.preventDefault();
      const rect = img.getBoundingClientRect();
      const x = e.pageX - rect.left - window.pageXOffset;
      const y = e.pageY - rect.top - window.pageYOffset;
      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;
      const posX = Math.max(0, Math.min(x - lensWidth / 2, img.width - lensWidth));
      const posY = Math.max(0, Math.min(y - lensHeight / 2, img.height - lensHeight));
      lens.style.left = `${posX}px`;
      lens.style.top = `${posY}px`;
      result.style.backgroundPosition = `-${posX * cx}px -${posY * cy}px`;
    };

    [lens, img].forEach(el => {
      el.addEventListener("mousemove", moveLens, { passive: true });
      el.addEventListener("touchmove", moveLens, { passive: true });
    });
  }, []);

  return (
    <div className="img-zoom-container" style={{position: "relative"}}>
      <img ref={imgRef} id="myimage" src="assets/fondo.avif" width="300" height="300" />
      <div ref={resultRef} id="myresult" className="img-zoom-result" style={{width: "300px", height: "300px"}}></div>
      <style>{`
        .img-zoom-lens { position: absolute; border: 1px solid #d4d4d4; width: 40px; height: 40px; }
      `}</style>
    </div>
  );
};

const rootEl = document.createElement("div");
document.body.appendChild(rootEl);
const root = createRoot(rootEl);
root.render(<App />);

export default App;
