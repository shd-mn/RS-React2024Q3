import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Card from '../../components/Card';

function Home() {
  const usersData = useSelector((state: RootState) => state.user.usersData);
  const sortedUser = [...usersData].reverse();
  return (
    <div className="container">
      <div className="content">
        {sortedUser.map((user, idx) => (
          <Card key={idx} data={user} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default Home;
