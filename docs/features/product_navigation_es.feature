# language: es
Característica: Navegación de Productos y Visualización de Precios
  Como cliente
  Quiero navegar por productos y ver sus detalles
  Para poder tomar decisiones de compra informadas

  La aplicación del marketplace permite a los clientes ver una lista de productos
  y navegar a páginas de detalles individuales para ver información completa
  incluyendo precios, imágenes y detalles del vendedor.

  Regla: Visualización de Lista de Productos
    La lista de productos debe mostrar todos los productos disponibles con información básica
    y proporcionar navegación a páginas de detalles de productos.

  Regla: Información de Detalles del Producto
    Las páginas de detalles del producto deben mostrar información completa del producto incluyendo
    precios precisos, imágenes, descripciones e información del vendedor.

  Antecedentes:
    Dado que la aplicación del marketplace está ejecutándose
    Y la API del backend es accesible
    Y los datos del producto están cargados en el sistema

  Esquema del Escenario: El cliente ve la lista de productos y navega al detalle del producto
    Dado que estoy en la página de lista de productos
    Cuando veo el producto "<titulo_producto>"
    Y hago clic en "Ver detalle" para ese producto
    Entonces debería ser navegado a la página de detalles del producto
    Y debería ver el precio del producto "<precio_esperado>"
    Y debería ver el título del producto "<titulo_producto>"
    Y debería ver imágenes del producto
    Y debería ver información del vendedor

    Ejemplos:
      | titulo_producto                                                    | precio_esperado |
      | Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM      | 1853861        |
      | Samsung Galaxy NNNNN 5G Dual SIM 256 GB azul oscuro 8 GB RAM    | 1853861        |

  Escenario: El cliente verifica el precio específico del producto Samsung
    Dado que estoy en la página de lista de productos
    Cuando veo el producto "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM"
    Y hago clic en "Ver detalle" para ese producto
    Entonces debería ser navegado a "/product/1"
    Y debería ver el precio exacto "1853861"
    Y debería ver la descripción del producto
    Y debería ver métodos de pago disponibles
    Y debería ver información de reputación del vendedor

  Escenario: El cliente puede agregar producto al carrito de compras
    Dado que estoy en la página de detalles del producto para "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM"
    Cuando hago clic en "Agregar al carrito"
    Entonces el carrito de compras debería ser mostrado
    Y el producto debería ser agregado al carrito
    Y el carrito debería mostrar el precio correcto "1853861"

  Escenario: El cliente puede regresar a la lista de productos
    Dado que estoy en la página de detalles del producto
    Cuando navego de regreso a la lista de productos
    Entonces debería ver todos los productos disponibles
    Y debería poder seleccionar diferentes productos

  Escenario: La lista de productos muestra información esencial
    Dado que estoy en la página de lista de productos
    Entonces debería ver imágenes de productos
    Y debería ver títulos de productos
    Y debería ver precios de productos
    Y debería ver botones "Ver detalle" para cada producto

  Escenario: La página de detalles del producto muestra información completa
    Dado que estoy en la página de detalles del producto para cualquier producto
    Entonces debería ver el título del producto
    Y debería ver el precio del producto
    Y debería ver imágenes del producto con navegación de miniaturas
    Y debería ver la descripción del producto
    Y debería ver información del vendedor
    Y debería ver métodos de pago
    Y debería ver disponibilidad de stock
    Y debería ver botones "Comprar ahora" y "Agregar al carrito" 