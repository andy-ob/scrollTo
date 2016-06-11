const scrollMeTo = (options) => {
  const { el, duration, padding } = options;
  const start = window.pageYOffset;
  const dest = document.querySelector(el).offsetTop;
  const distance = dest - start - padding;
  let currentTime = 0;
  const increment = 20;

  Math.easeInOutQuad = (t, b, c, d) => {
    let u = t / (d / 2);
    if (u < 1) {
      return c / 2 * u * u + b;
    }
    u--;
    return -c / 2 * (u * (u - 2) - 1) + b;
  };

  const scroll = () => {
    const anim = requestAnimationFrame(scroll);
    const val = Math.easeInOutQuad(currentTime, start, distance, duration);

    currentTime += increment;

    if (currentTime >= duration) {
      cancelAnimationFrame(anim);
    } else {
      window.scrollTo(0, val);
    }

    window.addEventListener('wheel', cancelAnimationFrame.bind(this, anim));
    window.addEventListener('touchmove', cancelAnimationFrame.bind(this, anim));
  };

  scroll();
}