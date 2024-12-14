'use client';

import Link from 'next/link';
import { FaBook, FaGraduationCap, FaUsers, FaAward, FaClock } from 'react-icons/fa';
import CourseCard from '@/components/CourseCard';
import InstructorCard from '@/components/InstructorCard';

const featuredCourses = [
  {
    id: 1,
    title: "Foundations of Arabic Grammar (Nahw)",
    description: "Master the building blocks of the Arabic language with step-by-step lessons based on classical texts.",
    instructor: "Shaykh Abdullah Al-Hassan",
    level: "Beginner",
    duration: "12 weeks",
    category: "Arabic Grammar",
    image: "/images/courses/arabic-grammar.jpg",
    price: 50
  },
  {
    id: 2,
    title: "Introduction to Islamic Jurisprudence (Fiqh)",
    description: "A beginner-friendly course on understanding the principles of Islamic law using renowned texts.",
    instructor: "Dr. Aisha Khadijah",
    level: "Beginner",
    duration: "10 weeks",
    category: "Islamic Law",
    image: "/images/courses/fiqh.jpg",
    price: 45
  },
  {
    id: 3,
    title: "Memorization of Poetic Texts (Nazm)",
    description: "Learn and memorize Islamic poetry with explanations to enhance your understanding.",
    instructor: "Ustadh Ahmed Al-Farsi",
    level: "Intermediate",
    duration: "8 weeks",
    category: "Islamic Poetry",
    image: "/images/courses/poetry.jpg",
    price: 40
  },
  {
    id: 4,
    title: "Introduction to Quranic Sciences (Uloom al-Quran)",
    description: "Explore the miraculous nature of the Quran and its sciences through this comprehensive course.",
    instructor: "Shaykh Abdullah Al-Hassan",
    level: "Beginner",
    duration: "16 weeks",
    category: "Quranic Studies",
    image: "/images/courses/quran.jpg",
    price: 60
  }
];

const instructors = [
  {
    name: "Shaykh Abdullah Al-Hassan",
    expertise: "Arabic Grammar (Nahw) and Morphology (Sarf)",
    bio: "Shaykh Abdullah has over 15 years of teaching experience, focusing on Arabic language mastery for non-native speakers.",
    image: "/images/instructors/abdullah.jpg"
  },
  {
    name: "Dr. Aisha Khadijah",
    expertise: "Fiqh and Usul al-Fiqh",
    bio: "With a PhD in Islamic Jurisprudence, Dr. Aisha combines classical texts with contemporary applications.",
    image: "/images/instructors/aisha.jpg"
  },
  {
    name: "Ustadh Ahmed Al-Farsi",
    expertise: "Islamic Poetry and Literature",
    bio: "A published poet and educator, Ustadh Ahmed specializes in Islamic poetic texts and their meanings.",
    image: "/images/instructors/ahmed.jpg"
  }
];

const testimonials = [
  {
    quote: "I always struggled with Arabic grammar until I joined Baytul Mutun Wal Manzumaat. The structured approach and engaging instructors made all the difference.",
    author: "Ahmed",
    location: "Nigeria"
  },
  {
    quote: "Learning Islamic poetry has been a transformative experience for me. I now appreciate the wisdom and beauty of our heritage.",
    author: "Maryam",
    location: "UK"
  }
];

export default function CoursesPage() {
  return (
    <main>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-dark to-black text-white py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Explore Our Courses
              </h1>
              <p className="text-xl mb-8">
                Your gateway to mastering classical Islamic texts (matn) and poetic compositions (nazm) with structured learning, tests, and certifications.
              </p>
              <div className="flex gap-4">
                <Link href="#courses">
                  <button className="btn-primary">Browse Courses</button>
                </Link>
                <Link href="/auth/register">
                  <button className="btn-secondary">Start Learning Now</button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/studying.svg"
                alt="Student studying Islamic texts"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Instructors */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Learn from Experienced Scholars and Educators</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <InstructorCard key={index} {...instructor} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/instructors">
              <button className="btn-primary">View All Instructors</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Learn With Us */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Baytul Mutun Wal Manzumaat?</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold/10 rounded-lg">
                  <FaBook className="w-8 h-8 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Structured Learning</h3>
              <p className="text-gray-600">Courses are designed with clear objectives, milestones, and assessments.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold/10 rounded-lg">
                  <FaGraduationCap className="w-8 h-8 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Qualified Instructors</h3>
              <p className="text-gray-600">Learn from experienced scholars and teachers.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold/10 rounded-lg">
                  <FaUsers className="w-8 h-8 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Classes</h3>
              <p className="text-gray-600">Engage with instructors and peers through Q&A sessions.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold/10 rounded-lg">
                  <FaAward className="w-8 h-8 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <p className="text-gray-600">Earn certificates for completed courses to showcase your progress.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold/10 rounded-lg">
                  <FaClock className="w-8 h-8 text-gold" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Learn at your convenience, anytime, anywhere.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/auth/register">
              <button className="btn-primary">Start Your Journey</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Affordable Learning, One Course at a Time</h2>
          <div className="max-w-3xl mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Pay-As-You-Learn</h3>
                <p className="text-gray-600">Enroll in individual courses that suit your interests.</p>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Transparent Pricing</h3>
                <p className="text-gray-600">No hidden fees; only pay for the courses you choose.</p>
              </div>
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Scholarships Available</h3>
                <p className="text-gray-600">For eligible students with financial constraints.</p>
              </div>
            </div>
            <Link href="#courses">
              <button className="btn-primary">Explore Our Courses</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">
                  – {testimonial.author}, <span className="text-gold">{testimonial.location}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-secondary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Begin Your Journey Today</h2>
            <p className="text-xl mb-8">
              Join thousands of students worldwide in discovering the treasures of Islamic knowledge. With Baytul Mutun Wal Manzumaat, the path to structured, authentic, and interactive learning is just a click away.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#courses">
                <button className="btn-primary bg-white text-gold hover:bg-gray-100">
                  Explore Courses
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="btn-secondary border-white text-white hover:bg-white/10">
                  Start Learning
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
