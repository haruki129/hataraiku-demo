// はたらいく v6.0 Upgrade Module
// Chat + Meeting Flow + LINE API + AWS Integration
(function(){
'use strict';

// Inject CSS
var _style = document.createElement('style');
_style.textContent = `
  /* === CHAT STYLES === */
  .chat-container {
    display: flex;
    height: 100%;
    gap: 0;
    background: var(--bg, #fff);
  }

  .chat-sidebar {
    width: 280px;
    border-right: 1px solid var(--border, #e0e0e0);
    display: flex;
    flex-direction: column;
    background: #f9f9f9;
    overflow-y: auto;
  }

  .chat-header {
    padding: 16px;
    border-bottom: 1px solid var(--border, #e0e0e0);
  }

  .chat-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text, #333);
  }

  .chat-room-list {
    flex: 1;
    overflow-y: auto;
  }

  .chat-room-item {
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
  }

  .chat-room-item:hover {
    background: #f0f0f0;
  }

  .chat-room-item.active {
    background: #e8f5e9;
    border-left: 4px solid var(--p, #6366f1);
  }

  .chat-room-item-avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 12px;
    flex-shrink: 0;
    vertical-align: top;
  }

  .chat-room-item-content {
    display: inline-block;
    width: calc(100% - 52px);
    vertical-align: top;
  }

  .chat-room-item-name {
    font-weight: 600;
    font-size: 14px;
    color: var(--text, #333);
    margin-bottom: 4px;
    display: block;
  }

  .chat-room-item-preview {
    font-size: 12px;
    color: var(--sub, #999);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .chat-room-item-time {
    font-size: 11px;
    color: var(--sub, #999);
    display: block;
    margin-top: 2px;
  }

  .chat-room-item-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #ff5252;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
  }

  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
  }

  .chat-top-bar {
    padding: 16px;
    border-bottom: 1px solid var(--border, #e0e0e0);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
  }

  .chat-top-bar-title {
    font-weight: 600;
    font-size: 16px;
    color: var(--text, #333);
  }

  .chat-top-bar-info {
    font-size: 12px;
    color: var(--sub, #999);
    margin-left: 8px;
  }

  .chat-top-bar-actions {
    display: flex;
    gap: 8px;
  }

  .chat-top-bar-action {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: var(--hover, #f5f5f5);
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .chat-top-bar-action:hover {
    background: #e0e0e0;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .chat-message {
    display: flex;
    margin-bottom: 8px;
  }

  .chat-message.sent {
    justify-content: flex-end;
  }

  .chat-message.received {
    justify-content: flex-start;
  }

  .chat-message.system {
    justify-content: center;
  }

  .chat-bubble {
    max-width: 60%;
    padding: 12px 16px;
    border-radius: 18px;
    word-wrap: break-word;
    word-break: break-word;
  }

  .chat-message.sent .chat-bubble {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 18px 4px 18px 18px;
  }

  .chat-message.received .chat-bubble {
    background: #f0f0f0;
    color: var(--text, #333);
    border-radius: 4px 18px 18px 18px;
  }

  .chat-message.system .chat-bubble {
    background: transparent;
    color: var(--sub, #999);
    font-size: 12px;
    padding: 8px 0;
  }

  .chat-bubble-text {
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
  }

  .chat-bubble-file {
    background: rgba(255, 255, 255, 0.2);
    padding: 8px 12px;
    border-radius: 8px;
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .chat-message.sent .chat-bubble-file {
    background: rgba(0, 0, 0, 0.15);
  }

  .chat-message.received .chat-bubble-file {
    background: #e8e8e8;
    color: var(--text, #333);
  }

  .chat-bubble-file:hover {
    opacity: 0.8;
  }

  .chat-bubble-file-icon {
    font-size: 16px;
  }

  .chat-bubble-file-name {
    font-size: 12px;
    font-weight: 500;
  }

  .chat-message-meta {
    font-size: 11px;
    color: var(--sub, #999);
    margin-top: 4px;
    text-align: right;
  }

  .chat-message.received .chat-message-meta {
    text-align: left;
  }

  .chat-read-receipt {
    display: inline-block;
    margin-left: 4px;
    font-size: 10px;
  }

  .chat-input-area {
    padding: 16px;
    border-top: 1px solid var(--border, #e0e0e0);
    display: flex;
    gap: 8px;
    background: white;
  }

  .chat-input-file-btn {
    width: 36px;
    height: 36px;
    border: none;
    background: var(--hover, #f5f5f5);
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .chat-input-file-btn:hover {
    background: #e0e0e0;
  }

  .chat-input-file-btn input[type="file"] {
    display: none;
  }

  .chat-input-text {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid var(--border, #e0e0e0);
    border-radius: 20px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: border 0.2s;
  }

  .chat-input-text:focus {
    border-color: var(--p, #6366f1);
  }

  .chat-input-send {
    width: 36px;
    height: 36px;
    border: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }

  .chat-input-send:hover {
    opacity: 0.8;
  }

  .chat-input-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .chat-typing-indicator {
    display: flex;
    gap: 4px;
    padding: 12px 16px;
  }

  .chat-typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ccc;
    animation: typing 1.4s infinite;
  }

  .chat-typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .chat-typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%, 60%, 100% { opacity: 0.5; }
    30% { opacity: 1; }
  }

  /* === FILE PREVIEW STYLES === */
  .file-preview-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .file-preview-content {
    background: white;
    border-radius: 8px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    position: relative;
  }

  .file-preview-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .file-preview-image {
    max-width: 100%;
    max-height: 100%;
    display: block;
  }

  .file-preview-document {
    padding: 40px;
    background: white;
    text-align: center;
  }

  /* === FORM INPUT STYLES === */
  .ph-input-wrapper {
    margin-bottom: 16px;
  }

  .ph-label {
    display: block;
    font-weight: 600;
    font-size: 14px;
    color: var(--text, #333);
    margin-bottom: 8px;
  }

  .ph-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border, #e0e0e0);
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: border 0.2s, color 0.2s;
    box-sizing: border-box;
  }

  .ph-input::placeholder {
    color: #bbb;
  }

  .ph-input:not(:placeholder-shown) {
    color: var(--text, #333);
  }

  .ph-input:focus {
    border-color: var(--p, #6366f1);
  }

  .ph-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border, #e0e0e0);
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    background: white;
    color: var(--text, #333);
    cursor: pointer;
    transition: border 0.2s;
  }

  .ph-select:focus {
    border-color: var(--p, #6366f1);
  }

  .ph-select option {
    color: var(--text, #333);
  }

  .ph-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border, #e0e0e0);
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    resize: vertical;
    min-height: 80px;
    box-sizing: border-box;
    transition: border 0.2s;
  }

  .ph-textarea::placeholder {
    color: #bbb;
  }

  .ph-textarea:focus {
    border-color: var(--p, #6366f1);
  }

  /* === TABS STYLES === */
  .ph-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .ph-tab {
    padding: 8px 16px;
    border: 1px solid var(--border, #e0e0e0);
    background: white;
    color: var(--text, #333);
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
    font-weight: 500;
  }

  .ph-tab:hover {
    border-color: var(--p, #6366f1);
    color: var(--p, #6366f1);
  }

  .ph-tab.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
  }

  /* === DATE/TIME PICKER STYLES === */
  .ph-date-input,
  .ph-time-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border, #e0e0e0);
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: border 0.2s;
    box-sizing: border-box;
  }

  .ph-date-input:focus,
  .ph-time-input:focus {
    border-color: var(--p, #6366f1);
  }

  .ph-date-range {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
  }

  .ph-date-range-input {
    flex: 1;
  }

  .ph-date-range-arrow {
    color: var(--sub, #999);
    font-weight: 600;
  }

  .ph-time-range {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .ph-time-range-input {
    flex: 1;
  }

  /* === FILE UPLOAD ZONE STYLES === */
  .file-upload-zone {
    border: 2px dashed var(--border, #e0e0e0);
    border-radius: 8px;
    padding: 32px 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: #fafafa;
    position: relative;
    overflow: hidden;
  }

  .file-upload-zone:hover {
    border-color: var(--p, #6366f1);
    background: #f5f5ff;
  }

  .file-upload-zone.dragover {
    border-color: var(--p, #6366f1);
    background: #f0f4ff;
    transform: scale(1.02);
  }

  .file-upload-zone input[type="file"] {
    display: none;
  }

  .file-upload-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .file-upload-text {
    font-size: 14px;
    font-weight: 500;
    color: var(--text, #333);
  }

  .file-upload-subtext {
    font-size: 12px;
    color: var(--sub, #999);
    margin-top: 4px;
  }

  .file-upload-preview {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .file-upload-item {
    position: relative;
    background: white;
    border: 1px solid var(--border, #e0e0e0);
    border-radius: 6px;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }

  .file-upload-item-icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  .file-upload-item-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file-upload-item-remove {
    background: none;
    border: none;
    color: #ff5252;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    flex-shrink: 0;
  }

  /* === PHOTO GALLERY STYLES === */
  .photo-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 8px;
    margin-top: 8px;
  }

  .photo-gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    aspect-ratio: 1;
    background: var(--hover, #f5f5f5);
    cursor: pointer;
    transition: transform 0.2s;
  }

  .photo-gallery-item:hover {
    transform: scale(1.05);
  }

  .photo-gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .photo-gallery-item-remove {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* === NOTIFICATION BADGE === */
  .notification-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #ff5252;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 600;
  }

  /* === DEVELOPER TOGGLE === */
  .dev-toggle-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    background: white;
    padding: 12px 16px;
    border-radius: 6px;
    border: 1px solid var(--border, #e0e0e0);
    margin-bottom: 16px;
  }

  .dev-toggle-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text, #333);
  }

  .toggle-switch {
    position: relative;
    width: 48px;
    height: 24px;
    background: #ccc;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .toggle-switch.active {
    background: var(--p, #6366f1);
  }

  .toggle-switch-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: left 0.2s;
  }

  .toggle-switch.active .toggle-switch-thumb {
    left: 26px;
  }

  /* === STEP LAYOUT === */
  .step-container {
    position: relative;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step-section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid var(--border, #e0e0e0);
  }

  .step-section-title {
    font-weight: 700;
    font-size: 16px;
    color: var(--text, #333);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .step-section-divider {
    height: 2px;
    background: linear-gradient(90deg, var(--p, #6366f1) 0%, transparent 100%);
    margin-bottom: 16px;
  }

  .step-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .step-grid-full {
    grid-column: 1 / -1;
  }

  /* === WARNINGS & ALERTS === */
  .ai-warning {
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 6px;
    padding: 12px 16px;
    margin-bottom: 16px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .ai-warning-icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  .ai-warning-text {
    font-size: 13px;
    color: #856404;
    line-height: 1.4;
  }

  .ai-warning-title {
    font-weight: 600;
    color: #856404;
    margin-bottom: 4px;
  }

  /* === MEET FLOW SPECIFIC === */
  .meet-flow-wrapper {
    position: relative;
  }

  .meet-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .meet-column-header {
    font-weight: 700;
    font-size: 14px;
    color: white;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 12px 16px;
    border-radius: 6px 6px 0 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .meet-column-content {
    background: white;
    border: 1px solid var(--border, #e0e0e0);
    border-radius: 0 0 6px 6px;
    padding: 16px;
    max-height: 80vh;
    overflow-y: auto;
  }
`;
document.head.appendChild(_style);


  // ============================================================================
  // LINE MESSAGING API INTEGRATION
  // ============================================================================

  const LINE = {
    channelAccessToken: 'YOUR_LINE_CHANNEL_ACCESS_TOKEN_HERE',
    appsScriptUrl: 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent',

    init(token, scriptUrl) {
      this.channelAccessToken = token;
      this.appsScriptUrl = scriptUrl;
      console.log('[LINE] Initialized with custom config');
    },

    async sendNotification(recipientId, message, attachments = []) {
      try {
        const payload = {
          to: recipientId,
          messages: [
            {
              type: 'text',
              text: message
            },
            ...attachments
          ]
        };

        const response = await fetch(this.appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'sendLineMessage',
            payload: payload,
            token: this.channelAccessToken
          })
        });

        console.log('[LINE] Notification sent:', message);
        return true;
      } catch (err) {
        console.error('[LINE] Send failed:', err);
        return false;
      }
    },

    async receiveWebhook(event) {
      console.log('[LINE] Webhook received:', event);
    }
  };

  // ============================================================================
  // AWS S3 INTEGRATION
  // ============================================================================

  const AWS = {
    region: 'ap-northeast-1',
    bucket: 'hataraiku-uploads',
    apiEndpoint: 'https://api.example.com/s3',

    init(region, bucket, apiEndpoint) {
      this.region = region;
      this.bucket = bucket;
      this.apiEndpoint = apiEndpoint;
      console.log('[AWS] Initialized with custom config');
    },

    async getPresignedUrl(path, action = 'GET') {
      try {
        const response = await fetch(`${this.apiEndpoint}/presigned-url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bucket: this.bucket,
            key: path,
            action: action
          })
        });
        const data = await response.json();
        return data.url;
      } catch (err) {
        console.error('[AWS] Presigned URL failed:', err);
        return null;
      }
    },

    async uploadFile(file, path) {
      try {
        const presignedUrl = await this.getPresignedUrl(path, 'PUT');
        if (!presignedUrl) throw new Error('Failed to get presigned URL');

        const response = await fetch(presignedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file
        });

        if (!response.ok) throw new Error('Upload failed');
        console.log('[AWS] File uploaded:', path);
        return `s3://${this.bucket}/${path}`;
      } catch (err) {
        console.error('[AWS] Upload failed:', err);
        return null;
      }
    },

    async downloadFile(path) {
      try {
        const presignedUrl = await this.getPresignedUrl(path, 'GET');
        if (!presignedUrl) throw new Error('Failed to get presigned URL');
        return presignedUrl;
      } catch (err) {
        console.error('[AWS] Download failed:', err);
        return null;
      }
    },

    async listFiles(prefix) {
      try {
        const response = await fetch(`${this.apiEndpoint}/list-objects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bucket: this.bucket,
            prefix: prefix
          })
        });
        const data = await response.json();
        return data.files || [];
      } catch (err) {
        console.error('[AWS] List failed:', err);
        return [];
      }
    }
  };

  // ============================================================================
  // ENHANCED CHAT SYSTEM
  // ============================================================================

  const FileAttachment = {
    queue: [],

    addFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.queue.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target.result
        });
        console.log('[FileAttachment] Added:', file.name);
      };
      reader.readAsDataURL(file);
    },

    getAll() {
      return this.queue;
    },

    clear() {
      this.queue = [];
    }
  };

  // ============================================================================
  // OVERRIDE RENDERCHAT - FIXED DATA STRUCTURE
  // ============================================================================

  window.renderChat = function() {
    const html = `
      <div class="chat-container">
        <div class="chat-sidebar">
          <div class="chat-header">
            <h2>チャット</h2>
          </div>
          <div class="chat-room-list" id="chatRoomList">
            ${(S.channels || []).map((ch, idx) => {
              const unread = 0;
              const lastMsg = S.messages.filter(m => m.ch === ch.id).slice(-1)[0];
              const lastTime = lastMsg ? lastMsg.time : '';
              const preview = lastMsg ? (lastMsg.text || '添付ファイル') : 'メッセージなし';

              return `
                <div class="chat-room-item ${S.currentChannel === ch.id ? 'active' : ''}" onclick="window.switchChannel('${ch.id}')">
                  <div class="chat-room-item-avatar">${ch.name.charAt(0)}</div>
                  <div class="chat-room-item-content">
                    <span class="chat-room-item-name">${ch.name}</span>
                    <span class="chat-room-item-preview">${preview.substring(0, 30)}</span>
                    <span class="chat-room-item-time">${lastTime}</span>
                  </div>
                  ${unread > 0 ? `<div class="chat-room-item-badge">${unread}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="chat-main">
          <div class="chat-top-bar">
            <div>
              <div class="chat-top-bar-title" id="chatRoomName">チャット</div>
              <span class="chat-top-bar-info" id="chatRoomMembers">2人</span>
            </div>
            <div class="chat-top-bar-actions">
              <button class="chat-top-bar-action" title="通知設定">🔔</button>
              <button class="chat-top-bar-action" title="設定">⚙️</button>
            </div>
          </div>

          <div class="chat-messages" id="chatMessages">
            <!-- Messages rendered here -->
          </div>

          <div class="chat-input-area">
            <button class="chat-input-file-btn" title="ファイルを添付">
              📎
              <input type="file" id="chatFileInput" onchange="window.attachFile(event)">
            </button>
            <input type="text" class="chat-input-text" id="chatInput" placeholder="メッセージを入力...">
            <button class="chat-input-send" id="chatSendBtn" onclick="window.sendMsg()">📤</button>
          </div>
        </div>
      </div>
    `;

    // Render into main area instead of app div
    const main = document.querySelector('.main');
    if (main) {
      const topbar = main.querySelector('.topbar');
      let chatContainer = document.getElementById('v6ChatContainer');
      if (!chatContainer) {
        if (topbar) {
          while (main.lastChild && main.lastChild !== topbar) {
            main.removeChild(main.lastChild);
          }
        } else {
          main.innerHTML = '';
        }
        chatContainer = document.createElement('div');
        chatContainer.id = 'v6ChatContainer';
        chatContainer.style.cssText = 'flex:1;display:flex;overflow:hidden;';
        main.appendChild(chatContainer);
      }
      chatContainer.innerHTML = html;
    } else {
      // Fallback to app div if main not available
      const appDiv = document.getElementById('app');
      if (appDiv) {
        appDiv.innerHTML = html;
      }
    }

    renderChatMessages();

    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          window.sendMsg();
        }
      });
    }
  };

  function renderChatMessages() {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    const currentCh = S.currentChannel || (S.channels && S.channels[0] && S.channels[0].id);
    const msgs = (S.messages || []).filter(m => m.ch === currentCh);

    container.innerHTML = msgs.map((msg, idx) => {
      const isSent = msg.from === '樋口春騎';
      const time = msg.time || '';

      let bubbleContent = `<p class="chat-bubble-text">${msg.text || ''}</p>`;

      if (msg.attachments && msg.attachments.length > 0) {
        bubbleContent += msg.attachments.map((att, aidx) => `
          <div class="chat-bubble-file" onclick="window.previewFile(${idx}, ${aidx})">
            <span class="chat-bubble-file-icon">${getFileIcon(att.type)}</span>
            <span class="chat-bubble-file-name">${att.name}</span>
          </div>
        `).join('');
      }

      return `
        <div class="chat-message ${isSent ? 'sent' : 'received'}">
          <div>
            <div class="chat-bubble">
              ${bubbleContent}
            </div>
            <div class="chat-message-meta">
              ${time}
              ${isSent ? '<span class="chat-read-receipt">✓✓</span>' : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.scrollTop = container.scrollHeight;
  }

  function getFileIcon(mimeType) {
    if (mimeType.includes('image')) return '🖼️';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊';
    return '📎';
  }

  window.switchChannel = function(chId) {
    S.currentChannel = chId;
    const ch = S.channels.find(c => c.id === chId);
    if (ch) {
      const nameEl = document.getElementById('chatRoomName');
      if (nameEl) nameEl.textContent = ch.name;
    }
    renderChatMessages();
    saveStore();
  };

  window.sendMsg = function() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    const attachments = FileAttachment.getAll();

    if (!text && attachments.length === 0) return;

    const chId = S.currentChannel || (S.channels[0] && S.channels[0].id);

    const msg = {
      id: Date.now().toString(),
      ch: chId,
      from: '樋口春騎',
      text: text,
      time: new Date().toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'}),
      attachments: attachments.map(a => ({
        name: a.name,
        type: a.type,
        size: a.size
      }))
    };

    S.messages.push(msg);
    input.value = '';
    FileAttachment.clear();
    renderChatMessages();
    saveStore();

    // Trigger AI auto-reply
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        ch: chId,
        from: 'system',
        text: '了解しました。確認いたします。',
        time: new Date().toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'}),
        attachments: []
      };
      S.messages.push(aiMsg);
      renderChatMessages();
      saveStore();

      LINE.sendNotification('U' + chId, `新しいメッセージ: ${text.substring(0, 50)}`);
    }, 800);
  };

  window.attachFile = function(event) {
    const files = event.target.files;
    for (let file of files) {
      FileAttachment.addFile(file);
    }
    console.log('[Chat] Files attached:', files.length);
  };

  window.previewFile = function(msgIdx, attIdx) {
    const msg = S.messages[msgIdx];
    if (!msg || !msg.attachments || !msg.attachments[attIdx]) return;

    const att = msg.attachments[attIdx];
    const modalHtml = `
      <div class="file-preview-modal" onclick="this.remove()">
        <div class="file-preview-content" onclick="event.stopPropagation()">
          <button class="file-preview-close" onclick="this.parentElement.parentElement.remove()">✕</button>
          ${att.type.includes('image')
            ? `<img src="${att.data}" class="file-preview-image">`
            : `<div class="file-preview-document"><p>📄 ${att.name}</p><p style="font-size: 12px; color: #999;">ファイル形式: ${att.type}</p></div>`
          }
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  };

  // ============================================================================
  // FORM HELPERS - RETURN HTML STRINGS
  // ============================================================================

  window.phInput = function(id, key, options = {}) {
    options = {
      label: key,
      type: 'text',
      placeholder: '',
      suffix: '',
      ...options
    };

    let oninputHandler = '';
    if (options.type === 'number' && (options.suffix === '万' || options.suffix === '㎡')) {
      oninputHandler = 'oninput="this.value=this.value.replace(/[^0-9]/g,\'\').replace(/\\B(?=(\\d{3})+(?!\\d))/g,\',\')"';
    }

    return `<div class="ph-input-wrapper">
      <label class="ph-label">${options.label}</label>
      <div style="display:flex;gap:4px;align-items:center;">
        <input type="${options.type}" id="${id}" class="ph-input"
          placeholder="${options.placeholder}" style="flex:1"
          onchange="saveStore()" ${oninputHandler}>
        ${options.suffix ? `<span style="color:var(--sub);font-size:14px">${options.suffix}</span>` : ''}
      </div>
    </div>`;
  };

  window.phSelect = function(id, key, options = {}) {
    options = {
      label: key,
      items: [],
      ...options
    };

    return `<div class="ph-input-wrapper">
      <label class="ph-label">${options.label}</label>
      <select id="${id}" class="ph-select" onchange="saveStore()">
        <option value="" style="color: #bbb;">選択してください</option>
        ${options.items.map(item => `
          <option value="${item.value || item}">${item.label || item}</option>
        `).join('')}
      </select>
    </div>`;
  };

  window.phTabs = function(id, key, options = {}) {
    options = {
      label: key,
      items: [],
      ...options
    };

    return `<div class="ph-input-wrapper">
      <label class="ph-label">${options.label}</label>
      <div class="ph-tabs" id="${id}">
        ${options.items.map((item, idx) => `
          <button
            type="button"
            class="ph-tab ${idx === 0 ? 'active' : ''}"
            data-value="${item.value || item}"
            onclick="this.parentElement.querySelectorAll('.ph-tab').forEach(t => t.classList.remove('active')); this.classList.add('active'); saveStore();"
          >
            ${item.label || item}
          </button>
        `).join('')}
      </div>
    </div>`;
  };

  window.phDate = function(id, key, options = {}) {
    options = {
      label: key,
      ...options
    };

    return `<div class="ph-input-wrapper">
      <label class="ph-label">${options.label}</label>
      <input
        type="date"
        id="${id}"
        class="ph-date-input"
        onchange="saveStore()"
      >
    </div>`;
  };

  window.phTime = function(id, key, options = {}) {
    options = {
      label: key,
      ...options
    };

    return `<div class="ph-input-wrapper">
      <label class="ph-label">${options.label}</label>
      <input
        type="time"
        id="${id}"
        class="ph-time-input"
        onchange="saveStore()"
      >
    </div>`;
  };

  // ============================================================================
  // ENHANCED MEETING FLOW - TWO COLUMN LAYOUT
  // ============================================================================

  function renderStep0ClientSide() {
    return `
      <div class="step-section">
        <div class="step-section-title">施工予定</div>
        <div style="margin-bottom: 16px;">
          <label class="ph-label">施工時期</label>
          <div class="ph-date-range">
            <div class="ph-date-range-input">
              <input type="date" class="ph-date-input" id="step0_startDate" onchange="saveStore()">
            </div>
            <div class="ph-date-range-arrow">→</div>
            <div class="ph-date-range-input">
              <input type="date" class="ph-date-input" id="step0_endDate" onchange="saveStore()">
            </div>
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">物件情報</div>
        ${window.phInput('step0_area', 'エリア', {label: 'エリア', placeholder: '東京都 中央区'})}
        ${window.phSelect('step0_building', '建物', {label: '建物', items: ['区分マンション', '戸建て', '其他(手入力)']})}
        ${window.phInput('step0_area_size', '広さ', {label: '広さ', type: 'number', placeholder: '70', suffix: '㎡'})}
      </div>

      <div class="step-section">
        <div class="step-section-title">間取り図</div>
        <div class="file-upload-zone" id="step0_floorPlanZone" onclick="document.getElementById('step0_floorPlanInput').click()">
          <div class="file-upload-icon">📄</div>
          <div class="file-upload-text">間取り図をアップロード</div>
          <div class="file-upload-subtext">ドラッグ&ドロップまたはクリック</div>
          <input type="file" id="step0_floorPlanInput" accept=".pdf,.jpg,.png" onchange="window.handleFileUpload(event, 'step0_floorPlan')">
        </div>
        <div class="file-upload-preview" id="step0_floorPlan_preview"></div>
      </div>

      <div class="step-section">
        <div class="step-section-title">予算</div>
        ${window.phInput('step0_budget', '工事予算', {label: '工事予算', type: 'number', placeholder: '700', suffix: '万円'})}
        ${window.phInput('step0_salePrice', '販売予定金額', {label: '販売予定金額', type: 'number', placeholder: '5000', suffix: '万円'})}
      </div>

      <div class="step-section">
        <div class="step-section-title">計画仕上り</div>
        ${window.phTabs('step0_finish', '計画仕上り', {
          label: '計画仕上り',
          items: ['品質と仕様が大切', '品質が大切', '工期予算が大切']
        })}
        <div class="ph-input-wrapper">
          <label class="ph-label">備考</label>
          <textarea class="ph-textarea" id="step0_finishNote" onchange="saveStore()" placeholder="特に重視する点などあればご記入ください"></textarea>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">住居状況</div>
        ${window.phTabs('step0_living', '室内の使用状況', {
          label: '室内の使用状況',
          items: ['住んでいます', '住んでいません']
        })}
      </div>

      <div class="step-section">
        <div class="step-section-title">施工業者の提案</div>
        ${window.phTabs('step0_proposal', '施工業者から提案', {
          label: '施工業者から提案',
          items: ['有', '無']
        })}
        ${window.phTabs('step0_quotes', '相見積業者', {
          label: '相見積業者',
          items: [{label: '1社', value: '1'}, {label: '2社', value: '2'}, {label: '3社以上', value: '3+'}]
        })}
      </div>

      <div class="step-section">
        <div class="step-section-title">室内写真</div>
        <div class="file-upload-zone" id="step0_photosZone" onclick="document.getElementById('step0_photosInput').click()">
          <div class="file-upload-icon">📸</div>
          <div class="file-upload-text">室内写真をアップロード</div>
          <div class="file-upload-subtext">複数の写真をアップロードできます</div>
          <input type="file" id="step0_photosInput" accept="image/*" multiple onchange="window.handleFileUpload(event, 'step0_photos')">
        </div>
        <div class="photo-gallery" id="step0_photos_preview"></div>
      </div>

      <div class="step-section">
        <div class="step-section-title">室内状況コメント</div>
        <textarea class="ph-textarea" id="step0_photoComment" onchange="saveStore()" placeholder="写真に関するコメントをご記入ください"></textarea>
      </div>
    `;
  }

  function renderStep0ContractorSide() {
    return `
      <div class="step-section">
        <div class="step-section-title">見積り回答</div>
        ${window.phTabs('step0_quoteDate', '見積り回答日', {
          label: '見積り回答日',
          items: Array.from({length: 10}, (_, i) => ({label: `${i+1}日後`, value: String(i+1)}))
        })}
      </div>

      <div class="step-section">
        <div class="step-section-title">着工予定</div>
        ${window.phDate('step0_constructDate', '最短着工日', {label: '最短着工日'})}
      </div>

      <div class="step-section">
        <div class="step-section-title">調査予定</div>
        ${window.phTabs('step0_surveyTime', '調査所要時間', {
          label: '調査所要時間',
          items: ['15分', '30分', '45分', '60分', '75分', '90分']
        })}
      </div>
    `;
  }

  function renderStep1ClientSide() {
    const timeSlots = Array.from({length: 21}, (_, i) => {
      const h = 8 + Math.floor((i * 30) / 60);
      const m = (i * 30) % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    });

    return `
      <div class="step-section">
        <div class="step-section-title">候補日時1</div>
        <label class="ph-label">日時</label>
        <div class="ph-date-range">
          <input type="date" class="ph-date-input" id="step1_date1" onchange="saveStore()">
          <div style="display: flex; gap: 8px; align-items: center;">
            <select class="ph-select" id="step1_time1_start" onchange="saveStore()" style="flex: 1;">
              <option value="">開始時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
            <span style="color: var(--sub, #999);">～</span>
            <select class="ph-select" id="step1_time1_end" onchange="saveStore()" style="flex: 1;">
              <option value="">終了時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">候補日時2</div>
        <label class="ph-label">日時</label>
        <div class="ph-date-range">
          <input type="date" class="ph-date-input" id="step1_date2" onchange="saveStore()">
          <div style="display: flex; gap: 8px; align-items: center;">
            <select class="ph-select" id="step1_time2_start" onchange="saveStore()" style="flex: 1;">
              <option value="">開始時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
            <span style="color: var(--sub, #999);">～</span>
            <select class="ph-select" id="step1_time2_end" onchange="saveStore()" style="flex: 1;">
              <option value="">終了時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">候補日時3</div>
        <label class="ph-label">日時</label>
        <div class="ph-date-range">
          <input type="date" class="ph-date-input" id="step1_date3" onchange="saveStore()">
          <div style="display: flex; gap: 8px; align-items: center;">
            <select class="ph-select" id="step1_time3_start" onchange="saveStore()" style="flex: 1;">
              <option value="">開始時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
            <span style="color: var(--sub, #999);">～</span>
            <select class="ph-select" id="step1_time3_end" onchange="saveStore()" style="flex: 1;">
              <option value="">終了時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">調査時の共有事項</div>
        <textarea class="ph-textarea" id="step1_note" onchange="saveStore()" placeholder="特に確認してほしい点などあればご記入ください"></textarea>
      </div>

      <div class="step-section">
        <div class="step-section-title">現地調査写真</div>
        <div class="file-upload-zone" id="step1_photosZone" onclick="document.getElementById('step1_photosInput').click()">
          <div class="file-upload-icon">📸</div>
          <div class="file-upload-text">調査時の写真をアップロード</div>
          <div class="file-upload-subtext">複数の写真をアップロードできます</div>
          <input type="file" id="step1_photosInput" accept="image/*" multiple onchange="window.handleFileUpload(event, 'step1_photos')">
        </div>
        <div class="photo-gallery" id="step1_photos_preview"></div>
      </div>
    `;
  }

  function renderStep1ContractorSide() {
    const timeSlots = Array.from({length: 21}, (_, i) => {
      const h = 8 + Math.floor((i * 30) / 60);
      const m = (i * 30) % 60;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    });

    return `
      <div class="ai-warning">
        <span class="ai-warning-icon">⚠️</span>
        <div>
          <div class="ai-warning-title">スケジュール競合</div>
          <div class="ai-warning-text">
            選択予定日時が依頼側の提案外です。
            <br>依頼側の提案: 2024-03-15〜2024-03-17 09:00-17:00
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">候補日時1</div>
        <label class="ph-label">日時</label>
        <div class="ph-date-range">
          <input type="date" class="ph-date-input" id="step1_c_date1" onchange="saveStore()">
          <div style="display: flex; gap: 8px; align-items: center;">
            <select class="ph-select" id="step1_c_time1_start" onchange="saveStore()" style="flex: 1;">
              <option value="">開始時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
            <span style="color: var(--sub, #999);">～</span>
            <select class="ph-select" id="step1_c_time1_end" onchange="saveStore()" style="flex: 1;">
              <option value="">終了時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">候補日時2</div>
        <label class="ph-label">日時</label>
        <div class="ph-date-range">
          <input type="date" class="ph-date-input" id="step1_c_date2" onchange="saveStore()">
          <div style="display: flex; gap: 8px; align-items: center;">
            <select class="ph-select" id="step1_c_time2_start" onchange="saveStore()" style="flex: 1;">
              <option value="">開始時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
            <span style="color: var(--sub, #999);">～</span>
            <select class="ph-select" id="step1_c_time2_end" onchange="saveStore()" style="flex: 1;">
              <option value="">終了時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">候補日時3</div>
        <label class="ph-label">日時</label>
        <div class="ph-date-range">
          <input type="date" class="ph-date-input" id="step1_c_date3" onchange="saveStore()">
          <div style="display: flex; gap: 8px; align-items: center;">
            <select class="ph-select" id="step1_c_time3_start" onchange="saveStore()" style="flex: 1;">
              <option value="">開始時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
            <span style="color: var(--sub, #999);">～</span>
            <select class="ph-select" id="step1_c_time3_end" onchange="saveStore()" style="flex: 1;">
              <option value="">終了時刻</option>
              ${timeSlots.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="step-section">
        <div class="step-section-title">確認事項コメント</div>
        <textarea class="ph-textarea" id="step1_c_note" onchange="saveStore()" placeholder="確認事項があればご記入ください"></textarea>
      </div>

      <div class="step-section">
        <div class="step-section-title">現地調査写真</div>
        <div class="file-upload-zone" id="step1_c_photosZone" onclick="document.getElementById('step1_c_photosInput').click()">
          <div class="file-upload-icon">📸</div>
          <div class="file-upload-text">調査時の写真をアップロード</div>
          <div class="file-upload-subtext">複数の写真をアップロードできます</div>
          <input type="file" id="step1_c_photosInput" accept="image/*" multiple onchange="window.handleFileUpload(event, 'step1_c_photos')">
        </div>
        <div class="photo-gallery" id="step1_c_photos_preview"></div>
      </div>
    `;
  }

  // Override renderStep0 and renderStep1 to show both sides
  window.renderStep0 = function() {
    const area = document.getElementById('flowStepContent');
    if (!area) return;

    area.innerHTML = `
      <div class="dev-toggle-wrapper">
        <span class="dev-toggle-label">ロール:</span>
        <div class="toggle-switch ${S.meeting && S.meeting.layer === 2 ? 'active' : ''}" id="roleToggle" onclick="window.toggleLayer()">
          <div class="toggle-switch-thumb"></div>
        </div>
        <span class="dev-toggle-label">${S.meeting && S.meeting.layer === 2 ? '施工管理側' : '依頼側'}</span>
      </div>

      <div class="meet-columns">
        <div>
          <div class="meet-column-header">📝 依頼側</div>
          <div class="meet-column-content">
            ${renderStep0ClientSide()}
          </div>
        </div>
        <div>
          <div class="meet-column-header" style="background:linear-gradient(135deg,#059669,#10b981)">🔧 施工管理側</div>
          <div class="meet-column-content">
            ${renderStep0ContractorSide()}
          </div>
        </div>
      </div>
    `;
  };

  window.renderStep1 = function() {
    const area = document.getElementById('flowStepContent');
    if (!area) return;

    area.innerHTML = `
      <div class="dev-toggle-wrapper">
        <span class="dev-toggle-label">ロール:</span>
        <div class="toggle-switch ${S.meeting && S.meeting.layer === 2 ? 'active' : ''}" id="roleToggle" onclick="window.toggleLayer()">
          <div class="toggle-switch-thumb"></div>
        </div>
        <span class="dev-toggle-label">${S.meeting && S.meeting.layer === 2 ? '施工管理側' : '依頼側'}</span>
      </div>

      <div class="meet-columns">
        <div>
          <div class="meet-column-header">📝 依頼側</div>
          <div class="meet-column-content">
            ${renderStep1ClientSide()}
          </div>
        </div>
        <div>
          <div class="meet-column-header" style="background:linear-gradient(135deg,#059669,#10b981)">🔧 施工管理側</div>
          <div class="meet-column-content">
            ${renderStep1ContractorSide()}
          </div>
        </div>
      </div>
    `;
  };

  // Toggle between layers
  window.toggleLayer = function() {
    if (!S.meeting) S.meeting = { layer: 1 };
    S.meeting.layer = S.meeting.layer === 1 ? 2 : 1;
    const currentStep = window.currentMeetingStep || 0;
    if (currentStep === 0) {
      window.renderStep0();
    } else if (currentStep === 1) {
      window.renderStep1();
    }
    saveStore();
  };

  // Handle file uploads
  window.handleFileUpload = function(event, fieldId) {
    const files = event.target.files;
    const container = document.getElementById(fieldId + '_preview');

    if (!container) return;

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Try AWS upload first, fall back to base64
        if (window.AWS && window.AWS.uploadFile) {
          AWS.uploadFile(file, `uploads/${fieldId}/${file.name}`).then(s3Url => {
            if (s3Url) {
              console.log('[FileUpload] AWS upload success:', s3Url);
            }
          });
        }

        if (file.type.includes('image')) {
          const item = document.createElement('div');
          item.className = 'photo-gallery-item';
          item.innerHTML = `
            <img src="${e.target.result}">
            <button class="photo-gallery-item-remove" onclick="this.parentElement.remove()">✕</button>
          `;
          container.appendChild(item);
        } else {
          const item = document.createElement('div');
          item.className = 'file-upload-item';
          item.innerHTML = `
            <span class="file-upload-item-icon">${getFileIcon(file.type)}</span>
            <span class="file-upload-item-name">${file.name}</span>
            <button class="file-upload-item-remove" onclick="this.parentElement.remove()">✕</button>
          `;
          container.appendChild(item);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      LINE.init(
        localStorage.getItem('LINE_CHANNEL_TOKEN') || 'YOUR_LINE_CHANNEL_ACCESS_TOKEN_HERE',
        localStorage.getItem('LINE_APPS_SCRIPT_URL') || 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent'
      );

      AWS.init(
        localStorage.getItem('AWS_REGION') || 'ap-northeast-1',
        localStorage.getItem('AWS_BUCKET') || 'hataraiku-uploads',
        localStorage.getItem('AWS_API_ENDPOINT') || 'https://api.example.com/s3'
      );

      console.log('[V6.0] Upgrade initialized');
    });
  } else {
    LINE.init(
      localStorage.getItem('LINE_CHANNEL_TOKEN') || 'YOUR_LINE_CHANNEL_ACCESS_TOKEN_HERE',
      localStorage.getItem('LINE_APPS_SCRIPT_URL') || 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent'
    );

    AWS.init(
      localStorage.getItem('AWS_REGION') || 'ap-northeast-1',
      localStorage.getItem('AWS_BUCKET') || 'hataraiku-uploads',
      localStorage.getItem('AWS_API_ENDPOINT') || 'https://api.example.com/s3'
    );

    console.log('[V6.0] Upgrade initialized');
  }

  window.LINE = LINE;
  window.AWS = AWS;
  window.FileAttachment = FileAttachment;




  // === NAVIGATION FIX: Backup/Restore .main DOM when switching pages ===
(function() {
  var origSw = window.sw;
  if (typeof origSw !== 'function') return;

  // Capture the initial .main innerHTML as the clean baseline
  var mainEl = document.querySelector('.main');
  var mainBackup = mainEl ? mainEl.innerHTML : '';

  window.sw = function(page) {
    // If chat UI is currently displayed, restore the original .main structure
    var chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      var m = document.querySelector('.main');
      if (m && mainBackup) {
        m.innerHTML = mainBackup;
      }
    }
    // Call the original sw() with all its expected DOM elements now present
    return origSw.apply(this, arguments);
  };
})();
})();
