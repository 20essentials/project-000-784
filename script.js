function imageZoom(imgID, resultID) {
  const img = document.getElementById(imgID);
  const result = document.getElementById(resultID);
  const lens = document.createElement("div");
  lens.classList.add("img-zoom-lens");
  img.parentElement.insertBefore(lens, img);

  const cx = result.offsetWidth / lens.offsetWidth;
  const cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = `url('${img.src}')`;
  result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

  [lens, img].forEach(el => {
    el.addEventListener("mousemove", moveLens, { passive: true });
    el.addEventListener("touchmove", moveLens, { passive: true });
  });

  function moveLens(e) {
    e.preventDefault();
    const { x, y } = getCursorPos(e);
    const lensWidth = lens.offsetWidth;
    const lensHeight = lens.offsetHeight;
    
    const posX = Math.max(0, Math.min(x - lensWidth / 2, img.width - lensWidth));
    const posY = Math.max(0, Math.min(y - lensHeight / 2, img.height - lensHeight));
    
    lens.style.left = `${posX}px`;
    lens.style.top = `${posY}px`;
    result.style.backgroundPosition = `-${posX * cx}px -${posY * cy}px`;
  }

  function getCursorPos(e) {
    const rect = img.getBoundingClientRect();
    const x = e.pageX - rect.left - window.pageXOffset;
    const y = e.pageY - rect.top - window.pageYOffset;
    return { x, y };
  }
}

imageZoom("myimage", "myresult");