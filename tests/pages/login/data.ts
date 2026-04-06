export interface TimeSheetData {
  totalHours: string;
  taskType: string;
  observations: string;
  totalHoursDailys: string;
  taskTypeDailys: string;
  observationsDailys: string;
}

export const defaultTimeSheetData: TimeSheetData = {
  //Valores '09:00:00' o '06:00:00' para totalHours, dependiendo de la cantidad de horas que se quieran registrar
  totalHours: "09:00:00",
  totalHoursDailys: "00:30:00",
  //Valores 'Ejecución' o 'Dailys' para taskType, dependiendo del tipo de tarea que se quiera registrar
  taskType: "Ejecución",
  taskTypeDailys: "Dailys",
  //Observaciones para el registro de horas - Se llenan desde el .bat
  observations: process.env.TEST_OBSERVATIONS || "",
  observationsDailys: process.env.TEST_OBSERVATIONS_DAILYS || "",
};
