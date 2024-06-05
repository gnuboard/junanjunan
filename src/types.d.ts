export interface ILoginModalProps {
  onClose: () => void;
  isOpen: boolean;
}


export interface ISignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface IBoard {
  bo_table: string;
  gr_id: string;
  bo_subject: string;
  bo_mobile_subject: string;
  bo_device: string;
  bo_admin: string;
  bo_list_level: number;
  bo_read_level: number;
  bo_write_level: number;
  bo_reply_level: number;
  bo_comment_level: number;
  bo_upload_level: number;
  bo_download_level: number;
  bo_html_level: number;
  bo_link_level: number;
  bo_count_delete: number;
  bo_count_modify: number;
  bo_read_point: number;
  bo_write_point: number;
  bo_comment_point: number;
  bo_download_point: number;
  bo_use_category: number;
  bo_category_list: string;
}
  
export interface IWrite {
  wr_id: number;
  wr_num: number;
  wr_reply: string;
  wr_subject: string;
  wr_name: string;
  mb_id: string;
  wr_datetime: string;
  wr_email: string;
  wr_content: string;
  wr_link1: string;
  wr_link2: string;
  wr_comment: number;
  wr_hit: number;
  wr_ip: string;
  wr_option: string;
  mb_image_path: string;
  mb_icon_path: string;
  images: any[];
  normal_files: any[];
  comments: any[];
}
  
export interface IBoardData {
  categories: any[];
  board: IBoard;
  writes: IWrite[];
}


export interface IWriteProps {
  wr_id: number;
  wr_subject: string;
  wr_name: string;
  wr_comment: number;
  wr_hit: number;
  img: string;
}


export interface IHtmlContent {
  html: string;
}


export interface ILoginForm {
  username: string;
  password: string;
}

export interface ISignUpForm {
  mb_id: string;
  mb_password: string;
  mb_password_re: string;
  mb_name: string;
  mb_nick: string;
  mb_email: string;
}


export interface IUsernmaeLoginVariables {
  username: string;
  password: string;
}


export interface IAuthTokenState {
  access_token: string | null;
  refresh_token: string | null;
}


export interface ILoginUserData {
  mb_id: string;
  mb_name: string;
  mb_nick: string;
  mb_icon_path: string;
  mb_image_path: string;
  mb_profile: string;
  mb_memo_cnt: number;
  mb_point: number;
  mb_scrap_cnt: number;
}


export interface IRootState {
  token: IAuthTokenState;
  loginUser: ILoginUserData;
}


export interface IGetMe {
  queryKey: [string, string | null];
}


interface IErrorGetWrite {
  config: object;
  data: { detail: string };
  headers: object;
  request: object;
  status: number;
  statusText: string;
}

interface IWriteForm {
  wr_subject: string;
  wr_content: string;
  wr_name: string;
  wr_password: string;
  wr_email: string;
  wr_homepage: string;
  wr_link1: string;
  wr_link2: string;
  wr_option: string;
  html: string;
  mail: string;
  secret: string;
  ca_name: string;
  notice: boolean;
  parent_id: number | null;
}


export interface IRequestWriteCreate {
  access_token: string;
  variables: IWriteForm;
}

export interface IRequestWriteUpdate {
  access_token: string;
  wr_id: string;
  variables: IWriteForm;
}


export interface IRequestWriteDelete {
  access_token: string | null;
  wr_id: string | undefined;
}


export interface IStep {
  id: number;
  content: JSX.Element;
}


interface AgreementStepProps {
  isChecked: boolean;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}