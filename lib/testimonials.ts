export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  photo: string | null;
  pathway: 'BA' | 'PM' | 'Design';
}

// Real testimonials from Upthrust alumni, used with permission. These are
// the short pull-quote versions (the only consumer, the home page's Proof
// section, quotes them exactly this way) — order and wording verbatim.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'ayodele-yeye',
    name: 'Ayodele Yeye',
    role: 'Senior BA',
    company: 'Government of Nova Scotia',
    quote: 'Every concept taught through real work, not slides.',
    photo: null,
    pathway: 'BA',
  },
  {
    id: 'uyoyou-taiye-ayo',
    name: 'Uyoyou Taiye-Ayo',
    role: 'Senior BA',
    company: 'RBC',
    quote: 'Novice to confident enough to land the job.',
    photo: null,
    pathway: 'BA',
  },
  {
    id: 'chioma-okorie',
    name: 'Chioma Okorie',
    role: 'Business Analyst',
    company: 'MSVU',
    quote: 'Real tools, real scenarios, real clarity.',
    photo: null,
    pathway: 'BA',
  },
];

// TO ADD REAL PHOTOS:
// 1. Get the original photo files from your admin panel or directly from each person
// 2. Place them in public/images/testimonials/ (JPG/PNG, minimum 200x200px, square crop)
// 3. Update each photo field:
//    photo: '/images/testimonials/chioma-okorie.jpg'
