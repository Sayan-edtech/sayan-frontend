import { ShoppingCartIcon, Plus, Minus, Trash2, X } from "lucide-react";
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
  const { items, removeItem, updateQuantity, clearCart, isOpen, setIsOpen } =
    useShoppingCart();
  const { totalItems, totalPrice } = useCart();
  const handleQuantityChange = (courseId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(courseId);
    } else {
      updateQuantity(courseId, newQuantity);
    }
  };
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
          <div
            dir={Directions.RTL}
            className="flex items-center justify-between mb-4"
          >
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
            <div className="text-center py-8">
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
                    className="flex gap-3 p-3 border border-border rounded-lg"
                  >
                    <img
                      src={item.course.image}
                      alt={item.course.title}
                      className="w-16 h-16 object-contain bg-gray-50 rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.course.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        المحاضر:{" "}
                        {item.course.trainer
                          ? `${item.course.trainer.fname} ${item.course.trainer.lname}`
                          : "غير محدد"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleQuantityChange(
                                item.course.id,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleQuantityChange(
                                item.course.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {formatCurrency(
                              (item.course.price || 0) * item.quantity
                            )}
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
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div dir={Directions.RTL} className="space-y-3">
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
                    variant="outline"
                    onClick={clearCart}
                    className="w-full"
                    disabled={items.length === 0}
                  >
                    مسح سلة التسوق
                  </Button>
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/checkout");
                    }}
                    className="w-full"
                    disabled={items.length === 0}
                  >
                    دفع
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
