// http://localhost:3000
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';

const Index = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map((note) => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 进入这个页面，getInitialProps接收一个参数context
// 里面包含pathname, query, asPath, req, res, err等参数
// 这个函数类似生命周期函数，当初始化渲染这个页面的时候触发，是nextjs内置的api
// 注意：这个方法只能用在pages里(top level)，不能用在子组件里用
Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();

  return { notes: data };
};

export default Index;
