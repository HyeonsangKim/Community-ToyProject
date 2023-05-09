import { IQuery } from "../../../../commons/types/generated/types";
import type { MenuProps } from 'antd';

export interface ILayoutHeaderProps {
  data?: Pick<IQuery, "fetchUserLoggedIn">;
  onClickLogo: () => void;
  onClickLogin: () => void;
  onClickLogout: () => void;
  onClickSignUp: () => void;
  onClickMoveToMypage: () => void;
  accessToken: string;
}
