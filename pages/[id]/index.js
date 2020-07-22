// http://localhost:3000/id
// http://localhost:3000/adnuh1212
// 另种创建方式 pages/[id].js，但是这边还需要个 id/edit 页面，所以新建个[id]目录
// 统一放进[id]目录下
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const openConfirm = () => setConfirm(true);
  const closeConfirm = () => setConfirm(false);

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    closeConfirm();
  };

  return (
    <div className="notes-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClick={openConfirm}>
            Delete
          </Button>
        </>
      )}
      <Confirm
        open={confirm}
        onCancel={closeConfirm}
        onConfirm={handleDelete}
      />
    </div>
  );
};

// 进入这个页面，url中包含id值，getInitialProps接收一个参数context
// 里面包含pathname, query, asPath, req, res, err等参数
// 这个函数类似生命周期函数，当初始化渲染这个页面的时候触发，是nextjs内置的api
// 注意：这个方法只能用在pages里(top level)，不能用在子组件里用
Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Note;
