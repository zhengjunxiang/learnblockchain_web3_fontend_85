export interface KeyPair {
  publicKey: string;
  privateKey: string;
  cryptoKeyPair: CryptoKeyPair;
}

/**
 * 生成 RSA 密钥对（使用 Web Crypto API）
 * @returns 公私钥对
 */
export async function generateKeyPair(): Promise<KeyPair> {
  // 生成 RSA-PSS 密钥对用于签名
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-PSS",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );

  // 导出公钥为 SPKI 格式
  const publicKeyBuffer = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );
  const publicKeyBase64 = bufferToBase64(publicKeyBuffer);
  const publicKeyPEM = formatAsPEM(publicKeyBase64, "PUBLIC KEY");

  // 导出私钥为 PKCS8 格式
  const privateKeyBuffer = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );
  const privateKeyBase64 = bufferToBase64(privateKeyBuffer);
  const privateKeyPEM = formatAsPEM(privateKeyBase64, "PRIVATE KEY");

  return {
    publicKey: publicKeyPEM,
    privateKey: privateKeyPEM,
    cryptoKeyPair: keyPair,
  };
}

/**
 * 使用私钥对数据进行签名
 * @param data 要签名的数据
 * @param cryptoKey CryptoKey 私钥对象
 * @returns 签名（Base64 编码）
 */
export async function signData(
  data: string,
  cryptoKey: CryptoKey
): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  const signature = await window.crypto.subtle.sign(
    {
      name: "RSA-PSS",
      saltLength: 32,
    },
    cryptoKey,
    dataBuffer
  );

  return bufferToBase64(signature);
}

/**
 * 使用公钥验证签名
 * @param data 原始数据
 * @param signature 签名（Base64 编码）
 * @param cryptoKey CryptoKey 公钥对象
 * @returns 验证结果
 */
export async function verifySignature(
  data: string,
  signature: string,
  cryptoKey: CryptoKey
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const signatureBuffer = base64ToBuffer(signature);

    const isValid = await window.crypto.subtle.verify(
      {
        name: "RSA-PSS",
        saltLength: 32,
      },
      cryptoKey,
      signatureBuffer,
      dataBuffer
    );

    return isValid;
  } catch (error) {
    console.error("Verification error:", error);
    return false;
  }
}

// 辅助函数：将 ArrayBuffer 转换为 Base64
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// 辅助函数：将 Base64 转换为 ArrayBuffer
function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// 辅助函数：格式化为 PEM 格式
function formatAsPEM(base64: string, type: string): string {
  const pemHeader = `-----BEGIN ${type}-----`;
  const pemFooter = `-----END ${type}-----`;
  const pemBody = base64.match(/.{1,64}/g)?.join("\n") || base64;
  return `${pemHeader}\n${pemBody}\n${pemFooter}`;
}
