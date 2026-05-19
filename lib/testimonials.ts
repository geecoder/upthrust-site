export interface Testimonial {
  id: string; name: string; role: string; company: string;
  quote: string; photo: string | null; pathway: 'BA' | 'PM' | 'Design';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'chioma-okorie',
    name: 'Chioma Okorie',
    role: 'Business Analyst',
    company: 'Mount Saint Vincent University',
    quote: 'Genesis brings deep, practical knowledge to every session — real tools, real scenarios, real clarity. His patience and the way he grounds every concept in actual product work made the difference. I gave a strong five-star rating and I recommend Upthrust without hesitation.',
    photo: null,
    pathway: 'BA',
  },
  {
    id: 'ayodele-yeye',
    name: 'Ayodele Yeye',
    role: 'Senior Business Analyst',
    company: 'Government of Nova Scotia',
    quote: 'Upthrust knows Business Analysis inside out. Every concept is taught through practical, real-life examples — not slides and theory. If you are serious about building a career in BA, this is where you start.',
    photo: null,
    pathway: 'BA',
  },
  {
    id: 'uyoyou-taiye-ayo',
    name: 'Uyoyou Taiye-Ayo',
    role: 'Senior Business Analyst',
    company: 'RBC Investor & Treasury Services',
    quote: 'I am practising Business Analysis at a senior level today because of the practical, in-depth training I received from Upthrust. I went from total novice to confident enough to land the job — and keep growing in it.',
    photo: null,
    pathway: 'BA',
  },
];
