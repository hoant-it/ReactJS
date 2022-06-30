import * as httpRequest from '~/utils/httpRequest';

export const sp_Wacoal_LoadMenuWeb_V1 = async () => {
  try {
    const result = await httpRequest.get('sp_Wacoal_LoadMenuWeb_V1');
    return result.data;
  } catch (error) {
    throw error;
  }
};
