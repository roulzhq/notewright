import PageWrapper from '$/components/admin/PageWrapper/PageWrapper';
import { submit } from './actions';

export default async function NewPost() {
  return (
    <PageWrapper title="New post">
      <form>
        <label htmlFor="title">Title:</label>
        <input id="title" name="title" type="text" required />
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" required />
        <button formAction={submit}>Submit</button>
      </form>
    </PageWrapper>
  );
}
