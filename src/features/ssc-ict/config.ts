export const SSC_ICT_FEATURE_FLAG = 'VITE_ENABLE_SSC_ICT';

export const isSscIctEnabled = import.meta.env.VITE_ENABLE_SSC_ICT !== 'false';

export const isSscIctReviewMode =
  import.meta.env.DEV || import.meta.env.VITE_SSC_ICT_REVIEW_MODE === 'true';
