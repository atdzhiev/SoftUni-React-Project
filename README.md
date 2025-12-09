# 🖋️ State Stationery Store

## 📖 Overview
This project is a **single-page application (SPA)** for a stationery online store, developed as part of the **ReactJS SoftUni Course**.

The core feature of the platform are the **Products**, who can be:
- 👀 Viewed  
- ❤️ Loved  
- 🛒 Added to cart  
- ✏️ Created, edited, or deleted (depending on user role)

### 👥 Roles
- **Guests** → Can browse public pages (Home, About, Products, Product Details, Contact) and register/login for more functionality.  
- **Users** → Can view, love, and add products to their cart. Loved products are saved to their wishlist.  
- **Admins** → Defined server-side. Can create, edit, and delete their own products.  

---

## 🌐 Public Section (Non-registered Users)
Accessible pages:
- **Home** → Advertisement banners, featured collections, and “Our Story” section.  
- **Products Catalog** → Lists all available products with brief info. Features:  
  - Hover over product image to access details  
  - Sorting, filtering, and pagination  
- **Product Details** → Detailed information about each product. Extra functionality available for authenticated users.  
- **About** → More detailed information about State.  
- **Contact** → Displays State’s contacts and a message form (location and contacts are randomly set).  
- **Login/Register** → Accessed via the header icon. Includes both login and register forms.  

---

## 🔒 Private Section (Registered Users)

### Users
- **Love Products** → On the catalog or details page, click the heart icon or “Add to wishlist” button.  
- **Add to Cart** → On the details page, from wishlist and catalog. From details page quantity can be changed, but from catalog and wishlist it is 1 by default.  
- **Wishlist** → Displays a list of loved products with links to their details and “Add to cart” button. You can also select multiple products to be added to cart.  
- **Cart** → Shows added products with price, quantity, and other info. Includes:  
  - Button to remove product from the cart  
  - **Order Now** button to make the order  
  - Ability to go to product details page  

### Admins
- **Create Product** → Form for adding new products.  
- **Edit Product** → Form for modifying a product created by the current admin.  
- **Delete Product** → Ability to remove a product created by the current admin.  

**Predefined Admin Accounts (server-initialized):**
- `peter@abv.bg : 123456`  
- `george@abv.bg : 123456`  
- `admin@abv.bg : admin`  

---

## Technical Details

### Client
Run locally:

- `npm install`
- `npm start`

## ⚙️ Server

- 🖥️ **Base** → Built on the [SoftUni Practice Server](https://github.com/softuni-practice-server/softuni-practice-server)  
- 🔧 **Modifications** :
  -  Add **admin roles** to the users
  -  Add and customize **initial collections**
    
## 🚀 Deployment
Both the **back-end** and **front-end** are deployed on Render.


