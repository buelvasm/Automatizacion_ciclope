import { Page, expect } from "@playwright/test";
import { getLoginPageElements } from "./login.locator";
import { type PageElements } from "../../shared/interfaces/page-elements.interface";
import { step } from "../../shared/utils/decorator";
import { defaultTimeSheetData } from "./data";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://operaciones.sqasa.co/login";
  readonly elements: PageElements;

  constructor(page: Page) {
    this.page = page;
    this.elements = getLoginPageElements(page);
  }

  @step("Aceptar todos los cookies")
  async acceptAllCookies() {
    await this.elements.buttonAceptAll.first().click({ timeout: 5000 });
  }

  @step("Navegar a la página de login")
  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("networkidle");
  }

  @step("Rellenar el campo de email")
  async fillEmail(email: string) {
    await this.elements.emailInput.first().fill(email);
  }

  @step("Rellenar el campo de contraseña")
  async fillPassword(password: string) {
    await this.elements.passwordInput.first().fill(password);
  }

  @step("Hacer clic en el botón de login")
  async clickLoginButton() {
    await this.elements.loginButton.first().click();
  }

  @step("Realizar login con email y contraseña")
  async login(email: string, password: string) {
    await this.acceptAllCookies();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  @step("Verificar que el login fue exitoso")
  async verifyLoginSuccess() {
    await expect(this.elements.messageDashboard.first()).toBeVisible({
      timeout: 10000,
    });
  }

  @step("Verificar que aparece un mensaje de error")
  async verifyLoginError() {
    await expect(this.elements.errorMessage.first()).toBeVisible({
      timeout: 5000,
    });
  }

  @step("Obtener el mensaje de error")
  async getErrorMessage(): Promise<string> {
    return (await this.elements.errorMessage.first().textContent()) || "";
  }

  private getFormattedDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  @step("Registro de horas en la hoja de tiempo 9 horas")
  async registerTimeSheet() {
    await this.page.waitForTimeout(5000);
    try {
      await this.elements.buttonTimeSheet.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonTimeSheet.click();
    } catch (error) {
      await this.page.waitForTimeout(2000);
      await this.elements.buttonTimeSheet.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonTimeSheet.click();
    }

    await this.page.waitForTimeout(3000);
    try {
      await this.elements.buttonAdd.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonAdd.click();
    } catch (error) {
      await this.page.waitForTimeout(2000);
      await this.elements.buttonAdd.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonAdd.click();
    }
    await this.page.waitForTimeout(3000);

    const formattedDate = this.getFormattedDate();
    await this.elements.inputFecha.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.inputFecha.fill(formattedDate);
    await this.page.waitForTimeout(2000);
    await this.elements.totalHours.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.totalHours.click();
    await this.page.waitForTimeout(2000);
    await this.elements.totalHours.click();
    await this.page.waitForTimeout(2000);
    await this.elements.totalHours.selectOption(defaultTimeSheetData.totalHours);
    await this.page.waitForTimeout(2000);
    await this.elements.taskSelect.waitFor({ state: 'visible', timeout: 20000 });
    await this.elements.taskSelect.click();
    await this.page.waitForTimeout(3000);
    await this.elements.taskSelect.selectOption(defaultTimeSheetData.taskType);
    await this.page.waitForTimeout(2000);
    await this.elements.observations.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.observations.click();
    await this.elements.observations.fill(defaultTimeSheetData.observations);
    await this.page.waitForTimeout(2000);
    await this.elements.saveHours.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.saveHours.click();
    await this.page.waitForTimeout(2000);
    await expect(this.elements.messageValidation).toBeVisible({ timeout: 20000 });
  }

  @step("Registro de horas en la hoja de tiempo 30 minutos")
  async registerTimeSheetDailys() {
    await this.page.waitForTimeout(5000);
    try {
      await this.elements.buttonTimeSheet.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonTimeSheet.click();
    } catch (error) {
      await this.page.waitForTimeout(2000);
      await this.elements.buttonTimeSheet.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonTimeSheet.click();
    }

    await this.page.waitForTimeout(3000);
    try {
      await this.elements.buttonAdd.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonAdd.click();
    } catch (error) {
      await this.page.waitForTimeout(2000);
      await this.elements.buttonAdd.waitFor({ state: 'visible', timeout: 20000 });
      await this.elements.buttonAdd.click();
    }
    await this.page.waitForTimeout(3000);

    const formattedDate = this.getFormattedDate();
    await this.elements.inputFecha.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.inputFecha.fill(formattedDate);
    await this.page.waitForTimeout(2000);
    await this.elements.totalHours.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.totalHours.click();
    await this.page.waitForTimeout(2000);
    await this.elements.totalHours.click();
    await this.page.waitForTimeout(2000);
    await this.elements.totalHours.selectOption(defaultTimeSheetData.totalHoursDailys);
    await this.page.waitForTimeout(2000);
    await this.elements.taskSelect.waitFor({ state: 'visible', timeout: 20000 });
    await this.elements.taskSelect.click();
    await this.page.waitForTimeout(3000);
    await this.elements.taskSelect.selectOption(defaultTimeSheetData.taskTypeDailys);
    await this.page.waitForTimeout(2000);
    await this.elements.observations.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.observations.click();
    await this.elements.observations.fill(defaultTimeSheetData.observationsDailys);
    await this.page.waitForTimeout(2000);
    await this.elements.saveHours.waitFor({ state: 'visible', timeout: 15000 });
    await this.elements.saveHours.click();
    await this.page.waitForTimeout(2000);
    await expect(this.elements.messageValidation).toBeVisible({ timeout: 20000 });
  }
}
