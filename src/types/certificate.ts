// Course Certificate - شهادة مرتبطة بدورة
export interface CourseCertificate {
  id: string;
  courseName: string;
  courseId: string;
  certificateTemplate: string;
  issuedCount: number; // عدد الشهادات المصدرة
  totalStudents: number; // إجمالي الطلاب المسجلين
  completionRate: number; // نسبة الإنجاز
  averageGrade: number;
  createdDate: string;
  lastIssued?: string;
  status: "active" | "inactive" | "draft";
  certificateType: "completion" | "achievement" | "participation";
  validityPeriod: number; // بالأشهر
  requirements: {
    minGrade: number;
    attendanceRequired: number; // نسبة الحضور المطلوبة
    assignmentsCompleted: boolean;
  };
}

// Student Certificate - شهادة طالب محدد
export interface StudentCertificate {
  id: string;
  studentName: string;
  studentEmail: string;
  courseCertificateId: string;
  courseName: string;
  completionDate: string;
  issueDate: string;
  certificateNumber: string;
  grade: string;
  gradeValue: number;
  status: "issued" | "pending" | "revoked" | "expired";
  downloadCount: number;
  validUntil?: string;
  qrCodeUrl: string;
  pdfUrl: string;
  lastAccessed?: string;
  attendanceRate: number;
  assignmentsScore: number;
}

// Certificate Statistics
export interface CertificateStats {
  totalCourses: number; // إجمالي الدورات التي لها شهادات
  totalIssued: number; // إجمالي الشهادات المصدرة
  pendingApproval: number; // في انتظار الموافقة
  averageCompletionRate: number; // متوسط نسبة الإنجاز
}