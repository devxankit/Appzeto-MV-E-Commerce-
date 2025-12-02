import { Routes, Route, Navigate } from 'react-router-dom'
import WebHome from './modules/web/web-pages/WebHome'
import ProductDetail from './modules/web/web-pages/ProductDetail'
import Cart from './modules/web/web-pages/Cart'
import Checkout from './modules/web/web-pages/Checkout'
import OrderConfirmation from './modules/web/web-pages/OrderConfirmation'
import Wishlist from './modules/web/web-pages/Wishlist'
import Orders from './modules/web/web-pages/Orders'
import Account from './modules/web/web-pages/Account'
import Products from './modules/web/web-pages/Products'
import Category from './modules/web/web-pages/Category'
import About from './modules/web/web-pages/About'
import Contact from './modules/web/web-pages/Contact'
import Support from './modules/web/web-pages/Support'
import FAQs from './modules/web/web-pages/FAQs'
import Privacy from './modules/web/web-pages/Privacy'
import Terms from './modules/web/web-pages/Terms'
import ReturnPolicy from './modules/web/web-pages/ReturnPolicy'
import Shipping from './modules/web/web-pages/Shipping'
import ScrollToTop from './components/ScrollToTop'
import AppHome from './modules/User-App/User-App-pages/AppHome'

function App() {
  return (
    <div className="w-full min-h-screen">
      <ScrollToTop />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<AppHome />} />
        <Route path="/home" element={<WebHome />} />
        <Route path="/products" element={<Products />} />
        
        {/* Category Pages */}
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryName" element={<Category />} />
        
        {/* Category-specific redirects */}
        <Route path="/categories" element={<Navigate to="/category" replace />} />
        <Route path="/smartphones" element={<Navigate to="/category/Smartphone" replace />} />
        <Route path="/electronics" element={<Navigate to="/category/Electronics" replace />} />
        <Route path="/fashion" element={<Navigate to="/category/Fashion" replace />} />
        <Route path="/groceries" element={<Navigate to="/category/Groceries" replace />} />
        <Route path="/watches" element={<Navigate to="/category/Watches" replace />} />
        <Route path="/footwear" element={<Navigate to="/category/Footwear" replace />} />
        <Route path="/furniture" element={<Navigate to="/category/Furniture" replace />} />
        <Route path="/trending" element={<Navigate to="/products" replace />} />
        <Route path="/bestsellers" element={<Navigate to="/products" replace />} />
        <Route path="/new-arrivals" element={<Navigate to="/products" replace />} />
        <Route path="/top-rated" element={<Navigate to="/products" replace />} />
        <Route path="/offers" element={<Navigate to="/products" replace />} />
        <Route path="/brands" element={<Navigate to="/products" replace />} />
        
        {/* Product Pages */}
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* Shopping Pages */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/wishlist" element={<Wishlist />} />
        
        {/* Account Pages */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        
        {/* Information Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/faqs" element={<FAQs />} />
        
        {/* Policy Pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/shipping" element={<Shipping />} />
        
        {/* User-App Pages */}
        <Route path="/app/home" element={<AppHome />} />
        <Route path="/app/categories" element={<Category />} />
        <Route path="/app/categories/:categoryName" element={<Category />} />
        <Route path="/app/cart" element={<Cart />} />
        <Route path="/app/wishlist" element={<Wishlist />} />
        <Route path="/app/orders" element={<Orders />} />
        <Route path="/app/profile" element={<Account />} />
        <Route path="/app/settings" element={<Account />} />
        <Route path="/app/support" element={<Support />} />
        <Route path="/app/explore" element={<Products />} />
        <Route path="/app/products/sale" element={<Products />} />
        
        {/* App Pages (redirects) */}
        <Route path="/android" element={<Navigate to="/" replace />} />
        <Route path="/ios" element={<Navigate to="/" replace />} />
        
        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
