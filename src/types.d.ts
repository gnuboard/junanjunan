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
  
interface IWrite {
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