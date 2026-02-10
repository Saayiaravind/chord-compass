export default function StatCard({ icon: Icon, label, value, gradient = 'from-primary-500 to-primary-700' }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon size={20} />
        </div>
      </div>
      <p className="font-heading text-3xl font-bold">{value}</p>
      <p className="text-sm text-white/80 mt-1">{label}</p>
    </div>
  );
}
