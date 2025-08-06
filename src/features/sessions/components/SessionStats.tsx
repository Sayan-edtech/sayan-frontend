import { Calendar, Users, Clock, DollarSign, TrendingUp } from "lucide-react";

interface Session {
  id: number;
  title: string;
  type: string;
  duration: number;
  price: number;
  instructor: string;
  date: string;
  time: string;
  status: 'available' | 'booked' | 'completed';
  maxParticipants: number;
  currentParticipants: number;
  category: string;
}

interface SessionStatsProps {
  sessions: Session[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

function SessionStats({ sessions }: SessionStatsProps) {
  const totalSessions = sessions.length;
  const availableSessions = sessions.filter(session => session.status === 'available').length;
  const totalParticipants = sessions.reduce(
    (sum, session) => sum + session.currentParticipants,
    0
  );
  const totalRevenue = sessions
    .filter(session => session.status === 'completed')
    .reduce(
      (sum, session) => sum + session.price * session.currentParticipants,
      0
    );

  const stats = [
    {
      title: "إجمالي الجلسات",
      value: totalSessions,
      icon: <Calendar className="w-8 h-8" />,
      change: "+5 جلسات جديدة",
      changeType: "positive" as const,
    },
    {
      title: "الجلسات المتاحة",
      value: availableSessions,
      icon: <Clock className="w-8 h-8" />,
      change: "متاح للحجز",
      changeType: "positive" as const,
    },
    {
      title: "إجمالي المشاركين",
      value: totalParticipants.toLocaleString(),
      icon: <Users className="w-8 h-8" />,
      change: "+15% من الشهر الماضي",
      changeType: "positive" as const,
    },
    {
      title: "إجمالي الإيرادات",
      value: `${totalRevenue.toLocaleString()} ر.س`,
      icon: <DollarSign className="w-8 h-8" />,
      change: "+22% من الشهر الماضي",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </div>
  );
}

export default SessionStats;