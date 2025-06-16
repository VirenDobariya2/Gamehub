export interface RatingBar {
  stars: number;
  percentage: number;
}

export interface Control {
  key: string;
  action: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SimilarGame {
  id: string;
  title: string;
  image: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  embedWrapper: string;
  rating: number;
  reviews?: number;
  technology?: string;
  platforms?: string[];
  video?: string;
  moreGamesLikeThis?: {
    title: string;
    description: string;
  }[];
  categories?: { label: string; count: number }[];
  status?: "published" | "draft";
  createdAt?: string;
  updatedAt?: string;
  isNew?: boolean;
  developer?: string;
  releaseDate?: string;
  totalRatings?: number;
  playerCount?: number;
  controls?: Control[];
  howToPlay?: string[];
  features?: string[];
  faq?: FAQ[];
  similarGames?: SimilarGame[];
}
export const games: readonly Game[] = [
  {
    id: "astray",
    title: "Astray",
    description:
      "Astray is a first-person motorcycle racing game developed by Soner Kara. Ride through endless highways, dodge traffic, and complete missions to unlock new bikes and upgrades.",
    category: "Racing",
    image: "/gamethub.webp",
    video: "/game.mp4",
    embedWrapper: "AstrayWrapper",
    developer: "SK Games",
    releaseDate: "2023-09-15",
    rating: 4.6,
    technology: "HTML5 (Unity WebGL)",
    totalRatings: 23812,
    playerCount: 1120,
    platforms: ["Browser (desktop, mobile, tablet)", "App Store(iOS, Android)"],
    tags: ["Racing", "Motorbike", "3D", "Realistic", "Skill"],
    categories: [
      { label: "Driving", count: 307 },
      { label: "Mobile", count: 728 },
      { label: "3D", count: 1149 },
      { label: "Simulation", count: 471 },
      { label: "Bike", count: 67 },
      { label: "Speed", count: 139 },
      { label: "Mission", count: 181 },
    ],
    controls: [
      { key: "Arrow Up", action: "Throttle" },
      { key: "Arrow Down", action: "Brake" },
      { key: "Arrow Left", action: "Steer Left" },
      { key: "Arrow Right", action: "Steer Right" },
      { key: "H", action: "Horn" },
      { key: "Y", action: "Wheelie" },
      { key: "T", action: "Look Left" },
      { key: "U", action: "Look Right" },
      { key: "R", action: "Gear Up" },
      { key: "F", action: "Gear Down" },
      { key: "P or F1", action: "Pause" },
    ],
    howToPlay: [
      "Hit the road and weave through traffic at high speed.",
      "Earn bonus points by overtaking cars above 100 km/h.",
      "Use rewards to upgrade your bike or purchase new ones.",
      "Navigate through Career, Endless, Time Trial, and Free Ride modes.",
      "Ride in dynamic weather conditions and day-night cycles.",
    ],
    features: [
      "First-person camera view",
      "34 motorbikes to choose from",
      "Real motor sounds recorded from real bikes",
      "Detailed environments with day and night variations",
      "Career mode with 90+ missions",
    ],
    moreGamesLikeThis: [
      {
        title: "Moto X3M",
        description:
          "a dirt bike game filled with difficult challenges and thrilling tracks.",
      },
      {
        title: "Drift Hunters",
        description:
          "a 3D adventure featuring a wide selection of unique cars and dynamic racing tracks.",
      },
      {
        title: "Mr Racer",
        description:
          "where you'll race through bustling areas at breakneck speeds.",
      },
    ],
    faq: [
      {
        question: "Is Traffic Rider a multiplayer game?",
        answer:
          "Traffic Rider is a single-player first-person bike riding game.",
      },
      {
        question: "Can I play Traffic Rider on PC?",
        answer:
          "Yes, Traffic Rider can be played online on desktop, mobile, or tablet.",
      },
    ],
    similarGames: [
      {
        id: "highway-racer",
        title: "Highway Racer",
        image: "/games/highway-racer.jpg",
      },
      {
        id: "bike-rush",
        title: "Bike Rush",
        image: "/games/bike-rush.jpg",
      },
      {
        id: "moto-rider",
        title: "Moto Rider",
        image: "/games/moto-rider.jpg",
      },
    ],
  },
  {
    id: "the-aviator",
    title: "The aviator",
    description: "Grow your stick army and storm the castle!",
    image: "/thumb/count-masters.jpg",
    tags: ["runner", "math", "casual"],
    category: "Casual",
    embedWrapper: "TheAviatorWrapper",
    rating: 4.2,
    reviews: 9876,

    isNew: true,
  },
  {
    id: "traffic-rider",
    title: "Traffic Rider",
    description: "Click pasta, buy memes, become capo dei clic!",
    image: "/thumb/traffic-rider.avif",
    tags: ["clicker", "idle", "meme"],
    category: "Idle",
    embedWrapper: "TrafficRiderWrapper",
    rating: 4.1,
    reviews: 6510,
  },
  {
    id: "solar-smash",
    title: "Solar Smash",
    description:
      "Destroy planets with black‑holes & lasers. Stress relief 101.",
    image: "/games/solar-smash/thumb.jpg",
    tags: ["sim", "destruction", "space"],
    category: "Simulation",
    embedWrapper: "SolarSmashWrapper",
    rating: 4.7,
    reviews: 18523,
  },
  {
    id: "endless-runner",
    title: "Endless Runner X",
    description: "Simple but brutal procedurally‑generated runner.",
    image: "/games/endless-runner/thumb.jpg",
    tags: ["runner", "arcade"],
    category: "Arcade",
    embedWrapper: "EndlessRunnerWrapper",
    rating: 4.0,
    reviews: 4320,
  },
  {
    id: "zombie-defense",
    title: "Zombie Defense TD",
    description: "Build turrets, hold the line against hordes!",
    image: "/games/zombie-defense/thumb.jpg",
    tags: ["tower‑defense", "strategy"],
    category: "Strategy",
    embedWrapper: "ZombieDefenseWrapper",
    rating: 4.3,
    reviews: 5920,
  },
  {
    id: "retro-racer",
    title: "Retro Racer 1985",
    description: "Low‑poly synthwave racing nostalgia.",
    image: "/games/retro-racer/thumb.jpg",
    tags: ["racing", "retro"],
    category: "Racing",
    embedWrapper: "RetroRacerWrapper",
    rating: 4.5,
    reviews: 8211,
  },
  {
    id: "tower-merger",
    title: "Tower Merger 3D",
    description: "Merge blocks, build high, reach the stratosphere!",
    image: "/games/tower-merger/thumb.jpg",
    tags: ["puzzle", "merge", "3d"],
    category: "Puzzle",
    embedWrapper: "TowerMergerWrapper",
    rating: 4.2,
    reviews: 3780,
  },
  {
    id: "pixel-basket",
    title: "Pixel Basket Jam",
    description: "One‑tap dunk contest in 8‑bit style.",
    image: "/games/pixel-basket/thumb.jpg",
    tags: ["sports", "basketball", "pixel"],
    category: "Sports",
    embedWrapper: "PixelBasketWrapper",
    rating: 4.1,
    reviews: 2890,
  },
] as const;
