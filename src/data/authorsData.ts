export const avtarIcon = [
  {
    id: "1",
    name: "Blender Creative Twin",
    authorSlug: "noah-carter",
    avatarImg: "https://i.pravatar.cc/64?img=10",
  },
  {
    id: "2",
    name: "Codewrite Twin",
    authorSlug: "codewrite-twin",
    avatarImg: "https://i.pravatar.cc/64?img=65",
  },
  {
    id: "3",
    name: "Armory3D Twin",
    authorSlug: "armory3d-twin",
    avatarImg: "https://i.pravatar.cc/64?img=10",
  },
];

export const getAvatarByIdOrSlug = (param: string | undefined) => {
  if (!param) return undefined;
  const slug = param.toLowerCase();
  return avtarIcon.find((a) =>
    a.id === param ||
    a.authorSlug === param ||
    a.name.toLowerCase().replace(/\s+/g, "-") === slug
  );
};
// data/twins.ts
export const AuthorCardData = [
  {
    id: "creative-integration",
    name: "Creative Integration Twin",
    avatar: "https://i.pravatar.cc/120?img=12",
    verified: true,
    description:
      "Trained on 12+ years of hands-on Workday Integration experience—Studio, EIBs, PECI, Core Connectors, DT, and REST/SOAP APIs.",
  },
  {
    id: "creative-bp",
    name: "Creative BP Twin",
    avatar: "https://i.pravatar.cc/120?img=32",
    verified: true,
    description:
      "Trained on 12+ years of hands-on Workday Integration experience—Studio, EIBs, PECI, Core Connectors, DT, and REST/SOAP APIs.",
  },
  {
    id: "creative-studio",
    name: "Creative Studio Twin",
    avatar: "https://i.pravatar.cc/120?img=45",
    verified: true,
    description:
      "Trained on 12+ years of hands-on Workday Integration experience—Studio, EIBs, PECI, Core Connectors, DT, and REST/SOAP APIs.",
  },
];
