# ADEV_Module
This is a Year 1 Module where i worked on the database design and built a website as well.

This module consists of my work; 
1) Website
2) Database Design

## Website
I designed and developed an E-commerce website where users can:

- Browse Products: Navigate through home, products, categories, and account pages.

- Add Products: Use a form to upload new items with image, name, description, price, and category.

- Organize by Category: Products can be grouped for easy filtering.

- User-Friendly Navigation: Includes main pages like Home, Products, About, Contact, and Account.

## Database Design

### ER Model Guidelines  
- **Entities**: Represent real-world objects (e.g., students, teachers, courses).  
- **Attributes**: Properties of entities (e.g., name, class, age).  
- **Relationships**: One-to-one, one-to-many, many-to-many.  
- **Design Steps**:  
  - Identify entities → attributes → constraints (PK, unique, not null).  
  - Define relationships and foreign keys.  
  - Normalize to **3NF** to avoid anomalies.  
  - Test with mock data (insert, update, delete).  

---

### ER Diagram & Entities  
Designed an **e-commerce website database** with key entities:  

- **Order** → links to Delivery, Credit Card, Register, Order Status  
- **Order Status** → no foreign key  
- **Register** → no foreign key  
- **Login** → links to Register  
- **Delivery** → no foreign key  
- **Credit Card** → no foreign key  
- **Order Item** → links to Product for Sale, Order  
- **Product for Sale** → links to Category, Product Image  
- **Product Image** → no foreign key  
- **Category** → no foreign key  

---

### Avoiding Anomalies  

#### Insertion Anomalies  
- **Product & Category**: Keeping *category* as a separate entity avoids needing fake data when no product exists.  
- **Order & Credit Card**: Separating credit card details prevents placeholder data when adding new companies (e.g., WorldCard).  

#### Update Anomalies  
- **Credit Card Fees**: If stored in `Order`, changing a fee requires multiple updates → solved by separate `Credit Card` entity.  
- **Delivery Fees**: If stored in `Order`, a fee change requires updating all rows → solved by separate `Delivery` entity.  

#### Delete Anomalies  
- **Category Loss**: If category stored in `Product`, deleting all products deletes the category itself. Separate `Category` entity preserves it.  
- **Credit Card Info Loss**: If card details are attributes in `Order`, unused cards vanish when not referenced. Separate `Credit Card` entity prevents this.  

---

#### Key Takeaways  
The design ensures:  
- **No redundant data** (avoids anomalies).  
- **Normalized structure (3NF)** for integrity.  
- **Clear relationships** between orders, products, payments, and delivery.  
- **Flexibility** to insert, update, and delete without data loss or inconsistency.  
