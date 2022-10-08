import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

//users list: https://reqres.in/api/users

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setItems(json.data))
      .catch((err) => {
        console.warn(err);
        alert('Error getting users');
      })
      .finally(() => setIsLoading(false));
  }, []);
  const searchTextChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };
  const onClickSendInvites = () => {
    setSuccess(true);
  };
  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onClickSendInvites={onClickSendInvites}
          isLoading={isLoading}
          items={items}
          searchValue={searchValue}
          searchTextChange={searchTextChange}
          invites={invites}
          onClickInvite={onClickInvite}
        />
      )}
    </div>
  );
}

export default App;
