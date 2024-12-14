'use client';

interface InstructorCardProps {
  name: string;
  expertise: string;
  bio: string;
  image: string;
}

export default function InstructorCard({ name, expertise, bio, image }: InstructorCardProps) {
  return (
    <div className="card p-6 flex flex-col">
      <div className="relative w-32 h-32 mx-auto mb-6">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
      <p className="text-gold text-center mb-4">{expertise}</p>
      <p className="text-gray-600 text-center">{bio}</p>
    </div>
  );
}
