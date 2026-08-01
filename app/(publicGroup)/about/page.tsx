import { Award, CheckCircle, ShieldCheck, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <section className="bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
            About FixItNow
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold">
            Your Trusted Home Service Platform
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-100">
            FixItNow connects customers with skilled and verified professionals
            for reliable home services. From plumbing and electrical work to AC
            repair and home cleaning, we make booking trusted technicians simple,
            fast, and hassle-free.
          </p>
        </div>
      </div>

      {/* About */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <img
              src="https://i.ibb.co/JW6R3Jx/about-home-service.jpg"
              alt="About FixItNow"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>

          <div>
            <p className="text-cyan-600 font-semibold uppercase tracking-wider">
              Who We Are
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              Making Home Services Easy & Reliable
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              Our goal is to simplify home maintenance by connecting customers
              with trusted technicians. Whether you need urgent repairs or
              regular maintenance, FixItNow ensures quality service, transparent
              pricing, and a smooth booking experience.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-600" />
                <p>Verified & Experienced Professionals</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-600" />
                <p>Affordable & Transparent Pricing</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-600" />
                <p>Fast Booking & Secure Payments</p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-600" />
                <p>Customer Satisfaction Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-8 shadow">
            <Users className="text-cyan-600" size={40} />
            <h3 className="mt-4 text-3xl font-bold">10K+</h3>
            <p className="text-slate-600 mt-2">Happy Customers</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <Award className="text-cyan-600" size={40} />
            <h3 className="mt-4 text-3xl font-bold">500+</h3>
            <p className="text-slate-600 mt-2">Expert Technicians</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <ShieldCheck className="text-cyan-600" size={40} />
            <h3 className="mt-4 text-3xl font-bold">100%</h3>
            <p className="text-slate-600 mt-2">Verified Professionals</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <CheckCircle className="text-cyan-600" size={40} />
            <h3 className="mt-4 text-3xl font-bold">4.9★</h3>
            <p className="text-slate-600 mt-2">Average Customer Rating</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-cyan-600 p-8 text-white">
            <h3 className="text-2xl font-bold">Our Mission</h3>

            <p className="mt-4 leading-8 text-cyan-100">
              To provide every customer with quick access to trusted home
              service professionals through an easy-to-use digital platform.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-8 text-white">
            <h3 className="text-2xl font-bold">Our Vision</h3>

            <p className="mt-4 leading-8 text-slate-300">
              To become the most trusted home service marketplace where
              customers and professionals connect safely, efficiently, and
              confidently.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-12 text-center text-white">
          <h2 className="text-4xl font-bold">
            Ready to Book a Trusted Technician?
          </h2>

          <p className="mt-4 text-slate-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust FixItNow for fast,
            reliable, and professional home services.
          </p>

          <button className="mt-8 rounded-xl bg-white px-8 py-3 font-semibold text-cyan-700 transition hover:bg-slate-100">
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;