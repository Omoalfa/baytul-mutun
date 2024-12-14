import { FaGraduationCap, FaBook, FaGlobe, FaChartPie, FaQuestionCircle } from 'react-icons/fa';
import DonationForm from '@/components/DonationForm';

export default function DonatePage() {
  return (
    <main>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-dark to-black text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Be a Part of This Noble Mission
            </h1>
            <p className="text-xl mb-8">
              Your contributions help spread authentic Islamic knowledge to learners worldwide, preserving our heritage for generations to come.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#donate-form" className="btn-primary">
                Donate Now
              </a>
              <a href="#sponsorship" className="btn-secondary">
                Sponsor a Student
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Your Support Matters</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaGraduationCap className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Empowering Students</h3>
                  <p className="text-gray-600">Enable learners from underprivileged backgrounds to access quality Islamic education.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaBook className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Preserving Heritage</h3>
                  <p className="text-gray-600">Assist in digitizing and teaching classical texts (matn) and poetic works (nazm).</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-gold/10 rounded-lg mr-4">
                  <FaGlobe className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expanding Our Reach</h3>
                  <p className="text-gray-600">Fund technological upgrades and course development to serve more Muslims globally.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/student-reading.jpg"
                alt="Student reading Islamic text"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How You Can Contribute</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">One-Time Donation</h3>
              <p className="text-gray-600 mb-6">Make a single contribution to support a specific project or area of need.</p>
              <a href="#donate-form" className="btn-primary block text-center">Donate Once</a>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Monthly Sponsorship</h3>
              <p className="text-gray-600 mb-6">Become a regular sponsor to ensure continuous impact and progress.</p>
              <a href="#donate-form" className="btn-primary block text-center">Start Sponsoring</a>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Scholarship Fund</h3>
              <p className="text-gray-600 mb-6">Sponsor a student's learning journey to help them access courses and resources.</p>
              <a href="#sponsorship" className="btn-primary block text-center">Sponsor a Student</a>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Specific Projects</h3>
              <p className="text-gray-600 mb-6">Choose to support particular projects like developing new courses or expanding our library.</p>
              <a href="#projects" className="btn-primary block text-center">View Projects</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Impact */}
      <section id="sponsorship" className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Your Sponsorship Changes Lives</h2>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="card p-6 text-center">
              <h3 className="text-2xl font-bold text-gold mb-2">$25</h3>
              <p>Covers a single course for one student</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="text-2xl font-bold text-gold mb-2">$50</h3>
              <p>Funds one month of platform maintenance</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="text-2xl font-bold text-gold mb-2">$100</h3>
              <p>Supports digitizing and publishing a new Islamic text</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="text-2xl font-bold text-gold mb-2">$500</h3>
              <p>Provides full scholarship to a student for six months</p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-center italic text-gray-600">
              "Thanks to a sponsor, I was able to complete my foundational Arabic studies and now understand Quranic texts better. May Allah reward them!"
              <footer className="mt-4 font-semibold">– Fatimah, Ghana</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section id="donate-form" className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Donate Securely</h2>
          <div className="max-w-2xl mx-auto">
            <DonationForm />
          </div>
        </div>
      </section>

      {/* How Donations Are Used */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Transparency and Accountability</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span>Scholarships and student sponsorships</span>
                <span className="font-bold">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gold h-2.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Course creation and content development</span>
                <span className="font-bold">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gold h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Platform maintenance and upgrades</span>
                <span className="font-bold">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gold h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Administrative costs</span>
                <span className="font-bold">5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gold h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-full border-8 border-gold relative">
                {/* Pie chart segments would go here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">Can I donate anonymously?</h3>
              <p className="text-gray-600">Yes, you can choose to remain anonymous during the donation process.</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">Will I receive a receipt?</h3>
              <p className="text-gray-600">Yes, all donors will receive a receipt for their contributions via email.</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">How can I be sure my funds are used appropriately?</h3>
              <p className="text-gray-600">We are committed to transparency. Regular updates on fund allocation and impact reports are shared with our donors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Appeal */}
      <section className="py-16 bg-gradient-to-r from-gold to-gold-secondary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Every Contribution Matters</h2>
            <p className="text-xl mb-8">
              Whether it's $10 or $1,000, your support helps preserve and spread the knowledge that strengthens our faith. Together, we can make Islamic learning accessible to all.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#donate-form" className="btn-primary bg-white text-gold hover:bg-gray-100">
                Donate Now
              </a>
              <a href="/contact" className="btn-secondary border-white text-white hover:bg-white/10">
                Contact Us for More Ways to Help
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
