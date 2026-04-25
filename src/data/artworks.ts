export type Category =
  | 'Portraits'
  | 'Deity Sketches'
  | 'Landscapes'
  | 'Mandala'
  | '3D Illusions'
  | 'Animal Studies'
  | 'Hand Studies';

export interface Artwork {
  id: string;
  src: string;
  title: string;
  category: Category;
  aspect: 'portrait' | 'landscape' | 'square';
  medium: string;
  featured?: boolean;
}

export const artworks: Artwork[] = [
  { id: 'p1', src: '/artwork/portrait-1.jpeg',           title: 'Quiet Resemblance',    category: 'Portraits',      aspect: 'portrait',  medium: 'Graphite on archival paper',          featured: true  },
  { id: 'p2', src: '/artwork/portrait-2.jpeg',           title: 'Soft Light Study',     category: 'Portraits',      aspect: 'portrait',  medium: 'Graphite & charcoal on cotton paper' },
  { id: 'p3', src: '/artwork/portrait-3.jpeg',           title: 'The Familiar Gaze',    category: 'Portraits',      aspect: 'portrait',  medium: 'Charcoal on toned paper'              },
  { id: 'p4', src: '/artwork/portrait-4.jpeg',           title: 'Memory in Graphite',   category: 'Portraits',      aspect: 'portrait',  medium: 'Graphite on archival paper'           },
  { id: 'p5', src: '/artwork/portrait-5.jpeg',           title: 'Heirloom',             category: 'Portraits',      aspect: 'portrait',  medium: 'Mixed media on cotton paper'          },
  { id: 'd1', src: '/artwork/deity-sketch-1.jpeg',       title: 'Devotion I',           category: 'Deity Sketches', aspect: 'portrait',  medium: 'Pen & ink on cartridge paper',        featured: true  },
  { id: 'd2', src: '/artwork/deity-sketch-2.jpeg',       title: 'Devotion II',          category: 'Deity Sketches', aspect: 'portrait',  medium: 'Graphite on archival paper'           },
  { id: 'd3', src: '/artwork/deity-sketch-3.jpeg',       title: 'Sacred Stillness',     category: 'Deity Sketches', aspect: 'portrait',  medium: 'Charcoal on toned paper'              },
  { id: 'd4', src: '/artwork/deity-sketch-4.jpeg',       title: 'The Inner Light',      category: 'Deity Sketches', aspect: 'portrait',  medium: 'Pen & ink with gold accent'           },
  { id: 'l1', src: '/artwork/landscape-painting-1.jpeg', title: 'Horizon Notes I',      category: 'Landscapes',     aspect: 'landscape', medium: 'Soft pastel on toned paper',          featured: true  },
  { id: 'l2', src: '/artwork/landscape-painting-2.jpeg', title: 'Horizon Notes II',     category: 'Landscapes',     aspect: 'landscape', medium: 'Watercolour on cotton paper'          },
  { id: 'l3', src: '/artwork/landscape-painting-3.jpeg', title: 'Wandering Quiet',      category: 'Landscapes',     aspect: 'landscape', medium: 'Soft pastel on toned paper'           },
  { id: 'l4', src: '/artwork/landscape-painting-4.jpeg', title: 'Distant Calm',         category: 'Landscapes',     aspect: 'landscape', medium: 'Mixed media on archival paper'        },
  { id: 'm1', src: '/artwork/mandala-art.jpeg',          title: 'Concentric Prayer',    category: 'Mandala',        aspect: 'square',    medium: 'Pen & ink on cartridge paper',        featured: true  },
  { id: 'i1', src: '/artwork/3d-illusion-1.jpeg',        title: 'Off the Page I',       category: '3D Illusions',   aspect: 'square',    medium: 'Graphite with coloured pencil',       featured: true  },
  { id: 'i2', src: '/artwork/3d-illusion-2.jpeg',        title: 'Off the Page II',      category: '3D Illusions',   aspect: 'square',    medium: 'Graphite with coloured pencil'        },
  { id: 'a1', src: '/artwork/animal-sketch.jpeg',        title: 'Companion',            category: 'Animal Studies', aspect: 'landscape', medium: 'Charcoal on archival paper'           },
  { id: 'h1', src: '/artwork/hand-sketch.jpeg',          title: 'Anatomy of Stillness', category: 'Hand Studies',   aspect: 'portrait',  medium: 'Graphite on archival paper',          featured: true  },
];

export const CATEGORIES: Array<'All' | Category> = [
  'All',
  'Portraits',
  'Deity Sketches',
  'Landscapes',
  'Mandala',
  '3D Illusions',
  'Animal Studies',
  'Hand Studies',
];
