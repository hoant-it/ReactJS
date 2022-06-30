import * as httpRequest from '~/utils/httpRequest';

export const wacoal_GetUserList_Web_V1 = async () => {
  try {
    const result = await httpRequest.get('admin/wacoal_GetUserList_Web_V1');
    return result.data;
  } catch (error) {
    throw error;
  }
};
