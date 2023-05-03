import { RecoilEnv, atom, selector } from "recoil";
import { getAccessToken } from "../libraries/getAccessToken";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// atom - 글로벌 스테이트
export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
})

// selector - 글로벌 함수
export const restoreAccessTokenLoadable = selector({
  key: 'restoreAccessTokenLoadable',
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  }
});
