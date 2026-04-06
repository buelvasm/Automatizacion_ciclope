# Estructura del Proyecto - Page Object Model (POM)

Este proyecto sigue el patrón **Page Object Model (POM)** para mantener los tests organizados, mantenibles y escalables.

## � Estructura de Carpetas

```
tests/
├── shared/                  # Código compartido entre tests
│   ├── interfaces/          # Interfaces TypeScript
│   │   └── page-elements.interface.ts
│   └── utils/              # Utilidades y helpers
│       └── step.decorator.ts
│
├── pages/                   # Page Objects (POM)
│   └── login/              # Módulo de Login
│       ├── login.page.ts   # Clase Page Object
│       └── login.locator.ts # Locators/Selectores
│
├── specs/                   # Tests (specs)
│   └── login.spec.ts       # Tests de login
│
└── README.md               # Este archivo
```

## 🚀 Tests Disponibles

### Tests de Login
Test de autenticación para la plataforma SQASA Operaciones (`https://operaciones.sqasa.co/login`).

**Ubicación:** `tests/specs/login.spec.ts`

**Para ejecutar:**
```bash
# Todos los tests
npx playwright test

# Tests de login específicamente
npx playwright test login.spec.ts

# En modo UI
npx playwright test --ui

# En modo debug
npx playwright test --debug

# Ver reporte
npx playwright show-report
```

**Configuración de credenciales:**
1. Copia `.env.example` a `.env`
2. Completa con tus credenciales reales
3. Las credenciales nunca se subirán a Git (están en .gitignore)

## 🎯 Convenciones del Proyecto

### 1. **Page Objects** (`pages/`)
- Cada módulo/página tiene su propia carpeta
- Contiene la lógica de interacción con la página
- Usa el decorador `@step` para reportes detallados
- **Archivos:**
  - `*.page.ts` - Clase con métodos de la página
  - `*.locator.ts` - Función que retorna los elementos/selectores

**Ejemplo:**
```typescript
// login.page.ts
export class LoginPage {
    readonly elements: PageElements;
    
    @step('Navegar a la página de login')
    async goto() { ... }
}

// login.locator.ts
export function getLoginPageElements(page: Page): PageElements {
    return {
        emailInput: page.locator('input[type="email"]'),
        // ...
    };
}
```

### 2. **Specs/Tests** (`specs/`)
- Contiene los archivos de tests
- Importa Page Objects desde `pages/`
- Nomenclatura: `*.spec.ts`

**Ejemplo:**
```typescript
import { LoginPage } from "../pages/login/login.page";

test.describe("Login Tests", () => {
    test("login exitoso", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        // ...
    });
});
```

### 3. **Shared** (`shared/`)
- **`interfaces/`**: Tipos e interfaces TypeScript compartidas
- **`utils/`**: Decoradores, helpers, funciones utilitarias

## 🚀 Cómo Agregar una Nueva Página

### Paso 1: Crear el módulo
```bash
tests/pages/nueva-pagina/
├── nueva-pagina.locator.ts
└── nueva-pagina.page.ts
```

### Paso 2: Definir Locators
```typescript
// nueva-pagina.locator.ts
import { type Page } from '@playwright/test';
import { type PageElements } from '../../shared/interfaces/page-elements.interface';

export function getNuevaPaginaElements(page: Page): PageElements {
  return {
    titulo: page.locator('h1'),
    boton: page.getByRole('button', { name: 'Enviar' }),
  };
}
```

### Paso 3: Crear Page Object
```typescript
// nueva-pagina.page.ts
import { Page, expect } from '@playwright/test';
import { getNuevaPaginaElements } from './nueva-pagina.locator';
import { type PageElements } from '../../shared/interfaces/page-elements.interface';
import { step } from '../../shared/utils/step.decorator';

export class NuevaPaginaPage {
    readonly page: Page;
    readonly elements: PageElements;

    constructor(page: Page) {
        this.page = page;
        this.elements = getNuevaPaginaElements(page);
    }

    @step('Hacer clic en botón')
    async clickBoton() {
        await this.elements.boton.click();
    }
}
```

### Paso 4: Crear Tests
```typescript
// specs/nueva-pagina.spec.ts
import { test } from '@playwright/test';
import { NuevaPaginaPage } from '../pages/nueva-pagina/nueva-pagina.page';

test.describe('Tests de Nueva Página', () => {
    test('test ejemplo', async ({ page }) => {
        const nuevaPagina = new NuevaPaginaPage(page);
        await nuevaPagina.clickBoton();
    });
});
```

## 📦 Estructura de Imports

```typescript
// Importar Page Object
import { LoginPage } from '../pages/login/login.page';

// Importar interfaces compartidas
import { type PageElements } from '../../shared/interfaces/page-elements.interface';

// Importar utilidades
import { step } from '../../shared/utils/step.decorator';
```

## 🎨 Características

- ✅ **Separación clara de concerns**: Pages, Locators, Tests
- ✅ **Decorador @step**: Reportes detallados paso a paso
- ✅ **TypeScript**: Tipado fuerte y autocompletado
- ✅ **Reutilizable**: Page Objects compartidos entre tests
- ✅ **Mantenible**: Cambios en la UI solo afectan locators
- ✅ **Escalable**: Fácil agregar nuevas páginas y tests

## 📝 Convenciones de Nombres

- **Page Objects**: `nombrePagina.page.ts` (ej: `login.page.ts`)
- **Locators**: `nombrePagina.locator.ts` (ej: `login.locator.ts`)
- **Tests**: `nombrePagina.spec.ts` (ej: `login.spec.ts`)
- **Clases**: Usar PascalCase (ej: `LoginPage`)
- **Funciones**: Usar camelCase (ej: `getLoginPageElements`)
- **Métodos**: Usar camelCase (ej: `clickButton`, `verifyTitle`)

## 📚 Recursos

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
