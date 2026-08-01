interface BookingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingPage({
  params,
}: BookingPageProps) {
  const { id } = await params;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border p-8">
        <h1 className="text-3xl font-bold mb-2">
          Book Technician
        </h1>

        <p className="text-slate-500 mb-8">
          Complete your booking request below.
        </p>

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Technician ID
            </label>
            <input
              type="text"
              value={id}
              readOnly
              className="w-full rounded-lg border px-4 py-3 bg-slate-100 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Address
            </label>
            <textarea
              rows={4}
              placeholder="Enter your address..."
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <button className="rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Confirm Booking
          </button>
        </div>
      </div>
    </section>
  );
}