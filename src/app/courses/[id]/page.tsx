'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaClock, FaGraduationCap, FaBook, FaCertificate, FaDollarSign, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const courseData = {
  id: 1,
  title: "Foundations of Arabic Grammar (Nahw)",
  subheadline: "Master the essentials of Arabic grammar through structured lessons based on renowned classical texts.",
  description: "This course is designed to provide a solid foundation in Arabic grammar (nahw), equipping students with the tools to understand classical texts and engage with the Quran and Hadith more effectively. By the end of this course, you'll be able to construct and analyze basic Arabic sentences with confidence.",
  image: "/images/courses/arabic-grammar.svg",
  duration: "10 weeks",
  effort: "2-3 hours per week",
  level: "Beginner-friendly",
  certification: true,
  price: 50,
  learningOutcomes: [
    "Understanding the roles of nouns, verbs, and particles in Arabic sentences.",
    "Mastering sentence structures and grammatical rules.",
    "Applying nahw principles to classical Islamic texts.",
    "Enhancing comprehension of Quranic verses and Prophetic traditions."
  ],
  syllabus: [
    { week: 1, title: "Introduction to Arabic Grammar (Nahw)", expanded: false },
    { week: 2, title: "Nouns, Verbs, and Particles", expanded: false },
    { week: 3, title: "Nominal Sentences (Jumla Ismiyyah)", expanded: false },
    { week: 4, title: "Verbal Sentences (Jumla Fi'liyyah)", expanded: false },
    { week: 5, title: "Case Endings (I'raab)", expanded: false },
    { week: 6, title: "Adjectives and Conjunctions", expanded: false },
    { week: 7, title: "Prepositions and their Effects", expanded: false },
    { week: 8, title: "Practical Application with Texts", expanded: false },
    { week: 9, title: "Review and Consolidation", expanded: false },
    { week: 10, title: "Final Assessment", expanded: false }
  ],
  instructor: {
    name: "Shaykh Abdullah Al-Hassan",
    image: "/images/instructors/abdullah.svg",
    bio: "Shaykh Abdullah is a seasoned educator with over 15 years of teaching Arabic grammar to non-native speakers. His teaching methodology emphasizes clarity, practicality, and connecting grammar to Islamic texts."
  },
  reviews: [
    {
      text: "This course helped me finally understand Arabic grammar. The instructor's explanations were clear, and the examples were directly from Islamic texts.",
      author: "Fatimah",
      location: "USA"
    },
    {
      text: "I loved how the lessons built on one another. By the end, I felt confident enough to read classical Arabic texts!",
      author: "Yusuf",
      location: "UK"
    }
  ],
  howItWorks: [
    { title: "Enroll in the Course", description: "Sign up and complete your registration." },
    { title: "Start Learning", description: "Access video lessons, notes, and exercises." },
    { title: "Interact and Progress", description: "Participate in Q&A sessions and complete assignments." },
    { title: "Earn Your Certificate", description: "Pass the final assessment and receive your certification." }
  ],
  faqs: [
    {
      question: "Do I need prior knowledge of Arabic?",
      answer: "No, this course is beginner-friendly and does not require prior knowledge."
    },
    {
      question: "Is the course self-paced?",
      answer: "Yes, you can learn at your convenience."
    },
    {
      question: "What materials are provided?",
      answer: "You'll get video lessons, downloadable notes, and practice exercises."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, you can request a refund within the first 7 days of enrollment."
    }
  ]
};

export default function CourseDetailsPage() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  return (
    <main className="pb-16">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-dark to-black text-white py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-xl mb-8">{courseData.subheadline}</p>
              <div className="flex gap-4">
                <Link href="#enroll">
                  <button className="btn-primary">Enroll Now</button>
                </Link>
                <button className="btn-secondary">Preview Course</button>
              </div>
            </div>
            <div className="relative">
              <img
                src={courseData.image}
                alt={courseData.title}
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Course Overview</h2>
              <p className="text-gray-600 mb-8">{courseData.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaClock className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-gray-600">{courseData.duration}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBook className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <h3 className="font-semibold">Effort</h3>
                  <p className="text-gray-600">{courseData.effort}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaGraduationCap className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <h3 className="font-semibold">Level</h3>
                  <p className="text-gray-600">{courseData.level}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaCertificate className="w-6 h-6 mx-auto mb-2 text-gold" />
                  <h3 className="font-semibold">Certification</h3>
                  <p className="text-gray-600">Upon completion</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gold mb-2">
                  <FaDollarSign className="inline-block" />{courseData.price}
                </div>
                <p className="text-gray-600 mb-4">One-time payment</p>
                <Link href="#enroll">
                  <button className="btn-primary w-full">Enroll Now</button>
                </Link>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gold">✓</span> Lifetime access
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gold">✓</span> Course materials
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gold">✓</span> Certificate of completion
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-gold">✓</span> Q&A support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {courseData.learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="text-gold text-xl">✓</span>
                <p className="text-gray-600">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Syllabus Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Course Syllabus</h2>
            <button className="text-gold hover:underline">View Detailed Syllabus</button>
          </div>
          <div className="space-y-4">
            {courseData.syllabus.map((week) => (
              <div key={week.week} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleWeek(week.week)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gold font-semibold">Week {week.week}</span>
                    <h3 className="font-semibold">{week.title}</h3>
                  </div>
                  {expandedWeek === week.week ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedWeek === week.week && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">Detailed content for Week {week.week} will be available upon enrollment.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Meet Your Instructor</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={courseData.instructor.image}
              alt={courseData.instructor.name}
              className="w-48 h-48 rounded-full"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-4">{courseData.instructor.name}</h3>
              <p className="text-gray-600 mb-6">{courseData.instructor.bio}</p>
              <button className="btn-secondary">Contact Instructor</button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Students Are Saying</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {courseData.reviews.map((review, index) => (
              <div key={index} className="card p-6">
                <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                <p className="font-semibold">
                  – {review.author}, <span className="text-gold">{review.location}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How to Get Started</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {courseData.howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="btn-primary">Start Now</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {courseData.faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-secondary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Take the First Step in Your Journey</h2>
            <p className="text-xl mb-8">
              Embark on a rewarding journey of learning Arabic grammar and connecting with the beauty of Islamic texts. Enroll today and gain the tools to understand the language of the Quran.
            </p>
            <Link href="#enroll">
              <button className="btn-primary bg-white text-gold hover:bg-gray-100">
                Enroll Now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
