import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DigitalProductTable from "@/features/digital-products/components/DigitalProductTable";
import DigitalProductStats from "@/features/digital-products/components/DigitalProductStats";
import DigitalProductFilters from "@/features/digital-products/components/DigitalProductFilters";
import type { DigitalProduct } from "@/types/digital-product";
import type { Table } from "@/types/table";

// Sample data for academy digital products
const sampleProducts: DigitalProduct[] = [
  {
    id: "1",
    title: "منهج إدارة الأعمال المتقدم",
    description: "منهج شامل لإدارة الأعمال والقيادة الاستراتيجية للمؤسسات",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    price: 299.99,
    discountPrice: 249.99,
    downloadFile: "business-management-curriculum.pdf",
    category: "مناهج أكاديمية",
    status: "published",
    author: "د. أحمد الخبير",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    downloads: 145,
    rating: 4.9,
    reviews: 28
  },
  {
    id: "2",
    title: "برنامج التدريب التنفيذي",
    description: "برنامج تدريبي متكامل للقادة التنفيذيين في الشركات",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    price: 499.99,
    downloadFile: "executive-training-program.zip",
    category: "برامج تدريبية",
    status: "published",
    author: "د. سارة المستشارة",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    downloads: 89,
    rating: 4.8,
    reviews: 15
  },
  {
    id: "3",
    title: "نظام إدارة الجودة الأكاديمية",
    description: "دليل شامل لتطبيق معايير الجودة في المؤسسات التعليمية",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    price: 199.99,
    discountPrice: 159.99,
    downloadFile: "quality-management-system.pdf",
    category: "أنظمة إدارية",
    status: "draft",
    author: "د. محمد الأكاديمي",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-22",
    downloads: 67,
    rating: 4.7,
    reviews: 12
  },
  {
    id: "4",
    title: "شهادة الإدارة الاستراتيجية",
    description: "برنامج شهادة معتمد في الإدارة الاستراتيجية للمؤسسات",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400",
    price: 799.99,
    downloadFile: "strategic-management-certificate.zip",
    category: "شهادات مهنية",
    status: "published",
    author: "د. فاطمة الخبيرة",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-25",
    downloads: 234,
    rating: 4.9,
    reviews: 42
  },
  {
    id: "5",
    title: "مكتبة الموارد الأكاديمية",
    description: "مجموعة شاملة من الموارد والأدوات الأكاديمية للمؤسسات التعليمية",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    price: 149.99,
    downloadFile: "academic-resources-library.zip",
    category: "موارد تعليمية",
    status: "published",
    author: "د. عمر الباحث",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-19",
    downloads: 123,
    rating: 4.6,
    reviews: 19
  }
];

const AcademyDigitalProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStatus = !selectedStatus || product.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const tableConfig: Table<DigitalProduct> = {
    data: paginatedProducts,
    totalItems: filteredProducts.length,
    currentPage,
    totalPages,
    itemsPerPage,
    onPageChange: setCurrentPage,
    onItemsPerPageChange: setItemsPerPage,
  };

  const handleEdit = (product: DigitalProduct) => {
    console.log("Edit product:", product);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = (productId: string) => {
    console.log("Delete product:", productId);
    // Implement delete functionality
  };

  const handleDownload = (product: DigitalProduct) => {
    console.log("Download product:", product);
    // Implement download functionality
  };

  const Header: React.FC = () => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">المنتجات الرقمية للأكاديمية</h1>
        <p className="text-gray-600 mt-1">إدارة وتتبع المناهج والبرامج الأكاديمية الرقمية</p>
      </div>
      <Link to="/dashboard/digital-products/add">
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          إضافة منتج أكاديمي جديد
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <Header />
      
      <DigitalProductStats products={sampleProducts} />
      
      <DigitalProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        products={filteredProducts}
      />
      
      <DigitalProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default AcademyDigitalProducts;