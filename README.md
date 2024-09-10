# Angular MF

En este repositorio se encuentran algunas apps y librerias usadas para simular un entorno de microfrontends más grande.

Internamente cada app puede contar con varias aplicaciones angular que usen ModuleFederation.

En cuanto a las apps más grandes (producto y pagos), estas se orquestas como microfrontends verticales con un balanceador de carga con una política de redirección por url.

```
| producto
|     host (host estatico)
|     home
|     product-detail
|     product-list
|     cart
| pagos
|     host (dynamic-host)
|     plugin-a 
|     plugin-b 
|     plugin-c
```

Para saber más sobre microfronts y las formas implementarlo. Revisa la carpeta **_learn**

- [Arquitectura de microfrontends](./_learn/Arquitectura-microfonts.md)
- [ModuleFederation](./_learn/ModuleFedaration.md)

## Comandos

- Crear workspace 1: `ng new producto --no-create-application`
- Crear workspace 2: `ng new pagos --no-create-application`

- Crear aplicación: `(en producto) ng g application host`
- Crear libreria: `(en producto) ng g library common`

- Instalar plugin: `npm i @angular-architects/module-federation -D`
- Agregar host: `ng g @angular-architects/module-federation:init --project host --port 4200 --type host`
- Agregar remote: `ng g @angular-architects/module-federation:init --project home --port 4200 --type remote`
- Agregar host dinámico: `ng g @angular-architects/module-federation:init --project home --port 4200 --type dynamic-host`
