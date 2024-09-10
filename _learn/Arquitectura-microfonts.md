## Microfrontends

## Que es

Los microfrontends son un tipo de arquitectura aplicada al Frontend. Tiene una udea similar a la idea de microservicios. Consisten en dividir una aplicación en partes más pequeñas que se pueden mantener y desplegar de forma independiente.

Tiene varias formas de implementarse, cada una con sus propias fortalezas.

Este tipo de arquitectura se recomienda para equipos grandes, puesto que permite dividir una aplicación grande en diferentes aplicaciones pequeñas facilitando su mantebilidad y desarrollo. Sin embargo, presenta desafios y debemos conocerlos y ver si es rentable esta solución según nuestro contexto.

Tiene algunos principios que debemos tener en cuenta:

- Ser agnóstico al framework
- Aislar el código del equipo
- Establecer prefijos de equipo cuando tenga que compartir cosas
- Priorice funciones nativas del navegador
- Cree un sitio resistente

## Ventajas y deventajas

Algunas ventajas de los microfrontends:

- Facilitan el mantenimiento y escalabilidad de las aplicaciones.
- Permiten aplicaciones independientes, donde equipos pequeños pueden llevar código a producción más rápidamente.
- Optimizan el rendimiento frente a una SPA, ya que solo se carga el microfrontend necesario.
- Mejoran la resiliencia: si un microfrontend falla, no afecta a los demás, dependiendo de la implementación.
- Cada microfrontend puede ser desarrollado y desplegado de manera independiente.
- Los equipos tienen autonomía para tomar decisiones tecnológicas, como elegir el framework, lo que agiliza los acuerdos internos. Sin embargo, esto también puede generar desventajas en algunos contextos.

Desafíos de los microfrontends:

- Es más complejo orquestar la colaboración entre equipos.
- Una división prematura de microfrontends puede acoplar demasiado a los equipos, haciendo que los cambios en uno afecten a otros.
- Puede ser difícil mantener una coherencia de diseño en toda la aplicación.
- La gestión de dependencias compartidas se vuelve más complicada.
- Si los equipos están demasiado aislados, pueden surgir comportamientos inconsistentes en la aplicación.

## Tipos de MF

Existen 2 tipos de divisiones de microfrontends, veamoslos:

- MF verticales: Cada microfrontend se encarga de gestionar una ruta
- MF horizontales: Dentro de una misma vista coexisten componentes de diferentes microfrontends

Los microfrontends con divisiones horizontales presentan varios desafios a considerar. [Lea más al respecto](https://microfrontend.dev/architecture/horizontal-micro-frontend-split/)

## Forma de implementar MF

Se listan algunas formas de implementar microfrontends:

- iframes
- git submodulos
- single SPA
- zones de Next.js
- Module federation
- Native federation
- balanceadores de carga

## ModuleFederation

La solución que vemos en este repos se basa en Modulos Federados. ModuleFederation es un plugin de webpack que permite compartir módulos y dependencias entre diferentes aplicaciones en tiempo de ejecución (no se requiere tener esta información en tiempo de compilación).

Si quieres saber más sobre esto, revisa [ModuleFederation.md](./ModuleFedaration.md)

## Recursos

- https://micro-frontends.org/
- https://microfrontend.dev/
- https://frontendmastery.com/posts/understanding-micro-frontends/
- https://www.angulararchitects.io/blog/the-microfrontend-revolution-module-federation-in-webpack-5/ (lista)
- https://martinfowler.com/articles/micro-frontends.html
