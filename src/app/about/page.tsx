import Link from 'next/link';
import { FaBook, FaGlobe, FaGraduationCap, FaUsers } from 'react-icons/fa';

// Placeholder data
const content = {
  mission: "Our mission is to make authentic Islamic knowledge accessible to everyone...",
  vision: "To become the leading global platform for traditional Islamic education...",
  story: "Baytul Mutun was founded with a vision to bridge the gap...",
  founder: {
    name: "Sheikh Abdullah Al-Rahman",
    message: "In the name of Allah, the Most Gracious, the Most Merciful...",
    image: "/images/founder.jpg"
  },
  team: [
    {
      id: "1",
      name: "Dr. Ahmad Al-Hassan",
      role: "Academic Director",
      image: "/images/instructors/abdullah.jpg",
      bio: "With over 20 years of experience in Islamic education, Dr. Ahmad leads our academic initiatives."
    },
    {
      id: "2",
      name: "Ustadha Sarah Ahmad",
      role: "Lead Instructor",
      image: "/images/instructors/aisha.jpg",
      bio: "A specialist in Arabic language and Islamic studies, Ustadha Sarah develops our core curriculum."
    },
    {
      id: "3",
      name: "Br. Yusuf Rahman",
      role: "Community Manager",
      image: "/images/instructors/ahmed.jpg",
      bio: "Dedicated to fostering meaningful connections within our learning community."
    }
  ],
  values: [
    {
      title: "Authenticity",
      description: "Commitment to authentic Islamic knowledge from reliable sources."
    },
    {
      title: "Excellence",
      description: "Striving for excellence in everything we do."
    },
    {
      title: "Community",
      description: "Building a supportive global community of learners."
    }
  ]
};

export default function AboutPage() {
  
  return (
    <main>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-dark to-black text-white py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Baytul Mutun Wal Manzumaat
              </h1>
              <p className="text-xl mb-8">
                Empowering Muslims Worldwide Through Authentic Islamic Learning.
              </p>
              <div className="flex gap-4">
                <Link href="/courses">
                  <button className="btn-primary">Explore Our Courses</button>
                </Link>
                <Link href="/auth/register">
                  <button className="btn-secondary">Join Our Community</button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/about/hero.svg"
                alt="Islamic Learning"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                {content.mission}
              </p>
            </div>
            <div>
              <img
                src="/images/about/mission.svg"
                alt="Islamic Calligraphy"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              {content.vision}
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Unique?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaBook className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-gray-600">
                Our courses focus on classical Islamic texts and their explanations by qualified instructors.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaGraduationCap className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diversity</h3>
              <p className="text-gray-600">
                Covering subjects like fiqh, aqeedah, nahw, and sarf, as well as poetic compositions in Islamic sciences.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaGlobe className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Learn at your own pace, from anywhere in the world.
              </p>
            </div>
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <FaUsers className="w-12 h-12 text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Join a vibrant community of learners and scholars.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/courses/catalog">
              <button className="btn-primary">Browse Our Courses</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">How It All Began</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.story}
              </p>
            </div>
            <div>
              <img
                src="/images/about/journey.svg"
                alt="Our Journey"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">The People Behind BMM</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.team.map((member, index) => (
              <div key={member.id} className="card p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Community Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Making a Difference</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">10,000+</div>
              <p className="text-gray-600">Students Enrolled</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">50+</div>
              <p className="text-gray-600">Courses Offered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">30+</div>
              <p className="text-gray-600">Scholars & Instructors</p>
            </div>
          </div>
          <div className="card p-6 max-w-2xl mx-auto">
            <p className="text-gray-600 italic mb-4">
              "Joining BMM has been a transformative experience. The quality of instruction and community engagement is unparalleled!"
            </p>
            <p className="font-semibold">
              – Aisha, <span className="text-gold">UK</span>
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {content.values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <FaBook className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message From the Founder */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Inspiring a Global Movement of Islamic Learning</h2>
          <div className="grid md:grid-cols-12 gap-8">
            {/* Founder's Image Column - Fixed on larger screens */}
            <div className="md:col-span-4 relative">
              <div className="md:sticky md:top-8">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={content.founder.image}
                    alt={content.founder.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-semibold text-gold">{content.founder.name}</h3>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Message Content Column */}
            <div className="md:col-span-8">
              <div className="prose max-w-none">
                <p className="mb-4">Assalamu Alaikum wa Rahmatullahi wa Barakatuh,</p>
                <p className="mb-4">
                  As a fellow student of knowledge, I understand the joys and challenges of seeking Islamic education. Like many of you, I spent countless hours learning through classical Islamic texts and benefiting from online platforms like YouTube. These resources have been incredibly valuable, but I often felt there was something missing — structure, interaction, and accountability.
                </p>
                <p className="mb-4">
                  It was during these moments of reflection that the idea for Baytul Mutun Wal Manzumaat was born. I envisioned a platform that would not only make authentic Islamic texts (matn) and poems (nazm) accessible but also offer:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>A structured learning experience with well-organized courses, tests, and certifications.</li>
                  <li>Direct access to instructors, enabling meaningful interactions and opportunities for clarification.</li>
                  <li>A supportive community of like-minded students united by their passion for Islamic knowledge.</li>
                </ul>
                <p className="mb-4">
                  Baytul Mutun Wal Manzumaat is a humble effort to bridge this gap and provide learners with an enriching, disciplined, and rewarding journey in seeking knowledge. Our platform is built with the belief that structured Islamic education empowers individuals to live more fulfilling and purposeful lives in light of divine guidance.
                </p>
                <p className="mb-4">
                  It is my hope and dua that through this platform, we can revive and spread the treasures of our Islamic heritage while helping Muslims worldwide strengthen their connection with Allah and their deen.
                </p>
                <p className="mb-4">
                  May Allah accept this effort, bless our teachers and students, and make Baytul Mutun Wal Manzumaat a means of benefit for the Ummah.
                </p>
                <p className="mb-4">Wassalamu Alaikum wa Rahmatullahi wa Barakatuh,</p>
                <p className="font-semibold">
                  {content.founder.name}<br />
                  Founder & CEO, Baytul Mutun Wal Manzumaat
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-secondary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us Today</h2>
            <p className="text-xl mb-8">
              Whether you're starting your journey in Islamic learning or looking to deepen your understanding, Baytul Mutun Wal Manzumaat is here to guide you every step of the way.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/courses">
                <button className="btn-primary bg-white text-gold hover:bg-gray-100">
                  Explore Our Courses
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="btn-secondary border-white text-white hover:bg-white/10">
                  Start Learning Today
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
