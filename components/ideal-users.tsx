const users = [
  {
    title: "Everyone",
    description: "Whether you're always on the go, less familiar with technology, or want to work smarter — Mirror is for you."
  },
  {
    title: "Parents",
    description: "Hands-free control while cooking, driving, or working. Never miss a message."
  },
  {
    title: "Professionals",
    description: "Automate repetitive tasks. Focus on what matters. Work faster."
  },
  {
    title: "Anyone Busy",
    description: "Too many apps. Too many steps. Mirror does it all. One command."
  }
]

export function IdealUsersSection() {
  return (
    <section className="w-full py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-black">
          For everyone who wants their phone to work for them.
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {users.map((user, idx) => (
            <div key={idx} className="p-8 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-black mb-3">
                {user.title}
              </h3>
              <p className="text-gray-600">
                {user.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-700 text-lg">
            If you use a smartphone, Mirror was built for you.
          </p>
        </div>
      </div>
    </section>
  )
}
