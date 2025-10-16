import CryptoJS from 'crypto-js';

export interface POWResult {
  hash: string;
  nonce: number;
  content: string;
  timeSpent: number;
  attempts: number;
}

/**
 * 工作量证明算法
 * @param nickname 昵称
 * @param targetZeros 目标零的个数
 * @returns POW结果
 */
export function proofOfWork(nickname: string, targetZeros: number): POWResult {
  const startTime = Date.now();
  let nonce = 0;
  let attempts = 0;
  
  const target = '0'.repeat(targetZeros);
  
  while (true) {
    attempts++;
    const content = `${nickname}${nonce}`;
    const hash = CryptoJS.SHA256(content).toString();
    
    if (hash.startsWith(target)) {
      const endTime = Date.now();
      return {
        hash,
        nonce,
        content,
        timeSpent: endTime - startTime,
        attempts
      };
    }
    
    nonce++;
  }
}

