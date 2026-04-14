@echo off
chcp 65001 >nul
cls
echo ==========================================
echo   Ejecutar Test para el reporte de horas
echo ==========================================
echo       ╪ Autoria de: Manuel Buelvas ╪
echo ==========================================
echo.

:: Seleccionar el dia
echo Seleccione el dia a reportar:
echo   1. Lunes
echo   2. Martes
echo   3. Miercoles
echo   4. Jueves
echo   5. Viernes
echo.
set /p "DIA=Ingrese el numero del dia (1-5): "
echo.

:: Validar seleccion
if "%DIA%"=="1" set "NOMBRE_DIA=Lunes"
if "%DIA%"=="2" set "NOMBRE_DIA=Martes"
if "%DIA%"=="3" set "NOMBRE_DIA=Miercoles"
if "%DIA%"=="4" set "NOMBRE_DIA=Jueves"
if "%DIA%"=="5" set "NOMBRE_DIA=Viernes"

if not defined NOMBRE_DIA (
    echo Opcion invalida. Solo se aceptan numeros del 1 al 5.
    pause
    exit /b
)

echo Dia seleccionado: %NOMBRE_DIA%
echo.

:: Pedir observaciones segun el dia
if "%DIA%"=="5" (
    set /p "OBSERVATIONS_FRIDAY=Ingrese las observaciones para las 6 horas: "
    echo.
    echo ========================================
    echo   RESUMEN DE DATOS INGRESADOS
    echo ========================================
    echo Dia: %NOMBRE_DIA%
    echo Observaciones 6h: %OBSERVATIONS_FRIDAY%
) else (
    set /p "OBSERVATIONS=Ingrese las observaciones para las 9 horas: "
    echo.
    set /p "OBSERVATIONS_DAILYS=Ingrese las observaciones para los Dailys (30 min): "
    echo.
    echo ========================================
    echo   RESUMEN DE DATOS INGRESADOS
    echo ========================================
    echo Dia: %NOMBRE_DIA%
    echo Observaciones 9h: %OBSERVATIONS%
    echo Observaciones Dailys: %OBSERVATIONS_DAILYS%
)

echo ========================================
echo.

:: Confirmacion
set /p "CONFIRMAR=¿Esta seguro de ejecutar el test con estos datos? (S/N): "

if /i not "%CONFIRMAR%"=="S" (
    echo.
    echo Ejecucion cancelada.
    echo.
    pause
    exit /b
)

echo.
echo Ejecutando test...
echo.

:: Ejecutar segun el dia
if "%DIA%"=="5" (
    set "TEST_OBSERVATIONS_FRIDAY=%OBSERVATIONS_FRIDAY%"
    npx playwright test --grep "Login viernes con credenciales de .env" --headed
) else (
    set "TEST_OBSERVATIONS=%OBSERVATIONS%"
    set "TEST_OBSERVATIONS_DAILYS=%OBSERVATIONS_DAILYS%"
    npx playwright test --grep "Login con credenciales de .env" --headed
)

echo.
echo ========================================
echo Test finalizado
echo ========================================
echo.
pause