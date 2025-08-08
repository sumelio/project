# Arquitectura CLEAR en Kotlin/Jetpack Compose para la feature de listado de productos

Este documento describe cómo se aplica la arquitectura **CLEAR** en una aplicación móvil desarrollada con **Kotlin** y **Jetpack Compose**, que actualmente cuenta con una única funcionalidad: **listar productos**.

---

## 📁 Estructura del Proyecto

```plaintext
ProductLister/
│
├── Data/
│   ├── Entities/
│   │   └── ProductDTO.swift
│   ├── Mappers/
│   │   └── ProductMapper.swift
│   └── Repositories/
│       └── RemoteProductRepository.swift
│
├── Domain/
│   ├── Models/
│   │   └── Product.swift
│   └── Repositories/
│       └── ProductRepository.swift (protocolo)
│
├── Presentation/
│   ├── ViewModels/
│   │   └── ProductListViewModel.swift
│   └── Views/
│       └── ProductListView.swift
