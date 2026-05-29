const admin = require("firebase-admin");

if (!admin.apps.length) {
  const privateKey = Buffer.from(
    process.env.FIREBASE_PRIVATE_KEY_BASE64, "base64"
  ).toString("utf8");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "title e body são obrigatórios" });
  }

  try {
    const db = admin.firestore();

    const snapshot = await db
      .collection("fcm_tokens")
      .where("active", "==", true)
      .get();

    const tokens = snapshot.docs.map((doc) => ({
      id: doc.id,
      token: doc.data().token,
    }));

    if (tokens.length === 0) {
      return res.status(200).json({ message: "Nenhum token ativo encontrado" });
    }

    const messages = tokens.map(({ token }) => ({
      token,
      notification: { title, body },
    }));

    const response = await admin.messaging().sendEach(messages);

    const batch = db.batch();
    response.responses.forEach((resp, index) => {
      if (!resp.success) {
        const code = resp.error?.code;
        if (
          code === "messaging/invalid-registration-token" ||
          code === "messaging/registration-token-not-registered"
        ) {
          batch.update(
            db.collection("fcm_tokens").doc(tokens[index].id),
            { active: false }
          );
        }
      }
    });
    await batch.commit();

    return res.status(200).json({
      success: true,
      total: tokens.length,
      sent: response.successCount,
      failed: response.failureCount,
    });
  } catch (error) {
    console.error("Erro ao enviar notificações:", error);
    return res.status(500).json({ error: error.message });
  }
};