
import RelationshipExplorer from "../components/RelationshipExplorer";

const stats = [
  {
    label: "Total Applications",
    value: "128",
    change: "+12 this week",
    icon: "↗",
    color: "bg-orange-100 text-orange-600",
  },
  {
    label: "Active Jobs",
    value: "42",
    change: "Across 18 companies",
    icon: "▤",
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Resumes",
    value: "8",
    change: "3 versions updated",
    icon: "▧",
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Follow-ups Due",
    value: "6",
    change: "Requires attention",
    icon: "◷",
    color: "bg-red-100 text-red-600",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <section
        className="rounded-3xl bg-gradient-to-r
        from-orange-500 via-orange-500 to-red-600
        p-6 text-white shadow-lg sm:p-9"
      >
        <p className="text-sm font-semibold tracking-wider text-orange-100">
          YOUR JOB SEARCH WORKSPACE
        </p>

        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          Your career, organized.
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-orange-50 sm:text-base">
          Track applications, manage resumes, organize company
          contacts, and stay on top of every follow-up.
        </p>
      </section>

      {/* Statistics Cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Your overview
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              A quick look at your job search progress.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-200
              bg-white p-5 shadow-sm transition-all duration-200
              hover:-translate-y-1 hover:shadow-md
              dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.label}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center
                  rounded-xl text-2xl ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {item.change}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Relationships */}
      <RelationshipExplorer />
    </div>
  );
}
