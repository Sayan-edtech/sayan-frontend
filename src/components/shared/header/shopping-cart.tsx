import { ShoppingCartIcon, Trash2, X } from "lucide-react";
import { useShoppingCart } from "@/store/shopping-cart";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Directions } from "@/constants/enums";
import { formatCurrency } from "@/lib/formatters";
import { useCart } from "@/hooks/useCart";

function ShoppingCart() {
  const navigate = useNavigate();
  const { items, removeItem, clearCart, isOpen, setIsOpen } =
    useShoppingCart();
  const { totalItems, totalPrice } = useCart();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-primary">
          <ShoppingCartIcon className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-96 max-h-[600px] overflow-y-auto border-none rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4" dir={Directions.RTL}>
            <h3 className="font-semibold text-lg">عربة التسوق</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8" dir={Directions.RTL}>
              <ShoppingCartIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">عربة التسوق فارغة</p>
              <Button
                variant="link"
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
              >
                !أضف بعض الدورات للبدء
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    dir={Directions.RTL}
                  >
                    <img
                      src={item.course.image}
                      alt={item.course.title}
                      className="w-24 h-14 object-cover bg-gray-50 rounded-md flex-shrink-0 aspect-[10/6]"
                    />
                    <div className="flex-1 min-w-0 text-right">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.course.title}
                      </h4>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-base text-blue-600 font-bold">
                          {formatCurrency(item.course.price || 0)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.course.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3" dir={Directions.RTL}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">إجمالي العناصر:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>إجمالي:</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/dashboard/shopping-cart");
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={items.length === 0}
                  >
                    الدفع الان 
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-gray-600 hover:bg-gray-100"
                    disabled={items.length === 0}
                  >
                    مسح سلة التسوق
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ShoppingCart;
