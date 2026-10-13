
const relationships = [
  {
    title: "Applications",
    description: "Track every job you have applied for.",
    icon: "📄",
    count: "128",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Companies",
    description: "Manage companies and their job openings.",
    icon: "🏢",
    count: "18",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Resumes",
    description: "Organize resumes for different roles.",
    icon: "📋",
    count: "8",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Follow-ups",
    description: "Keep track of interviews and reminders.",
    icon: "⏰",
    count: "6",
    color: "bg-red-100 text-red-600",
  },
];

export default function RelationshipExplorer() {
  return (
    <section className="space-y-5">
      {/* Section Heading */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Relationship Explorer
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Explore how your job search information connects.
        </p>
      </div>

      {/* Relationship Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {relationships.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-gray-200
            bg-white p-5 transition-all duration-200
            hover:-translate-y-1 hover:shadow-md
            dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center
                rounded-xl text-2xl ${item.color}`}
              >
                {item.icon}
              </div>

              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.count}
              </span>
            </div>

            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Relationship Flow */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5
      dark:border-gray-700 dark:bg-gray-900 sm:p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          How everything connects
        </h3>

        <div className="mt-5 flex flex-col items-stretch justify-center gap-3
        sm:flex-row sm:items-center sm:gap-2">
          {["Company", "Job", "Application", "Resume", "Follow-up"].map(
            (item, index, array) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2"
              >
                <div
                  className="w-full rounded-xl border border-orange-200
                  bg-orange-50 px-3 py-3 text-center text-sm font-medium
                  text-orange-700 dark:border-orange-900
                  dark:bg-orange-950 dark:text-orange-300 sm:w-auto"
                >
                  {item}
                </div>

                {index < array.length - 1 && (
                  <span className="text-lg text-gray-400 sm:hidden">
                    ↓
                  </span>
                )}

                {index < array.length - 1 && (
                  <span className="hidden text-lg text-gray-400 sm:block">
                    →
                  </span>
                )}
              </div>
            )
          )}
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Organize companies, connect job opportunities with applications,
          select the relevant resume, and manage follow-up reminders.
        </p>
      </div>
    </section>
  );
}
