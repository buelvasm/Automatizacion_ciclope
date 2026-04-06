import { test } from "@playwright/test";
import { LoginPage } from "../pages/login/login.page";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

// Test usando credenciales (hardcoded)
test.describe("Login Tests - SQASA Operaciones", () => {
  test("Login con variables quemadas", async () => {
    const email = "";
    const password = "";

    await loginPage.login(email, password);
    await loginPage.verifyLoginSuccess();
    await loginPage.registerTimeSheet();
    await loginPage.registerTimeSheetDailys();
  });
});

// Test usando credenciales desde variables de entorno (.env)
test.describe("Login con variables de entorno", () => {
  test("Login con credenciales de .env", async () => {
    const email = process.env.SQASA_EMAIL;
    const password = process.env.SQASA_PASSWORD;

    test.skip(!email || !password, 'Faltan SQASA_EMAIL o SQASA_PASSWORD en .env');

    await loginPage.login(email, password);
    await loginPage.verifyLoginSuccess();
    await loginPage.registerTimeSheet();
    await loginPage.registerTimeSheetDailys();
  });
});
