import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CultiVision - Cultivated Meat Analytics",
    short_name: "CultiVision",
    description:
      "Interactive dashboard for cultivated meat production cost analysis",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#41932B",
    icons: [
      {
        src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""
              }/images/cv-logo.png`,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
