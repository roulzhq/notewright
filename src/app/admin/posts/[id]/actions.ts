import remarkHtml from 'remark-html';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';

export async function parseContentToHTML(content: string) {
  const processedContent = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const contentHtml = processedContent.toString();

  return contentHtml;
}
