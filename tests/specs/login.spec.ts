import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login/login.page";

test.describe("Login Tests - SQASA Operaciones", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Login con variables quemadas", async ({ page }) => {
    const email = ""; 
    const password = ""; 

    await loginPage.login(email, password);
    await loginPage.verifyLoginSuccess();
    await loginPage.registerTimeSheet();
    await loginPage.registerTimeSheetDailys();
  });
});

// Test alternativo usando credenciales de variables de entorno
test.describe("Login con variables de entorno", () => {
  test("Login con credenciales de .env", async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const email = process.env.SQASA_EMAIL || "";
    const password = process.env.SQASA_PASSWORD || "";

    if (!email || !password) {
      test.skip();
    }

    await loginPage.login(email, password);
    await loginPage.verifyLoginSuccess();
    await loginPage.registerTimeSheet();
    await loginPage.registerTimeSheetDailys();
  });
});
