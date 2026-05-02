StockFlow MVP (6-Hour Build)

StockFlow is a lightweight, multi-tenant SaaS inventory management application built as a rapid MVP in approximately 6 hours. It focuses on delivering the core functionality small sellers or internal teams need to track products and monitor stock levels—without the complexity of full-scale inventory systems.

🚀 Overview

This project demonstrates how to design and ship a minimal but functional SaaS product under tight time constraints. It includes authentication, organization-based data isolation, product management, and a simple dashboard for inventory insights.

✨ Key Features
Authentication & Multi-Tenancy
Email/password signup and login
Automatic organization creation per user
Data scoped to each organization (tenant isolation)
Product & Inventory Management
Create, view, update, and delete products
Track SKU, quantity, cost price, and selling price
Set optional low-stock thresholds per product
Simple stock adjustments via edit form
Dashboard
Total product count
Total inventory quantity
Low-stock items overview based on thresholds
Settings
Configurable default low-stock threshold

🧱 Tech Stack
Frontend: React / Next.js + Tailwind CSS
Backend: Node.js (Express or NestJS)
Database: PostgreSQL / MySQL / SQLite
ORM: Prisma / TypeORM / Sequelize
Auth: JWT or session-based authentication

(Exact stack may vary depending on implementation)

🎯 Purpose

This project is intentionally scope-reduced to:

Validate core SaaS architecture patterns (auth + tenancy)
Serve as a demo-ready prototype
Act as a foundation for future expansion (orders, integrations, reporting, etc.)
