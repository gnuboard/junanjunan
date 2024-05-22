import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getWrite } from "../api";


export default function WriteDetail() {
  const { wr_id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["write", wr_id],
    queryFn: getWrite
  });
  return <div>WriteDetail</div>;
}