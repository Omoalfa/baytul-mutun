import { Button } from '@/components/ui/button'
import { BookOpen, Globe, GraduationCap, Users, Star, Heart, Lightbulb, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import CallToAction from '@/components/CallToAction'

// Placeholder data
const content = {
  mission: 'At Baytul Mutun Wal Manzumaat (BMM), our mission is to preserve and propagate the rich heritage of Islamic scholarship by making foundational texts (matn) and poetic compositions (nazm) accessible to Muslims across the globe. We aim to nurture understanding, strengthen faith, and inspire practice through structured learning.',
  vision: 'We envision a world where every Muslim has the opportunity to access authentic Islamic knowledge, rooted in tradition and adapted to modern needs. Through Baytul Mutun Wal Manzumaat, we strive to build a global community of learners passionate about their deen.',
  story: 'Baytul Mutun Wal Manzumaat was founded with a passion for preserving Islamic scholarship and ensuring that the treasures of our heritage are accessible to all. Recognizing the need for a platform dedicated to the study of matn and nazm, we created BMM as a hub for learning, connecting, and growing in Islamic knowledge.',
  founder: {
    name: 'AbdulQuadri Sanni Olayinka',
    message: 'Assalamu Alaikum wa Rahmatullahi wa Barakatuh, As a fellow student of knowledge, I understand the joys and challenges of seeking Islamic education. Like many of you, I spent countless hours learning through classical Islamic texts and benefiting from online platforms like YouTube. These resources have been incredibly valuable, but I often felt there was something missing — structure, interaction, and accountability.',
    image: '/images/founder.jpg',
  },
  team: [
    {
      id: '1',
      name: 'Dr. Ahmad Al-Hassan',
      role: 'Academic Director',
      image: '/images/instructors/abdullah.jpg',
      bio: 'With over 20 years of experience in Islamic education, Dr. Ahmad leads our academic initiatives.',
    },
    {
      id: '2',
      name: 'Ustadha Sarah Ahmad',
      role: 'Lead Instructor',
      image: '/images/instructors/aisha.jpg',
      bio: 'A specialist in Arabic language and Islamic studies, Ustadha Sarah develops our core curriculum.',
    },
    {
      id: '3',
      name: 'Br. Yusuf Rahman',
      role: 'Community Manager',
      image: '/images/instructors/ahmed.jpg',
      bio: 'Dedicated to fostering meaningful connections within our learning community.',
    },
  ],
  values: [
    {
      icon: Star,
      title: 'Authenticity',
      description: 'Staying true to classical Islamic teachings.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making knowledge available to all, regardless of location or financial status.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Fostering a sense of belonging and mutual growth.',
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Providing high-quality content and resources.',
    },
  ],
  stats: [
    {
      icon: BookOpen,
      value: '100+',
      label: 'Courses',
    },
    {
      icon: Users,
      value: '10,000+',
      label: 'Students',
    },
    {
      icon: Globe,
      value: '50+',
      label: 'Countries',
    },
    {
      icon: GraduationCap,
      value: '95%',
      label: 'Completion Rate',
    },
  ],
  mission_image: '/images/mission.jpg',
  story_image: '/images/story.jpg',
}

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center min-h-[70vh] flex items-center" style={{
            backgroundImage: "url('/images/hero_image.jpeg')"
          }}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-dark/90 to-black/90"></div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold">About Baytul Mutun</h1>
            <p className="text-xl opacity-90">{content.vision}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/courses">
                <button className='btn-primary'>Browse Courses</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="p-6 bg-white rounded-lg shadow-sm">
                  <Icon className="w-4 h-4 text-muted-foreground mb-2" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content.mission}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Makes Us Unique?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-gray-600">Our courses focus on classical Islamic texts and their explanations by qualified instructors.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diversity</h3>
              <p className="text-gray-600">Covering subjects like fiqh, aqeedah, nahw, and sarf, as well as poetic compositions in Islamic sciences.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">Learn at your own pace, from anywhere in the world.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join a vibrant community of learners and scholars.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/courses">
              <button className="btn-primary">Browse Our Courses</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It All Began</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
              {content.story_image ? (
                <Image
                  src={content.story_image}
                  alt="Our Journey"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                {content.story}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">The People Behind BMM</h2>
            <p className="text-gray-600 mt-4">
              Our team comprises scholars, educators, and professionals dedicated to spreading Islamic knowledge. Each member brings their unique expertise to create a comprehensive and enriching learning experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {content.team.map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gray-100">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from Founder */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Inspiring a Global Movement of Islamic Learning</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="sticky top-24">
              <div className="max-w-[300px] mx-auto">
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-gray-100">
                  {content.founder.image ? (
                    <Image
                      src={content.founder.image}
                      alt={content.founder.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="text-center mt-6">
                  <p className="text-xl font-semibold">{content.founder.name}</p>
                  <p className="text-gray-600">Founder, Baytul Mutun Wal Manzumaat</p>
                </div>
              </div>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">Assalamu Alaikum wa Rahmatullahi wa Barakatuh,</p>
              <p className="text-gray-700 mb-4">{content.founder.message}</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>A structured learning experience with well-organized courses, tests, and certifications.</li>
                <li>Direct access to instructors, enabling meaningful interactions and opportunities for clarification.</li>
                <li>A supportive community of like-minded students united by their passion for Islamic knowledge.</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Baytul Mutun Wal Manzumaat is a humble effort to bridge this gap and provide learners with an enriching, disciplined, and rewarding journey in seeking knowledge. Our platform is built with the belief that structured Islamic education empowers individuals to live more fulfilling and purposeful lives in light of divine guidance.
              </p>
              <p className="text-gray-700 mb-4">
                It is my hope and dua that through this platform, we can revive and spread the treasures of our Islamic heritage while helping Muslims worldwide strengthen their connection with Allah and their deen.
              </p>
              <p className="text-gray-700 mb-4">
                May Allah accept this effort, bless our teachers and students, and make Baytul Mutun Wal Manzumaat a means of benefit for the Ummah.
              </p>
              <p className="text-gray-700">Wassalamu Alaikum wa Rahmatullahi wa Barakatuh,</p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction 
        title="Join Us Today"
        description="Whether you're starting your journey in Islamic learning or looking to deepen your understanding, Baytul Mutun Wal Manzumaat is here to guide you every step of the way."
        primaryButtonText="Explore Our Courses"
        secondaryButtonText="Start Learning Today"
        primaryButtonLink="/courses"
        secondaryButtonLink="/register"
      />
    </main>
  )
}
