import { buttonVariants } from "@/components/ui/button";
import AppointmentTable from "@/features/sessions/components/AppointmentTable";
import AppointmentStats from "@/features/sessions/components/AppointmentStats";
import AppointmentFilters from "@/features/sessions/components/AppointmentFilters";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useState, useMemo } from "react";
import { Calendar, Plus } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import type { SessionAppointment } from "@/types/session";

// Sample data - في التطبيق الحقيقي سيتم جلب البيانات من API
const sampleAppointments: SessionAppointment[] = [
  {
    id: 1,
    sessionId: 1,
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "10:30",
    status: "available",
    currentParticipants: 0,
    notes: "جلسة تدريبية أساسية",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    sessionId: 1,
    date: "2024-01-16",
    startTime: "14:00",
    endTime: "15:30",
    status: "booked",
    currentParticipants: 2,
    bookedBy: [
      { id: 1, name: "أحمد محمد", email: "ahmed@example.com" },
      { id: 2, name: "فاطمة علي", email: "fatima@example.com" }
    ],
    notes: "جلسة متقدمة",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z"
  },
  {
    id: 3,
    sessionId: 2,
    date: "2024-01-17",
    startTime: "10:00",
    endTime: "12:00",
    status: "completed",
    currentParticipants: 5,
    bookedBy: [
      { id: 3, name: "محمد أحمد", email: "mohammed@example.com" },
      { id: 4, name: "سارة محمد", email: "sara@example.com" },
      { id: 5, name: "علي حسن", email: "ali@example.com" },
      { id: 6, name: "نور الدين", email: "nour@example.com" },
      { id: 7, name: "ليلى أحمد", email: "layla@example.com" }
    ],
    notes: "ورشة عمل جماعية",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-17T00:00:00Z"
  },
  {
    id: 4,
    sessionId: 3,
    date: "2024-01-18",
    startTime: "16:00",
    endTime: "17:00",
    status: "cancelled",
    currentParticipants: 0,
    notes: "تم إلغاء الجلسة بسبب ظروف طارئة",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z"
  },
  {
    id: 5,
    sessionId: 2,
    date: "2024-01-20",
    startTime: "11:00",
    endTime: "13:00",
    status: "available",
    currentParticipants: 0,
    notes: "جلسة تطبيقية",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 font-noto">
          <Calendar className="h-6 w-6" />
          إدارة المواعيد
        </h1>
        <p className="text-gray-600 mt-1">
          إدارة وتنظيم مواعيد الجلسات الحضورية
        </p>
      </div>
      <Link
        to={`${Routes.DASHBOARD}/${Pages.APPOINTMENTS}/new`}
        className={buttonVariants({ variant: "default" })}
      >
        <Plus className="ml-2 h-4 w-4" />
        إضافة موعد جديد
      </Link>
    </div>
  );
}

function AcademyAppointments() {
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedDate, setSelectedDate] = useState("");
  const [table, setTable] = useState<Table<SessionAppointment> | null>(null);

  const filteredAppointments = useMemo(() => {
    return sampleAppointments.filter((appointment) => {
      const matchesStatus =
        selectedStatus === "الكل" || appointment.status === selectedStatus;

      const matchesDate =
        selectedDate === "" || appointment.date === selectedDate;

      return matchesStatus && matchesDate;
    });
  }, [selectedStatus, selectedDate]);

  const handleClearFilters = () => {
    setSelectedStatus("الكل");
    setSelectedDate("");
  };

  const handleExportData = () => {
    // تصدير البيانات - يمكن تطويرها لاحقاً
    console.log("تصدير البيانات", filteredAppointments);
  };

  const handleEditAppointment = (appointment: SessionAppointment) => {
    // التوجه لصفحة التعديل
    console.log("تعديل الموعد", appointment);
  };

  const handleDeleteAppointment = (appointmentId: number) => {
    // حذف الموعد
    console.log("حذف الموعد", appointmentId);
  };

  const handleViewAppointment = (appointment: SessionAppointment) => {
    // عرض تفاصيل الموعد
    console.log("عرض الموعد", appointment);
  };

  return (
    <div className="space-y-6">
      <Header />
      
      <AppointmentStats appointments={filteredAppointments} />
      
      <div className="bg-white rounded-lg border p-6">
        <AppointmentFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onClearFilters={handleClearFilters}
          table={table}
          onExportData={handleExportData}
        />
        
        <div className="mt-6">
          <AppointmentTable
            appointments={filteredAppointments}
            onTableReady={setTable}
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
            onView={handleViewAppointment}
          />
        </div>
      </div>
    </div>
  );
}

export default AcademyAppointments;