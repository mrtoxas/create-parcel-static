const getColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

const colorize = () => {
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    document.documentElement.style.setProperty(
      '--head-color-start',
      getColor(),
    );
    document.documentElement.style.setProperty('--head-color-end', getColor());
  });
};

window.addEventListener('DOMContentLoaded', colorize);
