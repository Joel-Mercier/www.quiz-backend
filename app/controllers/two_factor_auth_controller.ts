import { verifyOtpValidator } from "#validators/two_factor_auth";
import { HttpContext } from "@adonisjs/core/http";
import TwoFactorAuthService from "#services/two_factor_auth_service";

export default class TwoFactorAuthController {
  async generate({ auth }: HttpContext) {
    const user = auth.user!;
    
    await user.merge({ twoFactorSecret: TwoFactorAuthService.generateSecret(user.username), isTwoFactorEnabled: false }).save();

    return user.twoFactorSecret?.uri;
  }

  async disable({ auth, response }: HttpContext) {
    if (!auth.user?.isTwoFactorEnabled) {
      return response.badRequest({ message: 'User is not enabled for two factor authentication' });
    }

    await auth.user!.merge({ isTwoFactorEnabled: false, twoFactorSecret: null, twoFactorRecoveryCodes: [] }).save();
    return response.noContent();
  }

  async verify({ auth, request, response }: HttpContext) {
    const { otp } = await request.validateUsing(verifyOtpValidator);

    const user = auth.user!;

    const verifyResult = TwoFactorAuthService.verifyToken(user.twoFactorSecret?.secret!, otp);
    let isSecretInRecoveryCodes = false;
    if (!verifyResult) {
      isSecretInRecoveryCodes = user.twoFactorRecoveryCodes!.includes(otp);
    }

    const isValid = verifyResult?.delta === 0 || isSecretInRecoveryCodes

    if (!isValid) {
      return response.badRequest({ message: 'OTP invalid' })
    }

    if (!user.isTwoFactorEnabled) {
      await user.merge({ isTwoFactorEnabled: true }).save();
    }

    return response.ok({ message: 'OTP valid' })
  }

  async generateRecoveryCodes({ auth, response }: HttpContext) {
    const user = auth.user!;
    if (!user.isTwoFactorEnabled) {
      return response.badRequest({ message: 'User is not enabled for two factor authentication' });
    }

    const recoveryCodes = TwoFactorAuthService.generateRecoveryCodes();

    await user.merge({ twoFactorRecoveryCodes: recoveryCodes }).save();

    return { recoveryCodes }
  }
}
