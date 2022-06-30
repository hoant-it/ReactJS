import axios from 'axios';

const SideBarDataLoad = () => {
  axios.get('http://localhost:5555/sp_Wacoal_LoadMenuWeb_V1').then((result) => {
    return result.data.data;
  });
};

export const SideBarData = SideBarDataLoad();
