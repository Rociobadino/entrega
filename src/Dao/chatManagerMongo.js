import { messagesModel } from "../../db/models/messager.model.js";

export default class ChatManager {
    async getAllMessages() {
      try {
        const allMessages = await messagesModel.find();
        return allMessages;
      } catch (error) {
        console.log(`Error obteniendo todos los mensajes: ${error.message}`);
      }
    }


async agregarMensaje(objMessage) {
    try {
      const message = await messagesModel.create(objMessage);
      return message;
    } catch (error) {
      console.log(`Error agregando mensaje: ${error.message}`);
    }
  }
}