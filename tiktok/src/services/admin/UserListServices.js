import * as httpRequest from '~/utils/httpRequest';

export const wacoal_GetUserList_Web_V1 = async () => {
  try {
    const result = await httpRequest.get('admin/wacoal_GetUserList_Web_V1');
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const ListPositions_Load_Web_V1 = async () => {
  try {
    const result = await httpRequest.get('admin/ListPositions_Load_Web_V1');
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const ListDepartment_Load_Web_V1 = async () => {
  try {
    const result = await httpRequest.get('admin/ListDepartment_Load_Web_V1');
    return result.data;
  } catch (error) {
    throw error;
  }
};
