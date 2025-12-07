import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Buy from "./pages/Buy";
import Return from "./pages/Return";
import NotFound from "./components/NotFound";
import ReturnDetails from "./pages/ReturnDetails";
import Options from "./pages/Options"; 
import ProductsDev from "./pages/ProductsDev"; 
import BuyDetails from "./pages/BuyDetails";
import BuyCharge from "./pages/BuyCharge";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/options" element={<Options />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productsDev" element={<ProductsDev />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/buy-details/:id" element={<BuyDetails />} />
        <Route path="/buy-charge/:id" element={<BuyCharge />} />
        <Route path="/return-details/:id" element={<ReturnDetails />} />
        <Route path="/return/:id" element={<Return />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
