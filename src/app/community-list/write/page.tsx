import PostForm from '../../(components)/PostForm';
import PostEditorContainer from './PostEditorContainer';

const PostPage = () => {
  return (
    <>
      <PostForm />
      <div
        style={{
          border: '1px solid red'
          // width: '600px'
        }}
        className="flex justify-center border w-[600px]"
      >
        {/* PostEditor Container, Loader, Wrapper, Widget */}
        <PostEditorContainer />
      </div>
    </>
  );
};

export default PostPage;
