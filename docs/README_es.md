# Documentación

Este directorio contiene documentación completa para el proyecto Marketplace, incluyendo especificaciones de pruebas Gherkin y guías de implementación.

## 📁 Estructura del Directorio

```
docs/
├── README.md                    # Este archivo - índice principal de documentación
├── README_es.md                 # Versión en español de la documentación
├── cucumber.js                  # Configuración de Cucumber
└── features/                    # Especificaciones de pruebas Gherkin
    ├── README.md               # Documentación de pruebas Gherkin
    ├── product_navigation.feature  # Escenarios de prueba de navegación de productos (inglés)
    ├── product_navigation_es.feature  # Escenarios de prueba de navegación de productos (español)
    └── step_definitions/       # Implementaciones de definiciones de pasos
        ├── product_navigation_steps.js
        └── product_navigation_steps_es.js
```

## 🧪 Documentación de Pruebas Gherkin

El directorio `features/` contiene especificaciones de pruebas de Desarrollo Dirigido por Comportamiento (BDD) usando la sintaxis [Cucumber Gherkin](https://cucumber.io/docs/gherkin/reference).

### Escenarios de Prueba Clave

1. **Prueba de Navegación de Productos** - Documenta el viaje del usuario desde la lista de productos hasta las páginas de detalles
2. **Prueba de Verificación de Precio** - Prueba específicamente el precio del Samsung Galaxy A55 "1853861"
3. **Prueba del Carrito de Compras** - Prueba la funcionalidad "Agregar al carrito"
4. **Experiencia Completa del Usuario** - Flujos de trabajo de usuario de extremo a extremo

### Ejecutando las Pruebas

```bash
# Navegar al directorio docs
cd docs

# Instalar dependencias (si no están ya instaladas)
npm install --save-dev @cucumber/cucumber @babel/register chai axios puppeteer

# Ejecutar todas las pruebas Gherkin
npx cucumber-js

# Ejecutar característica específica en inglés
npx cucumber-js features/product_navigation.feature

# Ejecutar característica específica en español
npx cucumber-js features/product_navigation_es.feature

# Generar reporte HTML
npx cucumber-js --format progress-bar --format html:cucumber-report.html
```

### Prerrequisitos

Antes de ejecutar las pruebas, asegúrate de que:
1. La API del backend esté ejecutándose en `http://localhost:8080`
2. La aplicación frontend esté ejecutándose en `http://localhost:3000`
3. Los datos del producto estén cargados en el sistema

## 📋 Beneficios de la Documentación de Pruebas

- **Legible para Humanos**: Los interesados del negocio pueden entender los requisitos de las pruebas
- **Documentación Viva**: Las pruebas sirven como documentación actualizada
- **Lista para Automatización**: Las definiciones de pasos pueden implementarse para pruebas automatizadas
- **Colaboración**: Conecta la comunicación entre equipos técnicos y no técnicos
- **Pruebas de Regresión**: Asegura comportamiento consistente a través de actualizaciones de la aplicación

## 🌍 Versiones de Idioma

### Inglés
- `product_navigation.feature` - Escenarios de prueba en inglés
- `product_navigation_steps.js` - Definiciones de pasos en inglés

### Español
- `product_navigation_es.feature` - Escenarios de prueba en español
- `product_navigation_steps_es.js` - Definiciones de pasos en español

### Ejecutando Pruebas en Diferentes Idiomas

```bash
# Ejecutar pruebas en inglés
npx cucumber-js features/product_navigation.feature

# Ejecutar pruebas en español
npx cucumber-js features/product_navigation_es.feature

# Ejecutar todas las pruebas (ambos idiomas)
npx cucumber-js
```

## 🔗 Documentación Relacionada

- [README Principal del Proyecto](../README.md) - Descripción general del proyecto e instrucciones de configuración
- [Documentación del Backend](../backend/msProduct/README.md) - Documentación de la API del backend
- [Documentación del Frontend](../frontend/README.md) - Documentación de la aplicación frontend

## 🚀 Integración con CI/CD

Estas pruebas Gherkin pueden integrarse en tu pipeline de CI/CD:

```yaml
# Ejemplo de flujo de trabajo de GitHub Actions
- name: Ejecutar Pruebas Gherkin
  run: |
    cd docs
    npm install
    npx cucumber-js --format progress-bar --format html:cucumber-report.html
  env:
    CI: true
```

## 📊 Reportes de Pruebas

Las pruebas generan reportes completos incluyendo:
- Resultados de ejecución de pruebas
- Estado de aprobación/falla para cada escenario
- Detalles de ejecución paso a paso
- Reportes HTML para análisis detallado

## 🎯 Próximos Pasos

1. **Agregar IDs de Prueba de Datos**: Agregar atributos `data-testid` a componentes React
2. **Implementar Pruebas Visuales**: Agregar comparación de capturas de pantalla para pruebas de regresión de UI
3. **Pruebas de API**: Extender pruebas para verificar respuestas de la API del backend
4. **Pruebas de Rendimiento**: Agregar escenarios para probar el rendimiento de la aplicación
5. **Pruebas de Accesibilidad**: Incluir pasos de verificación de accesibilidad

## 📚 Referencias

- [Referencia de Cucumber Gherkin](https://cucumber.io/docs/gherkin/reference)
- [Desarrollo Dirigido por Comportamiento](https://cucumber.io/docs/bdd/)
- [Documentación de Cucumber.js](https://github.com/cucumber/cucumber-js)
- [Localización de Gherkin](https://cucumber.io/docs/gherkin/reference#spoken-languages) 