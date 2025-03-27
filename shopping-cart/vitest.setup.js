import '@testing-library/jest-dom';

if (!HTMLElement.prototype.animate) {
  HTMLElement.prototype.animate = () => ({
    finished: Promise.resolve(),
    cancel: () => {},
  });
}
