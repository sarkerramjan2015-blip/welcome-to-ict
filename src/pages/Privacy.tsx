import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-950 dark:bg-slate-950 dark:text-white sm:px-6 md:px-16">
      <Helmet>
        <title>Privacy Policy | ICT Toppers</title>
        <meta
          name="description"
          content="Read how ICT Toppers handles student account data, practice progress, contact messages, and payment-related information."
        />
        <link rel="canonical" href="https://icttoppers.com/privacy" />
      </Helmet>

      <main className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-sky-700 shadow-sm transition hover:bg-sky-50 dark:bg-white/10 dark:text-sky-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/5 dark:border-white/10 dark:bg-white/10 md:p-10">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-200">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
            ICT Toppers student account, practice progress, feedback, and payment-related information responsibly
            handle করার চেষ্টা করে. এই policy সাধারণ ব্যবহারকারীর জন্য সহজ ভাষায় লেখা.
          </p>

          <div className="mt-10 space-y-8">
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-2xl font-black">
                <Lock className="h-5 w-5 text-sky-600" /> What we collect
              </h2>
              <p className="text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
                Login করলে Google account name, email, profile image, study progress, quiz result, saved tasks,
                enrollment status, and profile information store হতে পারে. Feedback form ব্যবহার করলে আপনার লেখা
                WhatsApp message হিসেবে পাঠানো হয়.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black">How we use it</h2>
              <p className="text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
                এই তথ্য student dashboard, progress tracking, quiz history, premium access, payment status, and support
                experience চালাতে ব্যবহার করা হয়. We do not sell student personal data.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-black">Payments and third-party services</h2>
              <p className="text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
                Payment checkout, Firebase authentication, analytics, and communication tools may process limited data
                according to their own policies. Payment credentials are not stored in the frontend app.
              </p>
            </section>

            <section>
              <h2 className="mb-3 flex items-center gap-2 text-2xl font-black">
                <Mail className="h-5 w-5 text-sky-600" /> Contact
              </h2>
              <p className="text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
                Privacy-related questions পাঠাতে পারেন:{' '}
                <a className="font-black text-sky-700 dark:text-sky-300" href="mailto:sarkerramjan2015@gmail.com">
                  sarkerramjan2015@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
