import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Briefcase } from "lucide-react";
import { Technician } from "@/types/technician";

export default function TechnicianCard({
  tech,
}: {
  tech: Technician;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Cover Image */}
      <div className="relative h-52 w-full">
        <Image
          src={tech.user?.profileImage || "/images/default-user.jpg"}
          alt={tech.user?.name || "Technician"}
          fill
          className="object-cover"
        />

        <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
          Available
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4">
          <Image
            src={tech.user?.profileImage || "/images/default-user.jpg"}
            alt={tech.user?.name || ""}
            width={60}
            height={60}
            className="rounded-full border-4 border-white shadow-md"
          />

          <div>
            <h2 className="text-xl font-bold">
              {tech.user?.name}
            </h2>

            <p className="text-sm text-gray-500">
              {tech.skills?.[0]}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={18} fill="currentColor" />
            <span className="font-semibold">
              {tech.avgRating || 0}
            </span>
            <span className="text-gray-400 text-sm">
              ({tech.totalReviews || 0})
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-500">
            <Briefcase size={16} />
            <span>{tech.experience} Years</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-500">
          <MapPin size={18} />
          <span>{tech.user?.address || "Bangladesh"}</span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm text-gray-600">
          {tech.bio}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">
              Starting From
            </p>

            <h3 className="text-2xl font-bold text-emerald-600">
              ৳ {tech.hourlyRate}
            </h3>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href={`/technicians/${tech.id}`}
            className="rounded-xl border border-emerald-600 py-3 text-center font-semibold text-emerald-600 transition hover:bg-emerald-50"
          >
            View Profile
          </Link>

          <Link
            href={`/booking/${tech.id}`}
            className="rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}