import twoFactor from "node-2fa";
import env from "#start/env";
import { randomInt } from "crypto";

export default class TwoFactorAuthService {
  static generateSecret(username: string) {
    return twoFactor.generateSecret({ name: env.get('APP_ISSUER'), account: username });
  }
  
  static verifyToken(secret: string, otp: string) {
    return twoFactor.verifyToken(secret, otp);
  }

  static generateRecoveryCodes(n: number = 16) {
    return Array.from({ length: n }, () => this.generateRecoveryCode(10));
  }

  private static generateRecoveryCode(length: number) {
    let recoveryCode = '';

    for (let i = 0; i < length; i++) {
      recoveryCode += this.generateRandomChar();
    }

    const middleIndex = Math.floor(length / 2);
    recoveryCode = `${recoveryCode.substring(0, middleIndex)} ${recoveryCode.substring(middleIndex)}`;

    return recoveryCode;
  }

  private static generateRandomChar() {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomIndex = randomInt(0, charSet.length);
    return charSet[randomIndex];
  }
}
