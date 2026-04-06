@echo off
chcp 65001 >nul
cls
echo ==========================================
echo   Ejecutar Test para el reporte de horas
echo ==========================================
echo       ╪ Autoria de: Manuel Buelvas ╪
echo ==========================================
echo.

:: Solicitar observations
set /p "OBSERVATIONS=Ingrese las observaciones: "
echo.

:: Solicitar observationsDailys
set /p "OBSERVATIONS_DAILYS=Ingrese las observaciones Dailys: "
echo.

:: Mostrar resumen
echo ========================================
echo   RESUMEN DE DATOS INGRESADOS
echo ========================================
echo Observaciones: %OBSERVATIONS%
echo Observaciones Dailys: %OBSERVATIONS_DAILYS%
echo.
echo ========================================

:: Preguntar si está seguro
set /p "CONFIRMAR=¿Está seguro de ejecutar el test con estos datos? (S/N): "

if /i "%CONFIRMAR%"=="S" (
    echo.
    echo Ejecutando test...
    echo.
    
    :: Establecer variables de entorno para las observaciones
    set "TEST_OBSERVATIONS=%OBSERVATIONS%"
    set "TEST_OBSERVATIONS_DAILYS=%OBSERVATIONS_DAILYS%"
    
    :: Ejecutar el test específico con el navegador visible
    npx playwright test --grep "Login con credenciales de .env" --headed
    
    echo.
    echo ========================================
    echo Test finalizado
    echo ========================================
) else (
    echo.
    echo Ejecución cancelada.
)

echo.
pause
