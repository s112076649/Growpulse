import Agenda, { AgendaConfig } from "agenda";
import mongoose from "mongoose";

let agendaInstance: Agenda;

export const getAgendaInstance = (): Agenda => {
  if (!agendaInstance) {
    const config: AgendaConfig = {
      mongo: mongoose.connection.db as unknown as any,
      defaultLockLimit: 5,
    };

    agendaInstance = new Agenda(config);
  }

  return agendaInstance;
};
