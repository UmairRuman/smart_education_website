// ============================================================
// FILE: src/app/page.tsx - FIXED WITH PROPER TYPES
// ============================================================
import Link from 'next/link';
import { BookOpen, Users, Award, ChevronRight, Globe, Sparkles } from 'lucide-react';

// Properly typed helper components
type ColorType = 'blue' | 'purple' | 'pink';

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: ColorType;
}

function StatCard({ icon, number, label, color }: StatCardProps) {
  const colorClasses: Record<ColorType, string> = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
  };

  return (
    <div className="text-center">
      <div className={`${colorClasses[color]} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-gray-900 mb-2">{number}</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Taleem AI</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/learn" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Start Learning
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">AI-Powered Adaptive Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Master Set Theory
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                Grades 6-8
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Learn mathematics through an adaptive, AI-powered platform designed for Pakistani students. 
              <span className="block mt-2 font-semibold text-gray-800">Available in English and Urdu</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/learn"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Learning Free
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/learn"
                className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 transition-all hover:scale-105"
              >
                View All Concepts
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <StatCard 
              icon={<BookOpen className="w-8 h-8" />}
              number="10+"
              label="Interactive Concepts"
              color="blue"
            />
            <StatCard 
              icon={<Users className="w-8 h-8" />}
              number="3"
              label="Grade Levels"
              color="purple"
            />
            <StatCard 
              icon={<Award className="w-8 h-8" />}
              number="2"
              label="Languages"
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Taleem AI?
            </h2>
            <p className="text-xl text-gray-600">
              Designed for Pakistani students with pedagogy-first approach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🎯"
              title="Adaptive Learning Paths"
              description="AI algorithms adjust content difficulty based on your performance and learning style"
            />
            <FeatureCard 
              icon="🌍"
              title="Bilingual Support"
              description="Seamlessly switch between English and Urdu with expert-translated content"
            />
            <FeatureCard 
              icon="📊"
              title="Progress Tracking"
              description="Monitor your learning journey with detailed analytics and insights"
            />
            <FeatureCard 
              icon="✨"
              title="Interactive Quizzes"
              description="Practice with engaging quizzes after each concept to reinforce learning"
            />
            <FeatureCard 
              icon="🏆"
              title="Structured Curriculum"
              description="Follow a carefully designed learning progression from Grade 6 to 8"
            />
            <FeatureCard 
              icon="💡"
              title="Concept Mastery"
              description="Focus on understanding over memorization with clear explanations"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join students across Pakistan mastering Set Theory with Taleem AI
          </p>
          <Link 
            href="/learn"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
          >
            Get Started Now
            <ChevronRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Taleem AI</span>
            </div>
            <p className="text-sm mb-4">
              Empowering Pakistani students through adaptive AI learning
            </p>
            <p className="text-xs">
              © 2024 Taleem AI. Built for AITechathon Pakistan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}