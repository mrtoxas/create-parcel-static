import $ from 'jquery';

const getColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const colorize = (): void => {
  $("#btn").on("click", () => {
    $("html").css("--head-color-start", getColor());
    $("html").css("--head-color-end", getColor());
  });
};

$(colorize);