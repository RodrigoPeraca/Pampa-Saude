const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotificationToAll = functions.https.onCall(async (data) => {
  const {title, body} = data;
  const db = admin.firestore();

  // Busca todos os tokens ativos
  const snapshot = await db
      .collection("fcm_tokens")
      .where("active", "==", true)
      .get();

  const tokens = snapshot.docs.map((doc) => ({
    id: doc.id,
    token: doc.data().token,
  }));

  if (tokens.length === 0) return {success: false, message: "Sem tokens"};

  // Dispara para todos
  const messages = tokens.map(({token}) => ({
    token,
    notification: {title, body},
  }));

  const response = await admin.messaging().sendEach(messages);

  // Trata tokens inválidos
  const invalidTokenIds = [];
  response.responses.forEach((resp, index) => {
    if (!resp.success) {
      const errorCode = resp.error?.code;
      if (
        errorCode === "messaging/invalid-registration-token" ||
        errorCode === "messaging/registration-token-not-registered"
      ) {
        invalidTokenIds.push(tokens[index].id);
      }
    }
  });

  // Marca tokens inválidos no Firestore
  const batch = db.batch();
  invalidTokenIds.forEach((id) => {
    batch.update(db.collection("fcm_tokens").doc(id), {active: false});
  });
  await batch.commit();

  return {
    success: true,
    total: tokens.length,
    sent: response.successCount,
    failed: response.failureCount,
    invalidTokensDeactivated: invalidTokenIds.length,
  };
});
