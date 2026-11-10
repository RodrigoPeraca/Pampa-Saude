// src/pages/AdminPage.js
import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import "./AdminPage.css";

// Formata bytes para exibição amigável
const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Estados de imagem
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTask, setUploadTask] = useState(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  const handleLogin = () => {
    if (
      user === process.env.REACT_APP_ADMIN_USER &&
      password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Usuário ou senha incorretos.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5 MB.");
      return;
    }

    setError("");
    setImageUrl(null);
    setUploadProgress(0);
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    uploadImage(file);
  };

  const uploadImage = (file) => {
    const extension = file.name.split(".").pop();
    const uniqueName = `notification-images/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.${extension}`;

    const storageRef = ref(storage, uniqueName);
    const task = uploadBytesResumable(storageRef, file);

    setIsUploading(true);
    setUploadTask(task);

    task.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (err) => {
        if (err.code === "storage/canceled") {
          setError("Upload cancelado.");
        } else {
          setError("Erro no upload. Tente novamente.");
        }
        setIsUploading(false);
        setUploadTask(null);
      },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        setImageUrl(url);
        setIsUploading(false);
        setUploadTask(null);
        setUploadProgress(100);
      }
    );
  };

  const handleRemoveImage = () => {
    if (uploadTask) {
      uploadTask.cancel();
    }
    setImageFile(null);
    setImagePreview(null);
    setImageUrl(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadTask(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      setError("Preencha o título e a mensagem.");
      return;
    }

    if (isUploading) {
      setError("Aguarde o upload da imagem terminar.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          ...(imageUrl && { image: imageUrl }),
        }),
      });

      const data = await response.json();
      setResult(data);
      setTitle("");
      setBody("");
      handleRemoveImage();
    } catch {
      setError("Erro ao enviar notificação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-container">
        <div className="admin-card">
          <h2 className="admin-title">🔒 Área Administrativa</h2>
          <p className="admin-subtitle">Pampa Saúde</p>

          <input
            className="admin-input"
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <div className="admin-password-wrapper">
            <input
              className="admin-input admin-input-password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              className="admin-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {loginError && <p className="admin-error">{loginError}</p>}

          <button className="admin-button" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const isSendDisabled = loading || isUploading || (imageFile && !imageUrl);

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">📢 Enviar Notificação</h2>
        <p className="admin-subtitle">
          A mensagem será enviada para todos os dispositivos
        </p>

        <label className="admin-label">Título</label>
        <input
          className="admin-input"
          type="text"
          placeholder="Ex: Novo comunicado"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
        />
        <small className="admin-counter">{title.length}/50</small>

        <label className="admin-label">Mensagem</label>
        <textarea
          className="admin-textarea"
          placeholder="Ex: Temos uma novidade para você!"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={200}
        />
        <small className="admin-counter">{body.length}/200</small>

        <label className="admin-label">Imagem (opcional)</label>

        {!imageFile ? (
          <>
            <input
              ref={fileInputRef}
              className="admin-input-file-hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="admin-file-label">
              📎 Selecionar imagem
            </label>
          </>
        ) : (
          <div className="admin-image-block">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="admin-image-preview"
              />
            )}

            <div className="admin-image-info">
              <span className="admin-image-name">{imageFile.name}</span>
              <span className="admin-image-size">
                {formatFileSize(imageFile.size)}
              </span>
            </div>

            {isUploading && (
              <div className="admin-progress-wrapper">
                <div
                  className="admin-progress-bar"
                  style={{ width: `${uploadProgress}%` }}
                />
                <span className="admin-progress-label">
                  Upload {uploadProgress}%
                </span>
              </div>
            )}

            {imageUrl && !isUploading && (
              <p className="admin-upload-success">✅ Upload concluído</p>
            )}

            <button
              className="admin-remove-image"
              onClick={handleRemoveImage}
              type="button"
            >
              ✕ Remover imagem
            </button>
          </div>
        )}

        {error && <p className="admin-error">{error}</p>}

        {result && (
          <div className="admin-result">
            <p>✅ Notificação enviada com sucesso!</p>
            <p>
              📱 Total de dispositivos: <strong>{result.total}</strong>
            </p>
            <p>
              ✔️ Enviadas: <strong>{result.sent}</strong>
            </p>
            {result.failed > 0 && (
              <p>
                ⚠️ Falhas (dispositivos removidos):{" "}
                <strong>{result.failed}</strong>
              </p>
            )}
          </div>
        )}

        <button
          className="admin-button"
          onClick={handleSend}
          disabled={isSendDisabled}
        >
          {loading
            ? "Enviando..."
            : isUploading
            ? "Aguardando upload..."
            : "Enviar para Todos"}
        </button>

        <button
          className="admin-button-logout"
          onClick={() => setLoggedIn(false)}
          type="button"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
