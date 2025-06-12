import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/lib/react-query";
import { router } from "./routes/AppRoutes";
import { Directions } from "./constants/enums";

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
      <Toaster dir={Directions.RTL} richColors position="top-center" />
    </ReactQueryProvider>
  );
}

export default App;
