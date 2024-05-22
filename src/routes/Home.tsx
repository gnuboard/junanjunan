import { Grid, Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import Write from "../components/Write";
import { useQuery } from "@tanstack/react-query";
import { getWrites } from "../api";


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

interface IBoardData {
  categories: any[];
  board: IBoard;
  writes: IWrite[];
}


export default function Home() {
  const { isLoading, data } = useQuery<IBoardData>({
    queryKey: ["writes"],
    queryFn: getWrites,
  });

  return (
    <Grid
      mt={10}
      px={{
        base: 10,  // base: mobile
        lg: 40
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {
        isLoading ? (
          <Box>
            <Skeleton rounded="2xl" height={280} mb={6} />
            <SkeletonText noOfLines={3} />
          </Box>
        ) : null
      }
      {data?.writes.map((write) => (
        <Box>
          <Write
            wr_id={write.wr_id}
            wr_subject={write.wr_subject}
            wr_name={write.wr_name}
            wr_comment={write.wr_comment}
            wr_hit={write.wr_hit}
            img={
              write.images[0]
              ? "http://127.0.0.1:8000/"+ write.images[0].bf_file
              : `${process.env.PUBLIC_URL}/no_img.png`
            } 
          />
        </Box>
      ))}
    </Grid>
  );
}