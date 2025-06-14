export interface RatingBar {
  stars: number;
  percentage: number;
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
  reviews: number;
  ratingDistribution: { stars: number; percentage: number }[];
  video?: string; 
  status?: "published" | "draft"; // Optional status field
  createdAt?: string; // Optional creation date
  updatedAt?: string; // Optional last update date
  isNew?: boolean;
}
// Convenience: a helper to generate a dummy rating distribution
const makeDist = (five = 60, four = 25, three = 10, two = 3, one = 2): RatingBar[] => [
  { stars: 5, percentage: five },
  { stars: 4, percentage: four },
  { stars: 3, percentage: three },
  { stars: 2, percentage: two },
  { stars: 1, percentage: one },
];

export const games: readonly Game[] = [
  {
    id: "astray",
    title: "Astray",
    description: "Soar between floating islands while dodging laser gates.",
    image: "/gamethub.webp", 
    tags: ["flying", "endless", "3d"],
    category: "Arcade",
    embedWrapper: "AstrayWrapper",
    rating: 4.6,
    reviews: 13820,
    ratingDistribution: makeDist(),
    video: "/game.mp4",
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
    ratingDistribution: makeDist(55, 28, 12, 3, 2),
    isNew: true,  
  },
  {
    id: "stack-game",
    title: "Stack Game",
    description: "Stack blocks as high as you can!",
    image: "/games/stack-game/thumb.jpg",
    tags: ["puzzle", "stacking", "3d"],
    category: "Puzzle",
    embedWrapper: "StackGameWrapper",
    rating: 4.4,
    reviews: 7421,
    ratingDistribution: makeDist(58, 26, 11, 3, 2),
  },
  {
    id: "italian-brainrot-clicker-usp",
    title: "Italian Brainrot Clicker",
    description: "Click pasta, buy memes, become capo dei clic!",
    image: "/games/italian-brainrot/thumb.jpg",
    tags: ["clicker", "idle", "meme"],
    category: "Idle",
    embedWrapper: "ItalianBrainrotWrapper",
    rating: 4.1,
    reviews: 6510,
    ratingDistribution: makeDist(50, 30, 14, 4, 2),
  },
  {
    id: "solar-smash",
    title: "Solar Smash",
    description: "Destroy planets with black‑holes & lasers. Stress relief 101.",
    image: "/games/solar-smash/thumb.jpg",
    tags: ["sim", "destruction", "space"],
    category: "Simulation",
    embedWrapper: "SolarSmashWrapper",
    rating: 4.7,
    reviews: 18523,
    ratingDistribution: makeDist(65, 23, 8, 2, 2),
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
    ratingDistribution: makeDist(48, 29, 15, 5, 3),
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
    ratingDistribution: makeDist(56, 27, 11, 4, 2),
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
    ratingDistribution: makeDist(62, 24, 10, 3, 1),
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
    ratingDistribution: makeDist(54, 28, 12, 4, 2),
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
    ratingDistribution: makeDist(52, 29, 13, 4, 2),
  },
] as const;