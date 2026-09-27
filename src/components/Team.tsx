import type { TeamData } from "@/lib/types";

const demoTeam: TeamData = {
  heading: "Meet the Team",
  subheading:
    "A multidisciplinary team bringing together design thinking, technical detail, and project leadership.",
  items: [
    {
      name: "Arif Rahman",
      role: "Managing Director",
      bio: "Guides the studio's vision and client relationships, keeping every project focused on thoughtful design, quality, and long-term value.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Nadia Karim",
      role: "Lead Interior Designer",
      bio: "Shapes each space through material, proportion, light, and function, turning client ideas into warm and refined interiors.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Farhan Ahmed",
      role: "Project Manager",
      bio: "Coordinates schedules, site teams, suppliers, and execution so design decisions move smoothly from drawings to finished spaces.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Samira Hossain",
      role: "Design & Client Coordinator",
      bio: "Connects clients with the design team, organizing selections, feedback, and project details for a clear and collaborative experience.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
    },
  ],
};

export default function Team({ data }: { data: TeamData }) {
  const content = {
    ...demoTeam,
    ...data,
    items: data.items?.length ? data.items : demoTeam.items,
  };

  return (
    <section id="team" className="py-24 px-6 bg-stone-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-amber-500 text-sm uppercase tracking-[0.22em] font-medium">
            The people behind the spaces
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            {content.heading}
          </h2>
          <p className="mt-5 text-stone-400 leading-relaxed">
            {content.subheading}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {content.items?.map((member, i) => (
            <article key={i} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-stone-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={member.name ?? "Team member"}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold mt-5">{member.name}</h3>
              <p className="text-amber-500 text-sm mt-1">{member.role}</p>
              <p className="text-stone-400 text-sm leading-relaxed mt-3">
                {member.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
