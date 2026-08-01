import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  SendHorizonal,
} from "lucide-react";

const ContactPage = () => {
  return (
    <section className="bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-100">
            Have questions or need assistance? Our team is always
            ready to help you with your home service needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">

        {/* Contact Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
            <Phone className="text-cyan-600 mb-4" size={34} />
            <h3 className="font-bold text-lg">Phone</h3>
            <p className="text-slate-600 mt-2">
              +880 1700-000000
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
            <Mail className="text-cyan-600 mb-4" size={34} />
            <h3 className="font-bold text-lg">Email</h3>
            <p className="text-slate-600 mt-2">
              support@fixitnow.com
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
            <MapPin className="text-cyan-600 mb-4" size={34} />
            <h3 className="font-bold text-lg">Address</h3>
            <p className="text-slate-600 mt-2">
              Dhaka, Bangladesh
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
            <Clock3 className="text-cyan-600 mb-4" size={34} />
            <h3 className="font-bold text-lg">Support Hours</h3>
            <p className="text-slate-600 mt-2">
              Sat - Thu <br />
              9:00 AM - 8:00 PM
            </p>
          </div>

        </div>

        {/* Form + Info */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="rounded-2xl bg-white p-8 shadow">

            <h2 className="text-3xl font-bold mb-6">
              Send us a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border p-3 outline-cyan-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border p-3 outline-cyan-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-lg border p-3 outline-cyan-500"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-lg border p-3 outline-cyan-500"
              />

              <button
                className="flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 text-white font-semibold hover:bg-cyan-700 transition"
              >
                <SendHorizonal size={18} />
                Send Message
              </button>

            </form>

          </div>

          {/* Right Side */}
          <div>

            <div className="rounded-2xl bg-white p-8 shadow">

              <h2 className="text-3xl font-bold mb-5">
                Why Contact FixItNow?
              </h2>

              <p className="text-slate-600 leading-8">
                Whether you need help booking a technician,
                tracking your service request, making a payment,
                or becoming a service provider, our support team
                is always here to assist you.
              </p>

              <div className="mt-8 space-y-4">

                <div className="rounded-xl bg-slate-100 p-4">
                  ✅ Quick Response
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  ✅ 24/7 Customer Support
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  ✅ Verified Technicians
                </div>

                <div className="rounded-xl bg-slate-100 p-4">
                  ✅ Secure Booking System
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* FAQ */}

        <div className="mt-24">

          <h2 className="text-4xl font-bold text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-5">

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="font-semibold">
                How do I book a technician?
              </h3>

              <p className="text-slate-600 mt-2">
                Browse services, choose a technician,
                select your preferred time slot,
                and confirm your booking.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="font-semibold">
                Is online payment available?
              </h3>

              <p className="text-slate-600 mt-2">
                Yes. You can pay securely using Stripe or
                SSLCommerz after your booking is accepted.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow">
              <h3 className="font-semibold">
                Can I cancel my booking?
              </h3>

              <p className="text-slate-600 mt-2">
                Yes. Bookings can be cancelled before
                the technician starts the job.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactPage;