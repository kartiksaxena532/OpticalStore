const stats = [
    { id: 1, name: 'New Customers every 24 hours', value: '10+' },
    { id: 2, name: 'Brands Available', value: '12+' },
    { id: 3, name: 'New Billings Annualy', value: '2200' },
  ]
  
  export default function Stats() {
    return (
      <div className="bg-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }
  