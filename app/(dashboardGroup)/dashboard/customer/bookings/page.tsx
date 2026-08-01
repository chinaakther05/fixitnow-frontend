"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyBookings } from "@/actions/booking";

interface Booking {
  id: string;
  status: string;
  scheduledDate: string;
  address: string;
  notes?: string;
  totalAmount: number;
  technician?: {
    name: string;
    email: string;
    phone?: string;
  };
  category?: {
    name: string;
  };
}


export default function BookingPage() {


  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery<Booking[]>({

    queryKey: ["my-bookings"],

    queryFn: async () => {
  const result = await getMyBookings();
  if (!result.success) throw new Error(result.message);
  return result.data;
},

  });



  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Loading bookings...
      </div>
    );
  }



  if (isError) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load bookings
      </div>
    );
  }



  return (

    <section className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>


      {
        !bookings || bookings.length === 0 ? (

          <div className="text-center py-20 text-slate-500">
            No bookings found
          </div>

        ) : (


          <div className="grid md:grid-cols-2 gap-6">


            {
              bookings.map((booking)=> (

                <div
                  key={booking.id}
                  className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm"
                >


                  <div className="flex justify-between items-center mb-4">

                    <h2 className="text-xl font-semibold">
                      {booking.category?.name || "Service"}
                    </h2>


                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                      {booking.status}
                    </span>

                  </div>



                  <p className="text-slate-600">
                    Technician:
                    <span className="font-medium ml-1">
                      {booking.technician?.name || "Not assigned"}
                    </span>
                  </p>



                  <p className="text-slate-600 mt-2">
                    Date:
                    {new Date(
                      booking.scheduledDate
                    ).toLocaleDateString()}
                  </p>



                  <p className="text-slate-600 mt-2">
                    Address:
                    {booking.address}
                  </p>



                  <p className="font-bold text-blue-600 mt-4">
                    ৳ {booking.totalAmount}
                  </p>



                </div>

              ))
            }


          </div>

        )
      }


    </section>

  );
}