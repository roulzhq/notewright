import PageWrapper from '$/components/admin/PageWrapper/PageWrapper';
import { getPostById } from '$/server/lib/post';
import { parseContentToHTML } from './actions';

export default async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await getPostById(id);

  if (!data) return 'Not found';

  const content = await parseContentToHTML(data.content);

  console.log(content);

  return (
    <PageWrapper title={data.title}>
      <div className="post__content" dangerouslySetInnerHTML={{ __html: content }} />
    </PageWrapper>
  );
}
