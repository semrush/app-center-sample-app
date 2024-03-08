import { JWTPayload } from "jose";

export type ApiMetadata = {
  success: boolean;
  status_code: number;
  request_id: string;
};

export type JwtInfo = JWTPayload & {
  active_products: string[];
  email_subscription?: {
    enabled: boolean;
  };
  is_app_installed: boolean;
  is_app_taken_for_free: boolean;
  is_main_product_active: boolean;
  is_main_product_trial_available: boolean;
  lang: string;
  product_trials_available: string[];
  url: string;
  viewer_id: string;
};
