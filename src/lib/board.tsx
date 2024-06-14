export function getBoardAttr(bo_table: string) {
  switch (bo_table) {
    case "free":
      return {boardName: "자유게시판", boardBackgroundColor: "blue"};
    case "gallery":
      return {boardName: "갤러리", boardBackgroundColor: "green"};
    case "notice":
      return {boardName: "공지사항", boardBackgroundColor: "red"};
    case "qa":
      return {boardName: "Q&A", boardBackgroundColor: "purple"};
    default:
      return {boardName: "게시판", boardBackgroundColor: "gray"};
  }
}