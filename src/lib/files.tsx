export function get_img_url (bf_file: string) {
  if (!bf_file) {
    return "";
  }
  if (bf_file.startsWith("/")) {
    bf_file = bf_file.slice(1);
  }
  return `http://localhost:8000/${bf_file}`;
}