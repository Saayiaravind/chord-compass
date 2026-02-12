import { Link } from 'react-router-dom';
import { useState } from 'react';
import AnimatedText from '../../components/ui/AnimatedText';
import { Music, Piano, Mic, BookOpen, Star, Send } from 'lucide-react';
import teacherPhoto from '../../assets/pictures/Teacher - Photo.png';
import logo from '../../assets/pictures/Chord Compass - Logo (Light mode).png';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { TextArea, Select } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const courses = [
  {
    icon: Piano,
    title: 'Western Classical Piano',
    description: 'Master the mechanics of Western Classical. From posture to complex repertoire, learn the why behind the technique for ABRSM, Trinity, and RSM excellence.',
  },
  {
    icon: BookOpen,
    title: 'Music Theory',
    description: 'Move beyond memorization. Master the first principles of rhythm, melody, and harmony from a theoretical standpoint to build a technical foundation that lasts a lifetime.',
  },
  {
    icon: Music,
    title: 'Carnatic Keyboard',
    description: 'A unique bridge between traditions. Learn to navigate Ragas and Talas on a modern interface using a structured, logical framework.',
  },
  {
    icon: Mic,
    title: 'Carnatic Vocals',
    description: 'Cultivate your voice through the fundamental building blocks of carnatic music, mastered through disciplined, traditional practice.',
  },
];

const testimonials = [
  {
    name: 'John D.',
    course: 'Piano',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Jane S.',
    course: 'Music Theory',
    quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    name: 'Alex M.',
    course: 'Carnatic Keyboard',
    quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.',
  },
];

const cyclerWords = [
  'chords', 'harmony', 'raagas', 'counterpoint', 'gamakas', 'modulation',
  'taalas', 'voice leading', 'melakarta', 'inversions', 'swara prastaaram',
  'cadences', 'janaka raagas', 'circle of fifths', 'niraval', 'polytonality',
  'arpeggios', 'shruti', 'thattu-mettu', 'solfège', 'janya raagas', 'scales',
  'alapana', 'partimento', 'triads', 'kritis', 'syncopation', 'varnams',
  'microtones', 'sonata form', 'kalpanaswaram', 'intervals', 'gathi',
  'chromaticism', 'swara gnanam', 'polyrhythms', 'graha bhedam', 'tritones',
  'laya', 'modes', 'sangathis', 'dynamics', 'korvai', 'sight reading',
  'staff notation', 'tonicity', 'atonality', 'manodharmam', 'resolution',
  'rhythm', 'amsa swaras', 'vadi-samvadi', 'secondary dominants', 'tillana',
  'aural perception',
];

export default function LandingPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', phone: '', course: '', message: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-primary-400 via-primary-200 to-primary-50 overflow-x-clip overflow-y-visible">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-primary-500/15 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-secondary-300/10 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-primary-300/20 blur-2xl" />
        </div>
        <img src={logo} alt="Chord Compass" className="hidden lg:block absolute left-[5%] top-1/2 -translate-y-1/2 w-[40vw] xl:w-[45vw] 2xl:w-[56rem] max-w-[56rem] z-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="flex items-center justify-end">
            <div className="w-full lg:max-w-xl xl:max-w-lg">
              <h1 className="font-heading font-bold text-neutral-900 leading-none mb-6 text-[clamp(1.75rem,4vw,4.5rem)]">
                Learn<br />
                <AnimatedText words={cyclerWords} interval={2000} className="bg-gradient-to-r from-[#3A2000] to-[#DAA520] bg-clip-text text-transparent" />
                <br />
                from first principles
              </h1>
              <p className="text-lg lg:text-xl text-neutral-600 mb-10 max-w-lg">
                Bridge the gap between notation and soul. Master the essential building blocks of harmony and rhythm to build your own musical vocabulary from the ground up.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#courses">
                  <Button size="lg" variant="accent">Explore Courses</Button>
                </a>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-primary-500/40 text-neutral-700 hover:bg-primary-100">
                    Student Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl font-bold text-neutral-900">Courses Offered</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.title} hover>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-5">
                  <course.icon size={26} className="text-primary-600" />
                </div>
                <h3 className="font-heading font-bold text-xl text-neutral-900 mb-2">{course.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{course.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl h-96 lg:h-[28rem] overflow-hidden flex justify-end" style={{ backgroundColor: '#edeef2' }}>
              <img src={teacherPhoto} alt="Teacher" className="h-full object-cover object-top" />
            </div>
            <div>
              <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-6">Meet Your Teacher</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                I'm Saayiaravind, a dedicated pianist and educator driven by the belief that music should be understood, not just imitated. With over 8 years of experience and a community of 200+ students across 8 countries, I specialize in bridging Western and Carnatic traditions through a first-principles approach.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Whether you are preparing for prestigious examinations like ABRSM, Trinity, or RSM, or looking for a creative outlet to express yourself, my lessons are meticulously structured to fit your unique pace. We don't just practice notes; we build a deep, foundational understanding of the craft so you can navigate any musical landscape with confidence.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-primary-50">
                  <p className="font-heading text-2xl font-bold text-primary-600">8+</p>
                  <p className="text-sm text-neutral-500">Countries</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary-50">
                  <p className="font-heading text-2xl font-bold text-secondary-600">3+</p>
                  <p className="text-sm text-neutral-500">Global Curriculums</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-accent-50">
                  <p className="font-heading text-2xl font-bold text-accent-700">All</p>
                  <p className="text-sm text-neutral-500">Levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl font-bold text-neutral-900 mb-3">What Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent-400 fill-accent-400" />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-heading font-semibold text-neutral-900">{t.name}</p>
                  <p className="text-sm text-primary-500">{t.course}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-4xl font-bold mb-3">Get in Touch</h2>
            <p className="text-neutral-400">Interested in learning? Send us a message and we'll get back to you.</p>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Name" placeholder="Your name" value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
              <Input label="Email" type="email" placeholder="you@example.com" value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Phone" placeholder="Your phone number" value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
              <Select label="Interested In" value={contactForm.course}
                onChange={(e) => setContactForm({ ...contactForm, course: e.target.value })}>
                <option value="">Select a course...</option>
                <option value="piano">Piano</option>
                <option value="theory">Music Theory</option>
                <option value="carnatic-keyboard">Carnatic Keyboard</option>
                <option value="carnatic-vocals">Carnatic Vocals</option>
              </Select>
            </div>
            <TextArea label="Message" placeholder="Tell us about your musical background and goals..."
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send size={18} /> Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
