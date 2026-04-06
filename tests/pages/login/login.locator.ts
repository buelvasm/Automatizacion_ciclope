import { type Page } from '@playwright/test';
import { type PageElements } from '../../shared/interfaces/page-elements.interface';

export function getLoginPageElements(page: Page): PageElements {
  return {
    // Selectores de la página de login
    buttonAceptAll: page.getByRole('button', { name: 'Accept all' }),
    emailInput: page.locator('input[name="email"], input[type="email"], #email'),
    passwordInput: page.locator('input[name="password"], input[type="password"], #password'),
    submitButton: page.locator('button[type="submit"]'),
    loginButton: page.getByRole('button', { name: 'Iniciar sesión' }),
    messageDashboard: page.getByRole('heading', { name: 'Dashboard' }),
    buttonTimeSheet: page.getByRole('link', { name: ' Hoja de tiempo' }),
    errorMessage: page.locator('.error, .alert-danger, [role="alert"]'),
    successIndicator: page.locator('.dashboard, .home, [data-testid="dashboard"]'),
    
    buttonAdd: page.locator('[dusk="addTime"]').or(page.locator('a[title="Añadir "]')),
    inputFecha: page.getByRole('textbox', { name: 'Fecha *' }),

    totalHours: page.locator('#totalHours'),
    taskSelect: page.locator('#task_id'),
    observations: page.getByRole('textbox', { name: 'Observaciones *' }),
    saveHours: page.getByRole('button', { name: 'Guardar' }),

    messageValidation: page.getByText('Ingreso de hora incluida correctamente')
  };
}
