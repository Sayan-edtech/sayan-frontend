import { useState } from "react";
import { Award, Download, Search, Filter, Plus, Eye, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  issuedDate: string;
  certificateNumber: string;
  status: 'active' | 'revoked';
  downloadUrl?: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    studentName: "أحمد محمد علي",
    courseName: "تطوير التطبيقات باستخدام React",
    issuedDate: "2024-01-15",
    certificateNumber: "CERT-2024-001",
    status: "active",
    downloadUrl: "/certificates/cert-001.pdf"
  },
  {
    id: "2", 
    studentName: "فاطمة حسن",
    courseName: "أساسيات الذكاء الاصطناعي",
    issuedDate: "2024-01-20",
    certificateNumber: "CERT-2024-002",
    status: "active",
    downloadUrl: "/certificates/cert-002.pdf"
  }
];

export default function CertificatesPage() {
  const [certificates] = useState<Certificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificates = certificates.filter(cert =>
    cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Award}
        title="الشهادات"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-noto">
              <Filter className="w-4 h-4 mr-2" />
              فلترة
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 font-noto">
              <Plus className="w-4 h-4 mr-2" />
              إصدار شهادة
            </Button>
          </div>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Award className="w-4 h-4" />
              إجمالي الشهادات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{certificates.length}</div>
            <p className="text-xs text-gray-500 mt-1">+12% عن الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Download className="w-4 h-4" />
              تم تحميلها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {certificates.filter(c => c.downloadUrl).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">85% من الإجمالي</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <User className="w-4 h-4" />
              الطلاب النشطون
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {new Set(certificates.map(c => c.studentName)).size}
            </div>
            <p className="text-xs text-gray-500 mt-1">طالب مختلف</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              هذا الشهر
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-500 mt-1">شهادة جديدة</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="البحث في الشهادات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 font-noto"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates List */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="font-noto">قائمة الشهادات</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد شهادات</h3>
              <p className="text-gray-500 mb-6">لم يتم إصدار أي شهادات بعد</p>
              <Button className="bg-blue-600 hover:bg-blue-700 font-noto">
                <Plus className="w-4 h-4 mr-2" />
                إصدار شهادة جديدة
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCertificates.map((certificate) => (
                <div 
                  key={certificate.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{certificate.studentName}</h3>
                        <Badge 
                          variant={certificate.status === 'active' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {certificate.status === 'active' ? 'نشط' : 'ملغي'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{certificate.courseName}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>رقم الشهادة: {certificate.certificateNumber}</span>
                        <span>تاريخ الإصدار: {new Date(certificate.issuedDate).toLocaleDateString('ar')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="font-noto">
                        <Eye className="w-4 h-4 mr-1" />
                        عرض
                      </Button>
                      {certificate.downloadUrl && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-noto">
                          <Download className="w-4 h-4 mr-1" />
                          تحميل
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}