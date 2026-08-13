import React from "react";
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  SendHorizonal,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+880 1700-000000",
      subText: "Mon-Fri from 8am to 8pm",
    },
    {
      icon: Mail,
      title: "Email",
      details: "support@fixitnow.com",
      subText: "Online support 24/7",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "Dhaka, Bangladesh",
      subText: "Visit our main office",
    },
    {
      icon: Clock3,
      title: "Support Hours",
      details: "Sat - Thu",
      subText: "9:00 AM - 8:00 PM",
    },
  ];

  const features = [
    "Quick Response Time",
    "24/7 Dedicated Customer Support",
    "Verified & Trained Technicians",
    "100% Secure Booking & Payments",
  ];

  const faqs = [
    {
      q: "How do I book a technician?",
      a: "Browse services, choose your required service, select your preferred time slot, and confirm your booking instantly.",
    },
    {
      q: "Is online payment available?",
      a: "Yes. You can pay securely using Stripe or SSLCommerz card/mobile banking after your booking is confirmed.",
    },
    {
      q: "Can I cancel or reschedule my booking?",
      a: "Yes, bookings can be cancelled or rescheduled easily through your account dashboard before the technician starts the job.",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-slate-50 to-slate-50 dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
            Get In Touch
          </span>

          <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            We&apos;re Here to{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Help You
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            Have questions or need assistance with your home service? Our team is always ready to support you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Contact Info Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-bold text-base text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm mt-1">
                  {item.details}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {item.subText}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1.5">
                Send Us a Message
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-6">
                Fill out the form below and we will get back to you within 24 hours.
              </p>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your details message here..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] px-8 py-3 text-white font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer"
                >
                  <SendHorizonal size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right Support Info */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Why Contact FixItNow?
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                Whether you need help booking a technician, tracking your service request, making a payment, or becoming a service provider, our support team is available to assist you.
              </p>

              <div className="space-y-3.5">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Need urgent technical assistance? Call our direct hotline for priority support.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" /> Got Questions?
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;