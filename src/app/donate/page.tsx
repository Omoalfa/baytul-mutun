'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, GraduationCap, Globe, PieChart, HeartHandshake, Users, Building2, Wallet, CalendarClock, School, Lightbulb } from 'lucide-react'
import DonationForm from '@/components/DonationForm'
import CallToAction from '@/components/CallToAction'
import Image from 'next/image'

const features = [
  {
    icon: GraduationCap,
    title: 'Empowering Students',
    description: 'Enable learners from underprivileged backgrounds to access quality Islamic education.',
  },
  {
    icon: BookOpen,
    title: 'Preserving Heritage',
    description: 'Assist in digitizing and teaching classical texts (matn) and poetic works (nazm).',
  },
  {
    icon: Globe,
    title: 'Expanding Our Reach',
    description: 'Fund technological upgrades and course development to serve more Muslims globally.',
  },
]

const donationOptions = [
  {
    icon: Wallet,
    title: 'One-Time Donation',
    description: 'Make a single contribution to support a specific project or area of need.',
    buttonText: 'Donate Once',
    link: '#donate-form'
  },
  {
    icon: CalendarClock,
    title: 'Monthly Sponsorship',
    description: 'Become a regular sponsor to ensure continuous impact and progress.',
    buttonText: 'Start Sponsoring',
    link: '#sponsorship'
  },
  {
    icon: School,
    title: 'Scholarship Fund',
    description: "Sponsor a student's learning journey to help them access courses and resources.",
    buttonText: 'Sponsor a Student',
    link: '#sponsorship'
  },
  {
    icon: Lightbulb,
    title: 'Specific Projects',
    description: 'Choose to support particular projects like developing new courses, improving technology, or expanding our library.',
    buttonText: 'View Projects',
    link: '#projects'
  }
]

const sponsorshipLevels = [
  {
    amount: 25,
    description: 'Covers a single course for one student'
  },
  {
    amount: 50,
    description: 'Funds one month of platform maintenance'
  },
  {
    amount: 100,
    description: 'Supports digitizing and publishing a new Islamic text'
  },
  {
    amount: 500,
    description: 'Provides full scholarship to a student for six months'
  }
]

const fundAllocation = [
  {
    percentage: 50,
    label: 'Scholarships and student sponsorships'
  },
  {
    percentage: 30,
    label: 'Course creation and content development'
  },
  {
    percentage: 15,
    label: 'Platform maintenance and upgrades'
  },
  {
    percentage: 5,
    label: 'Administrative costs'
  }
]

const faqs = [
  {
    question: 'Can I donate anonymously?',
    answer: 'Yes, you can choose to remain anonymous during the donation process.'
  },
  {
    question: 'Will I receive a receipt?',
    answer: 'Yes, all donors will receive a receipt for their contributions via email.'
  },
  {
    question: 'How can I be sure my funds are used appropriately?',
    answer: 'We are committed to transparency. Regular updates on fund allocation and impact reports are shared with our donors.'
  }
]

export default function DonatePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-green-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Be a Part of This Noble Mission
            </h1>
            <p className="text-xl opacity-90">
              Your contributions help spread authentic Islamic knowledge to learners worldwide,
              preserving our heritage for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" asChild>
                <a href="#donate-form">Donate Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#sponsorship">Sponsor a Student</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Your Support Matters</h2>
            <p className="text-muted-foreground mt-2">
              Your donation makes a real difference in spreading Islamic knowledge
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-none shadow-none">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How You Can Contribute</h2>
            <p className="text-muted-foreground mt-2">Choose the way that works best for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationOptions.map((option) => {
              const Icon = option.icon
              return (
                <Card key={option.title}>
                  <CardHeader>
                    <div className="p-2 bg-primary/10 rounded-lg w-fit">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <a href={option.link}>{option.buttonText}</a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sponsorship Impact */}
      <section id="sponsorship" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Your Sponsorship Changes Lives</h2>
            <p className="text-muted-foreground mt-2">See how your contributions make a difference</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sponsorshipLevels.map((level) => (
              <Card key={level.amount}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">${level.amount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <blockquote className="text-lg italic text-center">
                  "Thanks to a sponsor, I was able to complete my foundational Arabic studies and now understand Quranic texts better. May Allah reward them!"
                  <footer className="text-right mt-4 text-muted-foreground">– Fatimah, Ghana</footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donate-form" className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Donate Securely</h2>
              <p className="text-muted-foreground mt-2">
                Your generosity helps us continue our mission
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <DonationForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Transparency and Accountability</h2>
            <p className="text-muted-foreground mt-2">How your donations are used</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {fundAllocation.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-20 text-right font-bold">{item.percentage}%</div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CallToAction 
        title="Every Contribution Matters"
        description="Whether it's $10 or $1,000, your support helps preserve and spread the knowledge that strengthens our faith. Together, we can make Islamic learning accessible to all."
        primaryButtonText="Donate Now"
        secondaryButtonText="Contact Us for More Ways to Help"
        primaryButtonLink="#donate-form"
        secondaryButtonLink="/contact"
      />
    </main>
  )
}
