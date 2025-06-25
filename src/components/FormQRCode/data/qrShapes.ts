interface QrShapeCategory {
  title: string;
  items: {
    label: string;
    path: string;
  }[];
}

export const qrShapes: QrShapeCategory[] = [
  {
    title: 'Food Shapes',
    items: [
      { label: 'Egg', path: '/frames/egg.svg' },
    ],
  },
  {
    title: 'Love Shapes',
    items: [
      { label: 'Heart', path: '/frames/heart.svg' },
    ],
  },
  {
    title: 'Shapes Shapes',
    items: [
      { label: 'Star', path: '/frames/star.svg' },
    ],
  },
  {
    title: 'Animals Shapes',
    items: [
      { label: 'Fish', path: '/frames/fish.svg' },
    ],
  },
  {
    title: 'Transport Shapes',
    items: [
      { label: 'Airplane', path: '/frames/airplane.svg' },
    ],
  },
  {
    title: 'Fashion Shapes',
    items: [
      { label: 'Dress', path: '/frames/dress.svg' },
    ],
  },
];
