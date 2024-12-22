import Link from 'next/link';
import { FaBook, FaGraduationCap, FaUsers, FaChalkboardTeacher, FaClock, FaGlobe } from 'react-icons/fa';
import CourseCard from '@/components/CourseCard';
import CallToAction from '@/components/CallToAction';

const featuredCourses = [
  {
    id: 1,
    title: "Matn Al-Ajurrumiyyah",
    description: "Learn the fundamentals of Arabic grammar through this classical text",
    instructor: "Sheikh Abdullah Muhammad",
    level: "Beginner",
    duration: "12 weeks",
    category: "Arabic Grammar",
    image: "/images/courses/arabic-grammar.jpg"
  },
  {
    id: 2,
    title: "Alfiyyah Ibn Malik",
    description: "Master Arabic grammar through this comprehensive poetic text",
    instructor: "Dr. Ahmad Hassan",
    level: "Advanced",
    duration: "24 weeks",
    category: "Arabic Grammar",
    image: "/images/courses/alfiyyah.jpg"
  },
  {
    id: 3,
    title: "Matn Abu Shuja",
    description: "Study Shafi'i fiqh through this concise classical text",
    instructor: "Sheikh Ibrahim Ali",
    level: "Intermediate",
    duration: "16 weeks",
    category: "Islamic Law",
    image: "/images/courses/fiqh.jpg"
  }
];

const testimonials = [
  {
    name: "Ahmad Abdullah",
    role: "Student",
    image: "/images/testimonials/student1.jpg",
    quote: "The platform has made learning classical texts accessible and engaging. The teachers are knowledgeable and supportive."
  },
  {
    name: "Fatima Hassan",
    role: "Parent",
    image: "/images/testimonials/parent1.jpg",
    quote: "My children have benefited immensely from the courses. The structured curriculum and interactive learning approach is excellent."
  },
  {
    name: "Dr. Mohammed Ali",
    role: "Islamic Scholar",
    image: "/images/testimonials/scholar1.jpg",
    quote: "An excellent initiative that combines traditional learning methods with modern technology. The quality of education is outstanding."
  }
];

const howItWorks = [
  {
    icon: <FaBook className="w-12 h-12 text-gold" />,
    title: "Choose Your Course",
    description: "Browse our collection of classical texts and select the course that matches your level and interests."
  },
  {
    icon: <FaGraduationCap className="w-12 h-12 text-gold" />,
    title: "Learn at Your Pace",
    description: "Access course materials, video lectures, and assignments anytime, anywhere. Study at your own convenience."
  },
  {
    icon: <FaChalkboardTeacher className="w-12 h-12 text-gold" />,
    title: "Expert Guidance",
    description: "Receive personalized feedback and guidance from qualified scholars throughout your learning journey."
  },
  {
    icon: <FaUsers className="w-12 h-12 text-gold" />,
    title: "Join the Community",
    description: "Connect with fellow students, participate in discussions, and attend live sessions with teachers."
  }
];

export default function Home() {
  console.log("where did you run!")
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center min-h-[70vh] flex items-center" style={{
            backgroundImage: "url('/images/hero.jpeg')"
          }}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-dark/90 to-black/90"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 text-white">
                Learn Classical Islamic Texts Online
              </h1>
              <p className="text-xl mb-8 text-white">
                Access authentic Islamic knowledge from qualified scholars through our comprehensive online platform.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/courses">
                  <button className="btn-primary">Browse Courses</button>
                </Link>
                <Link href="/about">
                  <button className="btn-secondary">Learn More</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaBook className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Resources</h3>
                  <p className="text-gray-600">Access to classical Islamic texts and their explanations.</p>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaChalkboardTeacher className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                  <p className="text-gray-600">Learn from scholars and teachers with expertise in various Islamic sciences.</p>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaClock className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
                  <p className="text-gray-600">Study at your own pace, anytime and anywhere.</p>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaGraduationCap className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Structured Courses</h3>
                  <p className="text-gray-600">Courses designed for beginners, intermediates, and advanced learners.</p>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaUsers className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Focused</h3>
                  <p className="text-gray-600">Engage with a global community of learners dedicated to Islamic knowledge.</p>
                </div>
              </div>
            </div>

            <div className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaGlobe className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                  <p className="text-gray-600">Join students from around the world in their pursuit of Islamic knowledge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Courses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courses">
              <button className="btn-primary">View All Courses</button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate/Sponsorship */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-secondary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
            <p className="text-xl mb-8">
              Help us make authentic Islamic knowledge accessible to students worldwide. Your contribution makes a difference.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">$25/month</h3>
                <p>Support one student's education</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">$50/month</h3>
                <p>Fund course development</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">$100/month</h3>
                <p>Sponsor a teacher</p>
              </div>
            </div>
            <Link href="/donate">
              <button className="btn-primary bg-white text-gold hover:bg-gray-100">
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
