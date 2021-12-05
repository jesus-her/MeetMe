export interface Product {
  title: string;
  subtitle: string;
  color1: string;
  color2: string;
  picture: number;
}

export const products = [
  {
    title: "Helado de Fresa",
    subtitle: "",
    color1: "#ff9ca9",
    color2: "#ffb1be",
    picture: require("./assets/strawberry-3488586.png"),
    aspectRatio: 1.1,
  },

  {
    title: "Helado de Vainilla",
    subtitle: "",
    color1: "#E2DDD1",
    color2: "#F3F1ED",
    picture: require("./assets/vanila.png"),
    aspectRatio: 1.3,
  },
  {
    title: "Helado de Chocolate",
    subtitle: "",
    color1: "#e19000",
    color2: "#ffbb13",
    picture: require("./assets/chocolate.png"),
    aspectRatio: 1.2,
  },
  {
    title: "Helado de Menta",
    subtitle: "",
    color1: "#4DD2A5",
    color2: "#63D8B0",
    picture: require("./assets/menta.png"),
    aspectRatio: 1.33,
  },
  {
    title: "Helado de Café",
    subtitle: "",
    color1: "#FEB829",
    color2: "#FDD446",
    picture: require("./assets/cafe.png"),
    aspectRatio: 0.7,
  },
];
/*  {
    title: "More Cold Brew to Love",
    subtitle: "32oz bottle now available",
    color1: "#FEAC00",
    color2: "#FDC946",
    picture: require("./assets/coldbrew2.png"),
    aspectRatio: 719 / 277,
  },*/
