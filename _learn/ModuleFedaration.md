# ModuleFedaration

## Qué es

Module Federation es un plugin de Webpack (disponible desde la versión 5 en adelante) que permite cargar y ejecutar módulos de aplicaciones independientes en tiempo de ejecución. Este enfoque facilita la implementación de microfrontends, permitiendo que varias aplicaciones (o equipos de desarrollo) trabajen de manera independiente y se orquesten como una única aplicación en runtime. Con Module Federation, diferentes partes de una aplicación pueden ser desarrolladas, desplegadas y actualizadas por separado, reduciendo las dependencias entre equipos y mejorando la escalabilidad.

En el contexto de microfrontends, el patrón más común es tener una aplicación host que gestiona el ruteo y varias aplicaciones remotas (microfrontends) que exponen módulos, componentes o rutas para ser consumidos por el host. Por ejemplo, si una aplicación mfe1 debe cargarse en la ruta /flights, el host incluiría un código como este:

```javascript
{
  path: 'flights',
  loadChildren: () => import('mfe1/Module').then(m => m.FlightsModule)
}
```

## Ventajas y Desventajas

### Ventajas

- Carga bajo demanda: Solo se carga lo necesario para cada parte de la aplicación, evitando cargar todos los módulos de una sola vez.

- Desarrollo independiente: Los equipos pueden trabajar en módulos separados sin necesidad de coordinar directamente el código fuente de cada parte de la aplicación.

- Despliegue independiente: Cada microfrontend puede ser desplegado de manera autónoma, facilitando actualizaciones y manteniendo flexibilidad.

### Desventajas

- Complejidad en la gestión de dependencias: Compartir dependencias entre microfrontends puede ser complicado, y puede haber problemas de versiones que generen errores si no se manejan correctamente.

- Carga inicial mayor: Si se comparten demasiadas dependencias en el host y los remotos, la aplicación puede sufrir problemas de rendimiento.

- Solución más compleja: Aunque ofrece flexibilidad, la configuración y la gestión de microfrontends puede ser más complicada que en aplicaciones monolíticas.

## Configuración de Module Federation

### Host

El host es la aplicación principal que carga y consume los microfrontends. En su configuración, se especifican los remotos (microfrontends) que se cargarán.

```javascript
module.exports = withModuleFederationPlugin({
  remotes: {
    'mf-home': 'http://localhost:4201/remoteEntry.js',
    'mf-cart': 'http://localhost:4202/remoteEntry.js',
    'mf-product-detail': 'http://localhost:4203/remoteEntry.js',
    'mf-product-list': 'http://localhost:4204/remoteEntry.js'
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    })
  }
})
```

Es importante recordar que cuando hacemos referencia a un MF desde un host, este mf (remote) realmente no existe en mi host, es solo una referencia que se resolvera en tiempo de ejecucion. No olvide declarar el tipo para evitar problemas:

```javascript
// decl.d.ts
declare module 'mfe1/Module';
```

### Remote

Las aplicaciones remotas exponen módulos o componentes que pueden ser consumidos por el host. Los parámetros clave en la configuración de un remote incluyen:

```javascript
module.exports = withModuleFederationPlugin({
  name: 'mf-home',

  exposes: {
    './routes': './projects/home/src/app/app.routes.ts'
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    })
  }
})
```

### Partes de la configuración

Muchas de las siguientes partes ya viene configuradas por defecto por el plugin de Angular-Architects

- shared: Define las dependencias que el remote compartirá con el host, evitando cargas duplicadas.
- publicPath: La URL desde la cual se puede acceder al remote.
- uniqueName: Un identificador único para el remote en los bundles de Webpack.
- name: Nombre del remote.
- exposes: Define qué módulos o componentes serán expuestos al host.
- filename: Nombre del archivo generado que contendrá el bundle del remote.
- remotes: Especifica los remotos que el host puede consumir
- remoteEntry: archivo que genera webpack con todo lo necesario para poseriormente poder identificarlo e interactuar con el

- Para ejecutar cada mf, use `ng serve <name mf>`
- Para ejecutarlos todos, use `npm run run:all`

Cuando se instala el plugin de architects ocurre lo siguiente:

- Crear webpack.config.js
- Instlar un custom builder para que use ese archivo de webpack
- asigna un nuevo puerto para `ng serve`
- crear archivo boostrap y modificar archivo main.ts

### Ejemplo de configuración manual

Para configurar manualmente un remote con Module Federation, se deben seguir los siguientes pasos:

- Configurar el nombre del remote en webpack.config.js.
- Definir el puerto en el archivo angular.json.
- Agregar el puerto y el nombre del remote en la configuración del host (<host>/webpack.config.js).
- Incluir las declaraciones de módulos remotos en el archivo decl.d.ts del host, por ejemplo:

```javascript
// decl.d.ts
declare module 'mfe1/Module';
```

## Dependencias compartidas

Al compartir dependencias, es crucial optimizar qué se comparte para evitar problemas de rendimiento. Aunque la opción `shareAll()` facilita compartir todas las dependencias del package.json, es preferible compartir solo las necesarias:

```javascript
shared: share({
  '@angular/core': {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto'
  },
  '@angular/common': {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto'
  },
  '@angular/router': {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto'
  }
})
```

Ojo: Las dependencias deben cargarse de manera dinámica para permitir a Webpack decidir qué versión usar según las reglas de resolución de versiones semánticas.

Sin embargo, lo que se hace usualmente es cargar TODA la app de forma dinámica (revise `main.ts` y `boostrap.ts`) y así usar importaciones estáticas (a las que estamos acostumbrados 💯)

## Microfrontends dinámicos

Module Federation también soporta microfrontends dinámicos, es decir, remotos que se cargan en tiempo de **ejecución** utilizando un manifiesto que describe las rutas y los módulos expuestos por cada remote.

Este enfoque permite una mayor flexibilidad, como la capacidad de cambiar la URL de un microfrontend sin necesidad de recompilar el host.

Para generar un host dinámico, podemos usar el comando:

```bash
ng g @angular-architects/module-federation --project shell --port 4200 --type dynamic-host
```

Esto genera un manifiesto (mf.manifest.json) y el código necesario para cargar los remotos de forma dinámica.

Además, en el `main.ts` se carga el manifiesto (Esto puede ser un endpoint para hacerlo más dinámico)

```js
import { loadManifest } from '@angular-architects/module-federation'

loadManifest('/assets/mf.manifest.json')
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err))
```

Y ahora para usar el modulo, tendriamos que hacerlo esto:

```js
{
  path: 'bookings',
  loadChildren: () => loadRemoteModule({
      type: 'manifest', // Busca la información necesaria en el manifiesto
      remoteName: 'mfe2',
      exposedModule: './Module'
    })
    .then(m => m.BookingsModule)
},
```


**Idea**: Podemos tener un host que, de forma dinámica, cargue varios plugins dentro de una misma vista. Así, cada equipo puede agregar/eliminar plugins con solo agregar esta información al manifiesto, sin tener que recompilar el host o modificar código en él.

### Ventajas

La diferencia principal con la solución tradicional (host estático) es que no necesitamos declarar los remotes directamente en el archivo webpack.config.js. En su lugar, el host se informa a sí mismo sobre los microfrontends (MFs) disponibles en tiempo de ejecución mediante un manifiesto dinámico.

Aunque inicialmente parece similar a la configuración tradicional, esta segunda opción tiene varias ventajas clave:

- **Flexibilidad**: Puedes definir un endpoint que en un momento indique que el MF1 está en la ruta /abc, pero posteriormente cambiarlo a /bcd sin necesidad de recompilar el host. El host simplemente consulta el manifiesto cuando necesita acceder al remote, lo que facilita la gestión dinámica de rutas.

- **Resolución personalizada en tiempo de ejecución**: Al consultar los remotes en tiempo de ejecución, puedes decidir cómo resolver un microfrontend en función de un usuario, contexto o cualquier otra variable. Esto te permite crear experiencias más personalizadas para diferentes usuarios o escenarios.

- **A/B Testing simplificado**: Dado que la resolución de remotes ocurre en tiempo de ejecución, puedes implementar fácilmente pruebas A/B. Por ejemplo, podrías redirigir a un subconjunto de usuarios a un microfrontend específico y evaluar su rendimiento o interacción sin recompilar ni modificar el host.

## Problemas comunes

Al usar Module Federation con Angular, pueden surgir algunos problemas:

### Compartir estado (servicios singletons compartidos)

1. Para compartir estados/informacion entre MFs, podemos usar una lib de angular
2. Esto funciona SI comparte esa libreria (shareAll o indicar en Share), puesto que es un singleton y al tener 1 sola instancia para todos los MF, entonces se almancena la info y se puede compartir
3. Tenga en cuenta posibles errores de version mistmatch que pueda generar más de 1 instancia
4. Si es local, puede usar shareMappings (aunque por defecto, esto ya lo hace el plugin)
5. Debe configurar la ruta de la libreria en el archivo `tsconfig.json`

### Providers del remoto

1. Recuerde que el MF remote solo comparte lo que se necesita para usarlo en el remote, es decir, lo normal es compartir rutas (revisar /producto), modulos o componente especificos
2. Pero la configuracion y por tanto los providers declarados ahí NO se comparten
3. Cuando el host usa componentes del MF remote, si el provider no esta declarado en el host, entonces el componente no lo podrá acceder y tendrá errores

Revise este documento sobre errores comunes: [Link](https://www.angulararchitects.io/en/blog/pitfalls-with-module-federation-and-angular/)

## Aprende más sobre ModuleFederation en Angular

- [ModuleFederation - Angular Architects](https://www.angulararchitects.io/en/blog/the-microfrontend-revolution-module-federation-in-webpack-5/)
